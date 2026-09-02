import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { palette, accentText, sectionBase } from '../theme';

const EMAIL = 'shubhamlokare4843@gmail.com';
const PHONE = '+91 9130884843';

const CHANNELS = [
  {
    icon: <MailOutlineIcon />,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    colour: '#22D3EE',
    copy: EMAIL,
  },
  {
    icon: <PhoneIphoneIcon />,
    label: 'Phone',
    value: PHONE,
    href: 'tel:+919130884843',
    colour: '#34D399',
    copy: PHONE,
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    value: '/in/shubhamlokare-aiengineer',
    href: 'https://linkedin.com/in/shubhamlokare-aiengineer',
    colour: '#38BDF8',
    external: true,
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    value: '@shubhaml4843',
    href: 'https://github.com/shubhaml4843',
    colour: '#A78BFA',
    external: true,
  },
];

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    backgroundColor: 'rgba(5, 7, 15, .45)',
    '& fieldset': { borderColor: palette.borderSoft },
    '&:hover fieldset': { borderColor: 'rgba(34,211,238,.35)' },
    '&.Mui-focused fieldset': { borderColor: palette.cyan, borderWidth: '1px' },
  },
  '& .MuiInputLabel-root': { color: palette.textMuted, fontSize: '.9rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: palette.cyan },
  '& .MuiOutlinedInput-input': { color: palette.text, fontSize: '.92rem' },
};

const ChannelRow = ({ channel, onCopy, copied }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2,
      borderRadius: 3,
      border: `1px solid ${palette.borderSoft}`,
      backgroundColor: 'rgba(13, 18, 32, 0.55)',
      transition: 'border-color .25s ease, transform .25s ease',
      '&:hover': {
        borderColor: `${channel.colour}4D`,
        transform: 'translateX(3px)',
      },
    }}
  >
    <Box
      component="a"
      href={channel.href}
      target={channel.external ? '_blank' : '_self'}
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexGrow: 1,
        minWidth: 0,
        textDecoration: 'none',
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          flexShrink: 0,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          color: channel.colour,
          backgroundColor: `${channel.colour}14`,
          border: `1px solid ${channel.colour}33`,
        }}
      >
        {channel.icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: '.68rem', color: palette.textMuted, letterSpacing: '.06em' }}>
          {channel.label.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontSize: '.86rem',
            fontWeight: 600,
            color: palette.text,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {channel.value}
        </Typography>
      </Box>
    </Box>

    {channel.copy ? (
      <Button
        size="small"
        onClick={() => onCopy(channel.copy)}
        aria-label={`Copy ${channel.label}`}
        sx={{
          flexShrink: 0,
          minWidth: 0,
          px: 1,
          color: copied === channel.copy ? palette.emerald : palette.textMuted,
          '&:hover': { color: channel.colour, backgroundColor: 'transparent' },
        }}
      >
        {copied === channel.copy ? (
          <CheckIcon sx={{ fontSize: '1rem' }} />
        ) : (
          <ContentCopyIcon sx={{ fontSize: '1rem' }} />
        )}
      </Button>
    ) : (
      <NorthEastIcon sx={{ fontSize: '.95rem', color: palette.textMuted, flexShrink: 0 }} />
    )}
  </Box>
);

