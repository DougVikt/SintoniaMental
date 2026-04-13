from django.shortcuts import render

def waiting_room(request):
    return render(request, 'video_consult_app/waiting_room.html')