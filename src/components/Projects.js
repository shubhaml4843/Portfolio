import React, { useState } from 'react';
import { Box, Container, Typography, Button, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { palette, accentText, sectionBase } from '../theme';

// `metrics` are the numbers worth leading with — they used to be buried in
// the highlights list. A project only gets them where a real figure exists.
const PROJECTS = [
  {
    title: 'DataSynapse AI',
    icon: '🧠',
    featured: true,
    colour: '#22D3EE',
    tagline: 'Multi-agent AI platform with RLHF, RAG & MCP',
    problem:
      'Engineers lose 60–70% of their time manually coordinating tasks across ML/DL, NLP, code execution and visualization.',
    metrics: [
      { value: '10', label: 'Specialised agents' },
      { value: '~90%', label: 'Workflow automation' },
      { value: '65%', label: 'Less manual effort' },
      { value: '+22%', label: 'Reasoning quality' },
    ],
    highlights: [
      'Production-ready 10-agent system with a Core Orchestrator and MCP Dispatcher',
      'LangGraph coordination across EDA, data processing, ML/DL, NLP and visualization',
      'RLHF loop that keeps improving agent routing from human feedback',
      'RAG pipelines over external sources with vector memory for real-time context',
      'ReAct, CoT and ToT prompting to sharpen query understanding',
      'FastAPI service plus CLI runner, cutting experiment cycle time by 40%',
    ],
    tech: ['LangGraph', 'RLHF', 'Multi-Agent Systems', 'MCP', 'ReAct', 'RAG', 'FastAPI', 'Python', 'Docker', 'LoRA / QLoRA', 'Ollama', 'React'],
    github: 'https://github.com/shubhaml4843/NeuroAct-AI_Project',
    demo: 'https://docs.google.com/videos/d/1aJq2F-K5LssMtiAZwa6CMO3HqVLRDhlnkkDBJVK87MU/edit?scene=id.p#scene=id.p',
  },
  {
    title: 'Medical ChatBot',
    icon: '🏥',
    colour: '#A78BFA',
    tagline: 'AI-powered clinical assistant with RAG & NLP',
    problem:
      'Manual review of clinical reports is slow and error-prone, delaying diagnosis, treatment planning and reporting.',
    metrics: [
      { value: '50%', label: 'Faster review' },
      { value: '+23%', label: 'Response accuracy' },
      { value: '<2 min', label: 'Report generation' },
    ],
    highlights: [
      'Processes clinical reports across PDF, DOCX, JSON and CSV',
      'FAISS-backed RAG pipeline for context-aware answers on medical data',
      'Flask + React interface with chat, upload and automated PDF reports',
      'Hugging Face, Cohere and LangChain models lifted recommendation relevance by 20%',
      'Containerised with Docker for scalable real-time querying',
    ],
    tech: ['RAG', 'FAISS', 'LangChain', 'Hugging Face', 'Cohere', 'NLP', 'PyTorch', 'Flask', 'React', 'Docker'],
    github: 'https://github.com/shubhaml4843/Medical_chatBot',
    demo: '',
  },
  {
    title: 'Radiology Object Detection',
    icon: '🩻',
    colour: '#34D399',
    tagline: 'YOLOv8 medical imaging detection service',
    problem:
      'Radiologists spend up to 70% of their time on manual image interpretation, causing diagnostic delays and human error.',
    metrics: [
      { value: 'YOLOv8', label: 'Detection model' },
      { value: 'CUDA', label: 'GPU accelerated' },
      { value: 'Docker', label: 'Repeatable deploy' },
    ],
    highlights: [
      'YOLOv8 detection tuned for annotation accuracy on radiology images',
      'FastAPI backend with Swagger docs and an upload-and-review web UI',
      'Roboflow integration for custom dataset training and model management',
      'CUDA acceleration with Docker packaging for repeatable deployment',
    ],
    tech: ['YOLOv8', 'Computer Vision', 'FastAPI', 'Roboflow', 'OpenCV', 'CUDA', 'Docker', 'Python'],
    github: 'https://github.com/shubhaml4843/radiology_object_detection',
    demo: '',
  },
];

const Metric = ({ value, label, colour, big }) => (
  <Box sx={{ minWidth: 0 }}>
    <Typography
      sx={{
        color: colour,
        fontWeight: 750,
        lineHeight: 1.1,
        fontSize: big ? { xs: '1.5rem', md: '1.85rem' } : '1.15rem',
        letterSpacing: '-0.02em',
      }}
    >
      {value}
    </Typography>
    <Typography sx={{ color: palette.textMuted, fontSize: big ? '.76rem' : '.7rem', mt: 0.4 }}>
      {label}
    </Typography>
  </Box>
);

const TechRow = ({ tech, colour }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
    {tech.map((t) => (
      <Box
        key={t}
        sx={{
          px: 1.2,
          py: 0.45,
          borderRadius: 999,
          fontSize: '.71rem',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          color: palette.textMuted,
          backgroundColor: `${colour}0F`,
          border: `1px solid ${colour}26`,
        }}
      >
        {t}
      </Box>
    ))}
  </Box>
);

const Actions = ({ project, full }) => (
  <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
    <Button
      component="a"
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      startIcon={<GitHubIcon />}
      fullWidth={!full}
      sx={{
        px: full ? 3 : undefined,
        color: palette.text,
        borderColor: palette.borderSoft,
        '&:hover': { borderColor: project.colour, backgroundColor: `${project.colour}12` },
      }}
    >
      View Code
    </Button>
    {project.demo && (
      <Button
        component="a"
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        startIcon={<PlayCircleOutlineIcon />}
        fullWidth={!full}
        sx={{
          px: full ? 3 : undefined,
          color: '#04121A',
          background: `linear-gradient(120deg, ${project.colour}, ${palette.emerald})`,
          '&:hover': { boxShadow: `0 10px 28px ${project.colour}55` },
        }}
      >
        Watch Demo
      </Button>
    )}
  </Box>
);

const cardShell = (colour) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 4,
  overflow: 'hidden',
  border: `1px solid ${palette.borderSoft}`,
  backgroundColor: 'rgba(13, 18, 32, 0.66)',
  backdropFilter: 'blur(14px)',
  transition: 'transform .3s ease, border-color .3s ease, box-shadow .3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, ${colour}, transparent 70%)`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-30%',
    right: '-20%',
    width: '55%',
    height: '75%',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${colour}1F, transparent 70%)`,
    pointerEvents: 'none',
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    borderColor: `${colour}4D`,
    boxShadow: `0 22px 55px rgba(0,0,0,.5), 0 0 0 1px ${colour}26`,
  },
});

const CardHead = ({ project, index }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.75, mb: 2 }}>
    <Box
      sx={{
        width: 46,
        height: 46,
        flexShrink: 0,
        borderRadius: 2.5,
        display: 'grid',
        placeItems: 'center',
        fontSize: '1.5rem',
        backgroundColor: `${project.colour}14`,
        border: `1px solid ${project.colour}33`,
      }}
    >
      {project.icon}
    </Box>
    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.25, color: palette.text }}>
        {project.title}
      </Typography>
      <Typography sx={{ color: project.colour, fontSize: '.8rem', fontWeight: 600, mt: 0.3 }}>
        {project.tagline}
      </Typography>
    </Box>
    <Typography
      sx={{
        fontFamily: 'monospace',
        fontSize: '.75rem',
        color: 'rgba(147,165,200,.45)',
        flexShrink: 0,
      }}
    >
      {String(index + 1).padStart(2, '0')}
    </Typography>
  </Box>
);

const FeaturedCard = ({ project, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
    style={{ gridColumn: '1 / -1' }}
  >
    <Box sx={cardShell(project.colour)}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.25fr) minmax(0, 1fr)' },
          gap: { xs: 3, md: 5 },
          p: { xs: 3, md: 4 },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Box
            sx={{
              display: 'inline-block',
              px: 1.3,
              py: 0.4,
              mb: 2,
              borderRadius: 999,
              fontSize: '.68rem',
              fontWeight: 700,
              letterSpacing: '.08em',
              color: project.colour,
              backgroundColor: `${project.colour}14`,
              border: `1px solid ${project.colour}33`,
            }}
          >
            FLAGSHIP PROJECT
          </Box>

          <CardHead project={project} index={index} />

          <Typography variant="body2" sx={{ color: palette.textMuted, mb: 3 }}>
            {project.problem}
          </Typography>

          <Box component="ul" sx={{ pl: 2.2, m: 0, mb: 3, color: palette.textMuted }}>
            {project.highlights.slice(0, 4).map((h) => (
              <Typography component="li" variant="body2" key={h} sx={{ mb: 0.7 }}>
                {h}
              </Typography>
            ))}
          </Box>

          <Box sx={{ mb: 3 }}>
            <TechRow tech={project.tech} colour={project.colour} />
          </Box>

          <Actions project={project} full />
        </Box>

        {/* metrics panel */}
        <Box
          sx={{
            minWidth: 0,
            alignSelf: 'start',
            p: 3,
            borderRadius: 3,
            border: `1px solid ${palette.borderSoft}`,
            backgroundColor: 'rgba(5, 7, 15, 0.5)',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: palette.textMuted, fontSize: '.65rem', display: 'block', mb: 2 }}
          >
            Impact
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 3,
            }}
          >
            {project.metrics.map((m) => (
              <Metric key={m.label} {...m} colour={project.colour} big />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  </motion.div>
);

const StandardCard = ({ project, index, inView }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.12 * index }}
      style={{ height: '100%' }}
    >
      <Box sx={cardShell(project.colour)}>
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardHead project={project} index={index} />

          <Typography variant="body2" sx={{ color: palette.textMuted, mb: 2.5 }}>
            {project.problem}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              py: 2,
              mb: 2,
              borderTop: `1px solid ${palette.borderSoft}`,
              borderBottom: `1px solid ${palette.borderSoft}`,
            }}
          >
            {project.metrics.map((m) => (
              <Metric key={m.label} {...m} colour={project.colour} />
            ))}
          </Box>

          <Button
            size="small"
            onClick={() => setOpen((v) => !v)}
            endIcon={
              <ExpandMoreIcon
                sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s ease' }}
              />
            }
            sx={{
              alignSelf: 'flex-start',
              px: 0,
              mb: 1,
              color: project.colour,
              '&:hover': { background: 'none' },
            }}
          >
            {open ? 'Hide details' : 'What I built'}
          </Button>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component="ul" sx={{ pl: 2.2, my: 1, color: palette.textMuted }}>
              {project.highlights.map((h) => (
                <Typography component="li" variant="body2" key={h} sx={{ mb: 0.7 }}>
                  {h}
                </Typography>
              ))}
            </Box>
          </Collapse>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ my: 2 }}>
            <TechRow tech={project.tech} colour={project.colour} />
          </Box>

          <Actions project={project} />
        </Box>
      </Box>
    </motion.div>
  );
};

const Projects = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <Box component="section" id="projects" ref={ref} sx={{ ...sectionBase('a') }}>
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
            Projects
          </Typography>
          <Typography align="center" sx={{ color: palette.textMuted, mb: 6, fontSize: '.92rem' }}>
            Agentic AI & Applied ML Systems
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 3.5,
            alignItems: 'stretch',
          }}
        >
          {PROJECTS.map((project, i) =>
            project.featured ? (
              <FeaturedCard key={project.title} project={project} index={i} inView={inView} />
            ) : (
              <StandardCard key={project.title} project={project} index={i} inView={inView} />
            )
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
