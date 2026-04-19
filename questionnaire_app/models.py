from django.db import models

# Create your models here.
class QuestionsTest(models.Model):
    
    class TypeCategory(models.TextChoices):
        UNCATEGORIZED = 'Sem categoria' , 'Uncategorized'
        INATTENTION = "Desatenção" , 'Inattention'
        HYPERACTIVITY = 'Hiperatividade','Hyperactivity'
        IMPULSIVITY = 'Impulsividade', 'Impulsivity'
        SOCIAL_INTERACTION = 'Interação social' ,'Social interaction'
        BEHAVIOR ='Comportamento' ,'Behavior'
        
    class TypeUser(models.TextChoices):
        FOR_YOU = 'Para mim', 'for you'
        FOR_PARENTS = 'Para parente' ,'for parents'
        FOR_STUDENTS = 'Para aluno' , 'for students'
        
    category = models.CharField( max_length=50 , choices=TypeCategory.choices, default=TypeCategory.UNCATEGORIZED)
    question = models.CharField( max_length=200)
    type_user = models.CharField(max_length=50 , choices=TypeUser.choices)
    
    class Meta:
        db_table = 'questions_test'
        verbose_name = 'Questão do teste'
        verbose_name_plural = 'Questões do teste'
        
    def __str__(self):
        return f"Qst{self.id}:{self.question[:20]}..."