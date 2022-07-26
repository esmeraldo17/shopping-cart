const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
