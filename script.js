const cart = document.querySelector('.cart__items');
const button = document.getElementsByClassName('empty-cart')[0];
const cartI = document.querySelector('.cart ol');
const priceC = document.querySelector('.total-price');
const itemS = document.querySelector('.items');
const loadin = document.createElement('span');
const items = document.querySelector('.items');
const cItems = document.getElementsByClassName('cart__items')[0];
const input = document.querySelector('.input');
const button2 = document.querySelector('.button');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource.replace("I", "J");
  return img;
}

const totalP = () => {
  // função baseada no do Kaike Yudi #67
  let total = 0;

  cartI.childNodes.forEach((item) => {
  const pri = item.innerText.split('|')[2].split(':')[1].trim().split('');
  pri.splice(0, 1);
  const number = parseFloat(pri.join(''));
  total += number;
  });

  priceC.innerText = `Subtotal: R$${(Math.round(total * 100) / 100).toFixed(2)}`;
};

const load = () => {
  loadin.className = 'loading';
  loadin.innerText = 'Loading...';
  itemS.appendChild(loadin);
};

const rmvLoad = () => {
  const loading = document.querySelector('.loading');
  
  loading.remove();
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const products2 = async () => {
load();
  

  const product = await fetchProducts('computador');
  const result = product.results;

  result.forEach(({ id, title, thumbnail }) => {
  items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });

  rmvLoad();
};

const products = async (p) => {
  items.innerHTML = '';
  load();
  p = input.value;
  if (p === '') {
    items.innerHTML = '';
  }

  const product = await fetchProducts(p);
  const result = product.results;

  result.forEach(({ id, title, thumbnail }) => {
  items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });

  rmvLoad();
};


function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  if (event.target.className === 'cart__item') {
  event.target.remove();
  localStorage.removeItem('cartItems');
  saveCartItems(cart.innerHTML);
  totalP();
  }
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function sendItemToCart(event) {
  if (event.target.className === 'item__add') {
    const sku = getSkuFromProductItem(event.target.parentNode);
    const item = await fetchItem(sku);

    cart.appendChild(createCartItemElement({ 
      name: item.title, 
      sku: item.id, 
      salePrice: item.price }));

    saveCartItems(cart.innerHTML);
    totalP();
  }
}

const cleanCart = () => {
  cItems.innerHTML = '';
  saveCartItems();
  localStorage.clear();
  totalP();
};

button2.addEventListener('click', products);
button.addEventListener('click', cleanCart);
document.addEventListener('click', sendItemToCart);
document.addEventListener('click', cartItemClickListener);

window.onload = () => { 
  products2();
  getSavedCartItems();
  totalP();
};
