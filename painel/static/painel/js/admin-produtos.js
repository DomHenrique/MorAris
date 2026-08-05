// Products Module CRUD

async function renderProdutosModule(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-3">
          <input type="text" id="prodSearch" placeholder="Buscar produto..." class="gridd-input max-w-xs" />
          <select id="prodCategoryFilter" class="gridd-select max-w-xs">
            <option value="">Todas Categorias</option>
          </select>
        </div>
        <button id="addProdBtn" class="gridd-btn-primary">
          <i class="ri-add-line"></i> Novo Produto
        </button>
      </div>

      <div class="gridd-card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="gridd-table">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Sob Consulta</th>
                <th>Ativo</th>
                <th>Destaque</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody id="prodTableBody">
              <tr>
                <td colspan="8" class="text-center py-8 text-gray-400">Carregando produtos...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  document.getElementById('addProdBtn').addEventListener('click', () => openProductFormModal());
  document.getElementById('prodSearch').addEventListener('input', filterProducts);
  document.getElementById('prodCategoryFilter').addEventListener('change', filterProducts);

  await loadProductsData();
}

let allProducts = [];
let allCategories = [];

async function loadProductsData() {
  if (!supabaseClient) return;

  try {
    const [prodRes, catRes] = await Promise.all([
      supabaseClient.from('core_product').select('*, category:core_category(*)').order('id', { ascending: false }),
      supabaseClient.from('core_category').select('*').order('name', { ascending: true })
    ]);

    if (prodRes.error) throw prodRes.error;
    allProducts = prodRes.data || [];
    allCategories = catRes.data || [];

    // Populate Category Filter Dropdown
    const filterSelect = document.getElementById('prodCategoryFilter');
    if (filterSelect) {
      filterSelect.innerHTML = `<option value="">Todas Categorias</option>` +
        allCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    renderProductsTable(allProducts);
  } catch (err) {
    console.error('Error loading products:', err);
    showToast('Erro ao carregar produtos do banco.', 'error');
  }
}

function renderProductsTable(products) {
  const tbody = document.getElementById('prodTableBody');
  if (!tbody) return;

  if (!products.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-gray-400">Nenhum produto encontrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(p => {
    const imgUrl = p.image ? getPublicStorageUrl(p.image) : '';
    const catName = p.category ? p.category.name : '-';
    const priceText = p.price ? `R$ ${Number(p.price).toFixed(2).replace('.', ',')}` : '-';

    return `
      <tr>
        <td>
          ${imgUrl ? `
            <div class="admin-img-wrap">
              <img src="${imgUrl}" alt="${p.name}" class="admin-img-thumb" />
              <div class="admin-img-popover">
                <img src="${imgUrl}" alt="${p.name}" />
                <span class="text-xs font-bold text-gray-200 block mt-2">${p.name}</span>
              </div>
            </div>
          ` : '<span class="text-gray-500 text-xs">Sem foto</span>'}
        </td>
        <td class="font-bold text-white">${p.name}</td>
        <td><span class="px-2.5 py-1 bg-white/5 rounded-md text-xs font-semibold text-orange-400">${catName}</span></td>
        <td class="font-semibold">${priceText}</td>
        <td>
          <button onclick="toggleProductField(${p.id}, 'sob_consulta', ${!p.sob_consulta})" class="${p.sob_consulta ? 'gridd-badge-danger' : 'gridd-badge-success'} cursor-pointer">
            ${p.sob_consulta ? 'Sim' : 'Não'}
          </button>
        </td>
        <td>
          <button onclick="toggleProductField(${p.id}, 'is_active', ${!p.is_active})" class="${p.is_active ? 'gridd-badge-success' : 'gridd-badge-danger'} cursor-pointer">
            ${p.is_active ? 'Ativo' : 'Inativo'}
          </button>
        </td>
        <td>
          <button onclick="toggleProductField(${p.id}, 'is_highlight', ${!p.is_highlight})" class="${p.is_highlight ? 'gridd-badge-success' : 'gridd-badge-danger'} cursor-pointer">
            ${p.is_highlight ? 'Sim' : 'Não'}
          </button>
        </td>
        <td class="text-right space-x-2">
          <button onclick="editProduct(${p.id})" class="gridd-btn-secondary py-1 px-2 text-xs" title="Editar">
            <i class="ri-edit-line"></i>
          </button>
          <button onclick="deleteProduct(${p.id})" class="gridd-btn-danger py-1 px-2 text-xs" title="Excluir">
            <i class="ri-delete-bin-line"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterProducts() {
  const query = (document.getElementById('prodSearch')?.value || '').toLowerCase();
  const catId = document.getElementById('prodCategoryFilter')?.value;

  const filtered = allProducts.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query));
    const matchCat = !catId || String(p.category_id || (p.category && p.category.id)) === String(catId);
    return matchQuery && matchCat;
  });

  renderProductsTable(filtered);
}

async function toggleProductField(id, field, value) {
  try {
    const { error } = await supabaseClient.from('core_product').update({ [field]: value }).eq('id', id);
    if (error) throw error;
    showToast('Produto atualizado!', 'success');
    await loadProductsData();
  } catch (err) {
    showToast('Erro ao atualizar produto.', 'error');
  }
}

function openProductFormModal(prod = null) {
  const isEdit = !!prod;

  const formHtml = `
    <h3 class="text-lg font-extrabold text-white mb-6">${isEdit ? 'Editar Produto' : 'Novo Produto'}</h3>
    <form id="prodForm" class="space-y-4">
      <input type="hidden" id="prodId" value="${prod ? prod.id : ''}" />

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Nome do Produto</label>
        <input type="text" id="prodName" required class="gridd-input" value="${prod ? prod.name : ''}" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Categoria</label>
          <select id="prodCategory" required class="gridd-select">
            <option value="">Selecione...</option>
            ${allCategories.map(c => `<option value="${c.id}" ${prod && (prod.category_id === c.id || (prod.category && prod.category.id === c.id)) ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Preço (R$)</label>
          <input type="number" step="0.01" id="prodPrice" class="gridd-input" value="${prod && prod.price ? prod.price : ''}" placeholder="0.00" />
        </div>
        
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Máx. Parcelas</label>
          <input type="number" id="prodMaxInstallments" class="gridd-input" value="${prod && prod.max_installments ? prod.max_installments : '0'}" placeholder="Ex: 10" />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Un. de Medida</label>
          <input type="text" id="prodUnit" class="gridd-input" value="${prod && prod.unit ? prod.unit : ''}" placeholder="Ex: m², un" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Descrição</label>
        <textarea id="prodDesc" rows="3" class="gridd-textarea">${prod && prod.description ? prod.description : ''}</textarea>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">
          Imagem Principal <span class="text-[11px] text-gray-400 font-normal normal-case ml-1">(Recomendado: 800x800px ou proporção 1:1, fundo transparente ou branco - PNG, JPG ou WebP)</span>
        </label>
        <input type="file" id="prodImgFile" accept="image/*" class="gridd-input text-xs" />
        ${prod && prod.image ? `<p class="text-xs text-orange-400 mt-1">Imagem atual: ${prod.image}</p>` : ''}
      </div>

      <div class="flex flex-wrap gap-6 pt-2">
        <label class="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" id="prodActive" ${!prod || prod.is_active ? 'checked' : ''} class="accent-orange-500" />
          <span>Ativo no site</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" id="prodHighlight" ${prod && prod.is_highlight ? 'checked' : ''} class="accent-orange-500" />
          <span>Destaque</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" id="prodConsulta" ${prod && prod.sob_consulta ? 'checked' : ''} class="accent-orange-500" />
          <span>Sob Consulta</span>
        </label>
      </div>

      <div class="pt-4 flex justify-end gap-3 border-t border-gray-700">
        <button type="button" onclick="closeModal()" class="gridd-btn-secondary">Cancelar</button>
        <button type="submit" class="gridd-btn-primary">Salvar Produto</button>
      </div>
    </form>
  `;

  openModal(formHtml);

  document.getElementById('prodForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveProduct(prod);
  });
}

async function saveProduct(existingProd) {
  const id = document.getElementById('prodId').value;
  const name = document.getElementById('prodName').value.trim();
  const category_id = parseInt(document.getElementById('prodCategory').value, 10);
  const priceVal = document.getElementById('prodPrice').value;
  const price = priceVal ? parseFloat(priceVal) : null;
  const description = document.getElementById('prodDesc').value.trim();
  const max_installments = parseInt(document.getElementById('prodMaxInstallments').value, 10) || 0;
  const unit = document.getElementById('prodUnit').value.trim();
  const is_active = document.getElementById('prodActive').checked;
  const is_highlight = document.getElementById('prodHighlight').checked;
  const sob_consulta = document.getElementById('prodConsulta').checked;
  const fileInput = document.getElementById('prodImgFile');

  let imagePath = existingProd ? existingProd.image : null;

  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `products/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    try {
      const { data, error: uploadErr } = await supabaseClient.storage.from('kastello-media').upload(fileName, file);
      if (uploadErr) throw uploadErr;
      imagePath = fileName;
    } catch (err) {
      showToast('Erro ao fazer upload da imagem.', 'error');
      console.error(err);
      return;
    }
  }

  const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const payload = {
    name,
    slug,
    category_id,
    price,
    description,
    max_installments,
    unit,
    image: imagePath,
    is_active,
    is_highlight,
    sob_consulta
  };

  try {
    if (id) {
      const { error } = await supabaseClient.from('core_product').update(payload).eq('id', id);
      if (error) throw error;
      showToast('Produto editado com sucesso!', 'success');
    } else {
      const { error } = await supabaseClient.from('core_product').insert([payload]);
      if (error) throw error;
      showToast('Produto criado com sucesso!', 'success');
    }

    closeModal();
    await loadProductsData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar produto.', 'error');
  }
}

function editProduct(id) {
  const prod = allProducts.find(p => p.id === id);
  if (prod) openProductFormModal(prod);
}

async function deleteProduct(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  try {
    const { error } = await supabaseClient.from('core_product').delete().eq('id', id);
    if (error) throw error;
    showToast('Produto excluído com sucesso!', 'success');
    await loadProductsData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao excluir produto.', 'error');
  }
}
