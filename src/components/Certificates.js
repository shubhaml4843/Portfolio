import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VerifiedIcon from '@mui/icons-material/Verified';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { palette, accentText, sectionBase } from '../theme';

const CERTIFICATES = [
  {
    title: 'Azure AI Engineer Associate',
    prefix: 'Microsoft Certified',
    issuer: 'Microsoft',
    monogram: 'MS',
    date: '2026',
    type: 'Cloud Certification',
    colour: '#38BDF8',
    validates: ['Azure OpenAI', 'Azure AI Services', 'Computer Vision', 'NLP Solutions', 'Responsible AI'],
    link: 'https://learn.microsoft.com/en-us/users/shubhamlokare-0072/credentials/dd38583b0f5089a0?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
  {
    title: 'Professional Program on Data Science and AI',
    issuer: '360DigiTMG',
    monogram: '360',
    date: '2024',
    type: 'Professional Program',
    colour: '#A78BFA',
    validates: ['Machine Learning', 'Deep Learning', 'Statistics', 'Python', 'Model Deployment'],
    link: 'https://drive.google.com/file/d/1AXgQcg-7FswPJm2aZp7T2SFBGckEQcuY/view',
  },
  {
    title: 'Microsoft Power BI',
    issuer: '360DigiTMG',
    monogram: 'BI',
    date: '2024',
    type: 'Technical Certification',
    colour: '#F2C811',
    validates: ['Data Modeling', 'DAX', 'Dashboards', 'Data Visualization'],
    link: 'https://drive.google.com/file/d/1uBbFlsP96dI_JIJusyi_lSy97L0sITXM/view',
  },
];

// Medal seal, drawn rather than imported so it takes the card's accent.
const Seal = ({ colour, monogram }) => (
  <Box sx={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
    <Box
      component={motion.div}
      animate={{ rotate: 360 }}
      transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      sx={{ position: 'absolute', inset: 0 }}
    >
      <Box
        component="svg"
        viewBox="0 0 100 100"
        sx={{ width: '100%', height: '100%', display: 'block' }}
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={colour}
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {/* notched rim, like a medal edge */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={50 + 39 * Math.cos(a)}
              y1={50 + 39 * Math.sin(a)}
              x2={50 + 43 * Math.cos(a)}
              y2={50 + 43 * Math.sin(a)}
              stroke={colour}
              strokeOpacity="0.3"
              strokeWidth="1.4"
            />
          );
        })}
      </Box>
    </Box>

    <Box
      sx={{
        position: 'absolute',
        inset: '18%',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 800,
        fontSize: monogram.length > 2 ? '.9rem' : '1.1rem',
        color: colour,
        background: `radial-gradient(circle at 35% 25%, ${colour}30, ${colour}10 60%, transparent)`,
        border: `1.5px solid ${colour}66`,
        boxShadow: `inset 0 0 22px ${colour}26, 0 0 26px ${colour}1F`,
      }}
    >
      {monogram}
    </Box>
  </Box>
);

const CertCard = ({ cert, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, delay: index * 0.12 }}
    style={{ height: '100%' }}
  >
    {/* the whole card is the link, so the entire surface is clickable */}
    <Box
      component="a"
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 3.5,
        textDecoration: 'none',
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${palette.borderSoft}`,
        backgroundColor: 'rgba(13, 18, 32, 0.68)',
        backdropFilter: 'blur(14px)',
        transition: 'transform .3s ease, border-color .3s ease, box-shadow .3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${cert.colour}, transparent 75%)`,
        },
        // guilloche wash, the faint engraved pattern real certificates carry
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-40%',
          right: '-30%',
          width: '80%',
          height: '90%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${cert.colour}1A, transparent 70%)`,
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: `${cert.colour}4D`,
          boxShadow: `0 24px 60px rgba(0,0,0,.55), 0 0 0 1px ${cert.colour}2E`,
        },
        '&:focus-visible': { outline: `2px solid ${cert.colour}`, outlineOffset: 2 },
      }}
    >
      {/* verified ribbon, top right */}
      <Box
        sx={{
          position: 'absolute',
          top: 18,
          right: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 0.4,
          px: 1,
          py: 0.35,
          borderRadius: 999,
          fontSize: '.65rem',
          fontWeight: 700,
          color: palette.emerald,
          backgroundColor: 'rgba(52, 211, 153, .10)',
          border: '1px solid rgba(52, 211, 153, .3)',
        }}
      >
        <VerifiedIcon sx={{ fontSize: '.85rem' }} />
        Verified
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5, mt: 1 }}>
        <Seal colour={cert.colour} monogram={cert.monogram} />
      </Box>

      <Box sx={{ textAlign: 'center', mb: 2.5 }}>
        {cert.prefix && (
          <Typography
            variant="overline"
            sx={{ color: cert.colour, fontSize: '.6rem', display: 'block', lineHeight: 1.8 }}
          >
            {cert.prefix}
          </Typography>
        )}
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 700, lineHeight: 1.3, color: palette.text, fontSize: '1.05rem' }}
        >
          {cert.title}
        </Typography>
        <Typography sx={{ color: palette.textMuted, fontSize: '.8rem', mt: 0.75 }}>
          {cert.issuer} · <Box component="span" sx={{ fontFamily: 'monospace' }}>{cert.date}</Box>
        </Typography>
      </Box>

      <Box
        sx={{
          pt: 2.5,
          mb: 2.5,
          borderTop: `1px solid ${palette.borderSoft}`,
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'rgba(147,165,200,.6)', fontSize: '.58rem', display: 'block', mb: 1.25 }}
        >
          Validates
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
          {cert.validates.map((v) => (
            <Box
              key={v}
              sx={{
                px: 1.1,
                py: 0.4,
                borderRadius: 999,
                fontSize: '.69rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                color: palette.textMuted,
                backgroundColor: `${cert.colour}0F`,
                border: `1px solid ${cert.colour}26`,
              }}
            >
              {v}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          pt: 2,
          borderTop: `1px solid ${palette.borderSoft}`,
        }}
      >
        <Box
          sx={{
            px: 1.2,
            py: 0.4,
            borderRadius: 999,
            fontSize: '.67rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            color: cert.colour,
            backgroundColor: `${cert.colour}12`,
            border: `1px solid ${cert.colour}2E`,
          }}
        >
          {cert.type}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: '.75rem',
            fontWeight: 700,
            color: cert.colour,
          }}
        >
          View credential
          <NorthEastIcon sx={{ fontSize: '.85rem' }} />
        </Box>
      </Box>
    </Box>
  </motion.div>
);

const Certificates = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Box component="section" id="certificates" ref={ref} sx={{ ...sectionBase('b') }}>
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
            Certifications
          </Typography>
          <Typography align="center" sx={{ color: palette.textMuted, mb: 6, fontSize: '.92rem' }}>
            {CERTIFICATES.length} credentials · all independently verifiable
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(300px, 1fr))' },
            gap: 3,
            alignItems: 'stretch',
          }}
        >
          {CERTIFICATES.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} inView={inView} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Certificates;
