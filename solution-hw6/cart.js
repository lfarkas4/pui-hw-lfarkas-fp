class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }

    calculatePrice(glazingPrice) {
        const multiplier = this.getMultiplier();
        return (this.basePrice + glazingPrice) * multiplier;
    }

    getMultiplier() {
        switch (this.size) {
            case 1: return 1;
            case 3: return 3;
            case 6: return 5; 
            case 12: return 10;
            default: return 1;
        }
    }
}

const glazingPrices = {
    'Keep original': 0.00,
    'Sugar milk': 0.00,
    'Vanilla milk': 0.50,
    'Double chocolate': 1.50
};

const cartKey = 'rollCart';

function loadCart() {
    const storedCart = JSON.parse(localStorage.getItem(cartKey));
    return storedCart ? storedCart.map(item => new Roll(item.type, item.glazing, item.size, item.basePrice)) : [];
}

const cart = loadCart();

function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach((roll, index) => {
        const glazingPrice = glazingPrices[roll.glazing] || 0;
        const price = roll.calculatePrice(glazingPrice);
        total += price;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('parent');
        itemDiv.innerHTML = `
            <div class="center">
                <div class="row-cart">
                    <div class="column-cart-1">
                        <img src="../assets/products/${roll.type.toLowerCase()}-cinnamon-roll.jpg" alt="${roll.type} Cinnamon Roll" class="product-image-cart">
                        <p class="remove-cart" data-index="${index}">Remove</p>
                    </div>
                    <div class="column cart">
                        <p class="cart-text">${roll.type} Cinnamon Roll<br>
                        <p class="cart-text">Glazing: ${roll.glazing}<br>
                        <p class="cart-text">Pack Size: ${roll.size}</p>
                    </div>
                    <div class="column cart">
                        <p>$${price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
    addRemoveEventListeners();
}

function addRemoveEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem(cartKey, JSON.stringify(cart));
            displayCartItems();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});