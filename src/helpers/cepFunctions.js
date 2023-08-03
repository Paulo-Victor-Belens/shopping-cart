export const getAddress = async (cep) => {
  let dados = '';
  const urlApi1 = `https://cep.awesomeapi.com.br/json/${cep}`;
  const urlApi2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  await Promise.any([fetch(urlApi1), fetch(urlApi2)])
    .then((response) => response.json())
    .then((data) => {
      if (data.cep) {
        dados = `${data.address} - ${data.district} - ${data.city} - ${data.state}`
                || `${data.street} - ${data.neighborhood} - ${data.city} - ${data.state}`;
      } else {
        throw new Error('CEP não encontrado');
      }
    });
  return dados;
};

export const searchCep = async () => {
  const span = document.querySelector('.cart__address');
  try {
    const cep = document.querySelector('.cep-input');
    const cepValue = cep.value;
    const endereco = await getAddress(cepValue);
    console.log(endereco);
    span.innerHTML = endereco;
  } catch {
    span.innerHTML = 'CEP não encontrado';
  }
};
