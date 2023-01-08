from rest_framework import generics
# from rest_framework.decorators import api_view
from base.models import  Audio,Comment
from .serializers import AudioSerializer,CommentSerializer,InputSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from base.utils import Video,Youtube
from django.core.files import File as DjangoFile
from django.contrib.auth.models import User
import os
import uuid
from django.shortcuts import get_object_or_404
import datetime

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

class AudioListCreateView(generics.ListCreateAPIView):
    serializer_class=InputSerializer    
    def get_queryset(self):
        # user change
        user = get_object_or_404(User,username='msai')
        return Audio.objects.filter(uploaded_by=user)
    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User,username='msai')
        serializer = InputSerializer(data=request.data)
        if serializer.is_valid():
            #TODO  Yotube 
            if 'files' in request.FILES:
                _file=request.FILES['files']
                video_obj=Video(_file)
                video_obj.video_to_mp3()
                video_length=datetime.timedelta(seconds=video_obj.length)
                name=video_obj.name
                file_name=video_obj.rand
                f=open(video_obj.out_file,"rb")
            else:
                url = serializer.validated_data.get('url')
                yt_obj=Youtube(url)
                yt_obj.youtube_to_mp3()
                name= yt_obj.name
                file_name=yt_obj.rand
                video_length=datetime.timedelta(seconds=yt_obj.length) 
                f=open(yt_obj.file_path,"rb")
            audio=Audio(upload_file = DjangoFile(f,name=str(file_name)+".mp3"), uploaded_by=user, duration=video_length,name=name)
            audio.save()
            serializer = AudioSerializer(audio)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = AudioSerializer(queryset, many=True)
        return Response(serializer.data)
pass


class AudioConvertDeleteView(generics.RetrieveDestroyAPIView):
    allow_empty = False
    queryset=Audio.objects.all()
    serializer_class=AudioSerializer 
    pass
class CommentListCreateView(generics.ListCreateAPIView):
    allow_empty = False
    serializer_class=CommentSerializer 
    def get_queryset(self):
        # user change
        user = get_object_or_404(User,username='msai')
        return Comment.objects.filter(added_by= user,audio=self.kwargs['pk'])
    def list(self, request,**kwargs):
        queryset = self.get_queryset()
        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data)
    pass
class CommentDeleteView(generics.DestroyAPIView):
    allow_empty = False
    queryset=Comment.objects.all()
    serializer_class=CommentSerializer
    pass

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token['username'] = user.username
#         # ...

#         return token

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer



# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         'api/token',
#         '/api/token/refresh',
#     ]
#     return Response(routes)
