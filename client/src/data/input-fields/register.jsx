const fields = [
  {
    id: 'username',
    label: 'Nome de usuário:',
    type: 'text',
    required: true,
    minLength: 4,
    maxLength: 24,
    autoComplete: 'off',
    ariaDescribedBy: 'userNote',
    description:
      <>
      4 a 24 caracteres.<br />
      Deve iniciar com uma letra.<br />
      Letras, números, underlines e hífens são aceitos.
      </>,
    isValid: (username) => /^[a-zA-Z][a-zA-Z0-9_-]{3,23}$/.test(username),
  },
  {
    id: 'password',
    label: 'Senha:',
    type: 'password',
    required: true,
    minLength: 8,
    maxLength: 24,
    autoComplete: 'off',
    ariaDescribedBy: 'passwordNote',
    description:
      <>
      8 a 24 caracteres.<br />
      Deve incluir pelo menos:<br />
      1 letra maiúscula;<br />
      1 letra minúscula;<br />
      1 número;<br />
      1 dos seguintes caracteres especiais: ! @ # $ % *,
      </>,
    isValid: (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/.test(password),
  },
  {
    id: 'match',
    label: 'Confirmar senha:',
    type: 'password',
    required: true,
    autoComplete: 'off',
    ariaDescribedBy: 'matchNote',
    description: 'Precisa ser igual à senha inserida no campo anterior.',
    isValid: (password, match) => password === match,
  },
];

export { fields }