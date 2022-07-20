require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
    it('Testa se fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toEqual('function');
  });

  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e testa se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se, ao chamar a função fetchItem com o argumento do item MLB1615760527, a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Testa se o retorno da função fetchItem com o argumento do item MLB1615760527 é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    expect.assertions(1);
    const actual = await fetchItem('MLB1615760527');

    expect(actual).toEqual(item);
  });

  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);

    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
