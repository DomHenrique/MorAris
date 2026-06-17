from django.db import models

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
