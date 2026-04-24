from django.db import models
from django.conf import settings


class BaseUser(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fone = models.CharField( max_length=20)
    date_birth = models.DateField()
    photo_perfil = models.ImageField(upload_to="photo_profile/%Y/%m/%d/" , blank=True , null=True)
    create_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True
        
        
    def __str__(self):
        return self.user.username
        

class Specialtie(models.Model):
    name = models.CharField( max_length=50)
    initials = models.CharField( max_length=6)
    description = models.TextField()
    
    class Meta:
        db_table = 'specialtie'
        verbose_name = 'Especialidade'
        verbose_name_plural = 'Especialidades'
        
    def __str__(self):
        return self.name
        
 
class Patient(BaseUser):
    pass 

    class Meta:
        db_table = 'user_patient'
        verbose_name = 'Pacientes'
        verbose_name_plural="Pacientes"
        ordering = ["-create_date"]
        
   
class Expert(BaseUser):

        num_registration = models.CharField( max_length=50)
        specialties = models.ManyToManyField(Specialtie, related_name='expert')
        verification = models.BooleanField( default=False)
        
        class Meta:
            db_table = 'user_expert'
            verbose_name = 'Especialista'
            verbose_name_plural = 'Especialistas'
            ordering = ["-create_date"]
        