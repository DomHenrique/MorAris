// Categories Module CRUD

async function renderCategoriasModule(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-bold text-white">Categorias de Produtos</h3>
        <button id="addCatBtn" class="gridd-btn-primary">
          <i class="ri-add-line"></i> Nova Categoria
        </button>
      </div>

      <div class="gridd-card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="gridd-table">
            <thead>
              <tr>
                <th>Ordem</th>
                <th>Ícone</th>
                <th>Nome</th>
                <th>Slug</th>
                <th>Classe Icon (Bootstrap)</th>
                <th>Status</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody id="catTableBody">
              <tr>
                <td colspan="6" class="text-center py-8 text-gray-400">Carregando categorias...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  document.getElementById('addCatBtn').addEventListener('click', () => openCategoryModal());

  await loadCategoriesData();
}

let categoriesList = [];

async function loadCategoriesData() {
  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient.from('core_category').select('*').order('display_order', { ascending: true }).order('name', { ascending: true });
    if (error) throw error;
    categoriesList = data || [];
    renderCategoriesTable(categoriesList);
  } catch (err) {
    console.error(err);
    showToast('Erro ao carregar categorias.', 'error');
  }
}

function renderCategoriesTable(list) {
  const tbody = document.getElementById('catTableBody');
  if (!tbody) return;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-gray-400">Nenhuma categoria cadastrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(c => {
    const iconUrl = c.icon_svg ? getPublicStorageUrl(c.icon_svg) : '';
    const isActive = c.is_active !== false;

    return `
      <tr>
        <td class="font-mono text-gray-400 text-xs text-center">${c.display_order !== undefined ? c.display_order : 0}</td>
        <td>
          ${iconUrl ? `
            <div class="admin-img-wrap">
              <span class="admin-img-thumb-svg" style="display:inline-block; width:36px; height:36px; background-color: #fc6d01; -webkit-mask: url('${iconUrl}') no-repeat center / contain; mask: url('${iconUrl}') no-repeat center / contain;"></span>
              <div class="admin-img-popover" style="padding: 8px; background: #242b35; border-radius: 8px; border: 1px solid #374151;">
                <span style="display:inline-block; width:64px; height:64px; background-color: #fc6d01; -webkit-mask: url('${iconUrl}') no-repeat center / contain; mask: url('${iconUrl}') no-repeat center / contain;"></span>
              </div>
            </div>
          ` : `<i class="bi ${c.icon_class || 'bi-box'} text-2xl text-orange-400"></i>`}
        </td>
        <td class="font-bold text-white">${c.name}</td>
        <td class="text-gray-400 text-xs font-mono">${c.slug}</td>
        <td class="text-xs text-gray-300 font-mono">${c.icon_class || '-'}</td>
        <td>
          <button type="button" onclick="toggleCategoryActive(${c.id}, ${isActive})" title="Clique para alterar status" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'} transition-all cursor-pointer">
            <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-rose-400'}"></span>
            ${isActive ? 'Ativo' : 'Inativo'}
          </button>
        </td>
        <td class="text-right space-x-2">
          <button onclick="editCategory(${c.id})" class="gridd-btn-secondary py-1 px-2 text-xs" title="Editar">
            <i class="ri-edit-line"></i>
          </button>
          <button onclick="deleteCategory(${c.id})" class="gridd-btn-danger py-1 px-2 text-xs" title="Excluir">
            <i class="ri-delete-bin-line"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openCategoryModal(cat = null) {
  const isEdit = !!cat;
  const isActive = !cat || cat.is_active !== false;

  const html = `
    <h3 class="text-lg font-extrabold text-white mb-6">${isEdit ? 'Editar Categoria' : 'Nova Categoria'}</h3>
    <form id="catForm" class="space-y-4">
      <input type="hidden" id="catId" value="${cat ? cat.id : ''}" />

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Nome da Categoria</label>
          <input type="text" id="catName" required class="gridd-input" value="${cat ? cat.name : ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Ordem de Exibição</label>
          <input type="number" id="catDisplayOrder" class="gridd-input" value="${cat && cat.display_order !== undefined ? cat.display_order : 0}" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">
          Ícone SVG (Upload) <span class="text-[11px] text-gray-400 font-normal normal-case ml-1">(Recomendado: 64x64px, arquivo de vetor .svg)</span>
        </label>
        <input type="file" id="catSvgFile" accept=".svg,image/svg+xml" class="gridd-input text-xs" />
        ${cat && cat.icon_svg ? `<p class="text-xs text-orange-400 mt-1">SVG atual: ${cat.icon_svg}</p>` : ''}
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Classe do Ícone Bootstrap (opcional)</label>
        <input type="text" id="catIconClass" class="gridd-input" value="${cat && cat.icon_class ? cat.icon_class : ''}" placeholder="bi-tools" />
        <span class="text-[10px] text-gray-400 block mt-1">Ex: bi-tree, bi-house, bi-tools, bi-paint-bucket</span>
      </div>

      <div class="flex items-center gap-3 pt-2 bg-gray-800/40 p-3 rounded-lg border border-gray-700/50">
        <input type="checkbox" id="catIsActive" class="w-4 h-4 rounded border-gray-600 bg-gray-900 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900 cursor-pointer" ${isActive ? 'checked' : ''} />
        <div>
          <label for="catIsActive" class="text-sm font-semibold text-white cursor-pointer select-none">
            Categoria ativa no site
          </label>
          <p class="text-xs text-gray-400">Categorias inativas não aparecem na página inicial da loja.</p>
        </div>
      </div>

      <div class="pt-4 flex justify-end gap-3 border-t border-gray-700">
        <button type="button" onclick="closeModal()" class="gridd-btn-secondary">Cancelar</button>
        <button type="submit" class="gridd-btn-primary">Salvar Categoria</button>
      </div>
    </form>
  `;

  openModal(html);

  document.getElementById('catForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveCategory(cat);
  });
}

async function saveCategory(existingCat) {
  const id = document.getElementById('catId').value;
  const name = document.getElementById('catName').value.trim();
  const display_order = parseInt(document.getElementById('catDisplayOrder').value) || 0;
  const icon_class = document.getElementById('catIconClass').value.trim();
  const is_active = document.getElementById('catIsActive') ? document.getElementById('catIsActive').checked : true;
  const fileInput = document.getElementById('catSvgFile');

  let icon_svg = existingCat ? existingCat.icon_svg : null;

  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const fileName = `categories/icons/${Date.now()}_${file.name}`;

    try {
      const { data, error } = await supabaseClient.storage.from('kastello-media').upload(fileName, file);
      if (error) throw error;
      icon_svg = fileName;
    } catch (err) {
      showToast('Erro ao fazer upload do SVG.', 'error');
      return;
    }
  }

  const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const payload = { name, slug, icon_svg, icon_class, is_active, display_order };

  try {
    if (id) {
      const { error } = await supabaseClient.from('core_category').update(payload).eq('id', id);
      if (error) throw error;
      showToast('Categoria atualizada!', 'success');
    } else {
      const { error } = await supabaseClient.from('core_category').insert([payload]);
      if (error) throw error;
      showToast('Categoria criada!', 'success');
    }

    closeModal();
    await loadCategoriesData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar categoria.', 'error');
  }
}

async function toggleCategoryActive(id, currentStatus) {
  try {
    const newStatus = !currentStatus;
    const { error } = await supabaseClient.from('core_category').update({ is_active: newStatus }).eq('id', id);
    if (error) throw error;
    showToast(`Categoria ${newStatus ? 'ativada' : 'desativada'} com sucesso!`, 'success');
    await loadCategoriesData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao alterar status da categoria.', 'error');
  }
}

function editCategory(id) {
  const cat = categoriesList.find(c => c.id === id);
  if (cat) openCategoryModal(cat);
}

async function deleteCategory(id) {
  if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

  try {
    const { error } = await supabaseClient.from('core_category').delete().eq('id', id);
    if (error) throw error;
    showToast('Categoria excluída!', 'success');
    await loadCategoriesData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao excluir categoria. Verifique se existem produtos associados.', 'error');
  }
}
