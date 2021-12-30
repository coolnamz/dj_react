import random
import re
from django.db.models import Max


def slug_generator(instance, new_slug=None):
    Klass = instance.__class__


    if new_slug is not None:
        slug = new_slug
    else:
        slug = random.randint(1, 99999999)
    qs_exists = Klass.objects.filter(slug = slug).exists()
    if qs_exists:
        new_slug = random.randint(1, 99999999)
        return slug_generator(instance, new_slug)
    return slug

def initial_generator(instance):
    name = instance.patientname
    if name[0] in ["강", "고", "기", "김"]: name = "K" + name[1:]
    if name[0] in ["박"]:        name = "P" + name[1:]
    if name[0] in ["이", "임"]:   name = "L" + name[1:]
    a1 = re.compile('[가-낗]');    name = a1.sub('G', name)
    a2 = re.compile('[나-닣]');    name = a2.sub('N', name)
    a3 = re.compile('[다-띻]');    name = a3.sub('D', name)
    a4 = re.compile('[라-맇]');    name = a4.sub('R', name)
    a5 = re.compile('[마-밓]');    name = a5.sub('M', name)
    a6 = re.compile('[바-삫]');    name = a6.sub('B', name)
    a7 = re.compile('[사-앃]');    name = a7.sub('S', name)
    a81 = re.compile('[아-앻]');    name = a81.sub('A', name)
    a82 = re.compile('[야-얳]');    name = a82.sub('Y', name)
    a83 = re.compile('[어-엫]');    name = a83.sub('E', name)
    a84 = re.compile('[여-옣]');    name = a84.sub('Y', name)
    a85 = re.compile('[오-옿]');    name = a85.sub('O', name)
    a86 = re.compile('[와-왷]');    name = a86.sub('W', name)
    a86 = re.compile('[외-욓]');    name = a86.sub('O', name)
    a87 = re.compile('[요-욯]');    name = a87.sub('Y', name)
    a88 = re.compile('[우-웋]');    name = a88.sub('U', name)
    a89 = re.compile('[워-윟]');    name = a89.sub('W', name)
    a810 = re.compile('[유-윻]');    name = a810.sub('Y', name)
    a811 = re.compile('[으-읗]');    name = a811.sub('E', name)
    a812 = re.compile('[의-읳]');    name = a812.sub('U', name)
    a813 = re.compile('[이-잏]');    name = a813.sub('I', name)
    a9 = re.compile('[자-찧]');    name = a9.sub('J', name)
    a10 = re.compile('[차-칳]');    name = a10.sub('C', name)
    a11 = re.compile('[카-킿]');    name = a11.sub('K', name)
    a12 = re.compile('[타-팋]');    name = a12.sub('T', name)
    a13 = re.compile('[파-핗]');    name = a13.sub('P', name)
    a14 = re.compile('[하-힣]');    name = a14.sub('H', name)
    return name


def idhospital_generator(instance, new_idhospital=None):
    Klass = instance.__class__

    if new_idhospital is not None:
        idhospital = new_idhospital
    else:
        idhospital = instance.hospital + str(instance.patientid)
    qs_exists = Klass.objects.filter(idhospital = idhospital).exists()
    if qs_exists:
        new_idhospital = instance.hospital + str(instance.patientid)
        return slug_generator(instance, new_idhospital)
    return idhospital

class FieldSet(object):
    def __init__(self, form, fields, legend='', cls=None):
        self.form = form
        self.legend = legend
        self.fields = fields
        self.cls = cls

    def __iter__(self):
        for name in self.fields:
            yield self.form[name]


def studynum_generator(model, new_studynum=None):
    if new_studynum is not None and new_studynum != -1 and new_studynum != 0:
        studynum = new_studynum

    else:
        max_value = model.objects.all().aggregate(Max('studynum'))['studynum__max']
        if max_value:
            studynum = int(max_value) + 1
        else:
            studynum = 1
    return studynum

def id_generator(instance, new_id=None):
    Klass = instance.__class__
    if new_id is not None:
        id = new_id
    else:
        max_value = Klass.objects.all().aggregate(Max('id'))['id__max']
        if max_value:
            id = int(max_value) + 1
        else:
            id = 1
    return id
