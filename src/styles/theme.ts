import type { Category } from '../data/products';

const lightColors = {
  page: '#f8f7f2', surface: '#fffef9', text: '#25362c', muted: '#55655a',
  line: '#d6dacf', control: '#879584', soft: '#e9eddf', clear: 'transparent',
  primary: '#285240', primaryHover: '#193d2d', onPrimary: '#fffbed',
  danger: '#963e37', dangerSoft: '#f8e8e1', focus: '#976019',
  hero: '#214738', heroText: '#fff7e5', heroSub: '#d8e2d2', heroArt: '#c1d39b',
  labelPaper: '#f7edcf', labelInk: '#32493b', backdrop: 'rgb(18 34 25 / 55%)',
};

interface TinPalette {
  ground: string;
  body: string;
  ink: string;
}

export interface AppTheme {
  scheme: 'light' | 'dark';
  colors: typeof lightColors;
  tins: Record<Category, TinPalette>;
}

export const light: AppTheme = {
  scheme: 'light',
  colors: lightColors,
  tins: {
    green: { ground: '#e1e8d7', body: '#829e70', ink: '#36543e' },
    black: { ground: '#f2e0cf', body: '#b97456', ink: '#673d2d' },
    oolong: { ground: '#ece5c8', body: '#bca457', ink: '#5b502b' },
    herbal: { ground: '#e8deea', body: '#a38ca6', ink: '#57445e' },
  },
};

export const dark: AppTheme = {
  scheme: 'dark',
  colors: {
    ...lightColors,
    page: '#17241f', surface: '#1e3028', text: '#f3efdf', muted: '#bbcabd',
    line: '#3c5045', control: '#84988a', soft: '#32463b',
    primary: '#c1d8ad', primaryHover: '#d3e7c2', onPrimary: '#1e3225',
    danger: '#ffb9a7', dangerSoft: '#553933', focus: '#f5c46c',
    hero: '#293e33', heroText: '#fcf5dd', heroSub: '#dae4ce', heroArt: '#c4d7a5',
    backdrop: 'rgb(6 13 9 / 72%)',
  },
  tins: {
    green: { ...light.tins.green, ground: '#bccbb4' },
    black: { ...light.tins.black, ground: '#d2b8a3' },
    oolong: { ...light.tins.oolong, ground: '#d1c6a5' },
    herbal: { ...light.tins.herbal, ground: '#c9bacd' },
  },
};

export const amber: AppTheme = {
  ...light,
  colors: {
    ...lightColors,
    page: '#f5ead6', surface: '#fff5df', text: '#493226', muted: '#715344',
    line: '#d8c4a5', control: '#a38669', soft: '#eeddbf',
    primary: '#794529', primaryHover: '#60351e', onPrimary: '#fff5df',
    hero: '#613d2b', heroSub: '#eadcc2', heroArt: '#e3c38d', focus: '#754b1d',
  },
};

export const themes = { light, dark, amber };
export type ThemeName = keyof typeof themes;
