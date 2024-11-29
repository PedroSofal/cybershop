function formatCardNumber(value) {
  value = value.replace(/\D/g, '');
  if (value.length > 12) {
    value = value.replace(/^(\d{4})(\d{4})(\d{4})(\d{0,4})/, '$1-$2-$3-$4');
  } else if (value.length > 8) {
    value = value.replace(/^(\d{4})(\d{4})(\d{0,4})/, '$1-$2-$3');
  } else if (value.length > 4) {
    value = value.replace(/^(\d{4})(\d{0,4})/, '$1-$2');
  }
  return value;
}

function formatExpDate(value) {
  value = value.replace(/\D/g, '');
  if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{2}).*/, '$1/$2');
  }
  return value;
}

const fields = [
  {
    id: 'nickname',
    label: 'Apelido do cartão:',
    type: 'text',
    placeholder: 'ex: Visa',
    required: true,
    column: 0,
  },
  {
    id: 'cardNumber',
    label: 'Número do cartão:',
    type: 'text',
    placeholder: 'XXXX-XXXX-XXXX-XXXX',
    required: true,
    maxLength: 19,
    inputMode: 'numeric',
    ariaDescribedBy: 'cardNumberNote',
    description: 'Digite um número de cartão válido.',
    column: 0,
    isValid: (cardNumber) => /^(\d{4}[-]){3}\d{4}$/.test(cardNumber),
    autoFormat: (cardNumber) => formatCardNumber(cardNumber),
  },  
  {
    id: 'cardName',
    label: 'Nome impresso no cartão:',
    type: 'text',
    placeholder: 'ex: Marshall B Mathers',
    required: true,
    ariaDescribedBy: 'cardNameNote',
    description: 'Apenas letras e espaços são válidos.',
    column: 0,
    isValid: (cardName) => /^[A-Za-zÀ-ÿ\s]+$/.test(cardName),
  },  
  {
    id: 'expDate',
    label: 'Data de validade:',
    type: 'text',
    placeholder: 'MM/AA',
    required: true,
    maxLength: 5,
    inputMode: 'numeric',
    ariaDescribedBy: 'expDateNote',
    description: 'Digite uma data válida.',
    column: 0,
    isValid: (expDate) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate),
    autoFormat: (expDate) => formatExpDate(expDate),
  },  
  {
    id: 'cvv',
    label: 'Código de Segurança:',
    type: 'text',
    placeholder: 'XXX',
    required: true,
    minLength: 3,
    maxLength: 3,
    inputMode: 'numeric',
    autoComplete: 'off',
    ariaDescribedBy: 'cvvNote',
    description: 'O código de segurança precisa ter 3 dígitos.',
    column: 1,
    isValid: (cvv) => /^\d{3}$/.test(cvv),
  },
];

const essentialFields = fields.filter(field => field.id !== 'nickname');

export { fields, essentialFields }