# Generated by Django 4.1.3 on 2022-12-03 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homeify', '0004_homegroup_membership_homegroup_participants'),
    ]

    operations = [
        migrations.AddField(
            model_name='membership',
            name='owner',
            field=models.BooleanField(default=False),
        ),
    ]
