from django.urls import path
from .views import CreatePatient , CreateExperts

urlpatterns = [
    path("patient/" , CreatePatient.as_view() , name='patient'),
    path("experts/" ,CreateExperts.as_view() , name='experts'),
]