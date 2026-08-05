document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animação incremental dos números de estatística
    initStatCounters();

    // Carregar dados dinâmicos do Supabase
    if (supabaseClient) {
      Promise.allSettled([
        loadBanners(),
        loadCategories(),
        loadAboutSection(),
        loadFeaturedProducts(),
        loadBrands(),
        loadTestimonials(),
        loadUnitInfo(),
      ]);
    } else {
      // Fallback: inicializar Swiper e Depoimentos mesmo sem Supabase
      initProductsSwiper();
      loadTestimonials();
    }
});

// ────────────────────────────────────────────────
// Counters (MESMO script original do Django)
// ────────────────────────────────────────────────
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-item__number');
    if (!statNumbers.length) return;

    let animated = false;

    function animateStats() {
        if (animated) return;
        animated = true;

        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            if (isNaN(target)) return;

            const duration = 2000;
            const startTime = performance.now();

            function updateNumber(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentVal = Math.floor(easeProgress * target);

                el.textContent = currentVal + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    el.textContent = target + suffix;
                }
            }

            requestAnimationFrame(updateNumber);
        });
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(statsSection);
    } else {
        animateStats();
    }
}

// ────────────────────────────────────────────────
// Swiper init (MESMO config do Django)
// ────────────────────────────────────────────────
function initProductsSwiper() {
    const swiperEl = document.querySelector('.products-swiper');
    if (!swiperEl || typeof Swiper === 'undefined') return;

    new Swiper('.products-swiper', {
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        grabCursor: true,
        speed: 600,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
            0:   { slidesPerView: 1,   centeredSlides: true,  spaceBetween: 16 },
            576: { slidesPerView: 1.2, centeredSlides: true,  spaceBetween: 20 },
            768: { slidesPerView: 2,   centeredSlides: false, spaceBetween: 24 },
            992: { slidesPerView: 3,   centeredSlides: false, spaceBetween: 28 }
        }
    });
}

// ────────────────────────────────────────────────
// SUPABASE LOADERS — Gera HTML com MESMAS CLASSES
// do design_system.css do template Django
// ────────────────────────────────────────────────

// Variável global para WhatsApp da matriz
let matrizWhatsapp = '';

