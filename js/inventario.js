// Get DOM elements
const inventoryItems = document.getElementById('inventory-items');
const totalItems = document.getElementById('total-items');
const totalValue = document.getElementById('total-value');
const addProductBtn = document.getElementById('add-product-btn');
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modal-form');
const modalTitle = document.getElementById('modal-title');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelBtn = document.getElementById('cancel-btn');
const modalBarcode = document.getElementById('modal-barcode');
const modalName = document.getElementById('modal-name');
const modalQuantity = document.getElementById('modal-quantity');
const modalPrice = document.getElementById('modal-price');

// Initialize inventory from localStorage
let inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
let editIndex = null;

function renderInventory() {
  inventoryItems.innerHTML = '';
  let totalItemsCount = 0;
  let totalInventoryValue = 0;
  inventory.forEach((item, index) => {
    const tr = document.createElement('tr');
    const totalValue = item.quantity * item.price;
    totalItemsCount += item.quantity;
    totalInventoryValue += totalValue;
    
    tr.innerHTML = `
      <td class="px-4 py-3">${item.barcode}</td>
      <td class="px-4 py-3">${item.name}</td>
      <td class="px-4 py-3">${item.quantity}</td>
      <td class="px-4 py-3">MXN ${item.price.toFixed(2)}</td>
      <td class="px-4 py-3">MXN ${totalValue.toFixed(2)}</td>
      <td class="px-4 py-3 space-x-2">
        <button class="text-corona-dark hover:text-corona-dark/80" aria-label="Editar producto" onclick="editProduct(${index})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-red-600 hover:text-red-800" aria-label="Eliminar producto" onclick="deleteProduct(${index})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    inventoryItems.appendChild(tr);
  });

  // Update totals
  totalItems.textContent = totalItemsCount;
  totalValue.textContent = `S/. ${totalInventoryValue.toFixed(2)}`;

  // Save to localStorage
  localStorage.setItem('inventory', JSON.stringify(inventory));
  console.log('Saved inventory:', inventory);
}

function openModal(edit = false) {
  modal.classList.remove('hidden');
  if (edit) {
    modalTitle.textContent = 'Editar Producto';
  } else {
    modalTitle.textContent = 'Agregar Producto';
    modalForm.reset();
  }
  modalBarcode.focus();
}

function closeModal() {
  modal.classList.add('hidden');
  editIndex = null;
}

addProductBtn.addEventListener('click', () => openModal());
closeModalBtn.addEventListener('click', () => closeModal());
cancelBtn.addEventListener('click', () => closeModal());

// Handle barcode scanner input
modalBarcode.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    modalName.focus();
  }
});

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const barcode = modalBarcode.value.replace(/[\r\n]+/g, '').trim(); // Remove newlines and trim
  const name = modalName.value.trim();
  const quantity = parseInt(modalQuantity.value);
  const price = parseFloat(modalPrice.value);

  if (!barcode || !name || quantity < 0 || price < 0) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  // Check if barcode already exists (except when editing the same product)
  const existingProduct = inventory.find((item, index) => 
    item.barcode === barcode && index !== editIndex
  );
  
  if (existingProduct) {
    alert('Ya existe un producto con este código de barras.');
    return;
  }

  if (editIndex !== null) {
    inventory[editIndex] = { barcode, name, quantity, price };
  } else {
    inventory.push({ barcode, name, quantity, price });
  }

  renderInventory();
  closeModal();
});

function editProduct(index) {
  editIndex = index;
  const item = inventory[index];
  modalBarcode.value = item.barcode;
  modalName.value = item.name;
  modalQuantity.value = item.quantity;
  modalPrice.value = item.price;
  openModal(true);
}

function deleteProduct(index) {
  if (confirm('¿Está seguro que desea eliminar este producto?')) {
    inventory.splice(index, 1);
    renderInventory();
  }
}

// Initialize inventory display
renderInventory();

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Alt + N to add new product
  if (e.altKey && e.key.toLowerCase() === 'n') {
    e.preventDefault();
    addProductBtn.click();
  }
  // Escape to close modal
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
