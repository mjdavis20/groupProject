const adminUrl = "https://localhost:7051/api/Admin";
const productUrl = "https://localhost:7051/api/Product";
const vendingmachineUrl = "https://localhost:7051/api/VendingMachine";
const purchaseeventUrl = "https://localhost:7051/api/PurchaseEvent";
 
let myAdmin = [];
let myProduct = [];
 
function handleOnLoad() {
    // Create header element
    const header = document.createElement('header');
    header.setAttribute('data-bs-theme', 'dark');
 
    // Create navigation bar
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-md navbar-dark fixed-top bg-dark custom-navbar';
 
    const containerFluid = document.createElement('div');
    containerFluid.className = 'container-fluid';
 
    const brandLink = document.createElement('a');
    brandLink.className = 'navbar-brand';
    brandLink.href = '#';
    brandLink.textContent = 'Title Town Vending';
 
    const toggleButton = document.createElement('button');
    toggleButton.className = 'navbar-toggler';
    toggleButton.type = 'button';
    toggleButton.setAttribute('data-bs-toggle', 'collapse');
    toggleButton.setAttribute('data-bs-target', '#navbarCollapse');
    toggleButton.setAttribute('aria-controls', 'navbarCollapse');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Toggle navigation');
 
    const togglerIcon = document.createElement('span');
    togglerIcon.className = 'navbar-toggler-icon';
 
    // Append elements to build the header
    toggleButton.appendChild(togglerIcon);
    containerFluid.appendChild(brandLink);
    containerFluid.appendChild(toggleButton);
    nav.appendChild(containerFluid);
    header.appendChild(nav);
 
    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'container';
 
    const h1 = document.createElement('h1');
    h1.textContent = 'Vending Machine Admin';
 
    // Create vending machine select
    const vendingMachineLabel = document.createElement('label');
    vendingMachineLabel.setAttribute('for', 'vendingMachine');
    vendingMachineLabel.textContent = 'Select Vending Machine:';
 
    const vendingMachineSelect = document.createElement('select');
    vendingMachineSelect.id = 'vendingMachine';
    vendingMachineSelect.className = 'form-select';
 
    // Add options to vending machine select
    const machineOptions = ['Machine 1', 'Machine 2', 'Machine 3'];
 
    machineOptions.forEach((machine, index) => {
        const option = document.createElement('option');
        option.value = 'machine' + (index + 1);
        option.textContent = machine;
        vendingMachineSelect.appendChild(option);
    });
 
    // Create item inventory section
    const itemInventorySection = document.createElement('div');
    itemInventorySection.className = 'row';
 
    const itemInventoryCol = document.createElement('div');
    itemInventoryCol.className = 'col-md-6';
 
    const h2Inventory = document.createElement('h2');
    h2Inventory.textContent = 'Item Inventory';
 
    const table = document.createElement('table');
    table.className = 'table';
 
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
 
    ['Product', 'ProductID', 'Quantity', 'Action'].forEach((heading) => {
        const th = document.createElement('th');
        th.textContent = heading;
        tr.appendChild(th);
    });
 
    const tbody = document.createElement('tbody');
 
    // Append elements to build the item inventory section
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    itemInventoryCol.appendChild(h2Inventory);
    itemInventoryCol.appendChild(table);
    itemInventorySection.appendChild(itemInventoryCol);
 
    // Append elements to the main container
    mainContainer.appendChild(h1);
    mainContainer.appendChild(vendingMachineLabel);
    mainContainer.appendChild(vendingMachineSelect);
    mainContainer.appendChild(itemInventorySection);
 
    // Append the header and main container to the body
    document.body.appendChild(header);
    document.body.appendChild(mainContainer);
}
 
// Call the function when the page loads
window.onload = handleOnLoad;
 
 
document.addEventListener("DOMContentLoaded", async function () {
    const itemInventory = await getItemInventory();
 
    // Populate the table with item inventory data
    const tableBody = document.querySelector("tbody");
    itemInventory.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.code}</td>
            <td id="inventory-${product.code}">${product.quantity}</td>
            <td>
                <button class="btn btn-success" onclick="addToInventory('${product.code}')">Add</button>
                <button class="btn btn-danger" onclick="removeFromInventory('${product.code}')">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});
 
async function ProductAdd () {
    let product = {
        Quantity: document.getElementById('quantity').value,
        Cost: document.getElementById('cost').value,
        Name: document.getElementById('name').value,
        Sold: false,
        Deleted: false,
        VendID: document.getElementById('vendid').value,
 
 
    };
    console.log("What product am I adding?", product);
    myProduct.push(product);
    await SaveProduct(product)
    document.getElementById('quantity').value = '';
    document.getElementById('cost').value = '';
    document.getElementById('name').value = '';
    document.getElementById('vendid').value = '';
 
    // try {
    //     const itemInventory = await getItemInventory();
    //     const product = itemInventory.find(item => product.code === itemCode);
    //     if (product) {
    //         product.quantity += 1;
    //         document.querySelector(`#inventory-${productId}`).textContent = product.quantity;
    //         await updateItemInventory(itemInventory);
    //     }
    // } catch (error) {
    //     console.error('Error adding to inventory:', error);
    // }
}
 
async function removeFromInventory(id) {
    try {
        const myProduct = await getItemInventory();
        const producttodelete = myProduct.find((product) => product.id === id);
        if (producttodelete) {
            producttodelete.deleted = true;
            // document.querySelector(`#inventory-${productId}`).textContent = product.quantity;
            await SaveProduct(product);
        }
    } catch (error) {
        console.error('Error removing from product:', error);
    }
}
 
async function getItemInventory() {
    try {
        let response = await fetch(productUrl); // Replace with your actual API endpoint
        myProduct = await response.json();
        return myProduct;
    } catch (error) {
        console.error('Error fetching item inventory from API:', error);
    }
}
 
async function SaveProduct(product) {
    console.log("what exercise am I saving", product);
    if (product.id) {
        // If exercise has an ID, it already exists in the API, update it
        const updateUrl = `${productUrl}/${product.id}`;
        await fetch(updateUrl, {
            method: "PUT", // Use PUT for updating
            body: JSON.stringify(exercise),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    } else {
        // If exercise has no ID, it's a new exercise, create it
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
 
    // try {
    //     // Assuming your API supports updating the entire inventory
    //     const response = await fetch('/api/ProductRoute', {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(itemInventory),
    //     });
 
    //     if (!response.ok) {
    //         throw new Error(`Failed to update item inventory. Status: ${response.status}`);
    //     }
    // } catch (error) {
    //     console.error('Error updating item inventory:', error);
    // }
}