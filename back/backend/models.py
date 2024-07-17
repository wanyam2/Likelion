from django.db import models
from datetime import datetime
import json


# 번호, 유저 이름, 워치 모드, 눈 건강 모드ㅡ 알람 시간, 사용량 모니터링 앱 이름
class User(models.Model):
    username = models.CharField(max_length=10)
    watchmode = models.BooleanField()
    eyemode = models.BooleanField()
    alarmtime = models.TimeField(null=True)
    appname = models.CharField(max_length=256)


class Diary(models.Model):
    userid = models.ForeignKey("User", to_field="id", on_delete=models.CASCADE)
    date = models.DateField()
    contents = models.JSONField(null=True, default=dict)

    def save(self, *args, **kwargs):
        if not self.date:
            self.date = datetime.now().date()
            self.contents = {datetime.now().time().strftime("%H:%M:%S"): "WAKE UP"}
        super().save(*args, **kwargs)

    def add_content(self, content):
        self.contents[datetime.now().time().strftime("%H:%M:%S")] = content
        self.save()
