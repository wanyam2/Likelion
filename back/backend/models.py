from django.db import models
from datetime import datetime
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, username, email, password, **kwargs):
        user = self.model(username=username, email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_superuser(username, email, password, **extra_fields)


class User(AbstractBaseUser):
    username = models.CharField(max_length=12, unique=True, null=False)
    email = models.EmailField(null=False)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]


class UserSetting(models.Model):
    userid = models.ForeignKey("User", to_field="id", on_delete=models.CASCADE)
    eyemode = models.BooleanField()
    watchmode = models.BooleanField()
    alarmtime = models.TimeField(null=True)
    appname = models.CharField(max_length=256)


class Diary(models.Model):
    userid = models.ForeignKey("User", to_field="id", on_delete=models.CASCADE)
    date = models.DateField()
    contents = models.JSONField(null=True, default=dict)
