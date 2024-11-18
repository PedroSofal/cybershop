// Hooks
import { useEffect } from 'react';

// Components
import Button from '@buttons/Button';
import DataSelector from '@forms/DataSelector';

// API
import { dbAPI } from '@services/axios';

// Assets
import { Add, Delete } from '@mui/icons-material';

// Styles
import { css } from '@emotion/react';

const containerStyles = css`
  container-type: inline-size;

  @container (inline-size < 400px) {
    .btn-text {
      display: none;
    }
  }
`;

const labels = {
  selectorLabel: { address: 'Endereços salvos:', card: 'Cartões salvos:' },
  deleteLabel: { address: 'Excluir endereço', card: 'Excluir cartão' },
  mainAction: { address: 'Novo endereço', card: 'Novo cartão' },
}

function FormHeader({
  dataUrl,
  dataList,
  selectedDataId,
  setSelectedDataId,
  isLoading,
  refetch,
  setFormValues,
  setIsAddingData,
  emptyFields,
  labelGroup,
  autoFocus = true,
  withCustom,
  readOnly
}) {
  const className = `flex ai-end jc-between ${isLoading ? 'skeletonLoading' : ''}`;
  const maxLimit = dataList.length >= 3;

  useEffect(() => {
    if (autoFocus) {
      const dataSelect = document.querySelector('#dataSelect');
      setTimeout(() => {
        dataSelect?.focus();
        
      }, 300);
    }
  }, [autoFocus]);
  
  async function deleteData() {
    if (dataList.length === 0) return;

    try {
      const response = await dbAPI.delete(dataUrl);
      if (response.status == 200) {
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function addData() {
    if (!maxLimit) {
      setFormValues(emptyFields);
      setIsAddingData(true);
    }
  }

  return (
    <div className={className} css={containerStyles}>
      <DataSelector
        label={labels.selectorLabel[labelGroup]}
        value={selectedDataId}
        dataList={dataList}
        setFormValues={setFormValues}
        setSelectedDataId={setSelectedDataId}
        withCustom={withCustom}
      />

      {!readOnly &&
        <div className="flex gap-400">
          <Button
            type="button"
            onClick={deleteData}
            disabled={dataList.length === 0}
            ariaLabel={labels.deleteLabel[labelGroup]}
            icon={<Delete />}
          ></Button>

          <Button
            main
            onClick={addData}
            disabled={maxLimit}
            ariaLabel={labels.mainAction[labelGroup]}
            icon={<Add />}
          >
            {maxLimit ? 'Limite atingido' : labels.mainAction[labelGroup]}
          </Button>
        </div>
      }
    </div>
  );
}

export default FormHeader;