async function loadBanners() {
    try {
        const { data: banners, error } = await supabaseClient
            .from('core_banner')
            .select('*, campaign:core_campaign(*)')
            .order('order', { ascending: true });

        if (error || !banners || banners.length === 0) return;

        // Filtrar banners ativos (se tiver campanha associada, verifica se a campanha está ativa)
        const activeBanners = banners.filter(b => !b.campaign || b.campaign.is_active !== false);
        if (activeBanners.length === 0) return;

        const indicators = document.getElementById('heroIndicators');
        const slides = document.getElementById('heroSlides');
        if (!indicators || !slides) return;

        // Gerar indicadores
        indicators.innerHTML = activeBanners.map((b, i) =>
            `<button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" ${i === 0 ? 'aria-current="true"' : ''} aria-label="Banner ${i + 1}"></button>`
        ).join('');

        // Gerar slides com a MESMA estrutura do template Django
        slides.innerHTML = activeBanners.map((b, i) => {
            const desktopUrl = b.desktop_image ? getPublicStorageUrl(b.desktop_image) : '';
            const mobileUrl = b.mobile_image ? getPublicStorageUrl(b.mobile_image) : '';

            return `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    ${b.redirect_url ? `<a href="${b.redirect_url}" class="hero-slide-link">` : ''}
                    <div class="hero-slide">
                        ${desktopUrl ? `
                        <picture>
                            ${mobileUrl ? `<source media="(max-width: 576px)" srcset="${mobileUrl}" crossorigin="anonymous">` : ''}
                            <img src="${desktopUrl}" alt="${b.title || 'Banner Kastello'}" crossorigin="anonymous" loading="${i === 0 ? 'eager' : 'lazy'}" />
                        </picture>
                        ` : ''}
                        ${b.show_text_overlay ? `
                        <div class="hero-overlay" aria-hidden="true"></div>
                        <div class="hero-content">
                            <div class="container">
                                <div class="hero-text">
                                    ${b.campaign && b.campaign.subtitle ? `<p class="eyebrow" style="color: var(--color-primary);">${b.campaign.subtitle}</p>` : ''}
                                    <h1 style="color: #FFFFFF">${b.campaign ? b.campaign.title : (b.title || '')}</h1>
                                    ${b.redirect_url ? `
                                    <span class="btn-primary-cta mt-3 d-inline-block">
                                        Ver Mais <i class="bi bi-arrow-right"></i>
                                    </span>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    ${b.redirect_url ? '</a>' : ''}
                </div>
            `;
        }).join('');

    } catch (e) {
        console.log('Banners: usando fallback estático', e);
    }
}

async function loadCategories() {
    try {
        const { data: categories, error } = await supabaseClient
            .from('core_category')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true })
            .order('name', { ascending: true });

        if (error || !categories || categories.length === 0) return;

        const container = document.getElementById('categoriesContainer');
        if (!container) return;

        container.innerHTML = categories.map(cat => {
            const iconUrl = cat.icon_svg ? getPublicStorageUrl(cat.icon_svg) : '';
            const iconClass = cat.icon_class || 'bi-box';

            return `
                <div class="col-6 col-md-4 col-lg-2">
                    <a href="#produtos" class="category-card">
                        ${iconUrl
                            ? `<span class="category-icon-svg" style="-webkit-mask-image: url('${iconUrl}'); mask-image: url('${iconUrl}');" role="img" aria-label="${cat.name}"></span>`
                            : `<i class="bi ${iconClass}"></i>`
                        }
                        <span class="category-card__name">${cat.name}</span>
                    </a>
                </div>
            `;
        }).join('');

        // Atualizar footer com categorias reais
        const footerCats = document.getElementById('footerCategoriesList');
        if (footerCats) {
            footerCats.innerHTML = categories.slice(0, 6).map(c =>
                `<li><a href="#produtos">${c.name}</a></li>`
            ).join('');
        }
    } catch (e) {
        console.log('Categorias: usando fallback estático', e);
    }
}

function formatAboutDescription(text) {
    if (!text) return '';

    // Decode HTML entities if present (e.g. &lt;strong&gt; -> <strong>)
    let decoded = text;
    if (decoded.includes('&lt;') || decoded.includes('&gt;')) {
        const txt = document.createElement('textarea');
        txt.innerHTML = decoded;
        decoded = txt.value;
    }

    // Split paragraphs by double linebreaks or p tags
    const rawParagraphs = decoded.split(/(?:\r?\n\s*){2,}|(?=<\/?p[^>]*>)/i);
    const paragraphs = rawParagraphs
        .map(p => p.replace(/<\/?p[^>]*>/gi, '').trim())
        .filter(Boolean);

    if (paragraphs.length === 0) return `<p class="store-about-paragraph">${decoded}</p>`;

    return paragraphs.map((p, index) => {
        const isLead = index === 0 && paragraphs.length > 1;
        const pClass = isLead ? 'store-about-lead' : 'store-about-paragraph';
        
        // Clean text: sanitize disallowed tags while preserving strong, b, em, i, br
        let cleanText = p
            .replace(/<(?!\/?(strong|b|em|i|br)\b)[^>]+>/gi, '')
            .replace(/\r?\n/g, '<br>');

        return `<p class="${pClass}">${cleanText}</p>`;
    }).join('');
}

