from django.shortcuts import render , get_object_or_404
from django.db.models import Count , Sum
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.timesince import timesince
from django.utils.timezone import now
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import SearchFilter 
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .serializers import *


@api_view(["POST"])
def user_register(request):
    serializer = UserRegistrationSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def verify_registration_otp(request):

    serializer = OTPVerificationSerializer(
        data=request.data
    )

    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data["email"]
    otp = serializer.validated_data["otp"]

    user = get_object_or_404(
        User,
        email=email
    )

    if user.otp_purpose != "reg":
        return Response(
            {"error": "Invalid OTP purpose."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if (
        user.otp_created_at
        and timezone.now() - user.otp_created_at > timedelta(minutes=10)
    ):
        user.generate_otp("reg")
        send_otp_email(
            user,
            purpose="registration"
        )

        return Response(
            {
                "error": "OTP expired. New OTP sent."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if user.otp != otp:
        return Response(
            {"error": "Invalid OTP."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user.is_active = True
    user.is_verified = True

    user.otp = None
    user.otp_created_at = None
    user.otp_purpose = None

    user.save(
        update_fields=[
            "is_active",
            "is_verified",
            "otp",
            "otp_created_at",
            "otp_purpose",
        ]
    )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Registration successful.",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
        status=status.HTTP_200_OK,
    )

@api_view(["POST"])
def verify_login_otp(request):

    serializer = OTPVerificationSerializer(
        data=request.data
    )

    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data["email"]
    otp = serializer.validated_data["otp"]

    user = get_object_or_404(
        User,
        email=email
    )

    if user.otp_purpose != "login":
        return Response(
            {"error": "Invalid OTP purpose."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if (
        user.otp_created_at
        and timezone.now() - user.otp_created_at > timedelta(minutes=10)
    ):
        user.generate_otp("login")
        send_otp_email(
            user,
            purpose="login"
        )

        return Response(
            {
                "error": "OTP expired. New OTP sent."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if user.otp != otp:
        return Response(
            {"error": "Invalid OTP."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user.otp = None
    user.otp_created_at = None
    user.otp_purpose = None

    user.save(
        update_fields=[
            "otp",
            "otp_created_at",
            "otp_purpose",
        ]
    )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Login successful.",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
        status=status.HTTP_200_OK,
    )

@api_view(["POST"])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        return Response(
            {"message": serializer.validated_data["message"]},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )




class DatasetUploadView(ModelViewSet):
    
    serializer_class = DatasetSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
            queryset = Dataset.objects.filter(user=self.request.user)
            data_type = self.request.query_params.get("data_type")
            if data_type is not None:
                queryset = queryset.filter(data_type=data_type)
            return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

    def list(self , request , *args, **kwargs):
        queryset = self.get_queryset() 
        total_datasets = queryset.count()
        total_rows = queryset.aggregate(total = Sum('rows_count'))['total'] or 0
        total_storage = queryset.aggregate(storage= Sum('file_size'))['storage'] or 0
        total_storage = round(total_storage / (1024 * 1024), 4)
        data_type_used = queryset.values_list('data_type' , flat=True).distinct()
        # data_type_used = data_type_used

        last_dataset = queryset.order_by("-created_at").first()
        
        last_uploaded = None
        if last_dataset:
            upload_time_diff = now() - last_dataset.created_at
            last_uploaded = {
                "name": last_dataset.name,
                "uploaded_at": last_dataset.created_at,
                "uploaded_ago": f"{timesince(last_dataset.created_at)} ago"
            }

        serializer = self.get_serializer(queryset, many=True)

        
        return Response({
            "kpis":{
                "dataset_count":total_datasets,
                "total_rows":total_rows,
                "total_storage_used":total_storage,
                "last_uploaded_dataset" : last_uploaded,
                'used_data_types': data_type_used
            },
            "result":serializer.data
        })

    
class DatasetCandelstickView(ModelViewSet):
    timelist = ["1M", "5M","15M","30M","1H","4H","1D" , "1W","1MO"]
    


    permission_classes=[IsAuthenticated]
    @staticmethod
    def aggregate_candle(file_path , timeframe):
        TIMEFRAME_MAP = {
            "1M": "1min",
            "5M": "5min",
            "15M": "15min",
            "30M": "30min",
            "1H": "1h",
            "4H": "4h",
            "1D": "1D",
            "1W": "1W-MON",
            "1MO": "1MS"
        }
        if timeframe not in TIMEFRAME_MAP:
            raise ValueError("Invalid Time frame , Unable to compile")
        df = pd.read_parquet(file_path)
        df["datetime"] = pd.to_datetime(df["datetime"])
        df= df[["datetime", "open","high", "low","close" , "volume"]]
        df.set_index("datetime" , inplace=True)
        rule = TIMEFRAME_MAP[timeframe]
        df = (df.resample(rule , closed='left', label='left' , origin=df.index[0])
        .agg({
            'open': 'first',
            'high': 'max',
            'low': 'min',
            'close': 'last',
            'volume':"sum"
            
        })
        .dropna()
        .reset_index())
        return df

        
        
    def retrieve(self, request,pk, *args, **kwargs):
        TIMEFRAME_ORDER = {
        "1M": 1,
        "5M": 5,
        "15M": 15,
        "30M": 30,
        "1H": 60,
        "4H": 240,
        "1D": 1440,
        "1W": 10080,
        "1MO": 43200
    }
        dataset = Dataset.objects.get(id = pk , user = request.user)
        timeframe = dataset.timeframe
        file_path = dataset.file.path
        df = pd.read_parquet(file_path)
        data_head = df.columns
        data = df[["datetime","open","high","low","close","volume"]].values.tolist()
        request_timeframe = self.request.query_params.get("timeframe")
      
        if request_timeframe is not None:
            if request_timeframe not in TIMEFRAME_ORDER:
                return Response(
                    {
                        "error":"Invalid timeframe"
                    },
                    status=400
                )
            if TIMEFRAME_ORDER[timeframe]  > TIMEFRAME_ORDER[request_timeframe]:
                return Response({
                    "error" : "valueError",
                    "massage":f"cannot convert {timeframe} into {request_timeframe}"
                })
            data = self.aggregate_candle(file_path,request_timeframe)
            data_head = df.columns
            data = data.values.tolist()
            
  

        return Response({
            "data_title":data_head,
            "data": data
        })


                