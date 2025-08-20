let cartCount = 0;
let cartItems = []; // Each item: { name, price, quantity }
const cartCounter = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");

const cartIcon = document.querySelector(".fa-cart-shopping");

function formatPrice(price) {
  return price.toFixed(2) + " TK";
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalDisplay.textContent = "0 TK";
    return;
  }

  let total = 0;

  cartItems.forEach((item, index) => {
    const itemTotalPrice = item.price * item.quantity;
    total += itemTotalPrice;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <span class="cart-item-name">${item.name}</span>
      <div class="cart-quantity-controls">
        <button class="quantity-btn decrement-btn" data-index="${index}">–</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn increment-btn" data-index="${index}">+</button>
      </div>
      <span class="cart-item-price">${formatPrice(itemTotalPrice)}</span>
      <button class="remove-item-btn" data-index="${index}">&times;</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalDisplay.textContent = formatPrice(total);

  // Remove buttons
  const removeBtns = cartItemsContainer.querySelectorAll(".remove-item-btn");
  removeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      const idx = parseInt(e.target.dataset.index);
      if (!isNaN(idx)) {
        cartCount -= cartItems[idx].quantity;
        cartItems.splice(idx, 1);
        cartCounter.textContent = cartCount;
        renderCart();
      }
    });
  });

  // Increment buttons
  const incrementBtns = cartItemsContainer.querySelectorAll(".increment-btn");
  incrementBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(e.target.dataset.index);
      if (!isNaN(idx)) {
        cartItems[idx].quantity++;
        cartCount++;
        cartCounter.textContent = cartCount;
        renderCart();
      }
    });
  });

  // Decrement buttons
  const decrementBtns = cartItemsContainer.querySelectorAll(".decrement-btn");
  decrementBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(e.target.dataset.index);
      if (!isNaN(idx)) {
        if (cartItems[idx].quantity > 1) {
          cartItems[idx].quantity--;
          cartCount--;
        } else {
          cartCount -= cartItems[idx].quantity;
          cartItems.splice(idx, 1);
        }
        cartCounter.textContent = cartCount;
        renderCart();
      }
    });
  });
}

addToCartButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();

    const card = e.target.closest(".card");
    const name = card.querySelector("img").alt || "Item";
    const priceText = card.querySelector(".new-price").textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, "")) || 0;

    const existingItemIndex = cartItems.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity++;
    } else {
      cartItems.push({ name, price, quantity: 1 });
    }

    cartCount++;
    cartCounter.textContent = cartCount;

    renderCart();
  });
});

// Open sidebar when cart icon clicked
cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("open");
  overlay.classList.add("active");
});

// Close sidebar when close button or overlay clicked
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
  overlay.classList.remove("active");
});
overlay.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
  overlay.classList.remove("active");
});
