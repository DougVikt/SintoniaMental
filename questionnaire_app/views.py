from django.shortcuts import render

def questions(request):
    return render(request, 'questionnaire_app/questions.html',{
        'add_nav':False,
    })