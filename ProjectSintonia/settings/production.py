from .origin_base import *

"""
Configurações específicas para o ambiente de produção.
"""

DEBUG = False

ALLOWED_HOSTS = [
    'sintonia-mental.onrender.com',
    
]

DATABASES = {
    'default': {
        'ENGINE': '',
        'NAME': BASE_DIR / '',
    }
}
 