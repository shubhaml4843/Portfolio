import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
  Drawer, List, ListItemButton, ListItemText, LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { palette, accentText } from '../theme';

// Module scope so the scroll effect can depend on it without re-subscribing.
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'summary', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const y = window.scrollY;
      setScrolled(y > 40);

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);

      // the section covering the point just below the header wins
      const probe = y + 120;
      let current = NAV_ITEMS[0].id;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (probe >= el.offsetTop) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          backgroundColor: scrolled ? 'rgba(5, 7, 15, 0.82)' : 'rgba(5, 7, 15, 0.35)',
          backdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${scrolled ? palette.borderSoft : 'transparent'}`,
          transition: 'background-color .3s ease, border-color .3s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <motion.div whileHover={{ scale: 1.03 }} style={{ cursor: 'pointer' }}>
            <Typography
              variant="h6"
              onClick={() => scrollTo('home')}
              sx={{ fontWeight: 750, letterSpacing: '-0.02em', ...accentText }}
            >
              Shubham Lokare
            </Typography>
          </motion.div>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', gap: 0.5 }}>
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  sx={{
                    position: 'relative',
                    px: 1.75,
                    py: 1,
                    fontSize: '.9rem',
                    color: active ? palette.cyan : palette.textMuted,
                    '&:hover': { color: palette.text, backgroundColor: 'rgba(34,211,238,.06)' },
                  }}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        left: 12,
                        right: 12,
                        bottom: 4,
                        height: 2,
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${palette.cyan}, ${palette.violet})`,
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Box>

          <IconButton
            color="inherit"
            aria-label={mobileOpen ? 'close menu' : 'open menu'}
            onClick={() => setMobileOpen((v) => !v)}
            sx={{ ml: 'auto', display: { md: 'none' }, color: palette.text }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        {/* reading progress */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 2,
            overflow: 'hidden',
            backgroundColor: 'transparent',
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${palette.cyan}, ${palette.violet}, ${palette.emerald})`,
            },
          }}
        />
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 260,
            backgroundColor: 'rgba(5, 7, 15, 0.96)',
            backdropFilter: 'blur(20px)',
            borderLeft: `1px solid ${palette.borderSoft}`,
          },
        }}
      >
        <Box sx={{ p: 2, pt: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', ...accentText }}>
            Shubham Lokare
          </Typography>
          <List sx={{ p: 0 }}>
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <ListItemButton
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    borderLeft: `2px solid ${active ? palette.cyan : 'transparent'}`,
                    backgroundColor: active ? 'rgba(34,211,238,.08)' : 'transparent',
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: active ? 700 : 500,
                        color: active ? palette.cyan : palette.textMuted,
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
