require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', async () => {
  it('1.1 teste se fetchProducts é uma função;', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('1.2 Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    const computer = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('1.3 Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', async () => {
    const computer = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('1.4 Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const computer = await fetchProducts('computador');
    expect(computer).toEqual(computadorSearch);
  });

  it('1.5 Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    try {
      const computer = await fetchProducts();
    } catch(error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
