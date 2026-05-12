from django.contrib import admin
from .models import Testimonial, Consult


class AdminBase(admin.ModelAdmin):
    list_display = ["id" , "patient" , "expert"] 
    raw_id_fields = ['patient' , 'expert']
    
    
@admin.register(Testimonial)
class AdminTestimonial(AdminBase):
    pass
@admin.register(Consult)
class AdminConsult(AdminBase):
    pass 