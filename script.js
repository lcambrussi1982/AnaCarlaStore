// Menu mobile
const btnMenuMobile = document.getElementById("btnMenuMobile");
const navMobile = document.getElementById("navMobile");

btnMenuMobile.addEventListener("click", () => {
  const isOpen = navMobile.style.display === "flex";
  navMobile.style.display = isOpen ? "none" : "flex";
});

// Filtros & busca
const chips = document.querySelectorAll(".chip");
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const activeChip = document.querySelector(".chip.active");
  const filterCategory = activeChip ? activeChip.dataset.filter : "all";

  const products = Array.from(productsGrid.querySelectorAll(".product-card"));

  products.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;

    const matchSearch = name.includes(searchTerm);
    const matchCategory =
      filterCategory === "all" || category === filterCategory;

    card.style.display = matchSearch && matchCategory ? "flex" : "none";
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    filterProducts();
  });
});

searchInput.addEventListener("input", filterProducts);

// Ordenação
sortSelect.addEventListener("change", () => {
  const option = sortSelect.value;
  const cards = Array.from(productsGrid.querySelectorAll(".product-card"));

  let sorted = cards.slice();

  if (option === "menor-preco" || option === "maior-preco") {
    sorted.sort((a, b) => {
      const pa = parseFloat(a.dataset.price);
      const pb = parseFloat(b.dataset.price);
      return option === "menor-preco" ? pa - pb : pb - pa;
    });
  } else if (option === "nome-az") {
    sorted.sort((a, b) =>
      a.dataset.name.localeCompare(b.dataset.name, "pt-BR")
    );
  }

  sorted.forEach((card) => productsGrid.appendChild(card));
});

// Mini-carrinho simples
const miniCart = document.getElementById("miniCart");
const floatingCartBtn = document.getElementById("floatingCartBtn");
const miniCartClose = document.getElementById("miniCartClose");
const miniCartItems = document.getElementById("miniCartItems");
const miniCartTotal = document.getElementById("miniCartTotal");
const cartCount = document.getElementById("cartCount");

let cart = [];

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderCart() {
  miniCartItems.innerHTML = "";
  if (!cart.length) {
    miniCartItems.innerHTML =
      '<p class="mini-cart-empty">Nenhum item ainda. Comece escolhendo seu look! 💖</p>';
    miniCartTotal.textContent = "R$ 0,00";
    cartCount.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price;

    const row = document.createElement("div");
    row.className = "mini-cart-item";
    row.innerHTML = `
      <span>${item.name}</span>
      <strong>${formatCurrency(item.price)}</strong>
    `;
    miniCartItems.appendChild(row);
  });

  miniCartTotal.textContent = formatCurrency(total);
  cartCount.textContent = cart.length.toString();
}

// Botões de comprar
document.querySelectorAll(".btn-add-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    cart.push({ name, price });
    renderCart();
    miniCart.style.display = "flex";
  });
});

// Abrir/fechar mini-carrinho
floatingCartBtn.addEventListener("click", () => {
  miniCart.style.display = miniCart.style.display === "flex" ? "none" : "flex";
});

miniCartClose.addEventListener("click", () => {
  miniCart.style.display = "none";
});

// Ano do rodapé
document.getElementById("yearSpan").textContent =
  new Date().getFullYear().toString();
