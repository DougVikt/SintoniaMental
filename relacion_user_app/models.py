from django.db import models
from django.core.validators import MinValueValidator , MaxValueValidator


class FkUser(models.Model):
    patient = models.ForeignKey("register_login_app.Patient" ,on_delete=models.CASCADE , related_name="%(class)s")
    expert = models.ForeignKey("register_login_app.Expert", on_delete=models.CASCADE, related_name="%(class)s" )
    
    class Meta:
        abstract = True
        
        
class Consult(FkUser):
    class Status(models.TextChoices):
        PENDING = 'PENDING' , 'PENDENTE'
        HELD = 'HELD' , 'REALIZADA'
        CANCELED = 'HELD' , 'CANCELADA'
    
    date = models.DateTimeField()
    link = models.URLField( max_length=200)
    status = models.CharField(max_length=50 , choices=Status.choices , default=Status.PENDING)
    
    class Meta:
        db_table = 'consult'
        verbose_name = 'Consulta'
        verbose_name_plural = 'Consultas'
    
    def __str__(self):
        return f'{self.date.date()}: {self.get_status_display()}'        
        
        
class Testimonial(FkUser):
    consult = models.OneToOneField(Consult, on_delete=models.CASCADE)
    note = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(default="Não quero comentar" , blank=True)
    
    class Meta:
        db_table = 'testimonials'
        verbose_name = 'Depoimento'
        verbose_name_plural = 'Depoimentos'
    
    def __str__(self):
        return f'{self.expert.user.username}: {self.note}'
    
    
    

    