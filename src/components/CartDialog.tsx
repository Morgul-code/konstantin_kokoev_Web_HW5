import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import styled from 'styled-components';
import { formatPrice } from '../data/products';
import type { Cart } from '../hooks/useCart';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const Lines = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Line = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  h3 { font: 500 1.25rem/1.3 var(--serif); }
  p { margin-top: 3px; font-size: 0.85rem; color: ${({ theme }) => theme.colors.muted}; }
`;
const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  span { min-width: 2ch; text-align: center; font-variant-numeric: tabular-nums; }
`;
const Total = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 18px 0;
  font-size: 1.12rem;
`;
const EmptyBag = styled.div`
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: 26px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  h3 { color: ${({ theme }) => theme.colors.text}; font: 500 1.4rem/1.2 var(--serif); }
`;

export function CartDialog({ cart, onClose }: { cart: Cart; onClose: () => void }) {
  return (
    <Modal title="Ваша корзина" onClose={onClose}>
      {cart.items.length > 0 ? (
        <>
          <Lines>
            {cart.items.map(({ product, quantity }) => (
              <Line key={product.id}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{formatPrice(product.price)} × {quantity} = <strong>{formatPrice(product.price * quantity)}</strong></p>
                </div>
                <Controls>
                  <Button variant="outline" size="sm" aria-label={`Уменьшить: ${product.name}`}
                    onClick={() => cart.decrement(product.id)}><Minus size={14} aria-hidden="true" /></Button>
                  <span>{quantity}</span>
                  <Button variant="outline" size="sm" aria-label={`Увеличить: ${product.name}`}
                    onClick={() => cart.increment(product.id)}><Plus size={14} aria-hidden="true" /></Button>
                  <Button variant="danger" size="sm" aria-label={`Удалить: ${product.name}`}
                    onClick={() => cart.remove(product.id)}><Trash2 size={14} aria-hidden="true" /></Button>
                </Controls>
              </Line>
            ))}
          </Lines>
          <Total role="status"><span>Итого ({cart.count} шт.)</span><strong>{formatPrice(cart.total)}</strong></Total>
          <Button variant="outline" onClick={onClose}>Продолжить выбор</Button>
        </>
      ) : (
        <EmptyBag>
          <ShoppingBag size={36} strokeWidth={1.3} aria-hidden="true" />
          <h3>Корзина пока пуста</h3>
          <p>Добавьте чай с полки — здесь появятся упаковки и их стоимость.</p>
          <Button onClick={onClose}>Вернуться к каталогу</Button>
        </EmptyBag>
      )}
    </Modal>
  );
}
