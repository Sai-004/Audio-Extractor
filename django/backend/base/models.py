from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid
import random
# Create your models here.


def get_user_file_folder(instance, filename):
    extension = "." + filename.split('.')[-1]
    filename = str(random.randint(10,99)) + str(random.randint(10,99)) + str(random.randint(10,99)) + str(random.randint(10,99))  + extension
    return "%s\%s" %(instance.uploaded_by.id,filename)

class Audio(models.Model):
    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    upload_file = models.FileField(upload_to=get_user_file_folder, blank=True)
    uploaded_by=models.ForeignKey(User,related_name='uploaded_by',on_delete=models.CASCADE,default=None,blank=True)
    uploaded_on=models.DateTimeField(default=timezone.now())
    
    
class Comment(models.Model):
    text=models.CharField(max_length=256)
    audio=models.ForeignKey(Audio,related_name='audio',on_delete=models.CASCADE,default=None,blank=True)
    added_on=models.DurationField()
    added_by=models.ForeignKey(User,related_name='added_by',on_delete=models.CASCADE,default=None,blank=True)

