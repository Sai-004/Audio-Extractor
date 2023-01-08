import subprocess
import tempfile
from pytube import YouTube
import os
import random
import uuid
from subprocess import Popen, PIPE

def get_duration(_file):
    cmd = 'ffprobe -i {} -show_entries format=duration -v quiet -of csv="p=0"'.format(_file)
    output = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT)
    return round(float(output))
def video_to_mp3(temp_file_path,target_file_extension=".mp3"):
    with tempfile.TemporaryFile(mode='wb') as fw:
            fw.name=fw.name+target_file_extension
            cmd='ffmpeg -i '+temp_file_path+' '+fw.name
            cmd= Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,shell=True)
            out, err = cmd.communicate()
            if cmd.returncode == 0 :
                print ("Job done.")
            else:
                print ("ERROR")
                print (out)
                print(fw.name)
    return fw
class Youtube:
    def __init__(self, url):
        self.url = url
        self.audio = YouTube(url).streams.filter(only_audio=True).first()
    def get_video_name(self):
        self.name = self.audio.default_filename
    def get_duration(self):
        self.length = self.audio.length
    def youtube_to_mp3(self,target_file_extension=".mp3"):
        file_name=str(uuid.uuid1())+target_file_extension
        out_file = video.download(output_path = 'temp',filename=file_name)
        base, ext = os.path.splitext(out_file)
        new_file = base + target_file_extension
        os.rename(out_file, new_file)
        print(video.title + " has been successfully downloaded.")
        self.file_path=new_file