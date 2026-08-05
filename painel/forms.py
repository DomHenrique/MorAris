from django import forms
from django.forms import inlineformset_factory
from core.models import Category, Product, ProductImage, Banner, Testimonial
from empresa.models import Marca, SobreEmpresa, Unidade

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'slug', 'icon', 'order', 'meta_title', 'meta_description']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'gridd-input'}),
            'slug': forms.TextInput(attrs={'class': 'gridd-input'}),
            'icon': forms.TextInput(attrs={'class': 'gridd-input', 'placeholder': 'Ex: ri-folder-line'}),
            'order': forms.NumberInput(attrs={'class': 'gridd-input'}),
            'meta_title': forms.TextInput(attrs={'class': 'gridd-input'}),
            'meta_description': forms.Textarea(attrs={'class': 'gridd-input', 'rows': 3}),
        }

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['category', 'name', 'slug', 'description', 'price', 'promotional_price', 
                  'max_installments', 'price_display_mode',
                  'image', 'mobile_image', 'unit', 'sob_consulta', 'is_featured', 
                  'is_promotion', 'active', 'meta_title', 'meta_description']
        widgets = {
            'category': forms.Select(attrs={'class': 'gridd-input bg-[#0A0A32]'}),
            'name': forms.TextInput(attrs={'class': 'gridd-input'}),
            'slug': forms.TextInput(attrs={'class': 'gridd-input'}),
            'description': forms.Textarea(attrs={'class': 'gridd-input', 'rows': 4}),
            'price': forms.NumberInput(attrs={'class': 'gridd-input', 'step': '0.01'}),
            'promotional_price': forms.NumberInput(attrs={'class': 'gridd-input', 'step': '0.01'}),
            'max_installments': forms.NumberInput(attrs={'class': 'gridd-input'}),
            'price_display_mode': forms.Select(attrs={'class': 'gridd-input bg-[#0A0A32]'}),
            'image': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
            'mobile_image': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
            'unit': forms.TextInput(attrs={'class': 'gridd-input'}),
            'sob_consulta': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
            'is_featured': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
            'is_promotion': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
            'active': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
            'meta_title': forms.TextInput(attrs={'class': 'gridd-input'}),
            'meta_description': forms.Textarea(attrs={'class': 'gridd-input', 'rows': 3}),
        }

class BannerForm(forms.ModelForm):
    class Meta:
        model = Banner
        fields = ['campaign', 'title', 'subtitle', 'text_color', 'image', 'mobile_image', 'link', 'link_text', 'active', 'order']
        widgets = {
            'campaign': forms.Select(attrs={'class': 'gridd-input bg-[#0A0A32]'}),
            'title': forms.TextInput(attrs={'class': 'gridd-input'}),
            'subtitle': forms.TextInput(attrs={'class': 'gridd-input'}),
            'text_color': forms.TextInput(attrs={'class': 'gridd-input', 'type': 'color', 'style': 'height: 42px; padding: 0.2rem 0.5rem;'}),
            'image': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
            'mobile_image': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
            'link': forms.URLInput(attrs={'class': 'gridd-input'}),
            'link_text': forms.TextInput(attrs={'class': 'gridd-input'}),
            'active': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
            'order': forms.NumberInput(attrs={'class': 'gridd-input'}),
        }

class TestimonialForm(forms.ModelForm):
    class Meta:
        model = Testimonial
        fields = ['name', 'city', 'text', 'rating', 'photo', 'mobile_photo', 'active']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'gridd-input'}),
            'city': forms.TextInput(attrs={'class': 'gridd-input'}),
            'text': forms.Textarea(attrs={'class': 'gridd-input', 'rows': 4}),
            'rating': forms.NumberInput(attrs={'class': 'gridd-input', 'min': 1, 'max': 5}),
            'photo': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
            'mobile_photo': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
            'active': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
        }

class MarcaForm(forms.ModelForm):
    class Meta:
        model = Marca
        fields = ['nome', 'logo', 'em_destaque', 'ordem', 'is_active']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'gridd-input'}),
            'logo': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
            'em_destaque': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
            'ordem': forms.NumberInput(attrs={'class': 'gridd-input'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
        }

class SobreEmpresaForm(forms.ModelForm):
    class Meta:
        model = SobreEmpresa
        fields = ['titulo_secao', 'texto', 'imagem_loja']
        widgets = {
            'titulo_secao': forms.TextInput(attrs={'class': 'gridd-input'}),
            'texto': forms.Textarea(attrs={'class': 'gridd-input', 'rows': 5}),
            'imagem_loja': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
        }

class UnidadeForm(forms.ModelForm):
    class Meta:
        model = Unidade
        fields = [
            'nome', 'tipo', 'title_eyebrow', 'title_main', 'card_title',
            'endereco', 'cidade', 'estado', 'cep', 'email', 'telefone', 'whatsapp',
            'business_hours', 'mapa_url', 'rota_url', 'ordem', 'is_active'
        ]
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'gridd-input'}),
            'tipo': forms.Select(attrs={'class': 'gridd-input bg-[#0A0A32]'}),
            'title_eyebrow': forms.TextInput(attrs={'class': 'gridd-input'}),
            'title_main': forms.TextInput(attrs={'class': 'gridd-input'}),
            'card_title': forms.TextInput(attrs={'class': 'gridd-input'}),
            'endereco': forms.TextInput(attrs={'class': 'gridd-input'}),
            'cidade': forms.TextInput(attrs={'class': 'gridd-input'}),
            'estado': forms.TextInput(attrs={'class': 'gridd-input'}),
            'cep': forms.TextInput(attrs={'class': 'gridd-input'}),
            'email': forms.EmailInput(attrs={'class': 'gridd-input'}),
            'telefone': forms.TextInput(attrs={'class': 'gridd-input'}),
            'whatsapp': forms.TextInput(attrs={'class': 'gridd-input'}),
            'business_hours': forms.Textarea(attrs={'class': 'gridd-input', 'rows': 2}),
            'mapa_url': forms.URLInput(attrs={'class': 'gridd-input'}),
            'rota_url': forms.URLInput(attrs={'class': 'gridd-input'}),
            'ordem': forms.NumberInput(attrs={'class': 'gridd-input'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 cursor-pointer'}),
        }

ProductImageFormSet = inlineformset_factory(
    Product, ProductImage, 
    fields=['image', 'mobile_image', 'order'],
    widgets={
        'image': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
        'mobile_image': forms.ClearableFileInput(attrs={'class': 'gridd-input text-xs'}),
        'order': forms.NumberInput(attrs={'class': 'gridd-input', 'style': 'width: 80px;'}),
    },
    extra=3,
    can_delete=True
)
