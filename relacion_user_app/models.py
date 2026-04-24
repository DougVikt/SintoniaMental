from django.db import models
from django.core.validators import MinValueValidator , MaxValueValidator

# Create your models here.
class Testimonial(models.Model):
    patient = models.ForeignKey("register_login_app.Patient" ,on_delete=models.CASCADE , related_name="testimonials")
    expert = models.ForeignKey("register_login_app.Experts", on_delete=models.CASCADE , related_name="testimonials")
    note = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(default="Não quero comentar" , blank=True)
    
    class Meta:
        db_table = 'testimonials'
        verbose_name = 'Depoimento'
        verbose_name_plural = 'Depoimentos'
    
    def __str__(self):
        return f'{self.expert.user.username}: {self.note}'
    