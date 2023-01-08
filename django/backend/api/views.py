from rest_framework import generics
from base.models import  Audio,Comment
from .serializers import AudioSerializer,CommentSerializer,InputSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from base.utils import *
from django.core.files import File as DjangoFile
from django.contrib.auth.models import User
import os
import uuid
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.shortcuts import get_object_or_404
import datetime

class AudioListCreateView(generics.ListCreateAPIView):
    serializer_class=InputSerializer    
    def get_queryset(self):
        # user change
        user = get_object_or_404(User,username='radha')
        return Audio.objects.filter(uploaded_by=user)
    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User,username='radha')
        serializer = InputSerializer(data=request.data)
        if serializer.is_valid():
            #TODO  Yotube 
            if 'files' in request.FILES:
                _file=request.FILES['files']
                file_name=_file.name
                _file.name= "_".join( _file.name.split())
                path = default_storage.save(_file.name, ContentFile(_file.read()))
                tmp_file = os.path.join(settings.MEDIA_ROOT, path)
                f=open(video_to_mp3(tmp_file).name,"rb")
                video_length=get_duration(tmp_file)
                
                video_length=datetime.timedelta(seconds=video_length)
            else:
                url = serializer.validated_data.get('url')
                yt_obj=Youtube(url)
                yt_obj.get_video_name()
                yt_obj.get_duration()
                yt_obj.youtube_to_mp3()
                print(yt_obj.length)
                print(yt_obj.name)
                f=open(yt_obj.file_path,"rb")
            audio=Audio(upload_file = DjangoFile(f,name=str(file_name)+".mp3"), uploaded_by=user, duration=video_length,name=file_name)
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
    queryset=Audio.objects.all()
    serializer_class=AudioSerializer 
    pass
class CommentListCreateView(generics.ListCreateAPIView):
    pass
class CommentDeleteView(generics.DestroyAPIView):
    pass
