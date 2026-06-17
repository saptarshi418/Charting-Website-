from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from django.core.files.base import ContentFile
from io import BytesIO
import pandas as pd
from pathlib import Path
from .models import *
from .utils import send_otp_email
from datetime import timedelta



class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email',
                   'phone_no', 'password','confirm_password']
    def validate_email(self, value):
        user = User.objects.filter(email=value).first()

        if user and user.is_verified:
            raise serializers.ValidationError(
                "User already registered. Please login."
            )
        return value

    def validate_password(self, value):
        validate_password(value)
        return value
    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                "Passwords do not match."
            )
        return data
    
    
    def create(self, validated_data):
        validated_data.pop("confirm_password")

        existing_user = User.objects.filter(
            email=validated_data["email"],
            is_verified=False
        ).first()

        if existing_user:
            existing_user.generate_otp(
                otp_purpose="reg"
            )

            send_otp_email(
                existing_user,
                purpose="registration"
            )

            return existing_user

        user = User.objects.create_user(
            **validated_data
        )

        user.generate_otp(
            otp_purpose="reg"
        )

        send_otp_email(
            user,
            purpose="registration"
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

  
    def validate(self , data):
        email = data.get("email")
        password = data.get("password")
        user = authenticate(username = email , password = password)
        
        if user is None:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "Email is not verified."
            )
        user.generate_otp(otp_purpose="login")
        send_otp_email(user , purpose="login")
       
        return {
            "user": user,
            "message": "OTP sent to your email."
        }

class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length = 6)




class DatasetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Dataset
        fields = ['id','file' ,'file_size' ,"name", 'data_type','timeframe', 'rows_count', 'created_at','start_date','end_date' , 'updated_at' ]
        read_only_fields = ['start_date','end_date', 'file_size', 'timeframe', 'rows_count', 'created_at']

      
    def create(self, validated_data):

        uploaded_file = validated_data['file']

        file_name = Path(uploaded_file.name).stem
        file_ext = Path(uploaded_file.name).suffix.lower()


        # Read file
        if file_ext == ".csv":
            df = pd.read_csv(uploaded_file)

        elif file_ext in [".xlsx", ".xls"]:
            df = pd.read_excel(uploaded_file)

        else:
            raise serializers.ValidationError(
                "Unsupported file format. Please upload CSV or Excel file."
            )


        if df.empty:
            raise serializers.ValidationError(
                "The uploaded file is empty."
            )


        # Normalize column names lookup
        column_map = {
            col.lower(): col 
            for col in df.columns
        }


        required_cols = {
            "open",
            "high",
            "low",
            "close",
            "volume"
        }


        if not required_cols.issubset(column_map.keys()):
            raise serializers.ValidationError(
                "Missing OHLC columns."
            )


        # Detect datetime column
        datetime_col = next(
            (
                column_map[col]
                for col in [
                    "datetime",
                    "timestamp",
                    "date",
                    "time"
                ]
                if col in column_map
            ),
            None
        )


        if datetime_col is None:
            raise serializers.ValidationError(
                "No datetime column found."
            )


        # Rename everything into our standard format
        rename_map = {
            datetime_col: "datetime",
            column_map["open"]: "open",
            column_map["high"]: "high",
            column_map["low"]: "low",
            column_map["close"]: "close",
            column_map["volume"]: "volume",
        }


        df = df.rename(columns=rename_map)


        # Parse datetime
        df["datetime"] = pd.to_datetime(
            df["datetime"],
            errors="coerce"
        )
        df = df.sort_values("datetime")


        df = df.dropna(
            subset=["datetime"]
        )


        if df.empty:
            raise serializers.ValidationError(
                "No valid datetime values found."
            )


        # Date range
        dates = df["datetime"].sort_values()


        start = dates.iloc[0].to_pydatetime()
        end = dates.iloc[-1].to_pydatetime()

        if timezone.is_naive(start):
            start = timezone.make_aware(start)

        if timezone.is_naive(end):
            end = timezone.make_aware(end)

        validated_data["start_date"] = start
        validated_data["end_date"] = end


        # File metadata
        validated_data["file_size"] = uploaded_file.size

        validated_data["actual_name"] = (
            file_name + file_ext
        )


        # Detect timeframe
        time_diff = (
            df["datetime"]
            .sort_values()
            .diff()
            .dropna()
        )


        if time_diff.empty:
            raise serializers.ValidationError(
                "Not enough data to determine timeframe."
            )


        time_diff = time_diff.mode()[0]


        seconds = int(
            time_diff.total_seconds()
        )


        mapping = {
            60: "1M",
            300: "5M",
            900: "15M",
            1800: "30M",
            3600: "1H",
            14400: "4H",
            86400: "1D",
            604800: "1W",
        }


        validated_data["timeframe"] = mapping.get(
            seconds,
            str(time_diff)
        )


        validated_data["rows_count"] = len(df)



        # Save cleaned parquet
        buffer = BytesIO()

        df.to_parquet(
            buffer,
            index=False,
            compression="snappy"
        )

        buffer.seek(0)


        validated_data["file"] = ContentFile(
            buffer.read(),
            name=f"{file_name}.parquet"
        )


        return Dataset.objects.create(
            **validated_data
        )
