import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 13px;
  background: ${({ theme }) => theme.colors.surface};
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.labelPaper};
  color: ${({ theme }) => theme.colors.labelInk};
  padding: 3px 8px;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.02em;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 43px;
  padding: 9px 13px;
  border: 1px solid ${({ theme }) => theme.colors.control};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  &::placeholder { color: ${({ theme }) => theme.colors.muted}; opacity: 1; }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  @media (min-width: 600px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 900px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (min-width: 1200px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
`;

export const Kicker = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font: 600 0.7rem/1.4 var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.13em;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;
