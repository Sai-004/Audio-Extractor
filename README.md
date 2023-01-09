# Audio-Extractor
FullStack Web Application for converting vidio file to audio file with ability to add comments at timestamps.<br/>
> Using this application you can convert different format video (.mp4,.mov,.mkv,.avi,.webm) files to Audio (.mp3) files.<br/>
* Application uses FFmpeg to convert the file into audio format.<br/>
> Django is used for the realtime backend database and framework.<br/>
> React is used for the frontend development of the WebApplication.

## Installation
> Frontend
* Move to the frontend folder (React) of the project and run the following commands:
```bash
cd .\React\
npm install
npm start
```

> Backend
* Move to the backend folder (django) of the project and run the following commands:
```bash
cd .\django\
virtualenv env
.\env\Scripts\activate
cd .\backend\
pip install -r .\requirements.txt
python .\manage.py makemigrations
python .\manage.py migrate
python .\manage.py createsuperuser
python .\manage.py runserver
```
* Before running the application ensure to install the [FFmpeg](https://github.com/GyanD/codexffmpeg/releases/download/2023-01-04-git-4a80db5fc2/ffmpeg-2023-01-04-git-4a80db5fc2-essentials_build.zip) software into your computer.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
