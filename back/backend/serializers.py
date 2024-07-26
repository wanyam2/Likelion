from rest_framework import serializers
from .models import Diary, User
from datetime import datetime


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "password", "username")

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            username=validated_data["username"],
        )

        return user


class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = "__all__"

    def create(self, validated_data):
        userid = validated_data.get("userid")
        date = datetime.now().date()

        if Diary.objects.filter(userid=userid, date=date).exists():
            raise serializers.ValidationError(
                "Diary entry for this user and date already exists."
            )

        diary = self.Meta.model(
            userid=userid,
            date=date,
            contents={datetime.now().time().strftime("%H:%M:%S"): "WAKE UP"},
        )
        diary.save()

        return diary

    def update(self, instance, validated_data):
        current_time = datetime.now().time().strftime("%H:%M:%S")

        contents = instance.contents if instance.contents else {}
        contents[current_time] = validated_data.get("contents")
        instance.contents = contents
        instance.save()

        return instance