async function loadAboutSection() {
    try {
        const { data: sobre, error } = await supabaseClient
            .from('empresa_sobreempresa')
            .select('*')
            .order('id', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error || !sobre) return;

        const titleEl = document.getElementById('aboutTitle');
        const descEl = document.getElementById('aboutDesc');
        const photoWrap = document.getElementById('aboutPhotoWrap');

        if (titleEl && sobre.title) titleEl.textContent = sobre.title;
        if (descEl && sobre.description) {
            descEl.innerHTML = formatAboutDescription(sobre.description);
        }
        if (photoWrap && sobre.foto_loja) {
            const url = getPublicStorageUrl(sobre.foto_loja);
            photoWrap.innerHTML = `<img src="${url}" alt="Loja Kastello" crossorigin="anonymous" class="store-about-photo" />`;
        }

        // Atualizar links de redes sociais
        const footerSocial = document.getElementById('footerSocial');
        if (footerSocial) {
            let socialHtml = '';
            if (sobre.instagram) {
                socialHtml += `<a href="${sobre.instagram}" target="_blank" rel="noopener noreferrer" class="footer-social-link fs-5" aria-label="Instagram"><i class="bi bi-instagram"></i></a>`;
            }
            if (sobre.facebook) {
                socialHtml += `<a href="${sobre.facebook}" target="_blank" rel="noopener noreferrer" class="footer-social-link fs-5" aria-label="Facebook"><i class="bi bi-facebook"></i></a>`;
            }
            if (matrizWhatsapp) {
                socialHtml += `<a href="https://wa.me/${matrizWhatsapp}?text=Olá! Vim pelo site e gostaria de um orçamento." class="footer-social-link fs-5" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp"></i></a>`;
            }
            if (socialHtml) footerSocial.innerHTML = socialHtml;
        }
    } catch (e) {
        console.log('Sobre: usando fallback estático', e);
    }
}

