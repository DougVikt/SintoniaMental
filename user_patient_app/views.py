from django.shortcuts import render

def dashboard_patient(request):
    return render(request, 'user_patient_app/dashboard_patient.html')
