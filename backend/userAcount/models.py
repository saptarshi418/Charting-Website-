import random
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser , BaseUserManager, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self , email , password = None , **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self , email , password = None , **extra_fields):
        extra_fields['is_staff'] = True
        extra_fields['is_superuser'] = True
        return self.create_user(email, password, **extra_fields)
    
class User(AbstractBaseUser , PermissionsMixin):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_no = PhoneNumberField(unique=True , null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    otp_purpose = models.CharField(max_length=20, blank=True, null=True)
    membership_plan = models.ForeignKey("memberShip.MembershipPlan", on_delete=models.PROTECT , null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name','phone_no' ]

    objects = UserManager()
    def __str__(self):
        return self.email
    
    def generate_otp(self , otp_purpose):
        otp = f"{random.randint(100000, 999999)}"
        self.otp = otp
        self.otp_created_at = timezone.now()
        self.otp_purpose = otp_purpose
        self.save(update_fields=["otp", "otp_created_at" , "otp_purpose"])
        return self.otp


class Dataset(models.Model):

    TIMEFRAME_CHOICES = [
        ("1M", "1 min"),
        ("5M", "5 min"),
        ("15M", "15 min"),
        ("30M", "30 min"),
        ("1H", "1 hour"),
        ("4H", "4 hour"),
        ("1D", "1 day"),
        ("1W", "1 week"),
        ("1MO", "1 month"),

    ]
    DATA_TYPE_CHOICES = [
        ("indices", "Indices"),
        ("stock", "Stock"),
        ("forex", "Forex"),
        ("crypto", "Crypto"),
        ("commodity", "Commodity"),


    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    actual_name = models.CharField(max_length=255)
    file = models.FileField(upload_to="datasets/")
    file_size = models.PositiveBigIntegerField()
    rows_count = models.PositiveIntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    timeframe = models.CharField(max_length=50, choices=TIMEFRAME_CHOICES , default="1M")
    data_type = models.CharField(max_length=50 , choices=DATA_TYPE_CHOICES, default="indices")

    def __str__(self):
        return self.name
    
class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("COMPLETED", "Completed"),
        ("FAILED", "Failed"),
    ]
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    upi_id = models.CharField(max_length=255)
    transaction_id = models.CharField(max_length=255 , unique=True)
    valid_upto = models.DateTimeField()
    paid_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default="PENDING")
    membershipPlan = models.ForeignKey('memberShip.MembershipPlan', on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return f"Payment {self.transaction_id} by {self.user.email}"