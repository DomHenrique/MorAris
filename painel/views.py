from django.shortcuts import render
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.mixins import UserPassesTestMixin
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from core.models import Category, Product, Banner, Testimonial
from empresa.models import Marca, SobreEmpresa, Unidade
from .forms import CategoryForm, ProductForm, ProductImageFormSet, BannerForm, TestimonialForm, MarcaForm, SobreEmpresaForm, UnidadeForm

def is_staff(user):
    return user.is_active and user.is_staff

class StaffRequiredMixin(UserPassesTestMixin):
    login_url = '/painel/login/'
    def test_func(self):
        return is_staff(self.request.user)

@user_passes_test(is_staff, login_url='/painel/login/')
def dashboard(request):
    context = {
        'total_produtos': Product.objects.count(),
        'total_categorias': Category.objects.count(),
        'total_banners': Banner.objects.count(),
        'total_depoimentos': Testimonial.objects.count(),
        'ultimos_produtos': Product.objects.order_by('-created_at')[:5]
    }
    return render(request, 'painel/dashboard.html', context)

class CategoryListView(StaffRequiredMixin, ListView):
    model = Category
    template_name = 'painel/categorias/list.html'
    context_object_name = 'categorias'

class CategoryCreateView(StaffRequiredMixin, CreateView):
    model = Category
    form_class = CategoryForm
    template_name = 'painel/categorias/form.html'
    success_url = reverse_lazy('painel:category_list')

class CategoryUpdateView(StaffRequiredMixin, UpdateView):
    model = Category
    form_class = CategoryForm
    template_name = 'painel/categorias/form.html'
    success_url = reverse_lazy('painel:category_list')

class CategoryDeleteView(StaffRequiredMixin, DeleteView):
    model = Category
    template_name = 'painel/categorias/confirm_delete.html'
    success_url = reverse_lazy('painel:category_list')

class ProductListView(StaffRequiredMixin, ListView):
    model = Product
    template_name = 'painel/produtos/list.html'
    context_object_name = 'produtos'

class ProductCreateView(StaffRequiredMixin, CreateView):
    model = Product
    form_class = ProductForm
    template_name = 'painel/produtos/form.html'
    success_url = reverse_lazy('painel:product_list')

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        if self.request.POST:
            data['formset'] = ProductImageFormSet(self.request.POST, self.request.FILES)
        else:
            data['formset'] = ProductImageFormSet()
        return data

    def form_valid(self, form):
        context = self.get_context_data()
        formset = context['formset']
        if formset.is_valid():
            self.object = form.save()
            formset.instance = self.object
            formset.save()
            return super().form_valid(form)
        else:
            return self.render_to_response(self.get_context_data(form=form))

class ProductUpdateView(StaffRequiredMixin, UpdateView):
    model = Product
    form_class = ProductForm
    template_name = 'painel/produtos/form.html'
    success_url = reverse_lazy('painel:product_list')

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        if self.request.POST:
            data['formset'] = ProductImageFormSet(self.request.POST, self.request.FILES, instance=self.object)
        else:
            data['formset'] = ProductImageFormSet(instance=self.object)
        return data

    def form_valid(self, form):
        context = self.get_context_data()
        formset = context['formset']
        if formset.is_valid():
            self.object = form.save()
            formset.instance = self.object
            formset.save()
            return super().form_valid(form)
        else:
            return self.render_to_response(self.get_context_data(form=form))

class ProductDeleteView(StaffRequiredMixin, DeleteView):
    model = Product
    template_name = 'painel/produtos/confirm_delete.html'
    success_url = reverse_lazy('painel:product_list')

# Banners
class BannerListView(StaffRequiredMixin, ListView):
    model = Banner
    template_name = 'painel/banners/list.html'
    context_object_name = 'banners'

class BannerCreateView(StaffRequiredMixin, CreateView):
    model = Banner
    form_class = BannerForm
    template_name = 'painel/banners/form.html'
    success_url = reverse_lazy('painel:banner_list')

class BannerUpdateView(StaffRequiredMixin, UpdateView):
    model = Banner
    form_class = BannerForm
    template_name = 'painel/banners/form.html'
    success_url = reverse_lazy('painel:banner_list')

class BannerDeleteView(StaffRequiredMixin, DeleteView):
    model = Banner
    template_name = 'painel/banners/confirm_delete.html'
    success_url = reverse_lazy('painel:banner_list')

# Depoimentos
class TestimonialListView(StaffRequiredMixin, ListView):
    model = Testimonial
    template_name = 'painel/depoimentos/list.html'
    context_object_name = 'depoimentos'

class TestimonialCreateView(StaffRequiredMixin, CreateView):
    model = Testimonial
    form_class = TestimonialForm
    template_name = 'painel/depoimentos/form.html'
    success_url = reverse_lazy('painel:testimonial_list')

class TestimonialUpdateView(StaffRequiredMixin, UpdateView):
    model = Testimonial
    form_class = TestimonialForm
    template_name = 'painel/depoimentos/form.html'
    success_url = reverse_lazy('painel:testimonial_list')

class TestimonialDeleteView(StaffRequiredMixin, DeleteView):
    model = Testimonial
    template_name = 'painel/depoimentos/confirm_delete.html'
    success_url = reverse_lazy('painel:testimonial_list')

# Marcas
class MarcaListView(StaffRequiredMixin, ListView):
    model = Marca
    template_name = 'painel/marcas/list.html'
    context_object_name = 'marcas'

class MarcaCreateView(StaffRequiredMixin, CreateView):
    model = Marca
    form_class = MarcaForm
    template_name = 'painel/marcas/form.html'
    success_url = reverse_lazy('painel:marca_list')

class MarcaUpdateView(StaffRequiredMixin, UpdateView):
    model = Marca
    form_class = MarcaForm
    template_name = 'painel/marcas/form.html'
    success_url = reverse_lazy('painel:marca_list')

class MarcaDeleteView(StaffRequiredMixin, DeleteView):
    model = Marca
    template_name = 'painel/marcas/confirm_delete.html'
    success_url = reverse_lazy('painel:marca_list')

# Institucional
class SobreEmpresaUpdateView(StaffRequiredMixin, UpdateView):
    model = SobreEmpresa
    form_class = SobreEmpresaForm
    template_name = 'painel/institucional/sobre_empresa_form.html'
    success_url = reverse_lazy('painel:sobre_empresa')

    def get_object(self, queryset=None):
        obj, created = SobreEmpresa.objects.get_or_create(pk=1)
        return obj

class UnidadeListView(StaffRequiredMixin, ListView):
    model = Unidade
    template_name = 'painel/unidades/list.html'
    context_object_name = 'unidades'

class UnidadeCreateView(StaffRequiredMixin, CreateView):
    model = Unidade
    form_class = UnidadeForm
    template_name = 'painel/unidades/form.html'
    success_url = reverse_lazy('painel:unidade_list')

class UnidadeUpdateView(StaffRequiredMixin, UpdateView):
    model = Unidade
    form_class = UnidadeForm
    template_name = 'painel/unidades/form.html'
    success_url = reverse_lazy('painel:unidade_list')

class UnidadeDeleteView(StaffRequiredMixin, DeleteView):
    model = Unidade
    template_name = 'painel/unidades/confirm_delete.html'
    success_url = reverse_lazy('painel:unidade_list')
