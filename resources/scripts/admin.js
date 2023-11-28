document.addEventListener("DOMContentLoaded", function () {
    const itemInventory = getItemInventory(); 

    // change to fit updated design doc
    // Populate the table with item inventory data
    const tableBody = document.querySelector("tbody");
    itemInventory.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.code}</td>
            <td id="inventory-${item.code}">${item.quantity}</td>
            <td>
                <button class="btn btn-success" onclick="addToInventory('${item.code}')">Add</button>
                <button class="btn btn-danger" onclick="removeFromInventory('${item.code}')">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

function addToInventory(itemCode) {
    // logic to add inventory for the specified item
    const itemInventory = getItemInventory();
    const item = itemInventory.find(item => item.code === itemCode);
    if (item) {
        item.quantity += 1;
        document.querySelector(`#inventory-${itemCode}`).textContent = item.quantity;
        updateItemInventory(itemInventory);
    }
}

function removeFromInventory(itemCode) {
    // logic to remove inventory for the specified item
    const itemInventory = getItemInventory();
    const item = itemInventory.find(item => item.code === itemCode);
    if (item && item.quantity > 0) {
        item.quantity -= 1;
        document.querySelector(`#inventory-${itemCode}`).textContent = item.quantity;
        updateItemInventory(itemInventory);
    }
}

function getItemInventory() {
    // change to get from api
    const itemInventoryStr = localStorage.getItem('itemInventory');
    return itemInventoryStr ? JSON.parse(itemInventoryStr) : getDefaultItemInventory();
}

function updateItemInventory(itemInventory) {
    // Update the item inventory in local storage
    localStorage.setItem('itemInventory', JSON.stringify(itemInventory));
}

// remove
function getDefaultItemInventory() {
    // Define the default item inventory
    return [
        { code: "A1", quantity: 10 },
        { code: "A2", quantity: 5 },
        { code: "A3", quantity: 8 },
        { code: "B1", quantity: 3 },
        { code: "B2", quantity: 12 },
        { code: "B3", quantity: 9 },
        // Add more items and their inventory data as needed
    ];
}
