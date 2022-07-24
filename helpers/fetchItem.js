const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch error {
    return new Error('You mus provide a url')
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
