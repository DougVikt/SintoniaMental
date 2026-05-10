from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class AdminTestimonial(admin.ModelAdmin):
    list_display = ["id" , "patient" , "expert"]
