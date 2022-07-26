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

const saveItemsInLocalStorage = () => {
  const elementItems = document.querySelectorAll('.cart__item');
  const array = [];
  elementItems.forEach((element) => {
    array.push(element.innerText);
  });
  saveCartItems(JSON.stringify(array));
};

const cartItemClickListener = (event) => {
  cartItems.removeChild(event.target);
  saveItemsInLocalStorage();
};

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
  saveItemsInLocalStorage();
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
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

const getCartFromLocalStorage = () => { // Recuperando LocalStorage
  const arrayItems = JSON.parse(getSavedCartItems());
  if (arrayItems !== null) {
    arrayItems.forEach((element) => {
      const li = createCustomElement('li', 'cart__item', element);
      li.addEventListener('click', (event) => cartItemClickListener(event));
      cartList.appendChild(li);
    });
    sumTotal();
  }
};

const cartClear = () => emptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
});

window.onload = () => { 
   addElementToPage();
   cartClear();
   getCartFromLocalStorage();
};
