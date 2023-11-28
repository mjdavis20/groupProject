let balance = 0.00;
let isAdmin = false; 

// hides the Admin link on startup so you cant click unless logged in
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("admin-link").style.display = "none";
});

// change so that it can use admin login from database
function adminLogin() {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    if (username === "admin" && password === "adminpassword") {
        isAdmin = true;
        localStorage.setItem("adminLoggedIn", "true");
        alert("Admin login successful!");

        // Close the modal and remove modal backdrop
        const modal = document.getElementById("adminLoginModal");
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        
        // Remove the modal backdrop
        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) {
            modalBackdrop.parentElement.removeChild(modalBackdrop);
        }

        // Show the Admin link after a successful admin login
        document.getElementById("admin-link").style.display = "block";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// change how to add money completely
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

// add it so that it removes from inventory in admin page and database
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

// change so that they get pulled from database
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
