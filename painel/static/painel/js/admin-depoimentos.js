// Testimonials Module CRUD

async function renderDepoimentosModule(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-bold text-white">Depoimentos dos Clientes</h3>
        <button id="addDepBtn" class="gridd-btn-primary">
          <i class="ri-add-line"></i> Novo Depoimento
        </button>
      </div>

      <div class="gridd-card overflow-hidden">
        <table class="gridd-table">
          <thead>
            <tr>
              <th>Foto Perfil</th>
              <th>Nome do Cliente</th>
              <th>Cidade/UF</th>
              <th>Nota</th>
              <th>Depoimento</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody id="depTableBody">
            <tr><td colspan="6" class="text-center py-6 text-gray-400">Carregando depoimentos...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('addDepBtn').addEventListener('click', () => openTestimonialModal());

  await loadTestimonialsData();
}

let testimonialsList = [];

async function loadTestimonialsData() {
  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient.from('core_testimonial').select('*').order('id', { ascending: false });
    if (error) throw error;
    testimonialsList = data || [];
    renderTestimonialsTable(testimonialsList);
  } catch (err) {
    console.error(err);
    showToast('Erro ao carregar depoimentos.', 'error');
  }
}

function renderTestimonialsTable(list) {
  const tbody = document.getElementById('depTableBody');
  if (!tbody) return;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-gray-400">Nenhum depoimento cadastrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(t => {
    const imgUrl = t.profile_picture ? getPublicStorageUrl(t.profile_picture) : '';
    const stars = '★'.repeat(t.rating || 5);

    return `
      <tr>
        <td>
          ${imgUrl ? `
            <div class="admin-img-wrap">
              <img src="${imgUrl}" alt="${t.client_name}" class="admin-img-thumb rounded-full" />
              <div class="admin-img-popover"><img src="${imgUrl}" alt="${t.client_name}" /></div>
            </div>
          ` : '<div class="w-8 h-8 rounded-full bg-gray-700 text-white font-bold flex items-center justify-center text-xs">C</div>'}
        </td>
        <td class="font-bold text-white">${t.client_name}</td>
        <td class="text-gray-300 text-xs">${t.city || '-'}</td>
        <td class="text-amber-400 font-bold">${stars}</td>
        <td class="text-xs text-gray-300 max-w-xs truncate">${t.text}</td>
        <td class="text-right space-x-2">
          <button onclick="editTestimonial(${t.id})" class="gridd-btn-secondary py-1 px-2 text-xs"><i class="ri-edit-line"></i></button>
          <button onclick="deleteTestimonial(${t.id})" class="gridd-btn-danger py-1 px-2 text-xs"><i class="ri-delete-bin-line"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function openTestimonialModal(t = null) {
  const isEdit = !!t;
  const html = `
    <h3 class="text-lg font-extrabold text-white mb-6">${isEdit ? 'Editar Depoimento' : 'Novo Depoimento'}</h3>
    <form id="depForm" class="space-y-4">
      <input type="hidden" id="depId" value="${t ? t.id : ''}" />
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Nome do Cliente</label>
          <input type="text" id="depName" required class="gridd-input" value="${t ? t.client_name : ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Cidade / UF</label>
          <input type="text" id="depCity" required class="gridd-input" value="${t ? t.city : ''}" placeholder="Tupandi, RS" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Nota (1 a 5 Estrelas)</label>
        <select id="depRating" class="gridd-select">
          <option value="5" ${!t || t.rating === 5 ? 'selected' : ''}>5 Estrelas (★★★★★)</option>
          <option value="4" ${t && t.rating === 4 ? 'selected' : ''}>4 Estrelas (★★★★☆)</option>
          <option value="3" ${t && t.rating === 3 ? 'selected' : ''}>3 Estrelas (★★★☆☆)</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Texto do Depoimento</label>
        <textarea id="depText" required rows="4" class="gridd-textarea">${t ? t.text : ''}</textarea>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">
          Foto de Perfil <span class="text-[11px] text-gray-400 font-normal normal-case ml-1">(Opcional - Recomendado: 200x200px ou proporção 1:1 - PNG, JPG ou WebP)</span>
        </label>
        <input type="file" id="depPicFile" accept="image/*" class="gridd-input text-xs" />
      </div>

      <div class="pt-4 flex justify-end gap-3 border-t border-gray-700">
        <button type="button" onclick="closeModal()" class="gridd-btn-secondary">Cancelar</button>
        <button type="submit" class="gridd-btn-primary">Salvar Depoimento</button>
      </div>
    </form>
  `;
  openModal(html);

  document.getElementById('depForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveTestimonial(t);
  });
}

async function saveTestimonial(existingT) {
  const id = document.getElementById('depId').value;
  const client_name = document.getElementById('depName').value.trim();
  const city = document.getElementById('depCity').value.trim();
  const rating = parseInt(document.getElementById('depRating').value, 10);
  const text = document.getElementById('depText').value.trim();
  const picFile = document.getElementById('depPicFile').files[0];

  let profile_picture = existingT ? existingT.profile_picture : null;

  try {
    if (picFile) {
      const fileName = `testimonials/${Date.now()}_${picFile.name}`;
      await supabaseClient.storage.from('kastello-media').upload(fileName, picFile);
      profile_picture = fileName;
    }

    const payload = { client_name, city, rating, text, profile_picture };

    if (id) {
      await supabaseClient.from('core_testimonial').update(payload).eq('id', id);
    } else {
      await supabaseClient.from('core_testimonial').insert([payload]);
    }

    showToast('Depoimento salvo com sucesso!', 'success');
    closeModal();
    await loadTestimonialsData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar depoimento.', 'error');
  }
}

function editTestimonial(id) {
  const t = testimonialsList.find(item => item.id === id);
  if (t) openTestimonialModal(t);
}

async function deleteTestimonial(id) {
  if (!confirm('Excluir este depoimento?')) return;
  await supabaseClient.from('core_testimonial').delete().eq('id', id);
  showToast('Depoimento excluído!', 'success');
  await loadTestimonialsData();
}
