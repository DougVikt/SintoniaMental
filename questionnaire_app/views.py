from django.shortcuts import render

def questions(request):
    return render(request, 'questionnaire_app/questions.html')