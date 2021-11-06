# Generated by Django 3.2.4 on 2021-11-06 19:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('airblue', '0024_useritemchallenge'),
    ]

    operations = [
        migrations.AddField(
            model_name='useritemchallenge',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User'),
        ),
        migrations.AlterField(
            model_name='useritemchallenge',
            name='item',
            field=models.ManyToManyField(blank=True, null=True, to='airblue.Items'),
        ),
    ]
