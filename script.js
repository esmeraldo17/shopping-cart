const sectionItems = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');

const loading = () => {
  const loadingMessage = document.createElement('p');
  loadingMessage.className = 'loading';
  loadingMessage.innerText = 'carregando...';
  sectionItems.appendChild(loadingMessage);
};

const removeLoading = () => document.querySelector('.loading').remove();

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  // cartItems.removeChild(event.target);
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
};

cartItems.addEventListener('click', cartItemClickListener);

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const addItemToCart = async (element) => {
 const mysku = getSkuFromProductItem(element);
 console.log(mysku);
 const item = await fetchItem(mysku);
 console.log(item);
 const { id: sku, title: name, price: salePrice } = item;
 const produto = createCartItemElement({ sku, name, salePrice });

 cartItems.appendChild(produto);
  saveCartItems(cartItems.innerHTML);
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', () => addItemToCart(section));
  btn.id = sku;

  section.appendChild(btn);
  return section;
};

const addElementToPage = async () => {
  loading();
  const requireProduct = await fetchProducts('computador');
  const results = await requireProduct.results;

  results.forEach(({ id, title, thumbnail }) => {
    sectionItems.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
  removeLoading();
};

const cartClear = () => emptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
});

window.onload = () => { 
   addElementToPage();
   cartClear();
   cartItems.innerHTML = getSavedCartItems();
};
