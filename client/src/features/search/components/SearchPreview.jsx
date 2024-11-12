// Hooks
import useSearch from '@search/hooks/useSearch';

// Components
import EmptyPreview from '@components/ui/EmptyPreview';
import ProductListMin from '@components/ProductListMin';
import Loader from '@components/ui/Loader';

function SearchPreview({ searchTerm }) {
  const { searchResults, isLoading, error } = useSearch(searchTerm);

  return (
    (isLoading
      ? <EmptyPreview><Loader /></EmptyPreview>
      : (
        searchResults.length === 0
          ? (
            <EmptyPreview>
              {error
                ? <p>Lamentamos, mas um error ocorreu em nosso servidor. Por favor, tente novamente mais tarde.</p>
                : <p>Nenhum produto encontrado</p>
              }
            </EmptyPreview>
          ) : (
            <ProductListMin
              products={searchResults}
              ariaLabel="prévia dos resultados da busca"
              seeMoreText={searchResults.length > 1
                ? `Ver todos os ${searchResults.length} resultados`
                : `Ver resultado`
              }
              seeMoreLink={`/busca/${searchTerm}`}
            />
          )
      )
    )
  );
}

export default SearchPreview;