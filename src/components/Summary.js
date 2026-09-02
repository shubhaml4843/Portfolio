import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TerminalIcon from '@mui/icons-material/Terminal';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import { palette, accentText, sectionBase } from '../theme';

// Three focus areas break the old wall of text into scannable claims.
const FOCUS = [
  {
    icon: '🧩',
    colour: '#22D3EE',
    title: 'Agentic Systems',
    body: 'Multi-agent orchestration with LangGraph and MCP, plus RLHF loops that keep improving routing from real feedback.',
  },
  {
    icon: '🔎',
    colour: '#A78BFA',
    title: 'Retrieval & RAG',
    body: 'Production RAG pipelines over Pinecone, FAISS and Chroma — validated with RAGAS, not guesswork.',
  },
  {
    icon: '🚀',
    colour: '#34D399',
    title: 'Production & MLOps',
    body: 'FastAPI services, Docker and deployment on Azure and AWS. Models that ship, not notebooks that demo.',
  },
];

const STATS = [
  { value: '3+', label: 'Years hands-on', colour: '#22D3EE' },
  { value: '2+', label: 'Years full-time', colour: '#A78BFA' },
  { value: '28%', label: 'Query accuracy gain', colour: '#34D399' },
  { value: '35%', label: 'User adoption lift', colour: '#38BDF8' },
  { value: '70%', label: 'Faster deployments', colour: '#FBBF24' },
  { value: '3', label: 'Certifications', colour: '#FB7185' },
];

// Rows carry their own icon and accent; stack rows render as chips so the
// panel does not read as a flat wall of label/value text.
const AT_A_GLANCE = [
  {
    icon: <BadgeOutlinedIcon />,
    colour: '#22D3EE',
    label: 'Role',
    value: 'AI Engineer · Gen AI & Agentic AI',
  },
  {
    icon: <WorkspacePremiumIcon />,
    colour: '#34D399',
    label: 'Certification',
    value: 'Microsoft Azure AI Engineer Associate',
  },
  {
    icon: <SchoolOutlinedIcon />,
    colour: '#A78BFA',
    label: 'Education',
    value: 'B.E. Computer Science Engineering · 2022',
  },
  {
    icon: <TerminalIcon />,
    colour: '#38BDF8',
    label: 'Core stack',
    chips: ['LangChain', 'LangGraph', 'MCP', 'FastAPI', 'PyTorch'],
  },
  {
    icon: <CloudOutlinedIcon />,
    colour: '#FBBF24',
    label: 'Cloud',
    chips: ['Azure OpenAI', 'Azure ML', 'AWS', 'Docker'],
  },
];

