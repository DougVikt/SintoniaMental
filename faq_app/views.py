from django.shortcuts import render
from django.db.models import Count
from .models import CategoryFaq ,QuestionAnswer

def faq(request):
    total_quest = QuestionAnswer.objects.count()
    faq = CategoryFaq.objects.prefetch_related('questionanswer').annotate(
        number_quest = Count('questionanswer')
    )
    return render(request, 'faq_app/faq.html', {
        'faq':faq,
        'total_quest':total_quest
    })
