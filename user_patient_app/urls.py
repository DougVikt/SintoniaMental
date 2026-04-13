from django.urls import path
from . import views


urlpatterns = [
    path('', views.dashboard_patient, name='dashboard_patient'),
]



