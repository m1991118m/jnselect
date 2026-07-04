const money = new Intl.NumberFormat("zh-TW");

function formatPrice(price) {
  return `NT$${money.format(price)}`;
}

function lineOrderUrl(message) {
  return LINE_URL;
}

function productVisual(product) {
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name} ${product.spec}" loading="lazy" />`;
  }

  return `
    <div class="product-illustration ${product.imageType || ""}" aria-hidden="true">
      <span></span>
    </div>
  `;
}

function productCard(product, compact = false) {
  const tagList = product.tags.map((tag) => `<span>${tag}</span>`).join("");

  return `
    <article class="product-card ${compact ? "compact" : ""}">
      <div class="product-media">
        ${productVisual(product)}
        <div class="product-tags">${tagList}</div>
      </div>
      <div class="product-body">
        <p class="timing">${product.timing}</p>
        <h3>${product.name}</h3>
        <p class="spec">${product.spec}</p>
        <p class="desc">${product.highlight || product.description}</p>
        <div class="price-row">
          <span>專櫃定價 ${formatPrice(product.originalPrice)}</span>
          <strong>預購價 ${formatPrice(product.salePrice)}</strong>
        </div>
        <a class="order-btn" href="${lineOrderUrl(product.lineMessage)}" target="_blank" rel="noopener">詢問 / 下單</a>
      </div>
    </article>
  `;
}

function renderRecommendations() {
  const target = document.getElementById("recommendations");
  target.innerHTML = products
    .filter((product) => product.recommended)
    .map((product) => productCard(product, true))
    .join("");
}

function renderGroup(group, elementId) {
  const target = document.getElementById(elementId);
  target.innerHTML = products
    .filter((product) => product.group === group && !(group !== "dior" && product.recommended && product.id === "jo-cologne"))
    .map((product) => productCard(product))
    .join("");
}

function renderNeeds() {
  const target = document.getElementById("needs");
  target.innerHTML = needs.map((need) => `
    <article class="need-card">
      <h3>${need.title}</h3>
      <ul>${need.items.map((item) => `<li>${item}</li>`).join("")}</ul>
      <a href="${LINE_URL}" target="_blank" rel="noopener">詢問這類商品</a>
    </article>
  `).join("");
}

renderRecommendations();
renderGroup("sabon", "sabon-products");
renderGroup("jo", "jo-products");
renderGroup("dior", "dior-products");
renderNeeds();
