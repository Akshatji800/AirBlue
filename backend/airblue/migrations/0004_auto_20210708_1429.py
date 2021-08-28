# Generated by Django 3.2.4 on 2021-07-08 11:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('airblue', '0003_auto_20210701_1327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='url',
            field=models.URLField(max_length=300, verbose_name='Link to image'),
        ),
    ]