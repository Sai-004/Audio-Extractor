# Generated by Django 4.0.6 on 2022-12-31 16:21

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='audio',
            name='is_converted',
        ),
        migrations.AlterField(
            model_name='audio',
            name='uploaded_on',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 31, 16, 21, 35, 853461, tzinfo=utc)),
        ),
    ]