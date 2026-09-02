import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VerifiedIcon from '@mui/icons-material/Verified';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { palette, accentText, sectionBase } from '../theme';

const RESUME_FILE = '/resume/Shubham_Lokare_Ai_Engineer.pdf';

// Roles are described by what was built, not by employer or product name.
const TIMELINE = [
  {
    kind: 'role',
    title: 'AI Engineer',
    period: 'Dec 2024 — Present',
    current: true,
    colour: '#22D3EE',
    points: [
      'Built and shipped RAG pipelines, chatbots (OpenAI, Claude API), MCP workflows and Whisper-based voice interfaces — +28% query response accuracy',
      'Fine-tuned Gen AI, NLP and computer vision models for object detection and multimodal processing — +18% accuracy',
      'Owned full-stack AI deployment on AWS, Docker and FastAPI — 70% faster deployment cycles, mentoring 4+ engineers',
      'Delivered real-time Power BI dashboards — 60% less report generation time',
    ],
  },
  {
    kind: 'role',
    title: 'Data Scientist Intern',
    period: 'Jul 2024 — Dec 2024',
    colour: '#A78BFA',
    points: [
      'EDA, preprocessing and feature engineering that lifted ML/DL model performance by 10–15%',
      'Built and tuned Random Forest, XGBoost, LightGBM and SVM alongside ANN, CNN, RNN, LSTM and YOLO models',
    ],
  },
  {
    kind: 'education',
    title: 'B.E. Computer Science Engineering',
    period: '2018 — 2022',
    subtitle: 'Savitribai Phule Pune University, Pune',
    colour: '#34D399',
    points: [],
  },
];

// Consistent phrasing only. The previous grid mixed real numbers ('3+ yrs')
// with words ('Microsoft', 'Open') styled as numbers, which read as broken.
const FACTS = ['3+ yrs hands-on', '2+ yrs full-time', 'Microsoft Certified', 'Open to roles'];

