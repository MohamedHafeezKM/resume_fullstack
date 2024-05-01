from django.urls import path,include

from rest_framework.authtoken.views import ObtainAuthToken

from resume import views

urlpatterns = [
    path('register/',views.SignUpView.as_view()),
    path('generate-token/',ObtainAuthToken.as_view()),
    path('resume/',views.UploadResumeView.as_view()),
    
]
