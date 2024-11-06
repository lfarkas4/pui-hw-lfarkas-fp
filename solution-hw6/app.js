const glazingOptions = [
  { name: 'Keep original', price: 0.00 },
  { name: 'Sugar milk', price: 0.00 },
  { name: 'Vanilla milk', price: 0.50 },
  { name: 'Double chocolate', price: 1.50 }
];

const packSizeOptions = [
  { size: 1, multiplier: 1 },
  { size: 3, multiplier: 3 },
  { size: 6, multiplier: 5 },
  { size: 12, multiplier: 10 }
];

const cartKey = 'rollCart';

class Roll {
  constructor(rollType, rollGlazing, packSize, rollPrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = rollPrice;
  }
}

function populateDropdowns() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');

  glazingOptions.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.price;
      opt.text = option.name;
      glazingSelect.add(opt);
  });

  packSizeOptions.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.multiplier;
      opt.text = option.size;
      packSizeSelect.add(opt);
  });
}

function updatePrice() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');

  const glazingPrice = parseFloat(glazingSelect.value);
  const packMultiplier = parseInt(packSizeSelect.value);
  const basePrice = getBasePrice();

  const totalPrice = (basePrice + glazingPrice) * packMultiplier;

  const priceElement = document.getElementById('price');
  priceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

function getBasePrice() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const rollType = params.get('roll');
  return rolls[rollType].basePrice;
}

function setProductDetails() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const rollType = params.get('roll');
  const productHeading = document.getElementById('product-heading');
  const productImage = document.getElementById('product-image');
  const productDescription = document.getElementById('product-description');

  productHeading.innerText = `${rollType} Cinnamon Roll`;
  productImage.src = `../assets/products/${rolls[rollType].imageFile}`;
  productDescription.innerText = `Enjoy our delicious ${rollType.toLowerCase()} cinnamon roll!`;
}

function addToCart() {
  const rollType = new URLSearchParams(window.location.search).get('roll');
  const glazing = document.getElementById('glazing').selectedOptions[0].text;
  const packSizeOption = parseInt(document.getElementById('pack-size').selectedOptions[0].text);
  const rollPrice = getBasePrice();

  const roll = new Roll(rollType, glazing, packSizeOption, rollPrice);
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart.push(roll);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  
  alert(`${rollType} cinnamon roll with ${glazing} and pack size ${packSizeOption} added to cart!`);
}

document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  setProductDetails();
  updatePrice();

  document.getElementById('glazing').addEventListener('change', updatePrice);
  document.getElementById('pack-size').addEventListener('change', updatePrice);
  document.getElementById('add-to-cart').addEventListener('click', addToCart);
});