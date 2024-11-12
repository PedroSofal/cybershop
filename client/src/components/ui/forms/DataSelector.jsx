import { memo } from 'react';
import Select from '@inputs/Select';
import { css } from '@emotion/react';

const containerStyles = css`
  width: fit-content;
  min-width: 35%;
`;

const DataSelector = memo(function Component({
  value,
  label,
  dataList,
  setFormValues,
  setSelectedDataId,
  withCustom
}) {
  function changeData(e) {
    const selectedValue = e.target.value;
    if (selectedValue === 'custom') return;
  
    const clickedData = dataList.find(data => data.id == selectedValue);
    // eslint-disable-next-line no-unused-vars
    const { id, userId, ...rest } = clickedData;
    setFormValues(prev => ({ ...prev, ...rest }));
    setSelectedDataId(selectedValue);
  }

  return (
    <div css={containerStyles}>
      <Select
        label={label}
        id="dataSelect"
        value={value}
        onChange={changeData}
        disabled={dataList.length === 0}
      >
        {dataList.map(data => (
          <option key={data.id} value={data.id}>
            {data.nickname}
          </option>
        ))}
        {withCustom &&
          <option value="custom">
            Personalizado...
          </option>
        }
      </Select>
    </div>
  );
});

export default DataSelector;