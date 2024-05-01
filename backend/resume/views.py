from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework  import status
from rest_framework import authentication,permissions
from rest_framework.parsers import FileUploadParser,MultiPartParser,FormParser

# Create your views here.
from resume.models import Storage
from resume.serializers import StorageSerilaizer,SignUpSeriailzer

class SignUpView(APIView):
    def post(self,request,*args,**kwargs):
        serializer=SignUpSeriailzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class UploadResumeView(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    # parser_classes =  [MultiPartParser,FormParser,FileUploadParser]
    def get(self,request,*args,**kwargs):
        qs=Storage.objects.filter(user=request.user)
        print(list(qs))
        if list(qs)==[]:
            
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            deserializer=StorageSerilaizer(qs,many=True)
            return Response(data=deserializer.data)


    def post(self,request,*args,**kwargs):
        
        serializer=StorageSerilaizer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors,status=status.HTTP_404_NOT_FOUND)


