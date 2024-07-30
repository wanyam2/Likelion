from rest_framework import serializers
from .models import User, Diary, DiaryEntry
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


class DiaryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryEntry
        fields = "__all__"


class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = "__all__"

    entries = DiaryEntrySerializer(many=True, read_only=False)

    # def create(self, user):
    #     date = datetime.now().date()

    #     if Diary.objects.filter(user=user.pk, date=date).exists():
    #         raise serializers.ValidationError("다이어리 데이터가 이미 존재합니다.")

    #     diary = self.Meta.model(user=user, date=date)

    #     diary.save()

    #     return diary

    # def update(self, instance, validated_data):
    #     current_time = datetime.now().time().strftime("%H:%M:%S")

    #     contents = instance.contents if instance.contents else {}
    #     contents[current_time] = validated_data.get("contents")
    #     instance.contents = contents
    #     instance.save()

    #     return instance
