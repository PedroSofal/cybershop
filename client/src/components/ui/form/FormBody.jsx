import TextInput from '@inputs/TextInput';
import Select from '@inputs/Select';

function FormBody({ fields, formValues, validations, handleInputChange }) {
  return (
    fields.map(field => (
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
          value={formValues[field.id]}
          isValid={validations[field.id]}
          onChange={(e) => handleInputChange(e, field.autoFormat)}
        />
      )
    ))
  );
}

export default FormBody;