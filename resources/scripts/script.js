let balance = 0.00;

function addMoney() {
    const moneyInput = parseFloat(document.getElementById("money-input").value);
    if (!isNaN(moneyInput) && moneyInput > 0) {
        balance += moneyInput;
        updateBalanceDisplay();
        hideErrorMessage();
    } else {
        displayErrorMessage("Please enter a valid amount.");
    }
}

function purchaseItem() {
    const selectedItem = document.getElementById("item-select").value;
    const itemPrice = getItemPrice(selectedItem);

    if (balance >= itemPrice) {
        balance -= itemPrice;
        updateBalanceDisplay();
        hideErrorMessage();
        alert(`You have successfully purchased ${selectedItem}`);
    } else {
        displayErrorMessage("You don't have enough money to purchase this item.");
    }
}

function displayErrorMessage(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

function hideErrorMessage() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "none";
}


function getItemPrice(itemCode) {
    // Define item prices based on their codes
    const itemPrices = {
        "A1": 1.00,
        "A2": 1.50,
        "A3": 1.25,
        "B1": 2.00,
        "B2": 2.00,
        "B3": 2.00,
        // Can add more here
    };

    // Return the price for the given item code, or 0 if the item code is not found
    return itemPrices[itemCode] || 0.00;
}

function updateBalanceDisplay() {
    const moneyDisplay = document.getElementById("money-display");
    moneyDisplay.innerHTML = `<p>Your Balance: $${balance.toFixed(2)}</p>`;
}
