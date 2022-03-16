const root = document.querySelector("#root");
const product1 = "https://api.mercadolibre.com/items/MLA884216659";
const product2 = "https://api.mercadolibre.com/items/MLA646715969";
const product3 = "https://api.mercadolibre.com/items/MLA906258237";

const getProduct = async (endpoint) => {
  try {
    const resp = await fetch(endpoint);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDiscount = (prc1, prc2) => {
 return Math.floor(100-(prc1*100)/ prc2)
}

const renderP1 = (obj) => {
  const { price, original_price, pictures, shipping, title } = obj;
  const discount = getDiscount(price, original_price);
  return (root.innerHTML += `<div class="card"><img src=${pictures[0].url}>
    <div class="lineSeparator"></div>
     <span class="oldPrice">$ ${original_price}</span>
     <div class="priceContainer"><h2>$ ${price}</h2>
          <h4 class="discount">${discount}%<br>OFF</h4></div>
          <div class="shippingContainer"><h6 class="shippToday">Llega hoy</h6>
          ${
            shipping.logistic_type == "fulfillment"
              ? `<i class="full fa-solid fa-bolt-lightning"></i>
          <span class="full">FULL</span></div> `
              : "</div>"
          }
          <h5 class="productTitle">${title}</h5>
        </div>`);
};

const renderP2 = (obj) => {
  const { price, original_price, pictures, shipping, title } = obj;
  const discount = getDiscount(price, original_price);
  return (root.innerHTML += `<div class="card"><img src=${pictures[0].url}>
  <div class="lineSeparator"></div>
  ${
    shipping.logistic_type == "cross_docking"
      ? '<i class="truck fa-solid fa-truck"></i>'
      : ""
  }
  <span class="oldPrice">$ ${original_price}</span>
   <div class="priceContainer"><h2>$ ${price}</h2>
        <h4 class="discountGreen">${discount}%OFF</h4></div>
        <h5 class="productTitle">${title}</h5>
    </div>`);
};

const renderP3 = (obj) => {
  const { price, original_price, pictures, shipping, title, variations } = obj;
  const discount = getDiscount(price, original_price);
  return (root.innerHTML += `<div class="card"><img src=${pictures[0].url}>
   <div class="lineSeparator"></div>
   <span class="colorQty">${variations.length} colores</span>
   <h4 class="mostSelled">MÁS VENDIDO</h4>
  <span class="oldPrice">$ ${
    original_price == null ? 27999 : original_price
  }</span>
   <div class="priceContainer"><h2>$ ${price}</h2>
        <h4 class="discountGreen">${
          discount == -Infinity ? 15 : discount
        }%OFF</h4></div>
        ${
          shipping.free_shipping == true
            ? '<h6 class="shippToday shippTodayFree">Llega gratis hoy</h6>'
            : ""
        }
        <h5 class="productTitle">${title}</h5>
         </div>`);
};

(async () => {
  const products = await Promise.all([
    getProduct(product1),
    getProduct(product2),
    getProduct(product3),
  ]);
  const [p1, p2, p3] = products;
  renderP1(p1);
  renderP2(p2);
  renderP3(p3);
})();
