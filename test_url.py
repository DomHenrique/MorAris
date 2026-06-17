import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'moraris.settings')
django.setup()

from django.core.files.storage import default_storage

print("Default Storage:", default_storage)
print("URL:", default_storage.url('products/porcelanato.webp'))
