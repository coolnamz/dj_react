from .models import Labsbx
from rest_framework import serializers

class LabsbxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labsbx
        fields = '__all__'
        # fields = (
        #     'id', "orderdate", 'patientid', 'patientname', 'sex', 'age', 'BMI', 'professor', 'studynum',
        #     'DM', 'HTN', 'CAD', 'CVA', 'liverdz', 'lungdz', 'cancer',
        #     'Cr', 'Alb', 'prot24', 'TP_Cr', 'diagnosis', 'diagnosis_detail',
        #     'code_6m', 'code_1y', 'code_5y',
        #     'slug',
        # )

class LabsbxsampleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Labsbx
        fields = (
            'id', 'studycode', 'studyenroll', 'studynum', 'patientid', 'patientname', 'orderdate', 'slug',
            'order_6m', 'date_6m', 'day_6m', 'code_6m', 'box_name_6m', 'location_6m',
            'order_1y', 'date_1y', 'day_1y', 'code_1y', 'box_name_1y', 'location_1y',
            'order_5y', 'date_5y', 'day_5y', 'code_5y', 'box_name_5y', 'location_5y',
            'sample_fu_loss', 'sample_memo',
        )
