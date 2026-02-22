from .origin_base import *

"""
Configurações específicas para o ambiente de desenvolvimento.
"""

DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
 