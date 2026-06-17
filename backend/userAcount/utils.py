from django.core.mail import send_mail

def send_otp_email(user , purpose):
    send_mail(
        f"{purpose.capitalize()} - email verification OTP",
        f"Your OTP is: {user.otp}",
        None,
        [user.email],
        fail_silently=False,
    )