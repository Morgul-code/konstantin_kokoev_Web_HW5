export const categories = [
  { id: 'green', label: 'Зелёный' },
  { id: 'black', label: 'Чёрный' },
  { id: 'oolong', label: 'Улун' },
  { id: 'herbal', label: 'Травяной' },
] as const;

export type Category = (typeof categories)[number]['id'];
export type CategoryFilter = Category | 'all';

export interface Product {
  id: string;
  name: string;
  category: Category;
  origin: string;
  notes: string;
  grams: number;
  price: number;
  badge?: 'Хит лавки' | 'Новинка' | 'Без кофеина';
}

export const products: Product[] = [
  {
    id: '01', name: 'Сенча Асамуси', category: 'green', origin: 'Кагосима, Япония',
    notes: 'Свежая трава, морской бриз', grams: 50, price: 690, badge: 'Хит лавки',
  },
  {
    id: '02', name: 'Дянь Хун', category: 'black', origin: 'Юньнань, Китай',
    notes: 'Какао-бобы, тёмный мёд', grams: 50, price: 590,
  },
  {
    id: '03', name: 'Те Гуань Инь', category: 'oolong', origin: 'Аньси, Китай',
    notes: 'Белая сирень, сливки', grams: 50, price: 780, badge: 'Новинка',
  },
  {
    id: '04', name: 'Луговой сбор', category: 'herbal', origin: 'Алтай, Россия',
    notes: 'Мята, липовый цвет', grams: 40, price: 420, badge: 'Без кофеина',
  },
  {
    id: '05', name: 'Лунцзин', category: 'green', origin: 'Ханчжоу, Китай',
    notes: 'Печёный каштан, зелёный горошек', grams: 50, price: 850,
  },
  {
    id: '06', name: 'Ассам Диком', category: 'black', origin: 'Ассам, Индия',
    notes: 'Солод, хлебная корочка', grams: 70, price: 560, badge: 'Хит лавки',
  },
  {
    id: '07', name: 'Да Хун Пао', category: 'oolong', origin: 'Уишань, Китай',
    notes: 'Тёплый камень, сухофрукты', grams: 50, price: 820,
  },
  {
    id: '08', name: 'Иван-чай', category: 'herbal', origin: 'Карелия, Россия',
    notes: 'Лесные ягоды, луговой мёд', grams: 40, price: 460, badge: 'Без кофеина',
  },
];

function normalize(text: string) {
  return text.trim().toLocaleLowerCase('ru-RU').replaceAll('ё', 'е');
}

export function filterProducts(catalog: Product[], query: string, category: CategoryFilter) {
  const needle = normalize(query);
  return catalog.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const searchable = [product.name, product.origin, product.notes].join(' ');
    return matchesCategory && normalize(searchable).includes(needle);
  });
}

const rubles = new Intl.NumberFormat('ru-RU', {
  style: 'currency', currency: 'RUB', maximumFractionDigits: 0,
});

export function formatPrice(price: number) {
  return rubles.format(price);
}
