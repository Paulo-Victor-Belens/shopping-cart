export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }
  const URL_API_MERCADOLIVRE = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(URL_API_MERCADOLIVRE);
  const data = await response.json();
  return data;
};

fetchProduct('MLB1405519561');

export const fetchProductsList = async (termoDaBusca) => {
  if (!termoDaBusca) {
    throw new Error('Termo de busca não informado');
  }

  const URL_API_MERCADOLIVRE = `https://api.mercadolibre.com/sites/MLB/search?q=${termoDaBusca}`;
  const response = await fetch(URL_API_MERCADOLIVRE);
  const data = await response.json();
  return data.results;
};
