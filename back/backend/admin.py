from django.contrib import admin
from .models import User, UserSetting, Diary

admin.site.register(User)
admin.site.register(UserSetting)
admin.site.register(Diary)