# Audio-Extractor

Audio-Extractor is a full-stack web application that allows users to convert video files to audio files while providing the ability to add comments at specific timestamps. The application is built using Django for the backend and React for the frontend. It utilizes FFmpeg for the conversion process.

## Installation

### Frontend

1. Navigate to the frontend folder (React) of the project.
   ```bash
   cd ./React/
   ```

2. Install the required dependencies by running the following command:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

### Backend

1. Navigate to the backend folder (Django) of the project.
   ```bash
   cd ./django/
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   virtualenv env
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     .\env\Scripts\activate
     ```

   - On macOS and Linux:
       ```bash
       source env/bin/activate
       ```

4. Navigate to the backend subfolder:
   ```bash
   cd ./backend/
   ```

5. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

6. Apply the database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. Create a superuser account:
   ```bash
   python manage.py createsuperuser
   ```

8. Start the backend server:
   ```bash
   python manage.py runserver
   ```

Note: Before running the application, make sure to install [FFmpeg](https://github.com/GyanD/codexffmpeg/releases/download/2023-01-04-git-4a80db5fc2/ffmpeg-2023-01-04-git-4a80db5fc2-essentials_build.zip) and set the executable path in your computer's environment variables.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code.
