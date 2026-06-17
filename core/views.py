from django.views.generic import TemplateView, ListView, DetailView
from .models import Campaign, Banner, Testimonial, Category, Product
from empresa.models import Unidade, SobreEmpresa, Marca

class HomeView(TemplateView):
    template_name = "core/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # Determine if there's an active campaign to override default behaviors
        active_campaign = Campaign.objects.filter(active=True).first()
        context['campaign'] = active_campaign
        
        if active_campaign:
            context['banners'] = Banner.objects.filter(active=True, campaign=active_campaign)
            context['featured_products'] = active_campaign.products.filter(active=True)
            context['featured_title'] = active_campaign.featured_title
            context['featured_subtitle'] = active_campaign.featured_subtitle
        else:
            context['banners'] = Banner.objects.filter(active=True, campaign__isnull=True)
            context['featured_products'] = Product.objects.filter(active=True, is_featured=True)[:8]
            context['featured_title'] = "Inspirações em Destaque"
            context['featured_subtitle'] = "Seleção exclusiva de revestimentos e acabamentos para transformar seu projeto."
            
        context['categories'] = Category.objects.all()
        context['testimonials'] = Testimonial.objects.filter(active=True)
        context['unidades'] = Unidade.objects.filter(is_active=True)
        
        # New Context Variables for the Home Sections
        context['sobre_empresa'] = SobreEmpresa.objects.first()
        context['marcas_destaque'] = Marca.objects.filter(em_destaque=True, is_active=True).order_by('ordem')
        
        return context

class ProductListView(ListView):
    model = Product
    template_name = "core/product_list.html"
    context_object_name = "products"
    
    def get_queryset(self):
        return Product.objects.filter(active=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context

class CategoryDetailView(DetailView):
    model = Category
    template_name = "core/category_detail.html"
    context_object_name = "category"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = self.object.products.filter(active=True)
        context['categories'] = Category.objects.all()
        return context

class ProductDetailView(DetailView):
    model = Product
    template_name = "core/product_detail.html"
    context_object_name = "product"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['gallery'] = self.object.gallery_images.all()
        context['related_products'] = Product.objects.filter(
            category=self.object.category, active=True
        ).exclude(id=self.object.id)[:4]
        return context
