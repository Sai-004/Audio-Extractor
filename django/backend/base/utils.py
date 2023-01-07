import subprocess
import tempfile
from pytube import YouTube
import os
import random
import uuid
from subprocess import Popen, PIPE
def get_duration(_file):
    """Get the duration of a video using ffprobe."""
    cmd = 'ffprobe -i {} -show_entries format=duration -v quiet -of csv="p=0"'.format(_file)
    output = subprocess.check_output(
        cmd,
        shell=True, # Let this run in the shell
        stderr=subprocess.STDOUT
    )
    
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

def youtube_to_mp3(url,target_file_extension=".mp3"):
    video = YouTube(url).streams.filter(only_audio=True).first()
    file_name=str(uuid.uuid1())+target_file_extension
    out_file = video.download(output_path = 'temp',filename=file_name)
    base, ext = os.path.splitext(out_file)
    new_file = base + '.mp3'
    os.rename(out_file, new_file)
    print(video.title + " has been successfully downloaded.")
    return new_file