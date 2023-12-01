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

async function addToInventory(productId) {
    try {
        const itemInventory = await getItemInventory();
        const product = itemInventory.find(item => product.code === itemCode);
        if (product) {
            product.quantity += 1;
            document.querySelector(`#inventory-${productId}`).textContent = product.quantity;
            await updateItemInventory(itemInventory);
        }
    } catch (error) {
        console.error('Error adding to inventory:', error);
    }
}

async function removeFromInventory(productId) {
    try {
        const itemInventory = await getItemInventory();
        const item = itemInventory.find(item => product.code === itemCode);
        if (item && item.quantity > 0) {
            item.quantity -= 1;
            document.querySelector(`#inventory-${productId}`).textContent = product.quantity;
            await updateItemInventory(itemInventory);
        }
    } catch (error) {
        console.error('Error removing from inventory:', error);
    }
}

async function getItemInventory() {
    try {
        const response = await fetch('/api/ProductRoute'); // Replace with your actual API endpoint
        const itemInventory = await response.json();
        return itemInventory;
    } catch (error) {
        console.error('Error fetching item inventory from API:', error);
        return getDefaultItemInventory(); // Fallback to default inventory in case of an error
    }
}

async function updateItemInventory(itemInventory) {
    try {
        // Assuming your API supports updating the entire inventory
        const response = await fetch('/api/ProductRoute', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemInventory),
        });

        if (!response.ok) {
            throw new Error(`Failed to update item inventory. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating item inventory:', error);
    }
}

