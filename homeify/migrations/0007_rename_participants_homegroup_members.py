# Generated by Django 4.1.3 on 2022-12-03 16:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homeify', '0006_alter_membership_awards'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homegroup',
            old_name='participants',
            new_name='members',
        ),
    ]