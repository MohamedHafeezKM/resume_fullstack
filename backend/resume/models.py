from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Storage(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    resume=models.FileField(null=True,upload_to='resume_folder')
