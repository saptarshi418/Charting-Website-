from django.db import models

class Membership(models.Model):
    name = models.CharField(max_length=100)
    duration_days = models.PositiveIntegerField()
    features = models.TextField()

    def __str__(self):
        return self.name
    

class MembershipPlan(models.Model):
    membership = models.ForeignKey(Membership, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    storage_allowed_mb = models.PositiveIntegerField()
    file_count_allowed = models.PositiveIntegerField()
    valid_from = models.DateTimeField()
    valid_until = models.DateTimeField()

    def __str__(self):
        return f"{self.membership.name} - ${self.price}"