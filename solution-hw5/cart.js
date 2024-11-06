class Roll {
  constructor(rollType, rollGlazing, packSize, rollPrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = rollPrice;
  }

  calculatePrice(glazingPrice) {
      return (this.basePrice + glazingPrice) * this.size; 
  }
}

const glazingPrices = {
  'Keep original': 0.00,
  'Sugar milk': 0.00,
  'Vanilla milk': 0.50,
  'Double chocolate': 1.50
};

const cart = [
  new Roll('Original', 'Sugar milk', 1, 2.49),
  new Roll('Walnut', 'Vanilla milk', 12, 3.49),
  new Roll('Raisin', 'Sugar milk', 3, 2.99),
  new Roll('Apple', 'Keep original', 3, 3.49)
];

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
          displayCartItems();
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayCartItems();
});
