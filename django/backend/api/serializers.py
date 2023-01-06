from rest_framework import serializers
from base.models import Audio,Comment
from rest_framework import serializers
from django.core.validators import FileExtensionValidator
from pytube.cipher import get_initial_function_name
from pytube.exceptions import ExtractError, RegexMatchError
from pytube.extract import video_id
from base import resources

def validate_youtube_url(url):   
    try:
        video_id(url)
    except RegexMatchError as err:
        raise serializers.ValidationError("Invalid Url")  
            
class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        model=Audio
        fields='__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields='__all__'
        
class InputSerializer(serializers.Serializer):
       files=serializers.FileField(required=False, max_length=None, allow_empty_file=True,validators=[FileExtensionValidator(allowed_extensions=resources.CONST_ALLOWED_EXTENSIONS)])
       url = serializers.CharField(required=False,max_length=None, validators = [validate_youtube_url])
       def validate(self, data):
        if not any(data):   
            raise serializers.ValidationError("There is no data here at a time")       
        else:
            if(len(data)==2):
                raise serializers.ValidationError("You can not upload 2 files at a time")
            else: 
                 return data
        
       

