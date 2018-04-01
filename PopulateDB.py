import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MPM.settings')
#django import and setup

#from DPortal.Utility import *

import django
django.setup()

from MM.models import MPM_element
from faker import Faker

fakegen = Faker()

def save_PyElement():
    data={}
    data['MPM_name'] = fakegen.name()
    data['MPM_createddatetime'] = fakegen.date()
    data['MPM_updatedatetime'] = fakegen.date()
    data['MPM_stream'] = fakegen.text()
    data['MPM_type'] = 'Section'
    # print(str.encode(str(data)))
    pyObject = MPM_element()
    pyObject.set_data(data=data)
    pyObject.save()

def get_PyElement():
    # pyObject=py_element
    all_objs = MPM_element.objects.all()
    distinct_objs = MPM_element.objects.distinct('MPM_type').values('MPM_type')
    #print(getApplicationPath())
    print(list(distinct_objs))
    #writeFile(all_objs[4].get_data())

if __name__ == '__main__':
    print("Popula Script start")
    save_PyElement()
    #get_PyElement()
    print("Popula Script end")
