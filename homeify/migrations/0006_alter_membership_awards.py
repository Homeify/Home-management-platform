# Generated by Django 4.1.3 on 2022-12-03 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeify', '0005_membership_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='membership',
            name='awards',
            field=models.PositiveIntegerField(default=0),
        ),
    ]