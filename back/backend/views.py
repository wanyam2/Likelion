from django.shortcuts import render
from django.http import HttpResponse


def main(request):
    message = request.GET.get('키값')
    print(message) # 메세지 확인

    return HttpResponse('응닶 값')
