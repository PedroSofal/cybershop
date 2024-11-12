import { fields as registerFields } from '@data/input-fields/register.jsx';
import { fields as loginFields } from '@data/input-fields/login';
import { fields as personalFields } from '@data/input-fields/personal';

import {
  fields as addressFields,
  essentialFields as essentialAddressFields,
  zipCodeField
} from '@data/input-fields/address';

import {
  fields as cardFields,
  essentialFields as essentialCardFields
} from '@data/input-fields/card';

function getFieldset(fieldset, essentialsOnly) {
  switch (fieldset) {
    case ('register'):
      return registerFields;
    case ('login'):
      return loginFields;
    case ('personal'):
      return personalFields;
    case ('address'):
      return essentialsOnly ? essentialAddressFields : addressFields;
    case ('zipCode'):
      return zipCodeField;
    case ('card'):
      return essentialsOnly ? essentialCardFields : cardFields;
  }
}

export default getFieldset;