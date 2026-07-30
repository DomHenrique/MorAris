from django.contrib import admin
from django.utils.html import format_html
from .models import Campaign, Banner, Testimonial, Category, Product, ProductImage

class AdminMediaMixin:
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }

class ProductImageInline(AdminMediaMixin, admin.TabularInline):
    model = ProductImage
    extra = 1
    readonly_fields = ('image_thumbnail',)
    fields = ('image_thumbnail', 'image', 'mobile_image', 'order')

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" class="admin-inline-thumb" alt="Thumbnail" />', obj.image.url)
        return format_html('<span style="color: #999; font-size: 0.85rem;">Sem imagem</span>')
    image_thumbnail.short_description = "Pré-visualização"

@admin.register(Product)
class ProductAdmin(AdminMediaMixin, admin.ModelAdmin):
    list_display = ('image_preview', 'name', 'category', 'is_featured', 'is_promotion', 'active')
    list_display_links = ('name', 'image_preview')
    list_filter = ('active', 'is_featured', 'is_promotion', 'category')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" class="admin-inline-thumb" style="width: 54px; height: 54px;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Capa"

@admin.register(Category)
class CategoryAdmin(AdminMediaMixin, admin.ModelAdmin):
    list_display = ('name', 'order')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(Campaign)
class CampaignAdmin(AdminMediaMixin, admin.ModelAdmin):
    list_display = ('name', 'active', 'created_at')
    list_filter = ('active',)
    search_fields = ('name',)
    filter_horizontal = ('products',)

@admin.register(Banner)
class BannerAdmin(AdminMediaMixin, admin.ModelAdmin):
    list_display = ('title', 'campaign', 'desktop_preview', 'mobile_preview', 'active', 'order')
    list_filter = ('active', 'campaign')
    search_fields = ('title', 'subtitle')

    def desktop_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" class="admin-thumb-hover" title="Banner Desktop" />', obj.image.url)
        return "-"
    desktop_preview.short_description = "Banner Desktop"

    def mobile_preview(self, obj):
        if obj.mobile_image:
            return format_html('<img src="{}" class="admin-thumb-hover" title="Banner Mobile" style="height: 50px; width: 40px; object-fit: cover;" />', obj.mobile_image.url)
        return format_html('<span style="color: #bbb; font-size: 0.8rem;">Sem versão mobile</span>')
    mobile_preview.short_description = "Banner Mobile"

@admin.register(Testimonial)
class TestimonialAdmin(AdminMediaMixin, admin.ModelAdmin):
    list_display = ('name', 'city', 'rating', 'active')
    list_filter = ('active', 'rating')
    search_fields = ('name', 'city', 'text')
