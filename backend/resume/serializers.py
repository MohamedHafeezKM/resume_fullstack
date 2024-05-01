from rest_framework import serializers


from django.contrib.auth.models import User

from resume.models import Storage


class SignUpSeriailzer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
        
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class StorageSerilaizer(serializers.ModelSerializer):
    # resume = serializers.FileField(use_url=False)
    class Meta:
        model=Storage
        fields=['resume']

    
