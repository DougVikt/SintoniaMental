from django.shortcuts import render , get_object_or_404
from django.db.models import Count
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json
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



@require_POST
def votar(request, pk):
    data     = json.loads(request.body)
    useful     = data.get('useful')  # True ou False
    not_useful = data.get('not_useful')
    question = get_object_or_404(QuestionAnswer, pk=pk)

    if useful:
        question.useful += 1
    if not_useful:
        question.not_useful += 1
    question.save()

    return JsonResponse({'ok': True})