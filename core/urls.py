from django.urls import path
from .views import HomeView, ProductListView, CategoryDetailView, ProductDetailView

app_name = 'core'

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('colecoes/', ProductListView.as_view(), name='product_list'),
    path('colecoes/<slug:slug>/', CategoryDetailView.as_view(), name='category_products'),
    path('produto/<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),
]