async function loadFeaturedProducts() {
    try {
        const { data: products, error } = await supabaseClient
            .from('core_product')
            .select('*, category:core_category(*)')
            .eq('is_active', true)
            .eq('is_highlight', true);

        if (error || !products || products.length === 0) {
            initProductsSwiper();
            return;
        }

        const wrapper = document.getElementById('productsWrapper');
        if (!wrapper) return;

        const waNum = matrizWhatsapp || '5500000000000';

        wrapper.innerHTML = products.map(prod => {
            const imgUrl = prod.image ? getPublicStorageUrl(prod.image) : '';
            const catName = prod.category ? prod.category.name : 'Geral';

            let priceHtml = '';
            const unitSuffix = prod.unit ? ` <span style="font-size: 0.8em; font-weight: normal;">/ ${prod.unit}</span>` : '';

            if (prod.sob_consulta || !prod.price) {
                priceHtml = `<span class="consult">Sob Consulta</span>`;
            } else if (prod.promotional_price) {
                priceHtml = `
                    <span class="old-price">R$ ${Number(prod.price).toFixed(2).replace('.', ',')}</span>
                    <span class="current-price">R$ ${Number(prod.promotional_price).toFixed(2).replace('.', ',')}${unitSuffix}</span>
                `;
            } else {
                priceHtml = `<span class="current-price">R$ ${Number(prod.price).toFixed(2).replace('.', ',')}${unitSuffix}</span>`;
            }

            if (!prod.sob_consulta && prod.price && prod.max_installments > 1) {
                const basePrice = prod.promotional_price || prod.price;
                const instValue = (basePrice / prod.max_installments).toFixed(2).replace('.', ',');
                priceHtml += `<span class="installment-text" style="display: block; font-size: 0.85rem; color: #6b7280; margin-top: 4px; font-weight: 500;">${prod.max_installments}x de R$ ${instValue}</span>`;
            }

            const waText = encodeURIComponent(`Olá! Quero um orçamento para:\n\n*${prod.name}*\n(${catName})\n\nComo funciona a entrega para minha região?`);

            return `
                <div class="swiper-slide">
                    <article class="product-card">
                        <div class="product-card__image-wrap">
                            ${imgUrl ? `<img src="${imgUrl}" alt="${prod.name}" crossorigin="anonymous" loading="lazy" />` : ''}
                            <div class="product-card__badges">
                                ${prod.is_highlight ? '<span class="badge-featured">⭐ Destaque</span>' : ''}
                                ${prod.promotional_price ? '<span class="badge-promo">🔥 Promoção</span>' : ''}
                            </div>
                        </div>
                        <div class="product-card__body">
                            <span class="product-card__category">${catName}</span>
                            <h3 class="product-card__name">${prod.name}</h3>
                            <p class="product-card__desc">${prod.description || ''}</p>
                            <div class="product-card__footer">
                                <div class="product-card__price">
                                    ${priceHtml}
                                </div>
                                <a href="https://wa.me/${waNum}?text=${waText}" target="_blank" rel="noopener noreferrer" class="product-card__cta">
                                    Orçar <i class="bi bi-whatsapp ms-1"></i>
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        }).join('');

        initProductsSwiper();
    } catch (e) {
        console.log('Produtos: usando fallback estático', e);
        initProductsSwiper();
    }
}

async function loadBrands() {
    try {
        const { data: marcas, error } = await supabaseClient
            .from('empresa_marca')
            .select('*')
            .eq('is_active', true)
            .order('ordem', { ascending: true });

        if (error || !marcas || marcas.length === 0) return;

        const track = document.getElementById('brandsTrack');
        const section = document.getElementById('marcasSection');
        if (!track || !section) return;

        // Mostrar seção
        section.style.display = '';

        // Gerar marquee com mesmas classes do Django
        const renderBrand = (marca) => {
            const logoUrl = marca.logo ? getPublicStorageUrl(marca.logo) : '';
            return `
                <div class="brand-item-col ${marca.em_destaque ? 'brand-featured' : ''}">
                    <div class="brand-card">
                        ${logoUrl
                            ? `<img src="${logoUrl}" alt="${marca.nome}" title="${marca.nome}" crossorigin="anonymous" class="brand-card__logo" loading="lazy" />`
                            : `<span class="brand-card__name">${marca.nome}</span>`
                        }
                    </div>
                </div>
            `;
        };

        // Duplicar para loop infinito sem emendas
        track.innerHTML = marcas.map(renderBrand).join('') + marcas.map(renderBrand).join('');

    } catch (e) {
        console.log('Marcas: usando fallback estático', e);
    }
}

// Fallback para depoimentos caso a tabela esteja vazia ou offline
const defaultTestimonials = [
    {
        client_name: "Patricia Mendes",
        city: "Porto Alegre - RS",
        text: "Atendimento diferenciado e agilidade no orçamento via WhatsApp. Encontrei tudo o que precisava para a reforma da minha casa num só lugar."
    },
    {
        client_name: "Roberto Alcantara",
        city: "Viamão - RS",
        text: "Melhor madeira para o telhado e os caibros. Preço justo, produtos de qualidade e equipe muito disposta a ajudar. Parabéns!"
    },
    {
        client_name: "Gustavo Silveira",
        city: "Canoas - RS",
        text: "Comprei os decks de ipê e as ferragens para minha área gourmet. Entrega rápida e o material chegou em perfeitas condições."
    },
    {
        client_name: "Fernanda Lima",
        city: "Gravataí - RS",
        text: "Excelente atendimento da Madeireira Kastello! O vendedor me orientou sobre as melhores opções de verniz e selador para meu piso."
    },
    {
        client_name: "Marcelo Oliveira",
        city: "Porto Alegre - RS",
        text: "Tradição e confiança. Sou cliente há mais de 10 anos para minhas obras e marcenaria. Recomendo de olhos fechados!"
    }
];

async function loadTestimonials() {
    let testimonials = [];
    try {
        if (supabaseClient) {
            const { data, error } = await supabaseClient
                .from('core_testimonial')
                .select('*');
            if (!error && data && data.length > 0) {
                testimonials = data;
            }
        }
    } catch (e) {
        console.log('Depoimentos: usando fallback estático', e);
    }

    if (!testimonials || testimonials.length === 0) {
        testimonials = defaultTestimonials;
    }

    const track = document.getElementById('reviewsTrack');
    if (!track) return;

    const bgColors = ['#fc6d01', '#1a73e8', '#d93025', '#1e8e3e', '#9334e6', '#e37400'];

    const renderReview = (t, idx) => {
        const avatarUrl = t.profile_picture ? getPublicStorageUrl(t.profile_picture) : '';
        const initial = t.client_name ? t.client_name.charAt(0) : 'C';
        const bgColor = bgColors[idx % bgColors.length];

        return `
            <div class="google-review-card-item" data-index="${idx}">
                <article class="google-review-card">
                    <div class="google-review-card__header">
                        ${avatarUrl
                            ? `<img src="${avatarUrl}" alt="${t.client_name}" crossorigin="anonymous" class="google-review-card__avatar" />`
                            : `<div class="google-review-card__avatar-initials" style="background: ${bgColor};">${initial}</div>`
                        }
                        
                        <div class="google-review-card__user-info">
                            <h4 class="google-review-card__name">${t.client_name}</h4>
                            <span class="google-review-card__badge"><i class="bi bi-patch-check-fill text-primary me-1"></i>Avaliação no Google</span>
                        </div>

                        <svg class="google-review-card__g-logo" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                    </div>

                    <div class="google-review-card__rating">
                        <span class="google-stars">★★★★★</span>
                        <span class="google-review-card__location"><i class="bi bi-geo-alt-fill me-1"></i>${t.city || ''}</span>
                    </div>

                    <p class="google-review-card__text">"${t.text}"</p>
                </article>
            </div>
        `;
    };

    track.innerHTML = testimonials.map((t, i) => renderReview(t, i)).join('');

    init3DTestimonialsCarousel();
}

function init3DTestimonialsCarousel() {
    const container = document.getElementById('reviews3DCarouselContainer');
    const track = document.getElementById('reviewsTrack');
    if (!container || !track) return;

    const cards = track.querySelectorAll('.google-review-card-item');
    if (cards.length === 0) return;

    const totalCards = cards.length;
    let currentIndex = 0;
    let autoRotateTimer = null;

    // Gerar dots de paginação
    const dotsContainer = document.getElementById('reviewsDots');
    if (dotsContainer) {
        dotsContainer.innerHTML = Array.from({ length: totalCards }, (_, i) =>
            `<button type="button" class="reviews-3d-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ir para depoimento ${i + 1}"></button>`
        ).join('');

        dotsContainer.querySelectorAll('.reviews-3d-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    currentIndex = idx;
                    updateCarousel();
                    restartAutoRotate();
                }
            });
        });
    }

    function updateCarousel() {
        const isMobile = window.innerWidth < 640;

        cards.forEach((card, i) => {
            let relativePos = i - currentIndex;

            // Distância circular (modulo)
            if (relativePos > Math.floor(totalCards / 2)) {
                relativePos -= totalCards;
            } else if (relativePos < -Math.floor(totalCards / 2)) {
                relativePos += totalCards;
            }

            let transform = '';
            let opacity = 1;
            let filter = 'brightness(1)';
            let zIndex = 1;

            if (relativePos === 0) {
                // Card central em foco
                transform = 'translateX(0) scale(1) rotateY(0deg)';
                opacity = 1;
                filter = 'brightness(1)';
                zIndex = 10;
                card.classList.add('is-active');
            } else if (relativePos === -1) {
                // Esquerda 1
                const offset = isMobile ? -110 : -210;
                const scale = isMobile ? 0.82 : 0.88;
                const rot = isMobile ? 15 : 12;
                transform = `translateX(${offset}px) scale(${scale}) rotateY(${rot}deg)`;
                opacity = isMobile ? 0.5 : 0.75;
                filter = 'brightness(0.85)';
                zIndex = 5;
                card.classList.remove('is-active');
            } else if (relativePos === 1) {
                // Direita 1
                const offset = isMobile ? 110 : 210;
                const scale = isMobile ? 0.82 : 0.88;
                const rot = isMobile ? -15 : -12;
                transform = `translateX(${offset}px) scale(${scale}) rotateY(${rot}deg)`;
                opacity = isMobile ? 0.5 : 0.75;
                filter = 'brightness(0.85)';
                zIndex = 5;
                card.classList.remove('is-active');
            } else if (relativePos === -2) {
                // Esquerda 2
                const offset = isMobile ? -200 : -390;
                transform = `translateX(${offset}px) scale(0.78) rotateY(22deg)`;
                opacity = isMobile ? 0 : 0.4;
                filter = 'brightness(0.6)';
                zIndex = 2;
                card.classList.remove('is-active');
            } else if (relativePos === 2) {
                // Direita 2
                const offset = isMobile ? 200 : 390;
                transform = `translateX(${offset}px) scale(0.78) rotateY(-22deg)`;
                opacity = isMobile ? 0 : 0.4;
                filter = 'brightness(0.6)';
                zIndex = 2;
                card.classList.remove('is-active');
            } else {
                // Ocultos nas laterais
                const dir = relativePos > 0 ? 1 : -1;
                transform = `translateX(${dir * 550}px) scale(0.65) rotateY(${-dir * 30}deg)`;
                opacity = 0;
                filter = 'brightness(0.3)';
                zIndex = 1;
                card.classList.remove('is-active');
            }

            card.style.transform = transform;
            card.style.opacity = opacity;
            card.style.filter = filter;
            card.style.zIndex = zIndex;
            card.style.pointerEvents = Math.abs(relativePos) <= 1 ? 'auto' : 'none';
        });

        // Atualizar dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.reviews-3d-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    function startAutoRotate() {
        if (!autoRotateTimer) {
            autoRotateTimer = setInterval(nextCard, 3500);
        }
    }

    function stopAutoRotate() {
        if (autoRotateTimer) {
            clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }
    }

    function restartAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
    }

    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (currentIndex !== i) {
                currentIndex = i;
                updateCarousel();
                restartAutoRotate();
            }
        });
    });

    const prevBtn = document.getElementById('reviewsPrevBtn');
    const nextBtn = document.getElementById('reviewsNextBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevCard();
            restartAutoRotate();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextCard();
            restartAutoRotate();
        });
    }

    // Gesture swipe no Mobile
    let startX = 0;
    let isSwiping = false;

    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        stopAutoRotate();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        if (Math.abs(diffX) > 40) {
            if (diffX < 0) {
                nextCard();
            } else {
                prevCard();
            }
        }
        isSwiping = false;
        startAutoRotate();
    }, { passive: true });

    container.addEventListener('mouseenter', stopAutoRotate);
    container.addEventListener('mouseleave', startAutoRotate);

    window.addEventListener('resize', updateCarousel);

    updateCarousel();
    startAutoRotate();
}

async function loadUnitInfo() {
    try {
        const { data: unit, error } = await supabaseClient
            .from('empresa_unidade')
            .select('*')
            .eq('is_matriz', true)
            .limit(1)
            .single();

        if (error || !unit) return;

        // Salvar WhatsApp global para uso em outros loaders
        if (unit.whatsapp) {
            matrizWhatsapp = unit.whatsapp.replace(/\D/g, '');
        }

        // Preencher card de localização
        const unitName = document.getElementById('unitName');
        const unitAddress = document.getElementById('unitAddress');
        const unitHours = document.getElementById('unitHours');
        const unitContact = document.getElementById('unitContact');
        const mapsIframe = document.getElementById('mapsIframe');
        const locationActions = document.getElementById('locationActions');

        if (unitName && unit.nome) unitName.textContent = unit.nome;
        if (unitAddress) {
            unitAddress.innerHTML = `${unit.endereco}<br>${unit.cidade} - ${unit.estado}<br>${unit.cep || ''}`;
        }
        if (unitHours && unit.horarios_funcionamento) {
            unitHours.innerHTML = unit.horarios_funcionamento.replace(/\n/g, '<br>');
        }
        if (unitContact) {
            let contactHtml = '';
            if (unit.whatsapp) contactHtml += `WhatsApp: ${unit.whatsapp}<br>`;
            if (unit.telefone) contactHtml += `Tel: ${unit.telefone}`;
            unitContact.innerHTML = contactHtml;
        }
        if (mapsIframe && unit.google_maps_iframe) {
            mapsIframe.src = unit.google_maps_iframe;
        }
        if (locationActions && matrizWhatsapp) {
            locationActions.innerHTML = `
                <a href="${unit.link_rota_maps || '#'}" target="_blank" rel="noopener noreferrer" class="btn-location-route w-100">
                    <i class="bi bi-car-front-fill me-2"></i> Traçar Rota
                </a>
                <a href="https://wa.me/${matrizWhatsapp}" target="_blank" rel="noopener noreferrer" class="btn-location-whatsapp w-100 mt-2">
                    <i class="bi bi-whatsapp me-2"></i> Falar no WhatsApp
                </a>
            `;
        }

        // Preencher Navbar WhatsApp
        const navWrap = document.getElementById('navWhatsappWrap');
        if (navWrap && matrizWhatsapp) {
            navWrap.innerHTML = `
                <a class="btn-primary-cta" href="https://wa.me/${matrizWhatsapp}?text=Olá! Vim pelo site e gostaria de um orçamento."
                   target="_blank" rel="noopener noreferrer">
                    <i class="bi bi-whatsapp"></i> Orçamento
                </a>
            `;
        }

        // Preencher About WhatsApp
        const aboutBtn = document.getElementById('aboutWhatsappBtn');
        if (aboutBtn && matrizWhatsapp) {
            aboutBtn.href = `https://wa.me/${matrizWhatsapp}?text=Olá! Gostaria de um orçamento.`;
        }

        // Preencher CTA Final
        const ctaButtons = document.getElementById('ctaButtons');
        if (ctaButtons && matrizWhatsapp) {
            ctaButtons.innerHTML = `
                <a href="https://wa.me/${matrizWhatsapp}?text=Olá! Gostaria de um orçamento para minha obra."
                   class="btn-primary-cta" target="_blank" rel="noopener noreferrer">
                    <i class="bi bi-whatsapp"></i> Solicitar Orçamento pelo WhatsApp
                </a>
                ${unit.telefone ? `
                <a href="tel:${unit.telefone}" class="btn-outline-cta">
                    <i class="bi bi-telephone"></i> Ligar Agora
                </a>
                ` : ''}
            `;
        }

        // Botão Flutuante WhatsApp
        const floatBtn = document.getElementById('floatWhatsappBtn');
        if (floatBtn && matrizWhatsapp) {
            floatBtn.href = `https://wa.me/${matrizWhatsapp}?text=Olá! Vim pelo site e gostaria de um orçamento.`;
            floatBtn.style.display = '';
        }

        // Footer Contato
        const footerContact = document.getElementById('footerContact');
        if (footerContact) {
            let contactItems = '';
            contactItems += `
                <li>
                    <a href="${unit.link_google_maps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unit.endereco + ', ' + unit.cidade + '-' + unit.estado)}`}" target="_blank" rel="noopener noreferrer" class="footer-contact-link">
                        <i class="bi bi-geo-alt-fill footer-icon me-2"></i>${unit.endereco}, ${unit.cidade} - ${unit.estado}
                    </a>
                </li>
            `;
            if (unit.telefone) {
                contactItems += `
                    <li class="mt-2">
                        <a href="tel:${unit.telefone}" class="footer-contact-link">
                            <i class="bi bi-telephone-fill footer-icon me-2"></i>${unit.telefone}
                        </a>
                    </li>
                `;
            }
            if (unit.whatsapp) {
                contactItems += `
                    <li class="mt-2">
                        <a href="https://wa.me/${matrizWhatsapp}?text=Olá! Vim pelo site e gostaria de um orçamento." target="_blank" rel="noopener noreferrer" class="footer-contact-link">
                            <i class="bi bi-whatsapp footer-icon me-2"></i>${unit.whatsapp}
                        </a>
                    </li>
                `;
            }
            if (unit.email) {
                contactItems += `
                    <li class="mt-2">
                        <a href="mailto:${unit.email}" class="footer-contact-link">
                            <i class="bi bi-envelope-fill footer-icon me-2"></i>${unit.email}
                        </a>
                    </li>
                `;
            }
            if (unit.horarios_funcionamento) {
                contactItems += `
                    <li class="mt-2" style="font-size:0.875rem; color: rgba(255, 255, 255, 0.8);">
                        <i class="bi bi-clock-fill footer-icon me-2"></i>${unit.horarios_funcionamento}
                    </li>
                `;
            }
            footerContact.innerHTML = contactItems;
        }

    } catch (e) {
        console.log('Unidade: usando fallback estático', e);
    }
}
