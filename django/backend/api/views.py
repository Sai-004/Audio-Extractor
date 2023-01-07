from rest_framework import generics
from base.models import  Audio,Comment
from .serializers import AudioSerializer,CommentSerializer,InputSerializer
from rest_framework.response import Response
from rest_framework import status
from base.utils import convert_to_mp3,youtube_to_mp3
from django.core.files import File as DjangoFile
from pytube import *

class AudioListCreateView(generics.ListCreateAPIView):
    serializer_class=InputSerializer    
    
    def get_queryset(self):
        user = self.request.user
        return Audio.objects.filter(uploaded_by=user)
    
    def post(self, request, *args, **kwargs):
        serializer = InputSerializer(data=request.data)
        
        if serializer.is_valid():
            #TODO  Yotube 
            if 'upload_file' in request.FILES:
                _file=request.FILES['upload_file']
                temp_file_path=request.FILES['upload_file'].temporary_file_path()
                f=open(convert_to_mp3(temp_file_path).name,"rb")
            else:
                url = serializer.validated_data.get('url')
                f=open(youtube_to_mp3(url),"rb")
            audio=Audio(upload_file = DjangoFile(f,name=str(f)+".mp3"),uploaded_by=request.user)
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
