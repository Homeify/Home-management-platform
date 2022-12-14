from django.db import models
from .models import CustomUser, HomeGroup, Membership, Task, Comment
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
            'fields': ('first_name', 'last_name', 'email', 'image_url')
        })
    )

    # view/edit user
    fieldsets = (
        (None, {
            'fields': ('username', 'is_staff')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'image_url')
        })
    )

    # list view
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(HomeGroup)
admin.site.register(Membership)
admin.site.register(Task)
admin.site.register(Comment)
