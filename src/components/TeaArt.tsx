import styled from 'styled-components';
import type { Category } from '../data/products';

// Один контур с прожилками повторяется в гербарии и на этикетках банок.
function TeaLeaf() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" strokeLinecap="round">
      <path d="M0 0 Q-20-8-38-54 Q-6-44 0 0Z M-1-2 Q-18-24-36-52" />
      <path d="m-7-10-9-4m4-4-10-6m5-2-10-8m5 0-8-8m21 29-1-10m-5 2-2-12m-5 2-2-11" />
    </g>
  );
}

function Sprig() {
  return (
    <g>
      <path d="M62 183Q116 124 152 26" fill="none" stroke="currentColor" strokeWidth="2" />
      <g transform="translate(83 158) rotate(-16) scale(1.02)"><TeaLeaf /></g>
      <g transform="translate(96 140) rotate(48) scale(-1.02 1.02)"><TeaLeaf /></g>
      <g transform="translate(108 122) rotate(-12) scale(1.18)"><TeaLeaf /></g>
      <g transform="translate(122 98) rotate(37) scale(-1.16 1.16)"><TeaLeaf /></g>
      <g transform="translate(132 77) rotate(2) scale(0.96)"><TeaLeaf /></g>
      <g transform="translate(142 55) rotate(31) scale(-0.73 0.73)"><TeaLeaf /></g>
      <g transform="translate(150 30) rotate(43) scale(0.56)"><TeaLeaf /></g>
    </g>
  );
}

const Plate = styled.svg`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.heroArt};
`;

export function Herbarium() {
  return (
    <Plate viewBox="0 0 360 218" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" opacity=".26">
        <circle cx="188" cy="105" r="88" strokeDasharray="2 5" />
        <circle cx="188" cy="105" r="77" strokeWidth=".6" />
        <path d="M35 109h291m-141-99v186" strokeDasharray="3 7" />
        <path d="M110 180h126m-126-4v8m126-8v8" />
      </g>
      <g transform="translate(21 3) rotate(10 150 100)"><Sprig /></g>
      <g transform="translate(6 -1) rotate(34 164 122)"><Sprig /></g>
      <g fill="currentColor" fontFamily="monospace" fontSize="9.5" letterSpacing="1.4">
        <text x="39" y="39">FIG. 01</text>
        <text x="245" y="61">a.</text>
        <text x="249" y="149">b.</text>
        <text x="180" y="207" textAnchor="middle">CAMELLIA SINENSIS</text>
      </g>
      <path d="m214 78 16-17h10m-22 74 14 10h12" fill="none" stroke="currentColor" opacity=".65" />
    </Plate>
  );
}

const TinDrawing = styled.svg<{ $category: Category }>`
  width: 100%;
  height: 100%;
  display: block;
  color: ${({ theme, $category }) => theme.tins[$category].ink};
  --body: ${({ theme, $category }) => theme.tins[$category].body};
  --paper: ${({ theme }) => theme.colors.labelPaper};
  --print: ${({ theme }) => theme.colors.labelInk};
`;

const tinNames = { green: 'GREEN TEA', black: 'BLACK TEA', oolong: 'OOLONG', herbal: 'HERBAL' };

export function TeaTin({ category, number }: { category: Category; number: string }) {
  return (
    <TinDrawing $category={category} viewBox="0 0 260 160" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth=".8" opacity=".22">
        <path d="M29 132h64m76 0h61M36 128v8m188-8v8" />
        <circle cx="130" cy="80" r="64" strokeDasharray="1 5" />
      </g>
      <ellipse cx="132" cy="140" rx="50" ry="4" fill="currentColor" opacity=".15" />
      <g transform="rotate(-6 130 81)" stroke="currentColor" strokeLinejoin="round">
        <path d="M91 32q39-11 78 0v97q-39 14-78 0Z" fill="var(--body)" strokeWidth="1.6" />
        <path d="M94 38v88m4-87v88m63-88v88m4-89v87" fill="none" opacity=".36" />
        <path d="M91 124q39 13 78 0v6q-39 14-78 0Z" fill="var(--body)" />
        <path d="M89 27q41-12 82 0v9q-41 12-82 0Z" fill="var(--body)" strokeWidth="1.6" />
        <ellipse cx="130" cy="27" rx="41" ry="7.4" fill="var(--body)" strokeWidth="1.5" />
        <ellipse cx="130" cy="26" rx="35.5" ry="4.4" fill="none" opacity=".6" />
        <path d="M103 49q27 5 54 0v64q-27 5-54 0Z" fill="var(--paper)" strokeWidth=".9" />
      </g>
      <g transform="rotate(-6 130 81)" fill="var(--print)" textAnchor="middle">
        <text x="130" y="61" fontSize="5.4" fontFamily="monospace" letterSpacing="1.1">ТИХИЙ ЛИСТ</text>
        <g transform="translate(108 66) scale(.18)" color="var(--print)"><Sprig /></g>
        <text x="130" y="99" fontFamily="Georgia,serif" fontWeight="bold" fontSize="7.5">{tinNames[category]}</text>
        <text x="130" y="109" fontSize="5" fontFamily="monospace" letterSpacing="1">№ {number}</text>
      </g>
    </TinDrawing>
  );
}
