// Price and option prices
const basePrice = 2.49;

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

// Populating the dropdown menus
function populateDropdowns() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');

  glazingOptions.forEach((option, index) => {
    const opt = document.createElement('option');
    opt.value = option.price;
    opt.text = option.name;
    glazingSelect.add(opt);
  });

  packSizeOptions.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option.multiplier;
    opt.text = option.size;
    packSizeSelect.add(opt);
  });
}

// Updating the price
function updatePrice() {
  const glazingSelect = document.getElementById('glazing');
  const packSizeSelect = document.getElementById('pack-size');

  const glazingPrice = parseFloat(glazingSelect.value);
  const packMultiplier = parseInt(packSizeSelect.value);

  const totalPrice = (basePrice + glazingPrice) * packMultiplier;

  const priceElement = document.getElementById('price');
  priceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

// Dropdown changes
document.getElementById('glazing').addEventListener('change', updatePrice);
document.getElementById('pack-size').addEventListener('change', updatePrice);
window.onload = populateDropdowns;

// Help and resources for this page were sourced from W3Schools and HubSpot. 
