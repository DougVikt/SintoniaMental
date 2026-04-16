"""
URL configuration for ProjectSintonia project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

# outros imports
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    # urls das apps
    path('', include('main_app.urls')),
    path("faq/", include("faq_app.urls")),
    path("questions/", include("questionnaire_app.urls")),
    path("register_login/", include("register_login_app.urls")),
    path("specialist/", include("user_specialist_app.urls")),
    path("patient/", include("user_patient_app.urls")),
    path("waiting_room/", include("video_consult_app.urls")),
    # Redireciona o favicon para o local correto
    path('favicon.ico', RedirectView.as_view(url='/static/img/favicon_sm.ico')),
    
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
