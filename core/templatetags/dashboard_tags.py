from django import template
from core.models import Product, Category, Banner, Testimonial

register = template.Library()

@register.simple_tag
def get_dashboard_stats():
    return {
        'total_produtos': Product.objects.count(),
        'total_categorias': Category.objects.count(),
        'total_banners': Banner.objects.count(),
        'total_depoimentos': Testimonial.objects.count(),
    }
