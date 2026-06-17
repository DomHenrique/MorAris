from django.contrib import admin
from .models import Unidade

@admin.register(Unidade)
class UnidadeAdmin(admin.ModelAdmin):
    list_display = ('nome', 'tipo', 'cidade', 'estado', 'is_active')
    list_filter = ('is_active', 'tipo', 'estado')
    search_fields = ('nome', 'cidade', 'endereco')
    
    fieldsets = (
        ('Identificação', {
            'fields': ('nome', 'tipo', 'is_active', 'ordem')
        }),
        ('Textos da UI', {
            'fields': ('title_eyebrow', 'title_main', 'card_title')
        }),
        ('Localização', {
            'fields': ('endereco', 'cidade', 'estado', 'cep')
        }),
        ('Contato', {
            'fields': ('email', 'telefone', 'whatsapp')
        }),
        ('Funcionamento', {
            'fields': ('business_hours',)
        }),
        ('Mapas', {
            'fields': ('mapa_url', 'rota_url')
        }),
    )
