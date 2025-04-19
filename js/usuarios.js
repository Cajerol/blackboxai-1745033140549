// Get DOM elements
const userItems = document.getElementById('user-items');
const addUserBtn = document.getElementById('add-user-btn');
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');
const modalTitle = document.getElementById('modal-title');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelBtn = document.getElementById('cancel-btn');
const modalName = document.getElementById('modal-name');
const modalEmail = document.getElementById('modal-email');
const modalRole = document.getElementById('modal-role');

// Initialize users from localStorage
let users = JSON.parse(localStorage.getItem('users') || '[]');
let editIndex = null;

function renderUsers() {
  userItems.innerHTML = '';
  users.forEach((user, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-3">${user.name}</td>
      <td class="px-4 py-3">${user.email}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-1 bg-corona-gold/10 text-corona-dark rounded-full text-sm">
          ${user.role}
        </span>
      </td>
      <td class="px-4 py-3 space-x-2">
        <button class="text-corona-dark hover:text-corona-dark/80" aria-label="Editar usuario" onclick="editUser(${index})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-red-600 hover:text-red-800" aria-label="Eliminar usuario" onclick="deleteUser(${index})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    userItems.appendChild(tr);
  });
  
  // Save to localStorage
  localStorage.setItem('users', JSON.stringify(users));
}

function openModal(edit = false) {
  modal.classList.remove('hidden');
  if (edit) {
    modalTitle.textContent = 'Editar Usuario';
  } else {
    modalTitle.textContent = 'Agregar Usuario';
    modalForm.reset();
  }
  modalName.focus();
}

function closeModal() {
  modal.classList.add('hidden');
  editIndex = null;
}

addUserBtn.addEventListener('click', () => openModal());
closeModalBtn.addEventListener('click', () => closeModal());

cancelBtn.addEventListener('click', () => closeModal());

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = modalName.value.trim();
  const email = modalEmail.value.trim();
  const role = modalRole.value;

  if (!name || !email || !role) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  if (editIndex !== null) {
    users[editIndex] = { name, email, role };
  } else {
    users.push({ name, email, role });
  }

  renderUsers();
  closeModal();
});

function editUser(index) {
  editIndex = index;
  const user = users[index];
  modalName.value = user.name;
  modalEmail.value = user.email;
  modalRole.value = user.role;
  openModal(true);
}

function deleteUser(index) {
  if (confirm('¿Está seguro que desea eliminar este usuario?')) {
    users.splice(index, 1);
    renderUsers();
  }
}

renderUsers();
