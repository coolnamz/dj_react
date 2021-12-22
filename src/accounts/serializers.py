from django.conf import settings
from dj_rest_auth.serializers import PasswordResetSerializer
from .forms import CustomPasswordResetForm

class CustomPasswordResetSerializer(PasswordResetSerializer):

    @property
    def password_reset_form_class(self):
        return CustomPasswordResetForm

