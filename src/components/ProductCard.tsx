import { Check, Plus } from 'lucide-react';
import styled from 'styled-components';
import { categories, formatPrice, type Category, type Product } from '../data/products';
import { Button } from '../ui/Button';
import { Badge, Card, Kicker } from '../ui/primitives';
import { TeaTin } from './TeaArt';

const Picture = styled.div<{ $category: Category }>`
  position: relative;
  height: clamp(148px, 15vw, 190px);
  background: ${({ theme, $category }) => theme.tins[$category].ground};
  ${Badge} { position: absolute; top: 12px; left: 12px; }
`;
const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 17px;
  h3 { margin: 6px 0 4px; font: 500 1.48rem/1.2 var(--serif); }
`;
const Meta = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
  small { font: 0.76rem/1.4 var(--mono); color: ${({ theme }) => theme.colors.muted}; }
`;
const Origin = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.82rem;
`;
const Notes = styled.p`
  margin: 10px 0 16px;
  flex: 1;
  font-size: 0.91rem;
`;
const Buy = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 13px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  strong { font-size: 1.08rem; white-space: nowrap; }
`;

interface ProductCardProps {
  product: Product;
  quantity: number;
  loading: boolean;
  onAdd: (id: string) => void;
}

export function ProductCard({ product, quantity, loading, onAdd }: ProductCardProps) {
  const categoryLabel = categories.find((item) => item.id === product.category)?.label;
  const titleId = `tea-${product.id}`;

  return (
    <Card aria-labelledby={titleId}>
      <Picture $category={product.category}>
        <TeaTin category={product.category} number={product.id} />
        {product.badge && <Badge>{product.badge}</Badge>}
      </Picture>
      <Body>
        <Meta><Kicker>{categoryLabel}</Kicker><small>{product.grams} г</small></Meta>
        <h3 id={titleId}>{product.name}</h3>
        <Origin>{product.origin}</Origin>
        <Notes>{product.notes}</Notes>
        <Buy>
          <strong>{formatPrice(product.price)}</strong>
          <Button size="sm" variant={quantity > 0 ? 'outline' : 'primary'}
            loading={loading} onClick={() => onAdd(product.id)}
            aria-label={`${quantity > 0 ? 'Добавить ещё' : 'В корзину'}: ${product.name}`}>
            {!loading && (quantity > 0 ? <Check size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />)}
            {loading ? 'Добавляем…' : quantity > 0 ? `Ещё · ${quantity} шт.` : 'В корзину'}
          </Button>
        </Buy>
      </Body>
    </Card>
  );
}
