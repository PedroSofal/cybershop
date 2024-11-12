function getShippingInfo(zipCodeString) {
  const sanitizedZipCode = zipCodeString.replace(/[^\d]/g, '');
  const zipCode = parseInt(sanitizedZipCode, 10);

  switch (true) {
    // São Paulo - SP CAPITAL
    case (zipCode >= 1000000 && zipCode <= 5999999) || (zipCode >= 8000000 && zipCode <= 8499999):
      return { zipCode: zipCodeString, location: 'São Paulo - SP Capital', state: 'São Paulo', abbr: 'SP', price: 21.40 };

    // São Paulo - SP Área Metropolitana
    case zipCode >= 6000000 && zipCode <= 9999999:
      return { zipCode: zipCodeString, location: 'São Paulo - Área Metropolitana', state: 'São Paulo', abbr: 'SP', price: 23.50 };

    // São Paulo - SP Interior
    case zipCode >= 11000000 && zipCode <= 19999999:
      return { zipCode: zipCodeString, location: 'São Paulo - Interior', state: 'São Paulo', abbr: 'SP', price: 25.33 };

    // Rio de Janeiro - RJ Capital
    case zipCode >= 20000000 && zipCode <= 23799999:
      return { zipCode: zipCodeString, location: 'Rio de Janeiro - RJ Capital', state: 'Rio de Janeiro', abbr: 'RJ', price: 21.40 };

    // Rio de Janeiro - RJ Área Metropolitana
    case zipCode >= 20000000 && zipCode <= 26600999:
      return { zipCode: zipCodeString, location: 'Rio de Janeiro - Área Metropolitana', state: 'Rio de Janeiro', abbr: 'RJ', price: 23.50 };

    // Rio de Janeiro - RJ Interior
    case zipCode >= 26601000 && zipCode <= 28999999:
      return { zipCode: zipCodeString, location: 'Rio de Janeiro - Interior', state: 'Rio de Janeiro', abbr: 'RJ', price: 25.33 };

    // Espírito Santo - Vitória
    case zipCode >= 29000000 && zipCode <= 29099999:
      return { zipCode: zipCodeString, location: 'Espírito Santo - Vitória', state: 'Espírito Santo', abbr: 'ES', price: 23.96 };

    // Espírito Santo - ES Interior
    case zipCode >= 29100000 && zipCode <= 29999999:
      return { zipCode: zipCodeString, location: 'Espírito Santo - Interior', state: 'Espírito Santo', abbr: 'ES', price: 30.52 };

    // Minas Gerais - Belo Horizonte
    case zipCode >= 30000000 && zipCode <= 31999999:
      return { zipCode: zipCodeString, location: 'Minas Gerais - Belo Horizonte', state: 'Minas Gerais', abbr: 'MG', price: 12.15 };

    // Minas Gerais - MG Região Metropolitana
    case zipCode >= 30000000 && zipCode <= 34999999:
      return { zipCode: zipCodeString, location: 'Minas Gerais - Região Metropolitana', state: 'Minas Gerais', abbr: 'MG', price: 15.20 };

    // Minas Gerais - MG Interior
    case zipCode >= 35000000 && zipCode <= 39999999:
      return { zipCode: zipCodeString, location: 'Minas Gerais - Interior', state: 'Minas Gerais', abbr: 'MG', price: 18.94 };

    // Bahia - Salvador
    case zipCode >= 40000000 && zipCode <= 41999999:
      return { zipCode: zipCodeString, location: 'Bahia - Salvador', state: 'Bahia', abbr: 'BA', price: 23.96 };

    // Bahia - BA Região Metropolitana
    case zipCode >= 40000000 && zipCode <= 44470999:
      return { zipCode: zipCodeString, location: 'Bahia - Região Metropolitana', state: 'Bahia', abbr: 'BA', price: 26.15 };

    // Bahia - BA Interior
    case zipCode >= 44471000 && zipCode <= 48999999:
      return { zipCode: zipCodeString, location: 'Bahia - Interior', state: 'Bahia', abbr: 'BA', price: 30.52 };

    // Sergipe - Aracaju
    case zipCode >= 49000000 && zipCode <= 49099999:
      return { zipCode: zipCodeString, location: 'Sergipe - Aracaju', state: 'Sergipe', abbr: 'SE', price: 32.90 };

    // Sergipe - SE Interior
    case zipCode >= 49100000 && zipCode <= 49999999:
      return { zipCode: zipCodeString, location: 'Sergipe - Interior', state: 'Sergipe', abbr: 'SE', price: 68.80 };

    // Pernambuco - Recife
    case zipCode >= 50000000 && zipCode <= 52999999:
      return { zipCode: zipCodeString, location: 'Pernambuco - Recife', state: 'Pernambuco', abbr: 'PE', price: 32.90 };

    // Pernambuco - PE Região Metropolitana
    case zipCode >= 50000000 && zipCode <= 54999999:
      return { zipCode: zipCodeString, location: 'Pernambuco - Região Metropolitana', state: 'Pernambuco', abbr: 'PE', price: 45.90 };

    // Pernambuco - PE Interior
    case zipCode >= 55000000 && zipCode <= 56999999:
      return { zipCode: zipCodeString, location: 'Pernambuco - Interior', state: 'Pernambuco', abbr: 'PE', price: 68.80 };

    // Alagoas - Maceió
    case zipCode >= 57000000 && zipCode <= 57099999:
      return { zipCode: zipCodeString, location: 'Alagoas - Maceió', state: 'Alagoas', abbr: 'AL', price: 32.90 };

    // Alagoas - AL Interior
    case zipCode >= 57100000 && zipCode <= 57999999:
      return { zipCode: zipCodeString, location: 'Alagoas - Interior', state: 'Alagoas', abbr: 'AL', price: 68.80 };

    // Paraíba - João Pessoa
    case zipCode >= 58000000 && zipCode <= 58099999:
      return { zipCode: zipCodeString, location: 'Paraíba - João Pessoa', state: 'Paraíba', abbr: 'PB', price: 32.90 };

    // Paraíba - PB Interior
    case zipCode >= 58100000 && zipCode <= 58999999:
      return { zipCode: zipCodeString, location: 'Paraíba - Interior', state: 'Paraíba', abbr: 'PB', price: 68.80 };

    // Rio Grande do Norte - Natal
    case zipCode >= 59000000 && zipCode <= 59099999:
      return { zipCode: zipCodeString, location: 'Rio Grande do Norte - Natal', state: 'Rio Grande do Norte', abbr: 'RN', price: 32.90 };

    // Rio Grande do Norte - RN Interior
    case zipCode >= 59100000 && zipCode <= 59999999:
      return { zipCode: zipCodeString, location: 'Rio Grande do Norte - Interior', state: 'Rio Grande do Norte', abbr: 'RN', price: 68.80 };

    // Ceará - Fortaleza
    case zipCode >= 60000000 && zipCode <= 60999999:
      return { zipCode: zipCodeString, location: 'Ceará - Fortaleza', state: 'Ceará', abbr: 'CE', price: 32.90};

    // Ceará - CE Região Metropolitana
    case zipCode >= 60000000 && zipCode <= 61900999:
      return { zipCode: zipCodeString, location: 'Ceará - Região Metropolitana', state: 'Ceará', abbr: 'CE', price: 45.90 };

    // Ceará - CE Interior
    case zipCode >= 61901000 && zipCode <= 63999999:
      return { zipCode: zipCodeString, location: 'Ceará - Interior', state: 'Ceará', abbr: 'CE', price: 68.80 };

    // Piauí - Teresina
    case zipCode >= 64000000 && zipCode <= 64099999:
      return { zipCode: zipCodeString, location: 'Piauí - Teresina', state: 'Piauí', abbr: 'PI', price: 32.90 };

    // Piauí - PI Interior
    case zipCode >= 64100000 && zipCode <= 64999999:
      return { zipCode: zipCodeString, location: 'Piauí - Interior', state: 'Piauí', abbr: 'PI', price: 68.80 };

    // Maranhão - São Luiz
    case zipCode >= 65000000 && zipCode <= 65099999:
      return { zipCode: zipCodeString, location: 'Maranhão - São Luiz', state: 'Maranhão', abbr: 'MA', price: 32.90 };

    // Maranhão - MA Interior
    case zipCode >= 65100000 && zipCode <= 65999999:
      return { zipCode: zipCodeString, location: 'Maranhão - Interior', state: 'Maranhão', abbr: 'MA', price: 68.80 };

    // Pará - Belém
    case zipCode >= 66000000 && zipCode <= 66999999:
      return { zipCode: zipCodeString, location: 'Pará - Belém', state: 'Pará', abbr: 'PA', price: 32.90 };

    // Pará - PA Região Metropolitana
    case zipCode >= 66000000 && zipCode <= 67999999:
      return { zipCode: zipCodeString, location: 'Pará - Região Metropolitana', state: 'Pará', abbr: 'PA', price: 45.90 };

    // Pará - PA Interior
    case zipCode >= 68000000 && zipCode <= 68899999:
      return { zipCode: zipCodeString, location: 'Pará - Interior', state: 'Pará', abbr: 'PA', price: 68.80 };

    // Amapá - Macapá
    case zipCode >= 68900000 && zipCode <= 68914999:
      return { zipCode: zipCodeString, location: 'Amapá - Macapá', state: 'Amapá', abbr: 'AP', price: 32.90 };

    // Amapá - AP Interior
    case zipCode >= 68915000 && zipCode <= 68999999:
      return { zipCode: zipCodeString, location: 'Amapá - Interior', state: 'Amapá', abbr: 'AP', price: 68.80 };

    // Amazonas - Manaus
    case zipCode >= 69000000 && zipCode <= 69099999:
      return { zipCode: zipCodeString, location: 'Amazonas - Manaus', state: 'Amazonas', abbr: 'AM', price: 32.90 };

    // Amazonas - AM Interior
    case zipCode >= 69100000 && zipCode <= 69299999:
      return { zipCode: zipCodeString, location: 'Amazonas - Interior', state: 'Amazonas', abbr: 'AM', price: 68.80 };

    // Roraima - Boa Vista
    case zipCode >= 69300000 && zipCode <= 69339999:
      return { zipCode: zipCodeString, location: 'Roraima - Boa Vista', state: 'Roraima', abbr: 'RR', price: 32.90 };

    // Roraima - RR Interior
    case zipCode >= 69340000 && zipCode <= 69389999:
      return { zipCode: zipCodeString, location: 'Roraima - Interior', state: 'Roraima', abbr: 'RR', price: 68.80 };

    // Acre - Rio Branco
    case zipCode >= 69900000 && zipCode <= 69920999:
      return { zipCode: zipCodeString, location: 'Acre - Rio Branco', state: 'Acre', abbr: 'AC', price: 32.90 };

    // Acre - AC Interior
    case zipCode >= 69921000 && zipCode <= 69999999:
      return { zipCode: zipCodeString, location: 'Acre - Interior', state: 'Acre', abbr: 'AC', price: 68.80 };

    // Distrito Federal - Brasília
    case zipCode >= 70000000 && zipCode <= 70999999:
      return { zipCode: zipCodeString, location: 'Distrito Federal - Brasília', state: 'Distrito Federal', abbr: 'DF', price: 21.40 };

    // Distrito Federal - DF Cidades Satélite
    case zipCode >= 71000000 && zipCode <= 73699999:
      return { zipCode: zipCodeString, location: 'Distrito Federal - Cidades Satélite', state: 'Distrito Federal', abbr: 'DF', price: 23.90 };

    // Goiás - Goiânia
    case (zipCode >= 72800000 && zipCode <= 73999999) || (zipCode >= 74000000 && zipCode <= 74894999):
      return { zipCode: zipCodeString, location: 'Goiás - Goiânia', state: 'Goiás', abbr: 'GO', price: 23.96 };

    // Goiás - GO Interior
    case zipCode >= 74895000 && zipCode <= 76799999:
      return { zipCode: zipCodeString, location: 'Goiás - Interior', state: 'Goiás', abbr: 'GO', price: 30.52 };

    // Tocantins - Palmas
    case zipCode >= 77000000 && zipCode <= 77270999:
      return { zipCode: zipCodeString, location: 'Tocantins - Palmas', state: 'Tocantins', abbr: 'TO', price: 32.09 };

    // Tocantins - TO Interior
    case zipCode >= 77300000 && zipCode <= 77995999:
      return { zipCode: zipCodeString, location: 'Tocantins - Interior', state: 'Tocantins', abbr: 'TO', price: 68.80 };

    // Mato Grosso - Cuiabá
    case zipCode >= 78000000 && zipCode <= 78109999:
      return { zipCode: zipCodeString, location: 'Mato Grosso - Cuiabá', state: 'Mato Grosso', abbr: 'MT', price: 26.74 };

    // Mato Grosso - MT Interior
    case zipCode >= 78110000 && zipCode <= 78899999:
      return { zipCode: zipCodeString, location: 'Mato Grosso - Interior', state: 'Mato Grosso', abbr: 'MT', price: 50.34 };

    // Rondônia - Porto Velho
    case zipCode >= 78900000 && zipCode <= 78930999:
      return { zipCode: zipCodeString, location: 'Rondônia - Porto Velho', state: 'Rondônia', abbr: 'RO', price: 32.09 };

    // Rondônia - MS Interior
    case zipCode >= 78931000 && zipCode <= 78999999:
      return { zipCode: zipCodeString, location: 'Rondônia - Interior', state: 'Rondônia', abbr: 'RO', price: 68.80 };

    // Mato Grosso do Sul - Campo Grande
    case zipCode >= 79000000 && zipCode <= 79129999:
      return { zipCode: zipCodeString, location: 'Mato Grosso do Sul - Campo Grande', state: 'Mato Grosso do Sul', abbr: 'MS', price: 23.96 };

    // Mato Grosso do Sul - MS Interior
    case zipCode >= 79130000 && zipCode <= 79999999:
      return { zipCode: zipCodeString, location: 'Mato Grosso do Sul - Interior', state: 'Mato Grosso do Sul', abbr: 'MS', price: 30.52 };

    // Paraná - Curitiba
    case zipCode >= 80000000 && zipCode <= 82999999:
      return { zipCode: zipCodeString, location: 'Paraná - Curitiba', state: 'Paraná', abbr: 'PR', price: 23.96 };

    // Paraná - PR Área Metropolitana
    case zipCode >= 80000000 && zipCode <= 83800999:
      return { zipCode: zipCodeString, location: 'Paraná - Área Metropolitana', state: 'Paraná', abbr: 'PR', price: 26.90 };

    // Paraná - PR Interior
    case zipCode >= 83801000 && zipCode <= 87999999:
      return { zipCode: zipCodeString, location: 'Paraná - Interior', state: 'Paraná', abbr: 'PR', price: 30.52 };

    // Santa Catarina - Florianópolis
    case zipCode >= 88000000 && zipCode <= 82999999:
      return { zipCode: zipCodeString, location: 'Santa Catarina - Florianópolis', state: 'Santa Catarina', abbr: 'SC', price: 23.96 };

    // Santa Catarina - SC Área Metropolitana
    case zipCode >= 88000000 && zipCode <= 88469999:
      return { zipCode: zipCodeString, location: 'Santa Catarina - Área Metropolitana', state: 'Santa Catarina', abbr: 'SC', price: 26.90 };

    // Santa Catarina - SC Interior
    case zipCode >= 88470000 && zipCode <= 89999999:
      return { zipCode: zipCodeString, location: 'Santa Catarina - Interior', state: 'Santa Catarina', abbr: 'SC', price: 30.52 };

    // Rio Grande do Sul - Porto Alegre
    case zipCode >= 90000000 && zipCode <= 91999999:
      return { zipCode: zipCodeString, location: 'Rio Grande do Sul - Porto Alegre', state: 'Rio Grande do Sul', abbr: 'RS', price: 26.74 };

    // Rio Grande do Sul - RS Área Metropolitana
    case zipCode >= 90000000 && zipCode <= 94900999:
      return { zipCode: zipCodeString, location: 'Rio Grande do Sul - Área Metropolitana', state: 'Rio Grande do Sul', abbr: 'RS', price: 32.90 };

    // Rio Grande do Sul - RS Interior
    case zipCode >= 94901000 && zipCode <= 99999999:
      return { zipCode: zipCodeString, location: 'Rio Grande do Sul - Interior', state: 'Rio Grande do Sul', abbr: 'RS', price: 50.34 };

    default:
      return { zipCode: zipCodeString, location: '', state: '', abbr: '', price: '' };
  }
}

export default getShippingInfo;