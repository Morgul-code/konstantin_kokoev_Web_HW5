import { expect, test } from '@playwright/test';

test('поиск пересекается с категорией, учитывает регистр и ё; из пустого результата можно выйти', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('searchbox', { name: /Поиск по названию/ });
  await page.getByRole('button', { name: 'Чёрный', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(2);
  await search.fill('  МЕД  ');
  await expect(page.getByRole('article')).toHaveCount(1);
  await expect(page.getByRole('article', { name: 'Дянь Хун' })).toBeVisible();
  await page.getByRole('button', { name: 'Улун', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Такого чая не нашлось' })).toBeVisible();
  await page.getByRole('button', { name: 'Сбросить фильтры' }).click();
  await expect(search).toBeFocused();
  await expect(search).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Все сорта' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('article')).toHaveCount(8);
});

test('две параллельные покупки завершаются после фильтрации; количества, удаление и сумма согласованы', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.clock.pauseAt(new Date((await page.evaluate(() => Date.now())) + 1000));
  const sencha = page.getByRole('button', { name: 'В корзину: Сенча Асамуси', exact: true });
  await sencha.click();
  await expect(sencha).toBeDisabled();
  await expect(sencha).toHaveAttribute('aria-busy', 'true');
  await page.getByRole('button', { name: 'В корзину: Дянь Хун', exact: true }).click();
  await page.getByRole('button', { name: 'Улун', exact: true }).click();
  await expect(page.getByRole('article', { name: 'Сенча Асамуси' })).toHaveCount(0);
  await page.clock.runFor(1000);

  const opener = page.getByRole('button', { name: /^Корзина/ });
  await expect(opener).toHaveText(/Корзина\s*2/);
  await opener.click();
  const bag = page.getByRole('dialog', { name: 'Ваша корзина' });
  const total = bag.getByRole('status');
  await expect(bag.getByRole('listitem')).toHaveCount(2);
  await expect(total).toHaveText(/Итого \(2 шт\.\)\s*1\s*280\s*₽/);
  await bag.getByRole('button', { name: 'Увеличить: Сенча Асамуси' }).click();
  await expect(total).toHaveText(/Итого \(3 шт\.\)\s*1\s*970\s*₽/);
  await bag.getByRole('button', { name: 'Уменьшить: Дянь Хун' }).click();
  await expect(total).toHaveText(/Итого \(2 шт\.\)\s*1\s*380\s*₽/);
  await bag.getByRole('button', { name: 'Удалить: Сенча Асамуси' }).click();
  await expect(bag.getByRole('heading', { name: 'Корзина пока пуста' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(bag).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(opener).toHaveText(/Корзина\s*0/);
});

test('тема следует системе, явный выбор переживает перезагрузку, неизвестное значение имеет запасной вариант', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const root = page.locator('html');
  const chooser = page.getByRole('combobox', { name: 'Тема оформления' });
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await expect(chooser).toHaveValue('system');
  const darkBackground = await root.evaluate((el) => getComputedStyle(el).backgroundColor);
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(root).toHaveAttribute('data-theme', 'light');
  await expect(root).not.toHaveCSS('background-color', darkBackground);
  await chooser.selectOption('amber');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.reload();
  await expect(chooser).toHaveValue('amber');
  await expect(root).toHaveAttribute('data-theme', 'amber');
  await chooser.selectOption('system');
  await expect(root).toHaveAttribute('data-theme', 'dark');
  const key = 'quiet-leaf.theme';
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull();
  await page.evaluate((k) => localStorage.setItem(k, 'unknown'), key);
  await page.reload();
  await expect(chooser).toHaveValue('system');
  await expect(root).toHaveAttribute('data-theme', 'dark');
});

test('полка занимает 1, 2, 3 и 4 колонки без горизонтальной прокрутки', async ({ page }) => {
  await page.goto('/');
  for (const [width, columns] of [[320, 1], [600, 2], [900, 3], [1200, 4]]) {
    await page.setViewportSize({ width, height: 850 });
    const cards = await page.getByRole('article').evaluateAll((elements) =>
      elements.map((el) => el.getBoundingClientRect().top));
    expect(cards.filter((top) => top === cards[0]), `ширина ${width}px`).toHaveLength(columns);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test('лаборатория показывает сочетание пропсов, а HTML кнопки содержит только браузерные атрибуты', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Лаборатория кнопок · UI-кит').click();
  const sample = page.getByRole('group', { name: 'danger', exact: true }).getByRole('button', { name: 'lg' });
  await sample.click();
  await expect(page.locator('code')).toHaveText('<Button variant="danger" size="lg">lg</Button>');
  expect(await sample.evaluate((el) => el.getAttributeNames().filter((name) =>
    name.startsWith('$') || ['size', 'variant', 'loading'].includes(name)))).toEqual([]);
});
