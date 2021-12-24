from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'last_login', 'date_joined', 'is_staff')


class CustumRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=10, min_length=2, required=True)
    # is_active = serializers.BooleanField()

    def validate_first_name(self, first_name):
        '''
        first_name validation
        '''
        return first_name

    # def validate_is_active(self, is_active):
    #     return(is_active)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            # 'is_active': self.validated_data.get('is_active', ''),
        }

