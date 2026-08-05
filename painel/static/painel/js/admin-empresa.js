// Company & Units Module CRUD

async function renderEmpresaModule(container) {
  container.innerHTML = `
    <div class="space-y-8">
      <!-- Section 1: About Company -->
      <div class="gridd-card p-6">
        <h3 class="text-lg font-bold text-white mb-4">Sobre a Empresa (Página Inicial)</h3>
        <form id="sobreForm" class="space-y-4">
          <input type="hidden" id="sobreId" />
          
          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Título da Seção</label>
            <input type="text" id="sobreTitle" required class="gridd-input" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Descrição da Empresa</label>
            <div class="editor-toolbar">
              <button type="button" class="editor-toolbar-btn" onclick="formatSobreText('bold')" title="Negrito">
                <i class="ri-bold"></i> Negrito
              </button>
              <button type="button" class="editor-toolbar-btn" onclick="formatSobreText('italic')" title="Itálico">
                <i class="ri-italic"></i> Itálico
              </button>
              <button type="button" class="editor-toolbar-btn" onclick="formatSobreText('paragraph')" title="Novo Parágrafo">
                <i class="ri-paragraph"></i> Parágrafo
              </button>
              <button type="button" class="editor-toolbar-btn" onclick="formatSobreText('clear')" title="Remover Tags">
                <i class="ri-format-clear"></i> Limpar
              </button>
            </div>
            <textarea id="sobreDesc" required rows="8" class="gridd-textarea editor-textarea" placeholder="Escreva aqui a história e diferenciais da empresa..."></textarea>
            <div id="sobreDescCounter" class="editor-counter-bar">
              <span>📊 <span id="sobreCharCount" class="counter-badge">0</span> / 1500 caracteres (sugerido)</span>
              <span><span id="sobreWordCount">0</span> palavras</span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-400 mb-1">
              Foto da Loja <span class="text-[11px] text-gray-400 font-normal normal-case ml-1">(Recomendado: 800x600px ou proporção 4:3 - PNG, JPG ou WebP)</span>
            </label>
            <input type="file" id="sobrePhotoFile" accept="image/*" class="gridd-input text-xs" />
            <div id="sobrePhotoPreview" class="mt-2"></div>
          </div>

          <div class="pt-2 flex justify-end">
            <button type="submit" class="gridd-btn-primary">
              <i class="ri-save-line"></i> Salvar Informações Sobre a Loja
            </button>
          </div>
        </form>
      </div>

      <!-- Section 2: Store Units / Locations -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold text-white">Unidades / Lojas</h3>
          <button id="addUnitBtn" class="gridd-btn-primary">
            <i class="ri-add-line"></i> Nova Unidade
          </button>
        </div>

        <div class="gridd-card overflow-hidden">
          <table class="gridd-table">
            <thead>
              <tr>
                <th>Nome da Filial</th>
                <th>Cidade / UF</th>
                <th>Endereço</th>
                <th>WhatsApp / Telefone</th>
                <th>É Matriz?</th>
                <th class="text-right">Ações</th>
              </tr>
            </thead>
            <tbody id="unitTableBody">
              <tr><td colspan="6" class="text-center py-6 text-gray-400">Carregando unidades...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  document.getElementById('sobreForm').addEventListener('submit', saveSobreInfo);
  document.getElementById('addUnitBtn').addEventListener('click', () => openUnitModal());
  document.getElementById('sobreDesc').addEventListener('input', updateSobreCharCount);

  await loadEmpresaData();
}

function formatSobreText(action) {
  const textarea = document.getElementById('sobreDesc');
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  let replacement = '';

  switch (action) {
    case 'bold':
      replacement = selectedText ? `<strong>${selectedText}</strong>` : '<strong>texto em negrito</strong>';
      break;
    case 'italic':
      replacement = selectedText ? `<em>${selectedText}</em>` : '<em>texto em itálico</em>';
      break;
    case 'paragraph':
      replacement = selectedText ? `\n\n${selectedText}\n\n` : '\n\nNovo parágrafo...\n\n';
      break;
    case 'clear':
      replacement = selectedText.replace(/<[^>]*>/g, '');
      break;
  }

  textarea.setRangeText(replacement, start, end, 'select');
  textarea.focus();
  updateSobreCharCount();
}

function updateSobreCharCount() {
  const textarea = document.getElementById('sobreDesc');
  const charEl = document.getElementById('sobreCharCount');
  const wordEl = document.getElementById('sobreWordCount');
  const barEl = document.getElementById('sobreDescCounter');
  if (!textarea || !charEl || !wordEl) return;

  const val = textarea.value;
  const charLen = val.length;
  const words = val.trim() ? val.trim().split(/\s+/).length : 0;

  charEl.textContent = charLen;
  wordEl.textContent = words;

  if (barEl) {
    if (charLen > 1500) {
      barEl.className = 'editor-counter-bar danger';
    } else if (charLen > 1200) {
      barEl.className = 'editor-counter-bar warn';
    } else {
      barEl.className = 'editor-counter-bar';
    }
  }
}

let unitsList = [];
let sobreData = null;

async function loadEmpresaData() {
  if (!supabaseClient) return;

  try {
    const [sobreRes, unitRes] = await Promise.all([
      supabaseClient.from('empresa_sobreempresa').select('*').order('id', { ascending: false }).limit(1).maybeSingle(),
      supabaseClient.from('empresa_unidade').select('*').order('id', { ascending: true })
    ]);

    sobreData = sobreRes.data;
    unitsList = unitRes.data || [];

    if (sobreData) {
      document.getElementById('sobreId').value = sobreData.id;
      document.getElementById('sobreTitle').value = sobreData.title || '';
      document.getElementById('sobreDesc').value = sobreData.description || '';
      updateSobreCharCount();
      if (sobreData.foto_loja) {
        const url = getPublicStorageUrl(sobreData.foto_loja);
        document.getElementById('sobrePhotoPreview').innerHTML = `
          <img src="${url}" class="h-24 w-auto rounded-lg border border-white/20 object-cover" />
        `;
      }
    }

    renderUnitsTable(unitsList);
  } catch (err) {
    console.error(err);
    showToast('Erro ao carregar dados da empresa.', 'error');
  }
}

async function saveSobreInfo(e) {
  e.preventDefault();
  const id = document.getElementById('sobreId').value || (sobreData ? sobreData.id : null);
  const title = document.getElementById('sobreTitle').value.trim();
  const description = document.getElementById('sobreDesc').value.trim();
  const fileInput = document.getElementById('sobrePhotoFile');

  let foto_loja = sobreData ? sobreData.foto_loja : null;

  try {
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
      const fileName = `empresa/${Date.now()}_${cleanFileName}`;
      const { data: uploadData, error: uploadError } = await supabaseClient.storage.from('kastello-media').upload(fileName, file, { upsert: true });
      if (uploadError) {
        console.error('Upload Error:', uploadError);
        showToast('Erro ao enviar imagem: ' + uploadError.message, 'error');
        return;
      }
      foto_loja = fileName;
    }

    const payload = { title, description, foto_loja };

    if (id) {
      const { error: updateError } = await supabaseClient.from('empresa_sobreempresa').update(payload).eq('id', id);
      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabaseClient.from('empresa_sobreempresa').insert([payload]);
      if (insertError) throw insertError;
    }

    showToast('Informações Sobre a Loja salvas com sucesso!', 'success');
    await loadEmpresaData();
  } catch (err) {
    console.error('Save Sobre Info Error:', err);
    showToast('Erro ao salvar informações.', 'error');
  }
}

function renderUnitsTable(list) {
  const tbody = document.getElementById('unitTableBody');
  if (!tbody) return;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-gray-400">Nenhuma unidade cadastrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(u => `
    <tr>
      <td class="font-bold text-white">${u.nome}</td>
      <td class="text-xs text-gray-300">${u.cidade} - ${u.estado}</td>
      <td class="text-xs text-gray-300 max-w-xs truncate">${u.endereco}</td>
      <td class="text-xs text-gray-300">${u.whatsapp || u.telefone || '-'}</td>
      <td>
        <span class="${u.is_matriz ? 'gridd-badge-success' : 'gridd-badge-danger'}">
          ${u.is_matriz ? 'Sim (Matriz)' : 'Filial'}
        </span>
      </td>
      <td class="text-right space-x-2">
        <button onclick="editUnit(${u.id})" class="gridd-btn-secondary py-1 px-2 text-xs"><i class="ri-edit-line"></i></button>
        <button onclick="deleteUnit(${u.id})" class="gridd-btn-danger py-1 px-2 text-xs"><i class="ri-delete-bin-line"></i></button>
      </td>
    </tr>
  `).join('');
}

function openUnitModal(unit = null) {
  const isEdit = !!unit;
  const html = `
    <h3 class="text-lg font-extrabold text-white mb-6">${isEdit ? 'Editar Unidade' : 'Nova Unidade'}</h3>
    <form id="unitForm" class="space-y-4">
      <input type="hidden" id="unitId" value="${unit ? unit.id : ''}" />
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Nome da Filial / Loja</label>
          <input type="text" id="unitNome" required class="gridd-input" value="${unit ? unit.nome : ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">CEP</label>
          <input type="text" id="unitCep" class="gridd-input" value="${unit ? unit.cep : ''}" placeholder="95775-000" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Endereço Completo</label>
        <input type="text" id="unitEndereco" required class="gridd-input" value="${unit ? unit.endereco : ''}" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Cidade</label>
          <input type="text" id="unitCidade" required class="gridd-input" value="${unit ? unit.cidade : ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Estado (UF)</label>
          <input type="text" id="unitEstado" required maxlength="2" class="gridd-input uppercase" value="${unit ? unit.estado : 'RS'}" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">WhatsApp</label>
          <input type="text" id="unitWhatsapp" class="gridd-input" value="${unit ? unit.whatsapp : ''}" placeholder="51999999999" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Telefone Fixo</label>
          <input type="text" id="unitTelefone" class="gridd-input" value="${unit ? unit.telefone : ''}" placeholder="5136350000" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Horários de Funcionamento</label>
        <textarea id="unitHorarios" rows="3" class="gridd-textarea">${unit ? unit.horarios_funcionamento : ''}</textarea>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">Link Rota Google Maps</label>
        <input type="url" id="unitMapsLink" class="gridd-input" value="${unit && unit.link_rota_maps ? unit.link_rota_maps : ''}" />
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-400 mb-1">URL Iframe Embed do Mapa</label>
        <input type="url" id="unitMapsIframe" class="gridd-input" value="${unit && unit.google_maps_iframe ? unit.google_maps_iframe : ''}" />
      </div>

      <label class="flex items-center gap-2 cursor-pointer text-sm">
        <input type="checkbox" id="unitMatriz" ${unit && unit.is_matriz ? 'checked' : ''} class="accent-orange-500" />
        <span>Definir como Unidade Matriz Principal</span>
      </label>

      <div class="pt-4 flex justify-end gap-3 border-t border-gray-700">
        <button type="button" onclick="closeModal()" class="gridd-btn-secondary">Cancelar</button>
        <button type="submit" class="gridd-btn-primary">Salvar Unidade</button>
      </div>
    </form>
  `;
  openModal(html);

  document.getElementById('unitForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveUnit(unit);
  });
}

async function saveUnit(existingUnit) {
  const id = document.getElementById('unitId').value;
  const nome = document.getElementById('unitNome').value.trim();
  const cep = document.getElementById('unitCep').value.trim();
  const endereco = document.getElementById('unitEndereco').value.trim();
  const cidade = document.getElementById('unitCidade').value.trim();
  const estado = document.getElementById('unitEstado').value.trim().toUpperCase();
  const whatsapp = document.getElementById('unitWhatsapp').value.trim();
  const telefone = document.getElementById('unitTelefone').value.trim();
  const horarios_funcionamento = document.getElementById('unitHorarios').value.trim();
  const link_rota_maps = document.getElementById('unitMapsLink').value.trim();
  const google_maps_iframe = document.getElementById('unitMapsIframe').value.trim();
  const is_matriz = document.getElementById('unitMatriz').checked;

  const payload = {
    nome, cep, endereco, cidade, estado, whatsapp, telefone,
    horarios_funcionamento, link_rota_maps, google_maps_iframe, is_matriz
  };

  try {
    // If setting as matriz, unmark other units first
    if (is_matriz) {
      await supabaseClient.from('empresa_unidade').update({ is_matriz: false }).neq('id', id || 0);
    }

    if (id) {
      await supabaseClient.from('empresa_unidade').update(payload).eq('id', id);
    } else {
      await supabaseClient.from('empresa_unidade').insert([payload]);
    }

    showToast('Unidade salva com sucesso!', 'success');
    closeModal();
    await loadEmpresaData();
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar unidade.', 'error');
  }
}

function editUnit(id) {
  const u = unitsList.find(item => item.id === id);
  if (u) openUnitModal(u);
}

async function deleteUnit(id) {
  if (!confirm('Excluir esta unidade?')) return;
  await supabaseClient.from('empresa_unidade').delete().eq('id', id);
  showToast('Unidade excluída!', 'success');
  await loadEmpresaData();
}
