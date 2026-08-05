// Router & App Controller for Admin SPA

document.addEventListener('DOMContentLoaded', async () => {
  await initAdminAuth();
  initRouter();
  initModalEvents();
});

function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  if (!window.location.hash) {
    window.location.hash = '#/dashboard';
  } else {
    handleRoute();
  }
}

function handleRoute() {
  const hash = window.location.hash || '#/dashboard';
  const pageTitle = document.getElementById('pageTitle');
  const appContent = document.getElementById('appContent');

  // Update active sidebar nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('bg-orange-500/20', 'text-white');
      link.classList.remove('text-gray-300');
    } else {
      link.classList.remove('bg-orange-500/20', 'text-white');
      link.classList.add('text-gray-300');
    }
  });

  switch (hash) {
    case '#/produtos':
      if (pageTitle) pageTitle.textContent = 'Gerenciar Produtos';
      if (typeof renderProdutosModule === 'function') renderProdutosModule(appContent);
      break;
    case '#/categorias':
      if (pageTitle) pageTitle.textContent = 'Gerenciar Categorias';
      if (typeof renderCategoriasModule === 'function') renderCategoriasModule(appContent);
      break;
    case '#/banners':
      if (pageTitle) pageTitle.textContent = 'Gerenciar Banners e Campanhas';
      if (typeof renderBannersModule === 'function') renderBannersModule(appContent);
      break;
    case '#/depoimentos':
      if (pageTitle) pageTitle.textContent = 'Gerenciar Depoimentos';
      if (typeof renderDepoimentosModule === 'function') renderDepoimentosModule(appContent);
      break;
    case '#/marcas':
      if (pageTitle) pageTitle.textContent = 'Gerenciar Marcas Parceiras';
      if (typeof renderMarcasModule === 'function') renderMarcasModule(appContent);
      break;
    case '#/empresa':
      if (pageTitle) pageTitle.textContent = 'Dados da Empresa e Unidades';
      if (typeof renderEmpresaModule === 'function') renderEmpresaModule(appContent);
      break;
    case '#/dashboard':
    default:
      if (pageTitle) pageTitle.textContent = 'Dashboard';
      renderDashboard(appContent);
      break;
  }
}

async function renderDashboard(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="gridd-card p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-2xl border border-orange-500/30">
            <i class="ri-stack-line"></i>
          </div>
          <div>
            <span class="block text-xs font-bold uppercase text-gray-400">Produtos</span>
            <span id="dashProdCount" class="text-2xl font-extrabold text-white">...</span>
          </div>
        </div>

        <div class="gridd-card p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl border border-amber-500/30">
            <i class="ri-folders-line"></i>
          </div>
          <div>
            <span class="block text-xs font-bold uppercase text-gray-400">Categorias</span>
            <span id="dashCatCount" class="text-2xl font-extrabold text-white">...</span>
          </div>
        </div>

        <div class="gridd-card p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl border border-blue-500/30">
            <i class="ri-image-line"></i>
          </div>
          <div>
            <span class="block text-xs font-bold uppercase text-gray-400">Banners</span>
            <span id="dashBannerCount" class="text-2xl font-extrabold text-white">...</span>
          </div>
        </div>

        <div class="gridd-card p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/30">
            <i class="ri-chat-quote-line"></i>
          </div>
          <div>
            <span class="block text-xs font-bold uppercase text-gray-400">Depoimentos</span>
            <span id="dashDepCount" class="text-2xl font-extrabold text-white">...</span>
          </div>
        </div>
      </div>

      <!-- Quick Action Cards -->
      <div class="gridd-card p-6">
        <h3 class="font-extrabold text-base text-white mb-4">Ações Rápidas</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="#/produtos" class="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition flex items-center gap-3">
            <i class="ri-add-circle-line text-2xl text-orange-400"></i>
            <div>
              <strong class="block text-sm text-white">Adicionar Produto</strong>
              <span class="text-xs text-gray-400">Novo item no catálogo</span>
            </div>
          </a>
          <a href="#/banners" class="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition flex items-center gap-3">
            <i class="ri-image-add-line text-2xl text-amber-400"></i>
            <div>
              <strong class="block text-sm text-white">Nova Campanha</strong>
              <span class="text-xs text-gray-400">Banner promocional</span>
            </div>
          </a>
          <a href="#/empresa" class="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition flex items-center gap-3">
            <i class="ri-edit-line text-2xl text-blue-400"></i>
            <div>
              <strong class="block text-sm text-white">Atualizar Horários</strong>
              <span class="text-xs text-gray-400">Telefones e endereço</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;

  // Fetch counts from Supabase if connected
  if (supabaseClient) {
    try {
      const [prods, cats, banners, deps] = await Promise.all([
        supabaseClient.from('core_product').select('id', { count: 'exact' }),
        supabaseClient.from('core_category').select('id', { count: 'exact' }),
        supabaseClient.from('core_banner').select('id', { count: 'exact' }),
        supabaseClient.from('core_testimonial').select('id', { count: 'exact' }),
      ]);

      document.getElementById('dashProdCount').textContent = prods.count || 0;
      document.getElementById('dashCatCount').textContent = cats.count || 0;
      document.getElementById('dashBannerCount').textContent = banners.count || 0;
      document.getElementById('dashDepCount').textContent = deps.count || 0;
    } catch (e) {
      console.log('Dashboard stats error:', e);
    }
  }
}

// ----------------------------------------------------
// UI Helpers: Toast & Modal
// ----------------------------------------------------

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-600 border-emerald-400' : 'bg-red-600 border-red-400';
  const iconClass = type === 'success' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill';

  toast.className = `${bgClass} text-white px-5 py-3 rounded-xl border shadow-2xl flex items-center gap-3 text-sm font-semibold transition-all duration-300 transform translate-y-2 opacity-0`;
  toast.innerHTML = `<i class="${iconClass} text-lg"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function openModal(html) {
  const modal = document.getElementById('adminModal');
  const body = document.getElementById('modalBody');
  if (modal && body) {
    body.innerHTML = html;
    modal.classList.remove('hidden');
  }
}

function closeModal() {
  const modal = document.getElementById('adminModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function initModalEvents() {
  const closeBtn = document.getElementById('closeModalBtn');
  const modal = document.getElementById('adminModal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}
