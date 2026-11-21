import { useRef, useState } from 'react';
import { Search, Sprout } from 'lucide-react';
import styled from 'styled-components';
import { categories, filterProducts, products, type CategoryFilter } from '../data/products';
import type { Cart } from '../hooks/useCart';
import { Button } from '../ui/Button';
import { Grid, Input, VisuallyHidden } from '../ui/primitives';
import { ProductCard } from './ProductCard';

const Shelf = styled.section`
  margin: 34px 0 44px;
  scroll-margin-top: 18px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  h2 { font: 500 clamp(1.85rem, 3vw, 2.6rem)/1.15 var(--serif); }
`;
const SearchField = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  width: min(100%, 340px);
  > svg { position: absolute; left: 13px; color: ${({ theme }) => theme.colors.muted}; pointer-events: none; }
  input { padding-left: 40px; }
  @media (max-width: 599px) { width: 100%; }
`;
const Tools = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 17px 0 20px;
`;
const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  button { border-radius: 20px; }
`;
const Results = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font: 0.8rem/1.5 var(--mono);
`;
const Empty = styled.div`
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 48px 18px;
  border: 1px dashed ${({ theme }) => theme.colors.control};
  border-radius: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  h3 { color: ${({ theme }) => theme.colors.text}; font: 500 1.6rem/1.25 var(--serif); }
`;

const filters = [{ id: 'all', label: 'Все сорта' }, ...categories] as const;

export function Catalog({ quantities, pendingIds, onAdd }: {
  quantities: Cart['quantities'];
  pendingIds: Cart['pendingIds'];
  onAdd: Cart['add'];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const searchRef = useRef<HTMLInputElement>(null);
  const visible = filterProducts(products, query, category);

  function reset() {
    setQuery('');
    setCategory('all');
    searchRef.current?.focus();
  }

  return (
    <Shelf id="catalog" aria-labelledby="catalog-heading">
      <Top>
        <h2 id="catalog-heading">Каталог чая</h2>
        <SearchField>
          <VisuallyHidden>Поиск по названию, региону и вкусу</VisuallyHidden>
          <Search size={18} aria-hidden="true" />
          <Input type="search" ref={searchRef} placeholder="Название, регион или вкус"
            value={query} onChange={(event) => setQuery(event.currentTarget.value)} />
        </SearchField>
      </Top>
      <Tools>
        <Chips role="group" aria-label="Категории чая">
          {filters.map((filter) => (
            <Button key={filter.id} size="sm" variant={category === filter.id ? 'primary' : 'outline'}
              aria-pressed={category === filter.id} onClick={() => setCategory(filter.id)}>
              {filter.label}
            </Button>
          ))}
        </Chips>
        <Results role="status">Найдено: {visible.length} из {products.length}</Results>
      </Tools>
      {visible.length > 0 ? (
        <Grid>
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} quantity={quantities[product.id] ?? 0}
              loading={pendingIds.includes(product.id)} onAdd={onAdd} />
          ))}
        </Grid>
      ) : (
        <Empty>
          <Sprout size={32} strokeWidth={1.5} aria-hidden="true" />
          <h3>Такого чая не нашлось</h3>
          <p>Попробуйте другой вкус или посмотрите все категории.</p>
          <Button variant="outline" onClick={reset}>Сбросить фильтры</Button>
        </Empty>
      )}
    </Shelf>
  );
}
