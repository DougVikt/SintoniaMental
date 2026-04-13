from django import forms 
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Specialties


class RegisterForm(UserCreationForm):
    fone = forms.CharField( max_length=20)
    date_birth = forms.DateField()
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name'
        ]


class PatientForm(RegisterForm):
    pass


class ExpertsForm(RegisterForm):
    num_registration = forms.CharField( max_length=50)
    specialties = forms.ModelMultipleChoiceField(queryset=Specialties.objects.all)