const FAKE_EXCHANGE_RATE = 4;

function formatPriceToBRL(price, convertion) {
  const total = convertion ? price * FAKE_EXCHANGE_RATE : price;
  const formatted = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return formatted;
}

export default formatPriceToBRL;