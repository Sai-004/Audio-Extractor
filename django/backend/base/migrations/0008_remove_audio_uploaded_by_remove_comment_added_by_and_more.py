# Generated by Django 4.1.4 on 2023-01-08 23:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_audio_uploaded_on_alter_comment_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='audio',
            name='uploaded_by',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='added_by',
        ),
        migrations.AlterField(
            model_name='audio',
            name='uploaded_on',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 8, 23, 12, 44, 755736, tzinfo=datetime.timezone.utc)),
        ),
    ]
