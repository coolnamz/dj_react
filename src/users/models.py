from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class CustomUser(AbstractUser):

    email_verified   = models.BooleanField(default=False)
    last_confirm_request = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email 