# Generated by Django 4.1.3 on 2022-12-08 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeify', '0007_rename_participants_homegroup_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='image_url',
            field=models.URLField(null=True),
        ),
    ]
