function formatPhone(value) {
  value = value.replace(/\D/g, '');

  if (value.length > 10) {
    // Celular (XX) 9XXXX-XXXX
    value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2$3-$4');
  } else if (value.length > 9) {
    // Telefone fixo (XX) XXXX-XXXX
    value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    // DDD (XX)
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
  }

  return value;
}

const fields = [
  {
    id: 'firstName',
    label: 'Prenome:',
    type: 'text',
    placeholder: 'ex: Slim',
    required: true,
    ariaDescribedBy: 'firstNameNote',
    description: 'Apenas letras são válidas.',
    column: 0,
    isValid: (firstName) => /^[A-Za-zÀ-ÿ\s]+$/.test(firstName),
  },
  {
    id: 'lastName',
    label: 'Sobrenome:',
    type: 'text',
    placeholder: 'ex: Shady',
    required: true,
    ariaDescribedBy: 'lastNameNote',
    description: 'Apenas letras são válidas.',
    column: 1,
    isValid: (lastName) => /^[A-Za-zÀ-ÿ\s]+$/.test(lastName),
  },
  {
    id: 'email',
    label: 'E-mail:',
    type: 'email',
    placeholder: 'ex: rap_god@aftermath.com',
    required: true,
    ariaDescribedBy: 'emailNote',
    description: 'Digite um endereço de e-mail válido.',
    column: 0,
    isValid: (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
  },
  {
    id: 'tel1',
    label: 'Telefone 1:',
    type: 'tel',
    placeholder: '(XX) XXXX-XXXX ou (XX) 9XXXX-XXXX',
    required: true,
    maxLength: 15,
    ariaDescribedBy: 'tel1Note',
    description: 'Digite um número de telefone válido.',
    column: 0,
    isValid: (tel1) => /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$/.test(tel1),
    autoFormat: (tel1) => formatPhone(tel1),
  },
  {
    id: 'tel2',
    label: 'Telefone 2:',
    type: 'tel',
    placeholder: '(XX) XXXX-XXXX ou (XX) 9XXXX-XXXX',
    required: false,
    maxLength: 15,
    ariaDescribedBy: 'tel2Note',
    description: 'Digite um número de telefone válido.',
    column: 1,
    isValid: (tel2) => /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$/.test(tel2),
    autoFormat: (tel2) => formatPhone(tel2),
  },
];

export { fields }