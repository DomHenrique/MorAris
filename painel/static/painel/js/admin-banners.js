// Banners & Campaigns Module CRUD

async function renderBannersModule(container) {
  container.innerHTML = `
    <div class="space-y-8">
      <!-- Section 1: Campaigns -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold text-white">Campanhas</h3>
          <button id="addCampBtn" class="gridd-btn-primary">
            <i class="ri-add-line"></i> Nova Campanha
          </button>
        </div>
        <div class="gridd-card overflow-hidden">
          <table class="gridd-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Subtítulo</th>
                <th>Status</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody id="campTableBody">
              <tr><td colspan="4" class="text-center py-6 text-gray-400">Carregando campanhas...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section 2: Banners -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold text-white">Banners do Carrossel Hero</h3>
          <button id="addBannerBtn" class="gridd-btn-primary">
            <i class="ri-add-line"></i> Novo Banner
          </button>
        </div>
        <div class="gridd-card overflow-hidden">
          <table class="gridd-table">
            <thead>
              <tr>
                <th>Preview Desktop</th>
                <th>Título / Identificação</th>
                <th>Campanha</th>
                <th>Ordem</th>
                <th>Texto Overlay</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody id="bannerTableBody">
              <tr><td colspan="6" class="text-center py-6 text-gray-400">Carregando banners...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  document.getElementById('addCampBtn').addEventListener('click', () => openCampaignModal());
  document.getElementById('addBannerBtn').addEventListener('click', () => openBannerModal());

  await loadBannersAndCampaignsData();
}

let campaignsList = [];
let bannersList = [];

async function loadBannersAndCampaignsData() {
  if (!supabaseClient) return;

  try {
    const [campRes, bannerRes] = await Promise.all([
      supabaseClient.from('core_campaign').select('*').order('id', { ascending: false }),
      supabaseClient.from('core_banner').select('*, campaign:core_campaign(*)').order('order', { ascending: true })
    ]);

    campaignsList = campRes.data || [];
    bannersList = bannerRes.data || [];

    renderCampaignsTable(campaignsList);
    renderBannersTable(bannersList);
  } catch (err) {
    console.error(err);
    showToast('Erro ao carregar banners e campanhas.', 'error');
  }
}

function renderCampaignsTable(list) {
  const tbody = document.getElementById('campTableBody');
  if (!tbody) return;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center py-6 text-gray-400">Nenhuma campanha cadastrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(c => `
    <tr>
      <td class="font-bold text-white">${c.title}</td>
      <td class="text-gray-300 text-xs">${c.subtitle || '-'}</td>
      <td>
        <button onclick="toggleCampaignActive(${c.id}, ${!c.is_active})" class="${c.is_active ? 'gridd-badge-success' : 'gridd-badge-danger'} cursor-pointer">
          ${c.is_active ? 'Ativa' : 'Inativa'}
        </button>
      </td>
      <td class="text-right space-x-2">
        <button onclick="editCampaign(${c.id})" class="gridd-btn-secondary py-1 px-2 text-xs"><i class="ri-edit-line"></i></button>
        <button onclick="deleteCampaign(${c.id})" class="gridd-btn-danger py-1 px-2 text-xs"><i class="ri-delete-bin-line"></i></button>
      </td>
    </tr>
  `).join('');
}

function renderBannersTable(list) {
  const tbody = document.getElementById('bannerTableBody');
  if (!tbody) return;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-gray-400">Nenhum banner cadastrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(b => {
    const imgUrl = b.desktop_image ? getPublicStorageUrl(b.desktop_image) : '';
    const campName = b.campaign ? b.campaign.title : '-';

    return `
      <tr>
        <td>
          ${imgUrl ? `
            <div class="admin-img-wrap">
              <img src="${imgUrl}" alt="${b.title}" class="admin-img-thumb" />
              <div class="admin-img-popover"><img src="${imgUrl}" alt="${b.title}" /></div>
            </div>
          ` : '<span class="text-xs text-gray-500">Sem foto</span>'}
        </td>
        <td class="font-bold text-white">${b.title}</td>
        <td><span class="px-2.5 py-1 bg-white/5 rounded text-xs text-orange-400 font-semibold">${campName}</span></td>
        <td class="font-bold">${b.order}</td>
        <td>
          <span class="${b.show_text_overlay ? 'gridd-badge-success' : 'gridd-badge-danger'}">
            ${b.show_text_overlay ? 'Sim' : 'Não'}
          </span>
        </td>
        <td class="text-right space-x-2">
          <button onclick="editBanner(${b.id})" class="gridd-btn-secondary py-1 px-2 text-xs"><i class="ri-edit-line"></i></button>
          <button onclick="deleteBanner(${b.id})" class="gridd-btn-danger py-1 px-2 text-xs"><i class="ri-delete-bin-line"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

async function toggleCampaignActive(id, value) {
  try {
    const { error } = await supabaseClient.from('core_campaign').update({ is_active: value }).eq('id', id);
    if (error) throw error;
    showToast('Campanha atualizada!', 'success');
    await loadBannersAndCampaignsData();
  } catch (err) {
    showToast('Erro ao atualizar campanha.', 'error');
  }
}

function openCampaignModal(camp = null) {
  const isEdit = !!camp;
  const html = `
    <h3 class="text-lg font-extrabold text-white mb-6">${isEdit ? 'Editar Campanha' : 'Nova Campanha'}</h3>
    <form id="campForm" class="space-y-4">
      <input type="hidden" id="campId" value="${camp ? camp.id : ''}" />
      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Título da Campanha</label>
        <input type="text" id="campTitle" required class="gridd-input" value="${camp ? camp.title : ''}" />
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Subtítulo</label>
        <input type="text" id="campSubtitle" class="gridd-input" value="${camp && camp.subtitle ? camp.subtitle : ''}" />
      </div>
      <label class="flex items-center gap-2 cursor-pointer text-sm">
        <input type="checkbox" id="campActive" ${!camp || camp.is_active ? 'checked' : ''} class="accent-orange-500" />
        <span>Campanha Ativa</span>
      </label>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-700">
        <button type="button" onclick="closeModal()" class="gridd-btn-secondary">Cancelar</button>
        <button type="submit" class="gridd-btn-primary">Salvar Campanha</button>
      </div>
    </form>
  `;
  openModal(html);
  document.getElementById('campForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('campId').value;
    const title = document.getElementById('campTitle').value.trim();
    const subtitle = document.getElementById('campSubtitle').value.trim();
    const is_active = document.getElementById('campActive').checked;

    const payload = { title, subtitle, is_active };
    try {
      if (id) {
        await supabaseClient.from('core_campaign').update(payload).eq('id', id);
      } else {
        await supabaseClient.from('core_campaign').insert([payload]);
      }
      showToast('Campanha salva!', 'success');
      closeModal();
      await loadBannersAndCampaignsData();
    } catch (e) {
      showToast('Erro ao salvar campanha.', 'error');
    }
  });
}

