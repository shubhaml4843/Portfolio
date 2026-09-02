import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, IconButton, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VerifiedIcon from '@mui/icons-material/Verified';
import { palette, titleAccentText } from '../theme';

const ROLES = ['Gen AI Engineer', 'Agentic AI Engineer', 'LLM & NLP Specialist', 'AI/ML Engineer'];

const TYPE_MS = 62;    // per character while typing
const ERASE_MS = 26;   // per character while clearing
const HOLD_MS = 1700;  // dwell once a title is fully typed

// Badges orbiting the AI core in the hero.
const STACK = [
  { label: 'Agentic AI', colour: '#34D399' },
  { label: 'Gen AI', colour: '#22D3EE' },
  { label: 'RAG', colour: '#A78BFA' },
  { label: 'LangChain', colour: '#67E8F9' },
  { label: 'LangGraph', colour: '#F0ABFC' },
];

// Credibility strip under the pitch.
const PROOF = [
  { value: '2+ yrs', label: 'full-time' },
  { value: '10-agent', label: 'systems shipped' },
  { value: '+28%', label: 'query accuracy' },
];

// Types a title out, holds it, clears it, then moves to the next. The caret
// stays rendered throughout so the line never looks empty or broken.
const useTypewriter = () => {
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const full = ROLES[index];
    let timer;

    if (phase === 'typing') {
      if (len < full.length) {
        timer = setTimeout(() => setLen(len + 1), TYPE_MS);
      } else {
        setPhase('holding');
      }
    } else if (phase === 'holding') {
      timer = setTimeout(() => setPhase('erasing'), HOLD_MS);
    } else if (len > 0) {
      timer = setTimeout(() => setLen(len - 1), ERASE_MS);
    } else {
      // no dwell at empty: roll straight into the next title
      setIndex((i) => (i + 1) % ROLES.length);
      setPhase('typing');
    }

    return () => clearTimeout(timer);
  }, [index, len, phase]);

  return { text: ROLES[index].slice(0, len), settled: phase === 'holding' };
};

const SOCIALS = [
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/shubhamlokare-aiengineer', label: 'LinkedIn' },
  { icon: <GitHubIcon />, href: 'https://github.com/shubhaml4843', label: 'GitHub' },
  { icon: <EmailIcon />, href: 'mailto:shubhamlokare4843@gmail.com', label: 'Email' },
];

