from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid
# Create your models here.

def get_user_file_folder(instance, filename):
    return "%s" %(filename)

class Audio(models.Model):
    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    name=models.CharField(default="helo",max_length=100)
    duration=models.DurationField(default=None)
    upload_file = models.FileField(upload_to=get_user_file_folder, blank=True)
    uploaded_on=models.DateTimeField(default=timezone.now())
    
class Comment(models.Model):
    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    text=models.CharField(max_length=256)
    audio=models.ForeignKey(Audio,related_name='audio',on_delete=models.CASCADE,default=None,blank=True)
    added_on=models.DurationField()