const Contact = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(null);
  const [toast, setToast] = useState(null);
  const [mailtoUrl, setMailtoUrl] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      setToast({ severity: 'warning', text: 'Copy blocked by the browser — select it manually.' });
    }
  };

  // There is no backend here, so the form hands the message to the visitor's
  // own mail client with everything pre-filled. Nothing is silently dropped.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    );
    const url = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    // keep it so a visible fallback can be offered — assigning a mailto:
    // silently does nothing when no mail client is registered
    setMailtoUrl(url);
    window.location.href = url;
    setToast({ severity: 'info', text: 'Opening your mail app with the message ready to send.' });
  };

  return (
    <Box component="section" id="contact" ref={ref} sx={{ ...sectionBase('b') }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, mb: 1, ...accentText }}
          >
            Get In Touch
          </Typography>
          <Typography align="center" sx={{ color: palette.textMuted, mb: 6, fontSize: '.92rem' }}>
            Open to Gen AI and Agentic AI roles · usually replies within a day
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.15fr)' },
            gap: { xs: 4, md: 5 },
            alignItems: 'start',
          }}
        >
          {/* channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Box
              sx={{
                p: 3,
                borderRadius: 4,
                border: `1px solid ${palette.borderSoft}`,
                backgroundColor: 'rgba(13, 18, 32, 0.6)',
                backdropFilter: 'blur(14px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${palette.cyan}, ${palette.violet}, transparent)`,
                },
              }}
            >
              {/* availability */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 3 }}>
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    backgroundColor: palette.emerald,
                    boxShadow: `0 0 10px ${palette.emerald}`,
                    animation: 'availPulse 2s ease-in-out infinite',
                    '@keyframes availPulse': {
                      '0%,100%': { opacity: 1 },
                      '50%': { opacity: 0.35 },
                    },
                  }}
                />
                <Typography sx={{ fontSize: '.82rem', fontWeight: 600, color: palette.emerald }}>
                  Available for new opportunities
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gap: 1.5 }}>
                {CHANNELS.map((c) => (
                  <ChannelRow key={c.label} channel={c} onCopy={handleCopy} copied={copied} />
                ))}
              </Box>

              <Typography
                sx={{
                  mt: 3,
                  pt: 2.5,
                  borderTop: `1px solid ${palette.borderSoft}`,
                  fontSize: '.76rem',
                  color: palette.textMuted,
                  lineHeight: 1.7,
                }}
              >
                Best for: agentic AI and multi-agent system design, production RAG pipelines,
                LLM fine-tuning and evaluation, and AI deployment on Azure or AWS.
              </Typography>
            </Box>
          </motion.div>

          {/* message form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: 4,
                border: `1px solid ${palette.borderSoft}`,
                backgroundColor: 'rgba(13, 18, 32, 0.6)',
                backdropFilter: 'blur(14px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${palette.violet}, ${palette.emerald}, transparent)`,
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: palette.text, mb: 0.5 }}>
                Send a message
              </Typography>
              <Typography sx={{ fontSize: '.76rem', color: palette.textMuted, mb: 3 }}>
                This opens your own mail app with the message pre-filled.
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                  gap: 2.5,
                  mb: 2.5,
                }}
              >
                <TextField
                  fullWidth
                  required
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  sx={fieldSx}
                />
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Your email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  sx={fieldSx}
                />
              </Box>

              <TextField
                fullWidth
                required
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                sx={{ ...fieldSx, mb: 2.5 }}
              />

              <TextField
                fullWidth
                required
                multiline
                rows={6}
                label="Your message"
                name="message"
                value={form.message}
                onChange={handleChange}
                sx={{ ...fieldSx, mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                endIcon={<SendIcon />}
                sx={{
                  py: 1.35,
                  color: '#04121A',
                  background: `linear-gradient(120deg, ${palette.cyan}, ${palette.emerald})`,
                  boxShadow: '0 10px 30px rgba(34,211,238,.25)',
                  '&:hover': { boxShadow: '0 14px 40px rgba(34,211,238,.4)' },
                }}
              >
                Send Message
              </Button>

              {mailtoUrl && (
                <Typography
                  sx={{ mt: 2, fontSize: '.74rem', color: palette.textMuted, textAlign: 'center' }}
                >
                  Mail app didn&apos;t open?{' '}
                  <Box
                    component="a"
                    href={mailtoUrl}
                    data-testid="mailto-fallback"
                    sx={{ color: palette.cyan, fontWeight: 600, textDecoration: 'none' }}
                  >
                    Use this link
                  </Box>
                  {' '}or write to{' '}
                  <Box
                    component="a"
                    href={`mailto:${EMAIL}`}
                    sx={{ color: palette.cyan, fontWeight: 600, textDecoration: 'none' }}
                  >
                    {EMAIL}
                  </Box>
                  .
                </Typography>
              )}
            </Box>
          </motion.div>
        </Box>
      </Container>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {toast ? (
          <Alert severity={toast.severity} variant="filled" onClose={() => setToast(null)}>
            {toast.text}
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
};

export default Contact;
