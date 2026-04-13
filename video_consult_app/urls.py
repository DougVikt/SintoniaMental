from django.urls import path
from . import views


urlpatterns = [
    path('', views.waiting_room, name='waiting_room'),
]



