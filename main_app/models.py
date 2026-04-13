from django.db import models

class TipsCards(models.Model):
    title = models.CharField(max_length=50)
    summary = models.CharField( max_length=200)
    text = models.TextField()
    image = models.ImageField( upload_to='photo_tips/')
    alt = models.CharField( max_length=50)
    
    class Meta:
        verbose_name = 'Card Dica'
        verbose_name_plural = 'Cards Dicas'

    def __str__(self):
        return self.title