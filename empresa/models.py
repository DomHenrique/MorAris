from django.db import models
from django.core.exceptions import ValidationError

class SobreEmpresa(models.Model):
    titulo_secao = models.CharField("Título da Seção", max_length=100, default="Sobre Nós")
    texto = models.TextField("Texto Principal")
    imagem_loja = models.ImageField("Imagem da Loja", upload_to='empresa/sobre/', blank=True, null=True)

    class Meta:
        verbose_name = "Sobre a Empresa"
        verbose_name_plural = "Sobre a Empresa"

    def save(self, *args, **kwargs):
        if not self.pk and SobreEmpresa.objects.exists():
            raise ValidationError('Só pode existir uma instância de Sobre a Empresa.')
        self.pk = 1
        super(SobreEmpresa, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    def __str__(self):
        return "Configuração da Seção Sobre Nós"

class Marca(models.Model):
    nome = models.CharField("Nome da Marca", max_length=100)
    logo = models.ImageField("Logo da Marca", upload_to='empresa/marcas/')
    em_destaque = models.BooleanField("Em Destaque", default=True, help_text="Se marcado, a marca aparecerá no carrossel da home.")
    ordem = models.IntegerField("Ordem de Exibição", default=0)
    is_active = models.BooleanField("Ativa", default=True)

    class Meta:
        verbose_name = "Marca Parceira"
        verbose_name_plural = "Marcas Parceiras"
        ordering = ['ordem', 'nome']

    def __str__(self):
        return self.nome
class Unidade(models.Model):
    TIPO_CHOICES = (
        ('showroom', 'Showroom'),
        ('escritorio', 'Escritório de Projetos'),
    )

    nome = models.CharField("Nome da Unidade", max_length=100)
    tipo = models.CharField("Tipo", max_length=20, choices=TIPO_CHOICES, default='showroom')
    
    title_eyebrow = models.CharField("Texto de Apoio (Eyebrow)", max_length=100, default="VENHA VISITAR", blank=True)
    title_main = models.CharField("Título Principal", max_length=150, default="CONHEÇA NOSSO SHOWROOM", blank=True)
    card_title = models.CharField("Título do Card", max_length=100, default="AGENDE UMA VISITA COM NOSSOS ESPECIALISTAS", blank=True)
    
    endereco = models.CharField("Endereço", max_length=255)
    cidade = models.CharField("Cidade", max_length=100)
    estado = models.CharField("Estado (UF)", max_length=2, default="SP")
    cep = models.CharField("CEP", max_length=20, blank=True)
    
    email = models.EmailField("E-mail de Contato", blank=True)
    telefone = models.CharField("Telefone", max_length=20, blank=True)
    whatsapp = models.CharField("WhatsApp", max_length=20, blank=True)
    
    business_hours = models.TextField("Horários de Funcionamento", blank=True, help_text="Ex: Seg a Sex: 09h às 18h")
    
    mapa_url = models.URLField("URL de Incorporação do Google Maps (Iframe)", max_length=500, blank=True)
    rota_url = models.URLField("URL de Rota do Google Maps", max_length=500, blank=True)
    
    ordem = models.IntegerField("Ordem de exibição", default=0)
    is_active = models.BooleanField("Ativa", default=True)

    class Meta:
        verbose_name = "Unidade / Showroom"
        verbose_name_plural = "Unidades / Showrooms"
        ordering = ['ordem', 'nome']

    def __str__(self):
        return f"{self.nome} ({self.get_tipo_display()})"
