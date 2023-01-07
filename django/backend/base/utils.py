import subprocess
import tempfile
from pytube import YouTube
import os
import random

def convert_to_mp3(temp_file_path,target_file_extension=".mp3"):
    with tempfile.TemporaryFile(mode='wb') as fw:
            fw.name=fw.name+target_file_extension
            subprocess.call('ffmpeg -i '+temp_file_path+' '+fw.name)
    return fw

def youtube_to_mp3(url,target_file_extension=".mp3"):
    video = YouTube(url).streams.filter(only_audio=True).first()
    file_name=str(random.randint(1000,2000))
    out_file = video.download(output_path = 'temp',filename=file_name)
    base, ext = os.path.splitext(out_file)
    new_file = base + '.mp3'
    os.rename(out_file, new_file)
    print(video.title + " has been successfully downloaded.")
    return new_file