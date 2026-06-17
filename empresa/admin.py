from django.contrib import admin
from django.utils.html import mark_safe
from .models import Unidade, SobreEmpresa, Marca

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

@admin.register(SobreEmpresa)
class SobreEmpresaAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(Marca)
class MarcaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'logo_preview', 'em_destaque', 'ordem', 'is_active')
    list_editable = ('em_destaque', 'ordem', 'is_active')
    list_filter = ('em_destaque', 'is_active')
    search_fields = ('nome',)

    def logo_preview(self, obj):
        if obj.logo:
            return mark_safe(f'<img src="{obj.logo.url}" width="50" height="50" style="object-fit: contain;" />')
        return "Sem logo"
    logo_preview.short_description = 'Logo'

