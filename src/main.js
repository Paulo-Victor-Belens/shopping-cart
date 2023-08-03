import { getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement, sumCart }
  from './helpers/shopFunctions';
import './style.css';

const btnSearch = document.querySelector('.bnt__search');
const sectionProducts = document.querySelector('.products');
const buttonCEP = document.querySelector('.cep-button');

const loading = () => {
  const paragrafo = document.createElement('p');
  paragrafo.setAttribute('class', 'loading');
  paragrafo.innerHTML = 'carregando...';
  return paragrafo;
};

const mensageError = () => {
  const msg = 'Algum erro ocorreu, recarregue a página e tente novamente';
  const elementoHtml = document.createElement('h2');
  elementoHtml.setAttribute('class', 'error');
  elementoHtml.innerHTML = msg;
  return elementoHtml;
};

const adicionaProdutos = async () => {
  sectionProducts.innerHTML = '';
  const inputSearch = document.querySelector('.input__search').value;
  const paragrafo = loading();
  sectionProducts.appendChild(paragrafo);

  try {
    const produtosSelecionado = await fetchProductsList(inputSearch);
    produtosSelecionado.forEach((product) => {
      const productCriado = createProductElement(product);
      return sectionProducts.appendChild(productCriado);
    });
  } catch (_error) {
    sectionProducts.appendChild(mensageError());
  } finally {
    sectionProducts.removeChild(paragrafo);
  }
};

const recuperaCarrinho = async () => {
  const cartContainer = document.querySelector('.cart__products');
  const productIds = getSavedCartIDs();
  const saveProducts = productIds.map((productId) => fetchProduct(productId));
  const products = await Promise.all(saveProducts);
  products.forEach((product) => {
    const productCard = createCartProductElement(product);
    cartContainer.appendChild(productCard);
    sumCart(product.price);
  });
};

window.onload = () => {
  recuperaCarrinho();
  buttonCEP.addEventListener('click', searchCep);
  btnSearch.addEventListener('click', adicionaProdutos);
};
