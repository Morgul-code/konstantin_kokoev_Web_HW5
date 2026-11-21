import { ChevronDown, Leaf, Palette, ShoppingBag } from 'lucide-react';
import styled from 'styled-components';
import { isThemePreference, type ThemePreference } from '../hooks/useThemePreference';
import { Button } from '../ui/Button';
import { VisuallyHidden } from '../ui/primitives';

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 19px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;
const Brand = styled.a`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  strong { display: block; font: 600 1.55rem/1.08 var(--serif); }
  small { display: block; color: ${({ theme }) => theme.colors.muted}; font-size: 0.75rem; }
`;
const Emblem = styled.span`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50% 50% 50% 12%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
`;
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  @media (max-width: 480px) {
    gap: 6px;
    > button { padding-inline: 9px; }
  }
`;
const ThemeControl = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
  > svg { position: absolute; left: 9px; pointer-events: none; }
  > svg:last-child { left: auto; right: 7px; }
  select {
    appearance: none;
    max-width: 100%;
    min-height: 42px;
    padding: 6px 25px 6px 34px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
    font-size: 0.88rem;
    cursor: pointer;
  }
  @media (max-width: 480px) {
    > svg:first-of-type { display: none; }
    select { padding-left: 10px; }
  }
`;
const Count = styled.span`
  min-width: 1.65em;
  padding: 2px 4px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.soft};
  color: ${({ theme }) => theme.colors.text};
  font: 600 0.76rem/1.3 var(--mono);
`;

interface HeaderProps {
  preference: ThemePreference;
  onPreference: (value: ThemePreference) => void;
  count: number;
  onOpenCart: () => void;
}

export function Header({ preference, onPreference, count, onOpenCart }: HeaderProps) {
  return (
    <Bar id="top">
      <Brand href="#top" aria-label="Тихий лист — в начало">
        <Emblem><Leaf size={25} strokeWidth={1.5} aria-hidden="true" /></Emblem>
        <span><strong>Тихий лист</strong><small>чайная лавка</small></span>
      </Brand>
      <Actions>
        <ThemeControl>
          <VisuallyHidden>Тема оформления</VisuallyHidden>
          <Palette size={17} aria-hidden="true" />
          <select value={preference} onChange={(event) => {
            const value = event.currentTarget.value;
            if (isThemePreference(value)) onPreference(value);
          }}>
            <option value="system">Как в системе</option>
            <option value="light">Светлая</option>
            <option value="dark">Тёмная</option>
            <option value="amber">Янтарная</option>
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </ThemeControl>
        <Button variant="outline" aria-haspopup="dialog" onClick={onOpenCart}>
          <ShoppingBag size={17} aria-hidden="true" /> Корзина <Count>{count}</Count>
        </Button>
      </Actions>
    </Bar>
  );
}