const Summary = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <Box component="section" id="summary" ref={ref} sx={{ ...sectionBase('a') }}>
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
            About Me
          </Typography>
          <Typography align="center" sx={{ color: palette.textMuted, mb: 6, fontSize: '.92rem' }}>
            Microsoft Certified AI Engineer · Gen AI, LLMs & Agentic Systems
          </Typography>
        </motion.div>

        {/* lead statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: { xs: 5, md: 6 } }}>
            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.7rem' },
                fontWeight: 650,
                lineHeight: 1.45,
                letterSpacing: '-0.02em',
                color: palette.text,
              }}
            >
              I build AI agents and multi-agent AI solutions that solve real problems and
              deliver{' '}
              <Box component="span" sx={{ ...accentText }}>
                real business value
              </Box>
              .
            </Typography>
          </Box>
        </motion.div>

        {/* detail: prose + at-a-glance */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.25fr) minmax(0, 1fr)' },
            gap: { xs: 4, md: 5 },
            alignItems: 'start',
            mb: { xs: 5, md: 7 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: '.95rem', md: '1.02rem' },
                  color: palette.textMuted,
                  lineHeight: 1.85,
                  mb: 2.5,
                }}
              >
                <Box component="span" sx={{ color: palette.text, fontWeight: 700 }}>2+ years</Box>{' '}
                full-time and{' '}
                <Box component="span" sx={{ color: palette.text, fontWeight: 700 }}>3+ years</Box>{' '}
                hands-on across Generative AI, Large Language Models and agentic architectures —
                turning research-grade ideas into production services that hold up under real
                traffic.
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '.95rem', md: '1.02rem' },
                  color: palette.textMuted,
                  lineHeight: 1.85,
                  mb: 2.5,
                }}
              >
                Day to day I architect production-grade{' '}
                <Box component="span" sx={{ color: palette.text, fontWeight: 600 }}>
                  RAG pipelines
                </Box>
                , multi-agent orchestration and MLOps workflows: retrieval over vector stores,
                LLM fine-tuning with{' '}
                <Box component="span" sx={{ color: palette.text, fontWeight: 600 }}>
                  LoRA and QLoRA
                </Box>
                , and reasoning strategies like ReAct, Chain-of-Thought and Tree-of-Thought. Every
                pipeline ships with evaluation attached — RAGAS scores and accuracy deltas, not
                impressions.
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '.95rem', md: '1.02rem' },
                  color: palette.textMuted,
                  lineHeight: 1.85,
                }}
              >
                That work has delivered a{' '}
                <Box component="span" sx={{ color: palette.emerald, fontWeight: 700 }}>
                  28% lift in query accuracy
                </Box>{' '}
                and a{' '}
                <Box component="span" sx={{ color: palette.emerald, fontWeight: 700 }}>
                  35% increase in user adoption
                </Box>
                , alongside 70% faster deployment cycles. Much of it sits in healthcare and medical
                imaging, where correctness and traceability matter more than novelty — and I mentor
                other engineers through the same workflows.
              </Typography>
            </Box>
          </motion.div>

          {/* at a glance */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box
              sx={{
                position: 'relative',
                p: 3,
                borderRadius: 4,
                overflow: 'hidden',
                border: `1px solid ${palette.borderSoft}`,
                backgroundColor: 'rgba(13, 18, 32, 0.62)',
                backdropFilter: 'blur(14px)',
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
              <Typography
                variant="overline"
                sx={{ color: palette.textMuted, fontSize: '.63rem', display: 'block', mb: 2 }}
              >
                At a glance
              </Typography>

              {AT_A_GLANCE.map((row, i) => (
                <Box
                  key={row.label}
                  sx={{
                    display: 'flex',
                    gap: 1.75,
                    py: 1.6,
                    borderTop: i === 0 ? 'none' : `1px solid ${palette.borderSoft}`,
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      flexShrink: 0,
                      mt: 0.2,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      color: row.colour,
                      backgroundColor: `${row.colour}14`,
                      border: `1px solid ${row.colour}33`,
                      '& svg': { fontSize: '1.05rem' },
                    }}
                  >
                    {row.icon}
                  </Box>

                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '.63rem',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(147,165,200,.6)',
                        mb: 0.5,
                      }}
                    >
                      {row.label}
                    </Typography>

                    {row.chips ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
                        {row.chips.map((c) => (
                          <Box
                            key={c}
                            sx={{
                              px: 1,
                              py: 0.3,
                              borderRadius: 999,
                              fontSize: '.7rem',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              color: row.colour,
                              backgroundColor: `${row.colour}12`,
                              border: `1px solid ${row.colour}2E`,
                            }}
                          >
                            {c}
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography
                        sx={{ fontSize: '.86rem', fontWeight: 600, color: palette.text, lineHeight: 1.45 }}
                      >
                        {row.value}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* focus areas */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 3,
            mb: { xs: 5, md: 7 },
          }}
        >
          {FOCUS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.38 + i * 0.1 }}
              style={{ height: '100%' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  p: 3,
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `1px solid ${palette.borderSoft}`,
                  backgroundColor: 'rgba(13, 18, 32, 0.62)',
                  backdropFilter: 'blur(14px)',
                  transition: 'transform .3s ease, border-color .3s ease, box-shadow .3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${f.colour}, transparent 75%)`,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '-35%',
                    right: '-25%',
                    width: '65%',
                    height: '80%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${f.colour}1A, transparent 70%)`,
                    pointerEvents: 'none',
                  },
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: `${f.colour}4D`,
                    boxShadow: `0 20px 50px rgba(0,0,0,.5), 0 0 0 1px ${f.colour}26`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    mb: 2,
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '1.5rem',
                    backgroundColor: `${f.colour}14`,
                    border: `1px solid ${f.colour}33`,
                  }}
                >
                  {f.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: '1.05rem', color: f.colour, mb: 1 }}
                >
                  {f.title}
                </Typography>
                <Typography variant="body2" sx={{ color: palette.textMuted }}>
                  {f.body}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.68 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                md: 'repeat(6, minmax(0, 1fr))',
              },
              borderRadius: 4,
              border: `1px solid ${palette.borderSoft}`,
              backgroundColor: 'rgba(13, 18, 32, 0.5)',
              backdropFilter: 'blur(14px)',
              overflow: 'hidden',
            }}
          >
            {STATS.map((s, i) => (
              <Box
                key={s.label}
                sx={{
                  position: 'relative',
                  px: 2,
                  py: 3,
                  textAlign: 'center',
                  minWidth: 0,
                  // hairline separators without doubling on wrapped rows
                  borderRight: { md: i < STATS.length - 1 ? `1px solid ${palette.borderSoft}` : 'none' },
                  borderTop: { xs: i > 1 ? `1px solid ${palette.borderSoft}` : 'none', md: 'none' },
                  transition: 'background-color .25s ease',
                  '&:hover': { backgroundColor: `${s.colour}0F` },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 28,
                    height: '2px',
                    borderRadius: 2,
                    background: s.colour,
                    opacity: 0.85,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: s.colour,
                    fontWeight: 750,
                    fontSize: { xs: '1.6rem', md: '1.85rem' },
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </Typography>
                <Typography
                  sx={{ color: palette.textMuted, fontSize: '.72rem', mt: 0.6, lineHeight: 1.4 }}
                >
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Summary;
