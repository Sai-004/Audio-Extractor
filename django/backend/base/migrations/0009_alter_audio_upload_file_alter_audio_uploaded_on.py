# Generated by Django 4.1.4 on 2023-01-09 06:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_remove_audio_uploaded_by_remove_comment_added_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audio',
            name='upload_file',
            field=models.FileField(blank=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='audio',
            name='uploaded_on',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 9, 6, 45, 12, 16856, tzinfo=datetime.timezone.utc)),
        ),
    ]
