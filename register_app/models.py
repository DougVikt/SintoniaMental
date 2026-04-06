from django.db import models
from django.contrib.auth.models import User


class CreateUsers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fone = models.CharField( max_length=20)
    date_birth = models.DateField()
    photo_perfil = models.ImageField(upload_to="photo_profile/%Y/%m/%d/" , blank=True , null=True)
    create_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        abstract = True
        
        
    def __str__(self):
        return self.user.user_name
        

class Specialties(models.Model):
    name = models.CharField( max_length=50)
    initials = models.CharField( max_length=6)
    description = models.TextField()
    
    class Meta:
        verbose_name = 'Especialidade'
        verbose_name_plural = 'Especialidades'
        
    
    def __str__(self):
        return self.name

class Patients(CreateUsers):
    pass 

    class Meta:
        verbose_name = 'Pacientes'
        verbose_name_plural="Pacientes"
        ordering = ["-create_date"]

class Experts(CreateUsers):

        num_registration = models.CharField( max_length=50)
        specialties = models.ManyToManyField(Specialties, related_name='experts')
        verification = models.BooleanField( default=False)
        
        class Meta:
            verbose_name = 'Especialista'
            verbose_name_plural = 'Especialistas'
            ordering = ["-create_date"]
        