from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.urls import reverse
from django.core.exceptions import ValidationError

class Campaign(models.Model):
    name = models.CharField("Nome da Campanha", max_length=100)
    active = models.BooleanField(
        "Ativa", 
        default=False, 
        help_text="Se marcada, substitui os destaques padrão. Ex: 'Coleção Outono/Inverno' ou 'Especial Revestimentos Naturais'."
    )
    featured_title = models.CharField("Título da Área", max_length=200, default="Inspirações em Destaque")
    featured_subtitle = models.TextField(
        "Subtítulo da Área", 
        blank=True, 
        default="Seleção exclusiva de revestimentos e acabamentos para transformar seu projeto."
    )
    products = models.ManyToManyField(
        'Product', 
        blank=True, 
        verbose_name="Produtos em Destaque", 
        help_text="Selecione os revestimentos/acabamentos desta coleção."
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Campanha"
        verbose_name_plural = "Campanhas"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class Banner(models.Model):
    campaign = models.ForeignKey(
        Campaign, on_delete=models.CASCADE, related_name="banners", null=True, blank=True,
        verbose_name="Campanha", help_text="Deixe em branco para o banner ser Padrão."
    )
    title = models.CharField("Título", max_length=200, blank=True, null=True)
    subtitle = models.CharField("Subtítulo", max_length=300, blank=True)
    text_color = models.CharField("Cor do Texto", max_length=7, default="#2E2A28")
    
    image = models.ImageField(
        "Imagem do Banner (Desktop)", upload_to="banners/",
        help_text="Proporção horizontal larga (ex: 1920x580). Use fotos de ambientes sofisticados e bem iluminados."
    )
    mobile_image = models.ImageField(
        "Imagem do Banner (Mobile)", upload_to="banners/mobile/", null=True, blank=True,
        help_text="Obrigatório para versão mobile. Proporção vertical (ex: 1080x1350)."
    )
    
    link = models.URLField("Link (CTA)", blank=True)
    link_text = models.CharField("Texto do Botão", max_length=80, default="Conheça a Linha", blank=True)
    active = models.BooleanField("Ativo", default=True)
    order = models.PositiveIntegerField("Ordem", default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        super().clean()

    class Meta:
        verbose_name = "Banner"
        verbose_name_plural = "Banners"
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title if self.title else f"Banner #{self.pk}"


class Testimonial(models.Model):
    RATING_CHOICES = [(i, f"{i} estrela{'s' if i > 1 else ''}") for i in range(1, 6)]

    name = models.CharField("Nome do Cliente/Arquiteto", max_length=150)
    city = models.CharField("Cidade", max_length=100, blank=True)
    text = models.TextField("Depoimento", help_text="Foque em experiências de conforto, luxo e transformação do lar.")
    rating = models.PositiveSmallIntegerField("Avaliação", choices=RATING_CHOICES, default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    
    photo = models.ImageField("Foto (Desktop)", upload_to="testimonials/", blank=True)
    mobile_photo = models.ImageField("Foto (Mobile)", upload_to="testimonials/mobile/", blank=True, null=True)
    
    active = models.BooleanField("Ativo", default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Depoimento"
        verbose_name_plural = "Depoimentos"
        ordering = ["-rating", "-created_at"]

    def __str__(self):
        return f"{self.name} ({self.get_rating_display()})"
    
    @property
    def stars_filled(self):
        return range(self.rating)

    @property
    def stars_empty(self):
        return range(5 - self.rating)


class Category(models.Model):
    name = models.CharField("Nome", max_length=100)
    slug = models.SlugField("Slug", unique=True)
    icon = models.CharField("Ícone Bootstrap", max_length=60, blank=True)
    order = models.PositiveIntegerField("Ordem", default=0)
    meta_title = models.CharField("Meta Title (SEO)", max_length=150, blank=True)
    meta_description = models.TextField("Meta Description (SEO)", blank=True)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("core:category_products", kwargs={"slug": self.slug})


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="products", verbose_name="Categoria")
    name = models.CharField("Nome do Produto", max_length=200)
    slug = models.SlugField("Slug", unique=True, null=True, blank=True)
    description = models.TextField("Descrição", help_text="Descreva a textura, acabamento e a sensação que o material proporciona.")
    
    PRICE_DISPLAY_CHOICES = (
        ('total', 'Mostrar apenas Total'),
        ('installment', 'Mostrar apenas Parcela'),
        ('both', 'Mostrar Total e Parcela'),
    )

    price = models.DecimalField("Preço", max_digits=10, decimal_places=2, null=True, blank=True, help_text="Deixe em branco para 'Consultar Especialista'")
    promotional_price = models.DecimalField("Preço Promocional", max_digits=10, decimal_places=2, null=True, blank=True)
    
    max_installments = models.IntegerField("Máx. Parcelas", default=1, help_text="Ex: 12 para 12x. Use 1 para sem parcelamento.")
    price_display_mode = models.CharField("Modo de Exibição", max_length=20, choices=PRICE_DISPLAY_CHOICES, default='total')
    
    image = models.ImageField("Imagem Principal (Desktop)", upload_to="products/", help_text="Priorize imagens do produto ambientado.")
    mobile_image = models.ImageField("Imagem Principal (Mobile)", upload_to="products/mobile/", null=True, blank=True)
    
    unit = models.CharField("Unidade de Medida", max_length=30, default="m²")
    sob_consulta = models.BooleanField("Sob Consulta", default=False, help_text="Se marcado, oculta o preço no site e exibe 'Sob Consulta'.")
    is_featured = models.BooleanField("Em Destaque", default=False)
    is_promotion = models.BooleanField("Lançamento / Promoção", default=False)
    active = models.BooleanField("Ativo", default=True)
    
    meta_title = models.CharField("Meta Title (SEO)", max_length=150, blank=True)
    meta_description = models.TextField("Meta Description (SEO)", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"
        ordering = ["-is_featured", "-created_at"]

    def __str__(self):
        return self.name
        
    def get_absolute_url(self):
        if self.slug:
            return reverse('core:product_detail', kwargs={'slug': self.slug})
        return "#"

    @property
    def installment_value(self):
        if self.max_installments and self.max_installments > 1:
            base_price = self.promotional_price if self.promotional_price else self.price
            if base_price:
                return round(base_price / self.max_installments, 2)
        return None

    @property
    def display_price(self):
        if self.promotional_price:
            return self.promotional_price
        return self.price

    @property
    def has_discount(self):
        return bool(self.price and self.promotional_price and self.promotional_price < self.price)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="gallery_images", verbose_name="Produto")
    
    image = models.ImageField("Imagem Extra", upload_to="products/gallery/")
    
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Imagem da Galeria"
        verbose_name_plural = "Imagens da Galeria"
        ordering = ["order"]

    def __str__(self):
        return f"Imagem Extra de {self.product.name}"
