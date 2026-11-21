import { useEffect, useId, useRef, type ReactNode } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { Button } from './Button';

const Window = styled.dialog`
  width: min(600px, calc(100% - 28px));
  max-height: 85dvh;
  padding: clamp(18px, 4vw, 30px);
  overscroll-behavior: contain;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  &::backdrop { background: ${({ theme }) => theme.colors.backdrop}; }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  h2 { font: 500 2rem/1.15 var(--serif); }
`;

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, []);

  return (
    <Window ref={ref} aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <Heading>
        <h2 id={titleId}>{title}</h2>
        <Button variant="ghost" aria-label="Закрыть окно" onClick={onClose} autoFocus>
          <X size={21} aria-hidden="true" />
        </Button>
      </Heading>
      {children}
    </Window>
  );
}
