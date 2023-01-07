from rest_framework import generics
from base.models import  Audio,Comment
from .serializers import AudioSerializer,CommentSerializer,InputSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from base.utils import convert_to_mp3,youtube_to_mp3
from django.core.files import File as DjangoFile
from pytube import *
import random
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.shortcuts import get_object_or_404
class AudioListCreateView(generics.ListCreateAPIView):
    serializer_class=InputSerializer    
    
    def get_queryset(self):
        # user 
        user = get_object_or_404(User,username='radha')
        return Audio.objects.filter(uploaded_by=user)
    def post(self, request, *args, **kwargs):
        user = get_object_or_404(User,username='radha')
        serializer = InputSerializer(data=request.data)
        
        if serializer.is_valid():
            #TODO  Yotube 
            if 'files' in request.FILES:
                _file=request.FILES['files']
                path = default_storage.save(str(str(random.randint(1000,2000))+".mp4"), ContentFile(_file.read()))
                tmp_file = os.path.join(settings.MEDIA_ROOT, path)
                print(tmp_file)
                f=open(convert_to_mp3(tmp_file).name,"rb")
            else:
                url = serializer.validated_data.get('url')
                f=open(youtube_to_mp3(url),"rb")
            audio=Audio(upload_file = DjangoFile(f,name=str(f)+".mp3"),uploaded_by=user)
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
