from django.db import models

# Create your models here.


class MPM_element(models.Model):
    element_name = models.CharField(max_length=50, unique=True)
    element_createddatetime = models.DateTimeField()
    element_updatedatetime = models.DateTimeField()
    element_stream = models.TextField(blank=True, null=True)
    element_type = models.CharField(max_length=50)
    element_mode = models.CharField(max_length=50)
    element_displayname = models.CharField(max_length=50)

    def set_data(self, data):
        self.element_name = data['element_name']
        self.element_createddatetime = data['element_createddatetime']
        self.element_updatedatetime = data['element_updatedatetime']
        self.element_stream = data['element_stream']
        self.element_type = data['element_type']
        self.element_displayname = data['element_displayname']
        self.element_mode = data['element_mode']
        # print(json.dumps(data))
        #self.py_stream = base64.b64encode(json.dumps(data).encode('utf-8'))

    def get_data(self):
        #return json.loads(base64.b64decode(self.py_stream).decode('utf-8'))
        return self.element_stream