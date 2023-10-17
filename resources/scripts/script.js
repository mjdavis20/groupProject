let balance = 0.00;

function addMoney() {
    const moneyInput = parseFloat(document.getElementById("money-input").value);
    if (!isNaN(moneyInput) && moneyInput > 0) {
        balance += moneyInput;
        updateBalanceDisplay();
    } else {
        alert("Please enter a valid amount.");
    }
}

function purchaseItem() {
    const selectedItem = document.getElementById("item-select").value;
    const itemPrice = getItemPrice(selectedItem);

    if (balance >= itemPrice) {
        balance -= itemPrice;
        updateBalanceDisplay();
        alert(`You have successfully purchased ${selectedItem}`);
    } else {
        alert("Insufficient funds. Please add more money.");
    }
}

function getItemPrice(itemCode) {
    // Define item prices based on their codes
    const itemPrices = {
        "A1": 1.00,
        "A2": 1.50,
        // Can add more here
    };

    // Return the price for the given item code, or 0 if the item code is not found
    return itemPrices[itemCode] || 0.00;
}

function updateBalanceDisplay() {
    const moneyDisplay = document.getElementById("money-display");
    moneyDisplay.innerHTML = `<p>Your Balance: $${balance.toFixed(2)}</p>`;
}
