from django.urls import path
from . import views


urlpatterns = [
    path('', views.dashboard_specialist, name='dashboard_specialist'),
]



