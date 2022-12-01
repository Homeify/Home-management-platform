from django.db import models
from .models import CustomUser
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# registers modules to admin in server (optional)

class CustomUserAdmin(UserAdmin):
    # add user
    add_fieldsets = (
        (None, {
            'fields': ('username', 'password1', 'password2')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'rewards', 'image_url')
        })
        )

    # view/edit user
    fieldsets = (
        (None, {
            'fields': ('username', 'password1', 'password2')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'rewards', 'image_url')
        })
        )

    # list view
    list_display = (
        'username', 'email', 'first_name', 'last_name', 'is_staff',
        'rewards'
        )
admin.site.register(CustomUser, CustomUserAdmin)