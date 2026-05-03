from django.db import models
from django.db.models import F


class CategoryFaq(models.Model):
    name = models.CharField( max_length=50 , verbose_name='nome da categoria')
    icon_class = models.CharField( max_length=50 ,help_text='icone do bootstrap')
    
    class Meta:
        db_table = 'category_faq'
        verbose_name = 'Categoria da pertunta'
        verbose_name_plural = 'Categorias das pertuntas'
        
    def __str__(self):
        return self.nome
    
    
class QuestionAnswer(models.Model):
    category = models.ForeignKey(CategoryFaq, on_delete=models.CASCADE , help_text='categoria da pergunta')
    question = models.CharField( max_length=200 ,verbose_name= 'pergunta')
    answer = models.TextField(verbose_name='resposta')
    list_answer = models.TextField(help_text='a cada linha e item da lista')
    useful = models.PositiveIntegerField(default=0)
    not_useful = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'question_answer'
        verbose_name = 'Pergunta e resposta'
        verbose_name_plural = 'Perguntas e respostas'
        
    
    def __str__(self):
        return self.question
    
    def sun_vote(self, type):
        """
        Recebe o tipo de voto e incrementa no banco de forma segura.
        """
        if type == 'useful':
            # O F() faz a soma direto no SQL: contagem = contagem + 1
            QuestionAnswer.objects.filter(pk=self.pk).update(useful=F('useful') + 1)
        elif type == 'not_useful':
            QuestionAnswer.objects.filter(pk=self.pk).update(not_useful=F('not_useful') + 1)
        
        # Atualiza o objeto atual na memória para refletir o novo valor
        self.refresh_from_db()
    
    @property
    def get_list(self):
        """Transforma o texto em lista para o template automaticamente"""
        if self.list_answer:
            # splitlines remove espaços extras e lida com quebras de linha (\n ou \r\n)
            return [item.strip() for item in self.list_answer.splitlines() if item.strip()]
        return []

    def __str__(self):
        return self.question