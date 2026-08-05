// Brands Module CRUD

async function renderMarcasModule(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-bold text-white">Marcas Parceiras</h3>
        <button id="addMarcaBtn" class="gridd-btn-primary">
          <i class="ri-add-line"></i> Nova Marca
        </button>
      </div>

      <div class="gridd-card overflow-hidden">
        <table class="gridd-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nome da Marca</th>
              <th>Ordem</th>
              <th>Em Destaque</th>
              <th>Ativa</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody id="marcaTableBody">
            <tr><td colspan="6" class="text-center py-6 text-gray-400">Carregando marcas...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('addMarcaBtn').addEventListener('click', () => openMarcaModal());

  await loadMarcasData();
}

let marcasList = [];

async function loadMarcasData() {
  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient.from('empresa_marca').select('*').order('ordem', { ascending: true });
    if (error) throw error;
    marcasList = data || [];
    renderMarcasTable(marcasList);
  } catch (err) {
    console.error(err);
    showToast('Erro ao carregar marcas.', 'error');
  }
}

function renderMarcasTable(list) {
  const tbody = document.getElementById('marcaTableBody');
  if (!tbody) return;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-gray-400">Nenhuma marca cadastrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(m => {
    const logoUrl = m.logo ? getPublicStorageUrl(m.logo) : '';

    return `
      <tr>
        <td>
          ${logoUrl ? `
            <div class="admin-img-wrap">
              <img src="${logoUrl}" alt="${m.nome}" class="admin-img-thumb" />
              <div class="admin-img-popover"><img src="${logoUrl}" alt="${m.nome}" /></div>
            </div>
          ` : '<span class="text-xs text-gray-500">Sem logo</span>'}
        </td>
        <td class="font-bold text-white">${m.nome}</td>
        <td class="font-bold">${m.ordem || 0}</td>
        <td>
          <button onclick="toggleMarcaField(${m.id}, 'em_destaque', ${!m.em_destaque})" class="${m.em_destaque ? 'gridd-badge-success' : 'gridd-badge-danger'} cursor-pointer">
            ${m.em_destaque ? 'Sim' : 'Não'}
          </button>
        </td>
        <td>
          <button onclick="toggleMarcaField(${m.id}, 'is_active', ${!m.is_active})" class="${m.is_active ? 'gridd-badge-success' : 'gridd-badge-danger'} cursor-pointer">
            ${m.is_active ? 'Ativa' : 'Inativa'}
          </button>
        </td>
        <td class="text-right space-x-2">
          <button onclick="editMarca(${m.id})" class="gridd-btn-secondary py-1 px-2 text-xs"><i class="ri-edit-line"></i></button>
          <button onclick="deleteMarca(${m.id})" class="gridd-btn-danger py-1 px-2 text-xs"><i class="ri-delete-bin-line"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

async function toggleMarcaField(id, field, val) {
  try {
    await supabaseClient.from('empresa_marca').update({ [field]: val }).eq('id', id);
    showToast('Marca atualizada!', 'success');
    await loadMarcasData();
  } catch (e) {
    showToast('Erro ao atualizar marca.', 'error');
  }
}

function openMarcaModal(m = null) {
  const isEdit = !!m;
  const html = `
    <h3 class="text-lg font-extrabold text-white mb-6">${isEdit ? 'Editar Marca' : 'Nova Marca'}</h3>
    <form id="marcaForm" class="space-y-4">
      <input type="hidden" id="marcaId" value="${m ? m.id : ''}" />
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Nome da Marca</label>
          <input type="text" id="marcaName" required class="gridd-input" value="${m ? m.nome : ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Ordem de Exibição</label>
          <input type="number" id="marcaOrdem" class="gridd-input" value="${m ? m.ordem : 0}" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">
          Logo da Marca <span class="text-[11px] text-gray-400 font-normal normal-case ml-1">(Recomendado: 300x150px com fundo transparente - PNG, SVG ou WebP)</span>
        </label>
        <input type="file" id="marcaLogoFile" accept="image/*" class="gridd-input text-xs" />
        ${m && m.logo ? `<p class="text-xs text-orange-400 mt-1">Logo atual: ${m.logo}</p>` : ''}
      </div>

      <div class="flex gap-6 pt-2">
        <label class="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" id="marcaActive" ${!m || m.is_active ? 'checked' : ''} class="accent-orange-500" />
          <span>Marca Ativa</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" id="marcaDestaque" ${m && m.em_destaque ? 'checked' : ''} class="accent-orange-500" />
          <span>Em Destaque</span>
        </label>
      </div>

      <div class="pt-4 flex justify-end gap-3 border-t border-gray-700">
        <button type="button" onclick="closeModal()" class="gridd-btn-secondary">Cancelar</button>
        <button type="submit" class="gridd-btn-primary">Salvar Marca</button>
      </div>
    </form>
  `;
  openModal(html);

  document.getElementById('marcaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveMarca(m);
  });
}

async function saveMarca(existingM) {
  const id = document.getElementById('marcaId').value;
  const nome = document.getElementById('marcaName').value.trim();
  const ordem = parseInt(document.getElementById('marcaOrdem').value, 10) || 0;
  const is_active = document.getElementById('marcaActive').checked;
  const em_destaque = document.getElementById('marcaDestaque').checked;
  const logoFile = document.getElementById('marcaLogoFile').files[0];

  let logo = existingM ? existingM.logo : null;

  try {
    if (logoFile) {
      const fileName = `marcas/${Date.now()}_${logoFile.name}`;
      await supabaseClient.storage.from('kastello-media').upload(fileName, logoFile);
      logo = fileName;
    }

    const payload = { nome, ordem, is_active, em_destaque, logo };

    if (id) {
      await supabaseClient.from('empresa_marca').update(payload).eq('id', id);
    } else {
      await supabaseClient.from('empresa_marca').insert([payload]);
    }

    showToast('Marca salva com sucesso!', 'success');
    closeModal();
    await loadMarcasData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar marca.', 'error');
  }
}

function editMarca(id) {
  const m = marcasList.find(item => item.id === id);
  if (m) openMarcaModal(m);
}

async function deleteMarca(id) {
  if (!confirm('Excluir esta marca?')) return;
  await supabaseClient.from('empresa_marca').delete().eq('id', id);
  showToast('Marca excluída!', 'success');
  await loadMarcasData();
}
