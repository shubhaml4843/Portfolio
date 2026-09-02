import { createTheme } from '@mui/material/styles';

// Agent Graph palette. Sections are translucent so the graph canvas
// reads through them, so every surface colour here carries alpha.
export const palette = {
  bgDeep: '#05070F',
  bgPanel: '#0D1220',
  cyan: '#22D3EE',
  cyanSoft: '#67E8F9',
  violet: '#8B5CF6',
  violetSoft: '#A78BFA',
  emerald: '#34D399',
  text: '#E5EDFF',
  textMuted: '#93A5C8',
  border: 'rgba(34, 211, 238, 0.16)',
  borderSoft: 'rgba(148, 175, 224, 0.10)',
  // alternating section washes, both see-through
  veilA: 'rgba(5, 7, 15, 0.40)',
  veilB: 'rgba(11, 16, 30, 0.56)',
};

export const accentText = {
  background: `linear-gradient(120deg, ${palette.cyanSoft} 0%, ${palette.violetSoft} 55%, ${palette.emerald} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// The portfolio's original title gradient (indigo -> pink), kept because
// it reads better on the rotating hero role line than the newer accent.
export const titleAccentText = {
  background: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// Frosted panel used by every card on the page.
export const glassCard = {
  backgroundColor: 'rgba(13, 18, 32, 0.72)',
  backdropFilter: 'blur(14px)',
  border: `1px solid ${palette.borderSoft}`,
  borderRadius: 4,
  transition: 'transform .28s ease, border-color .28s ease, box-shadow .28s ease',
  '&:hover': {
    borderColor: palette.border,
    boxShadow: `0 18px 50px rgba(0,0,0,.55), 0 0 0 1px ${palette.border}`,
  },
};

export const sectionBase = (variant) => ({
  position: 'relative',
  zIndex: 1,
  // entrance transforms would otherwise widen the document on narrow screens
  overflowX: 'clip',
  py: { xs: 8, md: 14 },
  backgroundColor: variant === 'a' ? palette.veilA : palette.veilB,
  backdropFilter: 'blur(2px)',
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: palette.cyan },
    secondary: { main: palette.violet },
    success: { main: palette.emerald },
    background: { default: palette.bgDeep, paper: palette.bgPanel },
    text: { primary: palette.text, secondary: palette.textMuted },
    divider: palette.borderSoft,
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h2: { fontWeight: 750, letterSpacing: '-0.025em', lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontWeight: 650, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    overline: { letterSpacing: '0.18em', fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: { backgroundColor: palette.bgDeep },
        '::selection': { background: 'rgba(34,211,238,.28)' },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-track': { background: palette.bgDeep },
        '*::-webkit-scrollbar-thumb': {
          background: 'rgba(34,211,238,.22)',
          borderRadius: 8,
        },
        '*::-webkit-scrollbar-thumb:hover': { background: 'rgba(34,211,238,.38)' },
        '@media (prefers-reduced-motion: reduce)': {
          '*': { animationDuration: '.01ms !important', transitionDuration: '.01ms !important' },
          html: { scrollBehavior: 'auto' },
        },
      },
    },
    MuiButton: { styleOverrides: { root: { borderRadius: 999 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
  },
});

export default theme;
