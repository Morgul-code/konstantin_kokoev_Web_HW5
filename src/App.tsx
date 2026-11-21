import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { CartDialog } from './components/CartDialog';
import { ButtonLab } from './components/ButtonLab';
import { useCart } from './hooks/useCart';
import { useThemePreference } from './hooks/useThemePreference';
import { GlobalStyle } from './styles/GlobalStyle';
import { VisuallyHidden } from './ui/primitives';

const Page = styled.div`
  width: min(calc(100% - 32px), 1240px);
  margin: 0 auto;
  main { padding-top: 22px; }
  @media (min-width: 760px) { width: min(calc(100% - 80px), 1240px); }
`;
const Skip = styled.a`
  position: fixed;
  top: 10px;
  left: 12px;
  z-index: 2;
  transform: translateY(-180%);
  padding: 8px 14px;
  background: ${({ theme }) => theme.colors.surface};
  &:focus { transform: none; }
`;
const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 0 25px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.83rem;
  a { display: inline-flex; align-items: center; gap: 5px; }
`;

export function App() {
  const { theme, preference, setPreference } = useThemePreference();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Skip href="#catalog">Перейти к каталогу</Skip>
      <Page>
        <Header preference={preference} onPreference={setPreference}
          count={cart.count} onOpenCart={() => setCartOpen(true)} />
        <main>
          <Hero />
          <Catalog quantities={cart.quantities} pendingIds={cart.pendingIds} onAdd={cart.add} />
          <ButtonLab />
        </main>
        <Footer>
          <span>Тихий лист · Учебный мини-маркет</span>
          <a href="#top">Наверх <ArrowUp size={14} aria-hidden="true" /></a>
        </Footer>
      </Page>
      <VisuallyHidden role="status">Упаковок в корзине: {cart.count}</VisuallyHidden>
      {cartOpen && <CartDialog cart={cart} onClose={() => setCartOpen(false)} />}
    </ThemeProvider>
  );
}