// Decorative CV illustration: stacked dark sheets with an AI seal and a
// small agent-graph motif. Inline SVG so it takes the theme palette and
// ships no image asset.
const ResumeIllustration = () => (
  <Box
    sx={{
      position: 'relative',
      mb: 3,
      borderRadius: 3,
      border: `1px solid ${palette.borderSoft}`,
      background: 'rgba(5, 7, 15, .5)',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 35%, ${palette.violet}1F, transparent 68%)`,
        pointerEvents: 'none',
      },
      '&:hover svg': { transform: 'translateY(-4px)' },
    }}
  >
    <Box
      component="svg"
      viewBox="0 0 320 240"
      role="img"
      aria-label="Illustration of a CV document with an AI verification seal"
      sx={{
        display: 'block',
        width: '100%',
        height: 'auto',
        transition: 'transform .4s ease',
      }}
    >
      <defs>
        <linearGradient id="rzAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={palette.cyan} />
          <stop offset="100%" stopColor={palette.violet} />
        </linearGradient>
        <linearGradient id="rzSheet" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#182135" />
          <stop offset="100%" stopColor="#0D1220" />
        </linearGradient>
        <linearGradient id="rzSeal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.cyan} />
          <stop offset="55%" stopColor={palette.violet} />
          <stop offset="100%" stopColor={palette.emerald} />
        </linearGradient>
      </defs>

      {/* agent-graph motif behind the sheets */}
      <g opacity="0.5">
        {[
          [36, 40, 74, 26],
          [74, 26, 96, 62],
          [36, 40, 58, 74],
          [246, 188, 276, 160],
          [276, 160, 288, 196],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={palette.cyan}
            strokeOpacity="0.35"
            strokeWidth="0.8"
          />
        ))}
        {[
          [36, 40, 2.6],
          [74, 26, 1.8],
          [96, 62, 2.2],
          [58, 74, 1.6],
          [246, 188, 2.4],
          [276, 160, 1.8],
          [288, 196, 2.2],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={palette.cyan} opacity="0.75" />
        ))}
      </g>

      {/* back sheet */}
      <g transform="rotate(-7 160 128)">
        <rect
          x="98"
          y="42"
          width="124"
          height="164"
          rx="8"
          fill="url(#rzSheet)"
          stroke={palette.violet}
          strokeOpacity="0.28"
        />
      </g>

      {/* front sheet */}
      <g transform="rotate(3.5 160 124)">
        <rect
          x="106"
          y="34"
          width="128"
          height="170"
          rx="8"
          fill="url(#rzSheet)"
          stroke={palette.cyan}
          strokeOpacity="0.4"
        />
        {/* name + role */}
        <rect x="120" y="50" width="66" height="7" rx="3" fill="#E5EDFF" opacity="0.92" />
        <rect x="120" y="62" width="44" height="4.5" rx="2" fill="#93A5C8" opacity="0.8" />
        <rect x="120" y="74" width="100" height="2" rx="1" fill="url(#rzAccent)" />

        {/* body: section heads plus lines */}
        {[
          [84, 26, true],
          [93, 96, false],
          [100, 88, false],
          [107, 72, false],
          [120, 30, true],
          [129, 98, false],
          [136, 84, false],
          [143, 64, false],
          [156, 22, true],
          [165, 92, false],
          [172, 70, false],
        ].map(([y, w, head], i) => (
          <rect
            key={i}
            x="120"
            y={y}
            width={w}
            height={head ? 4 : 2.6}
            rx="1.5"
            fill={head ? palette.violet : '#93A5C8'}
            opacity={head ? 0.95 : 0.5}
          />
        ))}

        {/* skill pills */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={120 + i * 25}
            y="184"
            width="21"
            height="8"
            rx="4"
            fill={palette.cyan}
            opacity="0.22"
          />
        ))}
      </g>

      {/* verification seal */}
      <g transform="translate(228 168)">
        <circle r="26" fill="#05070F" />
        <circle r="25" fill="none" stroke="url(#rzSeal)" strokeWidth="1.6" />
        <circle r="19" fill="none" stroke={palette.emerald} strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="3 3" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * 22.5 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={21 * Math.cos(a)}
              y1={21 * Math.sin(a)}
              x2={24 * Math.cos(a)}
              y2={24 * Math.sin(a)}
              stroke={palette.emerald}
              strokeOpacity="0.45"
              strokeWidth="1.1"
            />
          );
        })}
        <path
          d="M -8 1 L -2.5 7 L 9 -5.5"
          fill="none"
          stroke={palette.emerald}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Box>

    {/* meta badge */}
    <Box
      sx={{
        position: 'absolute',
        bottom: 10,
        left: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1,
        py: 0.35,
        borderRadius: 999,
        fontSize: '.62rem',
        fontFamily: 'monospace',
        color: palette.cyan,
        backgroundColor: 'rgba(5,7,15,.88)',
        border: `1px solid ${palette.border}`,
      }}
    >
      <PictureAsPdfIcon sx={{ fontSize: '.8rem' }} />
      266 KB · 2 pages
    </Box>
  </Box>
);

const Resume = () => {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const fileUrl = process.env.PUBLIC_URL + RESUME_FILE;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Shubham_Lokare_Ai_Engineer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box component="section" id="resume" ref={ref} sx={{ ...sectionBase('a') }}>
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
            Experience
          </Typography>
          <Typography align="center" sx={{ color: palette.textMuted, mb: 6, fontSize: '.92rem' }}>
            Career timeline · full resume available as PDF
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.5fr) minmax(0, 1fr)' },
            gap: { xs: 4, md: 5 },
            alignItems: 'start',
          }}
        >
          {/* timeline */}
          <Box sx={{ position: 'relative', minWidth: 0 }}>
            <Box
              sx={{
                position: 'absolute',
                left: 11,
                top: 8,
                bottom: 8,
                width: '1px',
                background: `linear-gradient(180deg, ${palette.cyan}66, ${palette.violet}44, transparent)`,
              }}
            />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.14 }}
              >
                <Box sx={{ position: 'relative', pl: 5, pb: i === TIMELINE.length - 1 ? 0 : 4.5 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 4,
                      top: 5,
                      width: 15,
                      height: 15,
                      borderRadius: '50%',
                      backgroundColor: palette.bgDeep,
                      border: `2px solid ${item.colour}`,
                      boxShadow: `0 0 14px ${item.colour}66`,
                      ...(item.current && {
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -5,
                          borderRadius: '50%',
                          border: `1px solid ${item.colour}`,
                          animation: 'nodeRing 2.2s ease-out infinite',
                        },
                        '@keyframes nodeRing': {
                          '0%': { transform: 'scale(.7)', opacity: 0.9 },
                          '100%': { transform: 'scale(1.5)', opacity: 0 },
                        },
                      }),
                    }}
                  />

                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.25, mb: 0.5 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: palette.text, fontSize: '1.05rem' }}
                    >
                      {item.title}
                    </Typography>
                    {item.current && (
                      <Box
                        sx={{
                          px: 1,
                          py: 0.25,
                          borderRadius: 999,
                          fontSize: '.62rem',
                          fontWeight: 700,
                          letterSpacing: '.06em',
                          color: palette.emerald,
                          backgroundColor: 'rgba(52,211,153,.1)',
                          border: '1px solid rgba(52,211,153,.3)',
                        }}
                      >
                        CURRENT
                      </Box>
                    )}
                    {item.kind === 'education' && (
                      <Box
                        sx={{
                          px: 1,
                          py: 0.25,
                          borderRadius: 999,
                          fontSize: '.62rem',
                          fontWeight: 700,
                          letterSpacing: '.06em',
                          color: item.colour,
                          backgroundColor: `${item.colour}14`,
                          border: `1px solid ${item.colour}33`,
                        }}
                      >
                        EDUCATION
                      </Box>
                    )}
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: '.74rem',
                      color: item.colour,
                      mb: item.points.length ? 1.5 : 0.5,
                    }}
                  >
                    {item.period}
                  </Typography>

                  {item.subtitle && (
                    <Typography sx={{ color: palette.textMuted, fontSize: '.85rem' }}>
                      {item.subtitle}
                    </Typography>
                  )}

                  {item.points.length > 0 && (
                    <Box component="ul" sx={{ pl: 2.2, m: 0, color: palette.textMuted }}>
                      {item.points.map((p) => (
                        <Typography component="li" variant="body2" key={p} sx={{ mb: 0.8 }}>
                          {p}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* download panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box
              sx={{
                // sticky also establishes a containing block for ::before
                position: { xs: 'relative', md: 'sticky' },
                top: { md: 100 },
                p: 3,
                borderRadius: 4,
                border: `1px solid ${palette.borderSoft}`,
                backgroundColor: 'rgba(13, 18, 32, 0.7)',
                backdropFilter: 'blur(14px)',
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
              <ResumeIllustration />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
                {FACTS.map((f) => (
                  <Box
                    key={f}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.4,
                      px: 1.1,
                      py: 0.4,
                      borderRadius: 999,
                      fontSize: '.7rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      color: palette.textMuted,
                      backgroundColor: 'rgba(34,211,238,.07)',
                      border: `1px solid ${palette.borderSoft}`,
                    }}
                  >
                    {f === 'Microsoft Certified' && (
                      <VerifiedIcon sx={{ fontSize: '.85rem', color: palette.emerald }} />
                    )}
                    {f}
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                sx={{
                  mb: 1.25,
                  py: 1.3,
                  color: '#04121A',
                  background: `linear-gradient(120deg, ${palette.cyan}, ${palette.emerald})`,
                  boxShadow: '0 10px 30px rgba(34,211,238,.25)',
                  '&:hover': { boxShadow: '0 14px 40px rgba(34,211,238,.4)' },
                }}
              >
                Download PDF
              </Button>

              <Button
                component="a"
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<VisibilityIcon />}
                sx={{
                  py: 1.3,
                  color: palette.text,
                  borderColor: palette.borderSoft,
                  '&:hover': { borderColor: palette.cyan, backgroundColor: 'rgba(34,211,238,.07)' },
                }}
              >
                View in Browser
              </Button>

              <Box sx={{ mt: 3, pt: 2.5, borderTop: `1px solid ${palette.borderSoft}` }}>
                {[
                  { icon: <MailOutlineIcon sx={{ fontSize: '.95rem' }} />, text: 'shubhamlokare4843@gmail.com', href: 'mailto:shubhamlokare4843@gmail.com' },
                  { icon: <PhoneIphoneIcon sx={{ fontSize: '.95rem' }} />, text: '+91 9130884843', href: 'tel:+919130884843' },
                ].map((row) => (
                  <Box
                    key={row.text}
                    component="a"
                    href={row.href}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      py: 0.6,
                      textDecoration: 'none',
                      fontSize: '.76rem',
                      color: palette.textMuted,
                      transition: 'color .2s ease',
                      '&:hover': { color: palette.cyan },
                    }}
                  >
                    {row.icon}
                    <Box component="span" sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {row.text}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Resume;