function openBannerModal(banner = null) {
  const isEdit = !!banner;
  const html = `
    <h3 class="text-lg font-extrabold text-white mb-6">${isEdit ? 'Editar Banner' : 'Novo Banner'}</h3>
    <form id="bannerForm" class="space-y-4">
      <input type="hidden" id="bannerId" value="${banner ? banner.id : ''}" />
      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Título / Identificação Interna</label>
        <input type="text" id="bannerTitle" required class="gridd-input" value="${banner ? banner.title : ''}" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Campanha</label>
          <select id="bannerCampaign" required class="gridd-select">
            <option value="">Selecione...</option>
            ${campaignsList.map(c => `<option value="${c.id}" ${banner && (banner.campaign_id === c.id || (banner.campaign && banner.campaign.id === c.id)) ? 'selected' : ''}>${c.title}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Ordem de Exibição</label>
          <input type="number" id="bannerOrder" class="gridd-input" value="${banner ? banner.order : 0}" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Link de Redirecionamento (URL)</label>
        <input type="url" id="bannerUrl" class="gridd-input" value="${banner && banner.redirect_url ? banner.redirect_url : ''}" placeholder="https://wa.me/..." />
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">
          Imagem Desktop <span class="text-[11px] text-gray-400 font-normal normal-case ml-1">(Recomendado: 1920x600px ou proporção 16:5 - PNG, JPG ou WebP)</span>
        </label>
        <input type="file" id="desktopImgFile" accept="image/*" class="gridd-input text-xs" />
      </div>
      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">
          Imagem Mobile <span class="text-[11px] text-gray-400 font-normal normal-case ml-1">(Opcional - Recomendado: 800x800px ou proporção 1:1 - PNG, JPG ou WebP)</span>
        </label>
        <input type="file" id="mobileImgFile" accept="image/*" class="gridd-input text-xs" />
      </div>
      <label class="flex items-center gap-2 cursor-pointer text-sm">
        <input type="checkbox" id="bannerOverlay" ${banner && banner.show_text_overlay ? 'checked' : ''} class="accent-orange-500" />
        <span>Exibir texto por cima da imagem?</span>
      </label>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-700">
        <button type="button" onclick="closeModal()" class="gridd-btn-secondary">Cancelar</button>
        <button type="submit" class="gridd-btn-primary">Salvar Banner</button>
      </div>
    </form>
  `;
  openModal(html);
  document.getElementById('bannerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveBanner(banner);
  });
}

async function saveBanner(existingBanner) {
  const id = document.getElementById('bannerId').value;
  const title = document.getElementById('bannerTitle').value.trim();
  const campaign_id = parseInt(document.getElementById('bannerCampaign').value, 10);
  const order = parseInt(document.getElementById('bannerOrder').value, 10) || 0;
  const redirect_url = document.getElementById('bannerUrl').value.trim();
  const show_text_overlay = document.getElementById('bannerOverlay').checked;

  const desktopFile = document.getElementById('desktopImgFile').files[0];
  const mobileFile = document.getElementById('mobileImgFile').files[0];

  let desktop_image = existingBanner ? existingBanner.desktop_image : null;
  let mobile_image = existingBanner ? existingBanner.mobile_image : null;

  try {
    if (desktopFile) {
      const dName = `banners/desktop/${Date.now()}_${desktopFile.name}`;
      await supabaseClient.storage.from('kastello-media').upload(dName, desktopFile);
      desktop_image = dName;
    }
    if (mobileFile) {
      const mName = `banners/mobile/${Date.now()}_${mobileFile.name}`;
      await supabaseClient.storage.from('kastello-media').upload(mName, mobileFile);
      mobile_image = mName;
    }

    const payload = { title, campaign_id, order, redirect_url, show_text_overlay, desktop_image, mobile_image };

    if (id) {
      await supabaseClient.from('core_banner').update(payload).eq('id', id);
    } else {
      await supabaseClient.from('core_banner').insert([payload]);
    }

    showToast('Banner salvo com sucesso!', 'success');
    closeModal();
    await loadBannersAndCampaignsData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar banner.', 'error');
  }
}

function editCampaign(id) {
  const camp = campaignsList.find(c => c.id === id);
  if (camp) openCampaignModal(camp);
}

function editBanner(id) {
  const banner = bannersList.find(b => b.id === id);
  if (banner) openBannerModal(banner);
}

async function deleteCampaign(id) {
  if (!confirm('Excluir esta campanha?')) return;
  await supabaseClient.from('core_campaign').delete().eq('id', id);
  showToast('Campanha excluída!', 'success');
  await loadBannersAndCampaignsData();
}

async function deleteBanner(id) {
  if (!confirm('Excluir este banner?')) return;
  await supabaseClient.from('core_banner').delete().eq('id', id);
  showToast('Banner excluído!', 'success');
  await loadBannersAndCampaignsData();
}
