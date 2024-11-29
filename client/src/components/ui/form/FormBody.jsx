import TextInput from '@inputs/TextInput';
import Select from '@inputs/Select';
import { css } from '@emotion/react';

const formBodyStyles = (gridAreas) => css`
  display: grid;
  grid-template-areas: ${gridAreas};
  gap: var(--ws-600);
  container-size: inline-size;

  @container (inline-size < 37rem) {
    display: flex;
    flex-direction: column;
    grid-template-areas: none;
  }
`;

function constructTemplateAreasString(fields) {
  // para cada field, construir uma fila com <'field.id field.id'>
  //  se field.column for maior que o anteior, substituir a segunda coluna por <field.id>
  //  se field.column for menor ou igual ao anterior, construir nova fila

  const areas = [];
  fields.forEach((field, index) => {
    if (fields[index - 1] && field.column > fields[index - 1].column) {
      const lastRow = areas[areas.length - 1];
      const updatedRow = lastRow.split(' ')[0] + ' ' + field.id;
      areas[areas.length - 1] = updatedRow;
    } else {
      const newRow = field.id + ' ' + field.id;
      areas.push(newRow);
    }
  });

  let templateAreasString = ``;
  areas.forEach(row => {
    templateAreasString += "'" + row + "'";
  });
  
  return templateAreasString;
}

function FormBody({ fields, formValues, validations, handleInputChange }) {
  const gridAreas = constructTemplateAreasString(fields);

  return (
    <div css={() => formBodyStyles(gridAreas)}>
      {fields.map(field => (
        field.type === 'select' ? (
          <Select
            key={field.id}
            id={field.id}
            label={field.label}
            value={formValues[field.id]}
            isValid={validations[field.id]}
            onChange={(e) => handleInputChange(e, field.autoFormat)}
            required={field.required}>
              {field.options.map(option => (
                <option
                  key={option.value}
                  value={option.value}>
                    {option.text}
                </option>
              ))}
          </Select>
        ) : (
          <TextInput
            key={field.id}
            { ...field }
            gridArea={field.id}
            value={formValues[field.id]}
            isValid={validations[field.id]}
            onChange={(e) => handleInputChange(e, field.autoFormat)}
          />
        )
      ))}
    </div>
  );
}

export default FormBody;