const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
  return json;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

console.log(fetchProducts('Computador'))

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
