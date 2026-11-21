import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import styled from 'styled-components';
import { Button, type ButtonSize, type ButtonVariant } from '../ui/Button';

const Lab = styled.details`
  margin-bottom: 28px;
  border-block: 1px solid ${({ theme }) => theme.colors.line};
  padding: 15px 0;
  summary { width: fit-content; cursor: pointer; font-weight: 600; }
  summary svg { vertical-align: -2px; margin-inline: 5px; }
  p { margin: 10px 0; max-width: 68ch; color: ${({ theme }) => theme.colors.muted}; }
`;
const Samples = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 12px;
  margin: 14px 0;
  fieldset { min-width: 0; margin: 0; padding: 12px; border: 1px solid ${({ theme }) => theme.colors.line}; border-radius: 8px; }
  legend { padding: 0 4px; font: 0.83rem/1.4 var(--mono); }
  button { margin: 2px; }
`;
const Code = styled.code`
  color: ${({ theme }) => theme.colors.text};
  font: 0.88rem/1.5 var(--mono);
  overflow-wrap: anywhere;
`;
const variants: ButtonVariant[] = ['primary', 'outline', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

export function ButtonLab() {
  const [example, setExample] = useState({ variant: 'primary', size: 'md' });

  return (
    <Lab>
      <summary><SlidersHorizontal size={16} aria-hidden="true" /> Лаборатория кнопок · UI-кит</summary>
      <p>Все образцы ниже — один компонент Button. Нажмите на любой, чтобы увидеть JSX, который его создаёт.</p>
      <Samples>
        {variants.map((variant) => (
          <fieldset key={variant}>
            <legend>{variant}</legend>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size} onClick={() => setExample({ variant, size })}>
                {size}
              </Button>
            ))}
          </fieldset>
        ))}
      </Samples>
      <p aria-live="polite"><Code>{`<Button variant="${example.variant}" size="${example.size}">${example.size}</Button>`}</Code></p>
    </Lab>
  );
}
