from django.shortcuts import render
from .models import TipsCards
import random

# Create your views here.
def home(request):
    tips_card = TipsCards.objects.all()
    # Limita os cards para 2 , manda aleatorio
    if tips_card.count() >= 2:
        tips = random.sample(list(tips_card),2)
    else :
        tips = None
    # Auxilia na estrela das avaliações 
    stars= range(1,6)
    
    return render(request, 'main_app/home.html',{
        'tips':tips,
        'stars':stars,
    })

def faq(request):
    return render(request, 'main_app/faq.html')