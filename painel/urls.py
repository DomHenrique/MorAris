from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'painel'

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='painel/login.html'), name='login'),
    # Dashboard home
    path('', views.dashboard, name='dashboard'),
    
    # Categorias
    path('categorias/', views.CategoryListView.as_view(), name='category_list'),
    path('categorias/add/', views.CategoryCreateView.as_view(), name='category_add'),
    path('categorias/<int:pk>/edit/', views.CategoryUpdateView.as_view(), name='category_edit'),
    path('categorias/<int:pk>/delete/', views.CategoryDeleteView.as_view(), name='category_delete'),

    # Produtos
    path('produtos/', views.ProductListView.as_view(), name='product_list'),
    path('produtos/add/', views.ProductCreateView.as_view(), name='product_add'),
    path('produtos/<int:pk>/edit/', views.ProductUpdateView.as_view(), name='product_edit'),
    path('produtos/<int:pk>/delete/', views.ProductDeleteView.as_view(), name='product_delete'),

    # Marketing
    path('banners/', views.BannerListView.as_view(), name='banner_list'),
    path('banners/add/', views.BannerCreateView.as_view(), name='banner_add'),
    path('banners/<int:pk>/edit/', views.BannerUpdateView.as_view(), name='banner_edit'),
    path('banners/<int:pk>/delete/', views.BannerDeleteView.as_view(), name='banner_delete'),

    path('depoimentos/', views.TestimonialListView.as_view(), name='testimonial_list'),
    path('depoimentos/add/', views.TestimonialCreateView.as_view(), name='testimonial_add'),
    path('depoimentos/<int:pk>/edit/', views.TestimonialUpdateView.as_view(), name='testimonial_edit'),
    path('depoimentos/<int:pk>/delete/', views.TestimonialDeleteView.as_view(), name='testimonial_delete'),

    path('marcas/', views.MarcaListView.as_view(), name='marca_list'),
    path('marcas/add/', views.MarcaCreateView.as_view(), name='marca_add'),
    path('marcas/<int:pk>/edit/', views.MarcaUpdateView.as_view(), name='marca_edit'),
    path('marcas/<int:pk>/delete/', views.MarcaDeleteView.as_view(), name='marca_delete'),

    # Institucional
    path('sobre-empresa/', views.SobreEmpresaUpdateView.as_view(), name='sobre_empresa'),
    
    path('unidades/', views.UnidadeListView.as_view(), name='unidade_list'),
    path('unidades/add/', views.UnidadeCreateView.as_view(), name='unidade_add'),
    path('unidades/<int:pk>/edit/', views.UnidadeUpdateView.as_view(), name='unidade_edit'),
    path('unidades/<int:pk>/delete/', views.UnidadeDeleteView.as_view(), name='unidade_delete'),
]
