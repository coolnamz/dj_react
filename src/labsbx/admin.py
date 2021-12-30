from django.contrib import admin
# from reversion.admin import VersionAdmin
# from reversion_compare.admin import CompareVersionAdmin
from .models import *

# admin.site.register(Labs)

# @admin.register(Labs)
# class LabsAdmin(VersionAdmin):
#     pass

# class LabsbxAdmin(CompareVersionAdmin):
#     pass


admin.site.register(Labsbx)