const Hero = () => {
  const { text: typed, settled } = useTypewriter();

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'clip',
        py: { xs: 12, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Chip
              label="Available for Gen AI / Agentic AI roles"
              size="small"
              sx={{
                mb: 3,
                px: 0.5,
                color: palette.emerald,
                backgroundColor: 'rgba(52, 211, 153, 0.10)',
                border: '1px solid rgba(52, 211, 153, 0.28)',
                fontWeight: 600,
              }}
            />

            <Typography
              variant="h1"
              sx={{ fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, mb: 1.5 }}
            >
              <Box component="span" sx={{ color: palette.text, display: 'block' }}>
                Shubham Lokare
              </Box>
            </Typography>

            {/* Typed title: one character at a time, hold, clear, next. */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: { xs: 40, md: 54 },
                mb: 3,
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '1.35rem', md: '2rem' }, ...titleAccentText }}
              >
                {typed}
              </Typography>
              {/* caret: solid while typing, blinking once the title settles */}
              <Box
                component="span"
                aria-hidden
                sx={{
                  width: '3px',
                  height: { xs: '1.35rem', md: '2rem' },
                  ml: '4px',
                  flexShrink: 0,
                  borderRadius: '1px',
                  backgroundColor: '#f093fb',
                  animation: settled ? 'heroCaret 1.05s steps(2, start) infinite' : 'none',
                  '@keyframes heroCaret': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                  },
                }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                maxWidth: 560,
                color: palette.textMuted,
                fontSize: { xs: '1rem', md: '1.08rem' },
              }}
            >
              I build AI agents and multi-agent AI solutions that solve real problems and deliver
              real business value — production RAG pipelines orchestrated with LangGraph and MCP,
              measured on outcomes rather than demos.
            </Typography>

            {/* proof strip: concrete numbers before the visitor scrolls */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: { xs: 2, md: 3 },
                mb: 4,
                pb: 3,
                borderBottom: `1px solid ${palette.borderSoft}`,
                maxWidth: 560,
              }}
            >
              {PROOF.map((p) => (
                <Box key={p.label} sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 750,
                      fontSize: { xs: '1.05rem', md: '1.2rem' },
                      lineHeight: 1.1,
                      color: palette.text,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {p.value}
                  </Typography>
                  <Typography sx={{ fontSize: '.7rem', color: palette.textMuted, mt: 0.3 }}>
                    {p.label}
                  </Typography>
                </Box>
              ))}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.1,
                  py: 0.45,
                  borderRadius: 999,
                  fontSize: '.7rem',
                  fontWeight: 700,
                  color: palette.emerald,
                  backgroundColor: 'rgba(52,211,153,.1)',
                  border: '1px solid rgba(52,211,153,.3)',
                }}
              >
                <VerifiedIcon sx={{ fontSize: '.9rem' }} />
                Microsoft Certified
              </Box>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mb: 5, flexWrap: 'wrap', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 3.5,
                  py: 1.4,
                  color: '#04121A',
                  background: `linear-gradient(120deg, ${palette.cyan}, ${palette.emerald})`,
                  boxShadow: '0 10px 34px rgba(34,211,238,.28)',
                  '&:hover': { boxShadow: '0 14px 44px rgba(34,211,238,.42)' },
                }}
              >
                View Projects
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  px: 3.5,
                  py: 1.4,
                  color: palette.text,
                  borderColor: palette.border,
                  '&:hover': { borderColor: palette.cyan, backgroundColor: 'rgba(34,211,238,.07)' },
                }}
              >
                Get in Touch
              </Button>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography variant="body2" sx={{ color: palette.textMuted, mr: 0.5 }}>
                Connect
              </Typography>
              {SOCIALS.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  sx={{
                    width: 46,
                    height: 46,
                    color: palette.textMuted,
                    border: `1px solid ${palette.borderSoft}`,
                    backgroundColor: 'rgba(13,18,32,.6)',
                    transition: 'all .25s ease',
                    '&:hover': {
                      color: palette.cyan,
                      borderColor: palette.cyan,
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </motion.div>

          {/* Orbital core: badges ride a rotating ring, spokes tie them to the centre */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 290, sm: 350, md: 430 },
                height: { xs: 290, sm: 350, md: 430 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {/* ambient bloom */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: '-10%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${palette.violet}22 0%, ${palette.cyan}11 45%, transparent 70%)`,
                  filter: 'blur(18px)',
                }}
              />

              {/* concentric guides */}
              {[100, 74, 50].map((pct, i) => (
                <Box
                  key={pct}
                  sx={{
                    position: 'absolute',
                    width: `${pct}%`,
                    height: `${pct}%`,
                    borderRadius: '50%',
                    border: `1px ${i === 0 ? 'solid' : 'dashed'} rgba(148, 175, 224, ${i === 0 ? 0.12 : 0.07})`,
                  }}
                />
              ))}

              {/* sweeping scan arc, reads as an active system */}
              <Box
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: `conic-gradient(from 0deg, transparent 300deg, ${palette.cyan}00 320deg, ${palette.cyan}44 358deg, transparent 360deg)`,
                  maskImage:
                    'radial-gradient(circle, transparent 48%, #000 49%, #000 50%, transparent 51%)',
                  WebkitMaskImage:
                    'radial-gradient(circle, transparent 48%, #000 49%, #000 50%, transparent 51%)',
                }}
              />

              {/* rotating assembly: spokes and badges turn as one */}
              <Box
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
                sx={{ position: 'absolute', inset: 0 }}
              >
                <Box
                  component="svg"
                  viewBox="0 0 100 100"
                  sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                >
                  {STACK.map((item, i) => {
                    const a = ((-90 + i * (360 / STACK.length)) * Math.PI) / 180;
                    return (
                      <line
                        key={item.label}
                        x1={50 + 14 * Math.cos(a)}
                        y1={50 + 14 * Math.sin(a)}
                        x2={50 + 36 * Math.cos(a)}
                        y2={50 + 36 * Math.sin(a)}
                        stroke={item.colour}
                        strokeWidth="0.35"
                        strokeDasharray="2 2"
                        opacity="0.5"
                      />
                    );
                  })}
                </Box>

                {STACK.map((item, i) => {
                  const a = ((-90 + i * (360 / STACK.length)) * Math.PI) / 180;
                  const r = 36;
                  return (
                    <Box
                      key={item.label}
                      sx={{
                        position: 'absolute',
                        left: `${50 + r * Math.cos(a)}%`,
                        top: `${50 + r * Math.sin(a)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* counter-rotate so the label stays upright */}
                      <Box
                        component={motion.div}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.75,
                            px: { xs: 1.1, md: 1.5 },
                            py: { xs: 0.55, md: 0.75 },
                            borderRadius: 999,
                            whiteSpace: 'nowrap',
                            fontSize: { xs: '.66rem', md: '.78rem' },
                            fontWeight: 700,
                            color: item.colour,
                            backgroundColor: 'rgba(5, 7, 15, 0.9)',
                            backdropFilter: 'blur(8px)',
                            border: `1px solid ${item.colour}55`,
                            boxShadow: `0 4px 18px rgba(0,0,0,.55), 0 0 16px ${item.colour}26`,
                          }}
                        >
                          <Box
                            component={motion.span}
                            animate={{ opacity: [0.35, 1, 0.35] }}
                            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                            sx={{
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              backgroundColor: item.colour,
                              boxShadow: `0 0 8px ${item.colour}`,
                              flexShrink: 0,
                            }}
                          />
                          {item.label}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* AI core */}
              <Box
                component={motion.div}
                animate={{ scale: [1, 1.035, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  width: '40%',
                  height: '40%',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '3rem', md: '4.2rem' },
                  background: `linear-gradient(145deg, ${palette.cyan} 0%, ${palette.violet} 52%, ${palette.emerald} 100%)`,
                  border: '3px solid rgba(255,255,255,.16)',
                  boxShadow: `0 0 70px ${palette.violet}66, inset 0 -14px 34px rgba(0,0,0,.28)`,
                }}
              >
                🤖
              </Box>
            </Box>
          </motion.div>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            mt: 8,
          }}
        >
          <IconButton
            aria-label="Scroll to About"
            onClick={() => document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' })}
            sx={{
              color: palette.textMuted,
              animation: 'floatDown 2.2s ease-in-out infinite',
              '@keyframes floatDown': {
                '0%,100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(8px)' },
              },
              '&:hover': { color: palette.cyan },
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
