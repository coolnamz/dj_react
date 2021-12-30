### Rest API
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication
from .serializers import *
from .models import Labsbx
from rest_framework import permissions

from .models import Labsbx


class LabsbxViewSet(viewsets.ModelViewSet):
    authentication_classes = (BasicAuthentication, SessionAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Labsbx.objects.all()#.order_by('-id')
    serializer_class = LabsbxSerializer

class LabsbxsampleViewSet(viewsets.ModelViewSet):
    authentication_classes = (BasicAuthentication, SessionAuthentication, TokenAuthentication)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Labsbx.objects.filter(studyenroll="yes")
    serializer_class = LabsbxsampleSerializer