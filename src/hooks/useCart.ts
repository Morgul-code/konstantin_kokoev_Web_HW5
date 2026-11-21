import { useEffect, useRef, useState } from 'react';
import { products } from '../data/products';

const addDelayMs = 650;

export function useCart() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const timers = useRef(new Map<string, number>());

  useEffect(() => {
    const running = timers.current;
    return () => {
      running.forEach((timer) => window.clearTimeout(timer));
      running.clear();
    };
  }, []);

  function increment(id: string) {
    setQuantities((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  function add(id: string) {
    if (timers.current.has(id)) return;
    setPendingIds((ids) => [...ids, id]);
    // Учебная замена запроса: результат привязан к товару, а не к видимости карточки.
    const timer = window.setTimeout(() => {
      increment(id);
      timers.current.delete(id);
      setPendingIds((ids) => ids.filter((pendingId) => pendingId !== id));
    }, addDelayMs);
    timers.current.set(id, timer);
  }

  function decrement(id: string) {
    setQuantities((current) => {
      const next = { ...current };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  }

  function remove(id: string) {
    setQuantities((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  const items = products
    .map((product) => ({ product, quantity: quantities[product.id] ?? 0 }))
    .filter((item) => item.quantity > 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return { quantities, pendingIds, add, increment, decrement, remove, items, count, total };
}

export type Cart = ReturnType<typeof useCart>;
