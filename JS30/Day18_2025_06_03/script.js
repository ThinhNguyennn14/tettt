class Product {
    constructor(id, name, price, quantity) {
        this.id = parseInt(id);
        this.name = name;
        this.price = parseFloat(price);
        this.quantity = parseInt(quantity);
    }
}

let products = [
    new Product(1, "Iphone 12", 6000000, 3),
    new Product(2, "Samsung S6", 1000000, 4),
    new Product(3, "Laptop Dell", 15000000, 2)
];

let editingIndex = -1;

const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productQuantityInput = document.getElementById('productQuantity');
const productList = document.getElementById('productList');
const addButton = document.getElementById('addButton');
const saveEditButton = document.getElementById('saveEditButton');
const cancelEditButton = document.getElementById('cancelEditButton');
const totalValueDisplay = document.getElementById('totalValue');
const mostExpensiveDisplay = document.getElementById('mostExpensive');

const searchProductIdInput = document.getElementById('searchProductId');
const searchButton = document.getElementById('searchButton');
const clearSearchButton = document.getElementById('clearSearchButton');

addButton.addEventListener('click', handleAddProduct);
saveEditButton.addEventListener('click', handleSaveEdit);
cancelEditButton.addEventListener('click', handleCancelEdit);
searchButton.addEventListener('click', searchProducts);
clearSearchButton.addEventListener('click', clearSearch);

function handleAddProduct() {
    const id = productIdInput.value.trim();
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const quantity = productQuantityInput.value.trim();

    if (!id || !name || !price || !quantity) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (products.some(product => product.id == id)) {
        alert("ID sản phẩm đã tồn tại! Vui lòng chọn ID khác.");
        return;
    }

    const newProduct = new Product(id, name, price, quantity);
    products.push(newProduct);
    displayProducts();
    clearForm();
}

function handleSaveEdit() {
    const id = productIdInput.value.trim();
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const quantity = productQuantityInput.value.trim();

    if (!id || !name || !price || !quantity) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (products.some((product, i) => product.id == id && i !== editingIndex)) {
        alert("ID sản phẩm đã tồn tại! Vui lòng chọn ID khác.");
        return;
    }

    products[editingIndex] = new Product(id, name, price, quantity);
    displayProducts();
    clearForm();

    addButton.classList.remove('hidden');
    saveEditButton.classList.add('hidden');
    cancelEditButton.classList.add('hidden');
    productIdInput.disabled = false;
    editingIndex = -1;
}

function handleCancelEdit() {
    clearForm();
    addButton.classList.remove('hidden');
    saveEditButton.classList.add('hidden');
    cancelEditButton.classList.add('hidden');
    productIdInput.disabled = false;
    editingIndex = -1;
}

function searchProducts() {
    const searchId = parseInt(searchProductIdInput.value.trim());

    if (isNaN(searchId)) {
        alert("Vui lòng nhập một ID sản phẩm hợp lệ để tìm kiếm.");
        return;
    }

    const foundProducts = products.filter(product => product.id === searchId);

    displayProducts(foundProducts);

    if (foundProducts.length === 0) {
        alert("Không tìm thấy sản phẩm với ID: " + searchId);
    }
}

function clearSearch() {
    searchProductIdInput.value = '';
    displayProducts(products);
}

function displayProducts(productsToDisplay = products) {
    productList.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productList.innerHTML = `<tr><td colspan="6" class="text-center p-4 text-gray-500">Không có sản phẩm nào để hiển thị.</td></tr>`;
    }

    productsToDisplay.forEach((product) => {
        const row = document.createElement('tr');
        const totalProductValue = (product.price * product.quantity).toLocaleString('vi-VN');

        row.innerHTML = `
            <td class="border p-2">${product.id}</td>
            <td class="border p-2">${product.name}</td>
            <td class="border p-2">${product.price.toLocaleString('vi-VN')} VND</td>
            <td class="border p-2">${product.quantity}</td>
            <td class="border p-2">${totalProductValue} VND</td>
            <td class="border p-2">
                <button onclick="editProductById(${product.id})" class="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 mr-2">Sửa</button>
                <button onclick="deleteProductById(${product.id})" class="bg-red-500 text-white p-1 rounded hover:bg-red-600">Xóa</button>
            </td>
        `;
        productList.appendChild(row);
    });

    totalValueDisplay.textContent = `Tổng giá trị hàng tồn kho: ${calculateTotalInventoryValue(productsToDisplay)} VND`;
    mostExpensiveDisplay.textContent = `Sản phẩm đắt nhất: ${findMostExpensiveProduct(productsToDisplay)}`;
}

function editProductById(id) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        alert("Sản phẩm không tồn tại!");
        return;
    }

    editingIndex = index;
    const product = products[index];

    productIdInput.value = product.id;
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productQuantityInput.value = product.quantity;

    addButton.classList.add('hidden');
    saveEditButton.classList.remove('hidden');
    cancelEditButton.classList.remove('hidden');

    productIdInput.disabled = true;
}

function deleteProductById(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            alert("Sản phẩm không tồn tại để xóa!");
            return;
        }

        products.splice(index, 1);
        
        searchProductIdInput.value = '';
        displayProducts();

        if (editingIndex === index) {
            handleCancelEdit();
        } else if (editingIndex > index) {
             editingIndex--;
        }
    }
}

function calculateTotalInventoryValue(arr) {
    let total = 0;
    arr.forEach(product => {
        total += product.price * product.quantity;
    });
    return total.toLocaleString('vi-VN');
}

function findMostExpensiveProduct(arr) {
    if (arr.length === 0) return "Không có";
    let maxPriceProduct = arr[0];
    arr.forEach(product => {
        if (product.price > maxPriceProduct.price) {
            maxPriceProduct = product;
        }
    });
    return `${maxPriceProduct.name} (${maxPriceProduct.price.toLocaleString('vi-VN')} VND)`;
}

function clearForm() {
    productIdInput.value = '';
    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';
    productIdInput.disabled = false;
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});