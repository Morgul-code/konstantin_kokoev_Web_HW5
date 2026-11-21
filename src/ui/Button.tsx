import type { ComponentPropsWithoutRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    &:enabled:hover { background: ${({ theme }) => theme.colors.primaryHover}; }
  `,
  outline: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.control};
    &:enabled:hover { background: ${({ theme }) => theme.colors.soft}; }
  `,
  ghost: css`
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    &:enabled:hover { background: ${({ theme }) => theme.colors.soft}; }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.dangerSoft};
    color: ${({ theme }) => theme.colors.danger};
    &:enabled:hover { border-color: currentColor; }
  `,
};

const sizes = {
  sm: css`min-height: 34px; padding: 5px 11px; font-size: 0.82rem;`,
  md: css`min-height: 42px; padding: 8px 15px; font-size: 0.9rem;`,
  lg: css`min-height: 48px; padding: 10px 21px; font-size: 1rem;`,
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

const Face = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45em;
  border: 1px solid ${({ theme }) => theme.colors.clear};
  border-radius: 8px;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  ${({ $variant }) => variants[$variant]}
  ${({ $size }) => sizes[$size]}
  &:disabled { cursor: not-allowed; opacity: 0.58; }
  &[aria-busy='true'] { cursor: progress; opacity: 0.85; }
  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 140ms ease, border-color 140ms ease;
  }
`;

const turn = keyframes`to { transform: rotate(1turn); }`;
const Spinner = styled.span`
  width: 1em;
  height: 1em;
  border: 2px dotted currentColor;
  border-top-style: solid;
  border-radius: 50%;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${turn} 800ms linear infinite;
  }
`;

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  variant = 'primary', size = 'md', loading = false, disabled, children, type = 'button', ...native
}: ButtonProps) {
  return (
    <Face {...native} type={type} $variant={variant} $size={size}
      disabled={disabled || loading} aria-busy={loading || undefined}>
      {loading && <Spinner aria-hidden="true" />}
      {children}
    </Face>
  );
}
