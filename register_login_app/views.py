from django.shortcuts import render


def register_login(request):
    return render(request, 'register_login_app/register_login.html')
