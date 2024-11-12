const STATE_OPTIONS = [
  { value: 'AC', text: 'Acre' },
  { value: 'AL', text: 'Alagoas' },
  { value: 'AP', text: 'Amapá' },
  { value: 'AM', text: 'Amazonas' },
  { value: 'BA', text: 'Bahia' },
  { value: 'CE', text: 'Ceará' },
  { value: 'DF', text: 'Distrito Federal' },
  { value: 'ES', text: 'Espírito Santo' },
  { value: 'GO', text: 'Goiás' },
  { value: 'MA', text: 'Maranhão' },
  { value: 'MT', text: 'Mato Grosso' },
  { value: 'MS', text: 'Mato Grosso do Sul' },
  { value: 'MG', text: 'Minas Gerais' },
  { value: 'PA', text: 'Pará' },
  { value: 'PB', text: 'Paraíba' },
  { value: 'PR', text: 'Paraná' },
  { value: 'PE', text: 'Pernambuco' },
  { value: 'PI', text: 'Piauí' },
  { value: 'RJ', text: 'Rio de Janeiro' },
  { value: 'RN', text: 'Rio Grande do Norte' },
  { value: 'RS', text: 'Rio Grande do Sul' },
  { value: 'RO', text: 'Rondônia' },
  { value: 'RR', text: 'Roraima' },
  { value: 'SC', text: 'Santa Catarina' },
  { value: 'SP', text: 'São Paulo' },
  { value: 'SE', text: 'Sergipe' },
  { value: 'TO', text: 'Tocantins' },
];

function formatZipCode(value) {
  value = value.replace(/\D/g, '');

  if (value.length > 5) {
    value = value.replace(/^(\d{2})(\d{3})(\d{3}).*/, '$1.$2-$3');
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{3})/, '$1.$2');
  }

  return value;
}

const fields = [
  {
    id: 'nickname',
    label: 'Apelido do endereço:',
    type: 'text',
    placeholder: 'ex: Casa',
    required: true,
  },
  {
    id: 'street',
    label: 'Logradouro:',
    type: 'text',
    placeholder: 'ex: Rua Dresden',
    required: true,
    minLength: 3,
    ariaDescribedBy: 'streetNote',
    description: 'Digite um endereço válido.',
    isValid: (street) => street.length >= 3,
  },
  {
    id: 'complement',
    label: 'Complemento:',
    type: 'text',
    placeholder: 'ex: nº 19946',
    required: false,
  },
  {
    id: 'neighborhood',
    label: 'Bairro:',
    type: 'text',
    placeholder: 'ex: Leste',
    required: true,
  },
  {
    id: 'reference',
    label: 'Referência:',
    type: 'text',
    placeholder: 'ex: Próximo à Av. 8 Mile',
    required: false,
  },
  {
    id: 'city',
    label: 'Cidade:',
    type: 'text',
    placeholder: 'ex: Detroit',
    required: true,
  },
  {
    id: 'state',
    label: 'Estado:',
    type: 'select',
    required: true,
    options: [
      { value: '', text: 'Selecione' },
      ...STATE_OPTIONS
    ],
    isValid: (state) => STATE_OPTIONS.some(option => option.value === state),
  },
  {
    id: 'zipCode',
    label: 'CEP:',
    type: 'text',
    placeholder: 'XX.XXX-XXX',
    required: true,
    maxLength: 10,
    ariaDescribedBy: 'zipCodeNote',
    description: 'Digite um CEP válido',
    isValid: (zipCode) => /^\d{2}[.]\d{3}[-]\d{3}$/.test(zipCode),
    autoFormat: (zipCode) => formatZipCode(zipCode),
  },
];

const essentialFields = fields.filter(field => field.id !== 'nickname');
const zipCodeField = fields.find(field => field.id === 'zipCode');

export { fields, essentialFields, zipCodeField }