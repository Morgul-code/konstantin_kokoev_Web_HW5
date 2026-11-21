import styled from 'styled-components';
import { Herbarium } from './TeaArt';

const Cover = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(230px, 1fr);
  border-radius: 14px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.heroText};
  background: ${({ theme }) => theme.colors.hero};
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;
const Copy = styled.div`
  padding: clamp(24px, 3.5vw, 46px);
  align-self: center;
  h1 { margin: 11px 0; font: 500 clamp(2.35rem, 4.3vw, 4.25rem)/1.08 var(--serif); letter-spacing: -0.035em; }
  p { max-width: 43ch; color: ${({ theme }) => theme.colors.heroSub}; font-size: 0.98rem; }
`;
const Edition = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.heroArt};
  font: 600 0.69rem/1.4 var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  &::before { content: ''; width: 26px; border-top: 1px solid currentColor; }
`;
const Figure = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  max-height: 222px;
  border-left: 1px dashed ${({ theme }) => theme.colors.heroArt};
  @media (max-width: 640px) { display: none; }
`;

export function Hero() {
  return (
    <Cover aria-labelledby="cover-title">
      <Copy>
        <Edition>Коллекция № 01 · Листовой чай</Edition>
        <h1 id="cover-title">Чайная полка</h1>
        <p>От японской сенчи до алтайских трав. Выберите чай по происхождению и любимым нотам вкуса.</p>
      </Copy>
      <Figure><Herbarium /></Figure>
    </Cover>
  );
}
