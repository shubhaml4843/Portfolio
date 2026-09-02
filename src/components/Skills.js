import React, { useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { palette, accentText, sectionBase } from '../theme';

// Each category carries its own accent so the wall of chips reads as
// grouped rather than uniform. `core` skills get the filled treatment.
const CATEGORIES = [
  {
    title: 'AI & Gen AI',
    short: 'AI & Gen AI',
    icon: '🧠',
    colour: '#22D3EE',
    core: ['LangChain', 'LangGraph', 'MCP', 'RAG', 'Agentic AI', 'RLHF', 'LLM'],
    skills: ['LLM', 'LangChain', 'LangGraph', 'LangSmith', 'LlamaIndex', 'Haystack', 'GANs', 'Diffusion Models', 'Multimodal Models', 'Multimodal AI', 'AutoGen', 'RAG', 'Agentic RAG', 'RAG Pipeline', 'MCP', 'GPT', 'DALL-E', 'Transformers', 'VAE', 'Agentic AI', 'RLHF', 'Ollama', 'Cohere', 'Hugging Face', 'OpenAI API', 'Claude API', 'Stable Diffusion', 'Claude', 'Gemini', 'BERT', 'T5', 'CLIP', 'Whisper'],
  },
  {
    title: 'Prompt Engineering & Fine-Tuning',
    short: 'Prompting & Tuning',
    icon: '🎯',
    colour: '#A78BFA',
    core: ['RAG Evaluation (RAGAS)', 'Prompt Engineering', 'LoRA', 'QLoRA', 'ReAct'],
    skills: ['Prompt Engineering', 'RAG Evaluation (RAGAS)', 'ReAct', 'Chain-of-Thought (CoT)', 'Tree-of-Thought (ToT)', 'Few-Shot Learning', 'LoRA', 'QLoRA', 'LLM Fine-Tuning', 'Self-Attention', 'Context Engineering', 'Evaluation Metrics'],
  },
  {
    title: 'Vector Databases & Retrieval',
    short: 'Vector & Retrieval',
    icon: '🔎',
    colour: '#34D399',
    core: ['Pinecone', 'FAISS', 'Chroma', 'Semantic Search'],
    skills: ['Pinecone', 'FAISS', 'Chroma', 'Weaviate', 'Vector Search', 'Embeddings', 'Semantic Search', 'Vector Memory', 'Hybrid Search', 'Chunking Strategies', 'Re-Ranking'],
  },
  {
    title: 'ML & Deep Learning',
    short: 'ML & Deep Learning',
    icon: '📈',
    colour: '#E879F9',
    core: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'LSTM', 'CNN'],
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Supervised Learning', 'Unsupervised Learning', 'Decision Trees', 'Random Forest', 'Logistic Regression', 'Regression', 'PCA', 'Dimensionality Reduction', 'Clustering', 'Ensemble Learning', 'CNN', 'RNN', 'LSTM', 'ANN', 'XGBoost', 'LightGBM', 'SVM', 'Neural Networks', 'KNN', 'ARIMA', 'SARIMA', 'Gradient Boosting', 'Naive Bayes', 'K-Means', 'DBSCAN', 'GAN', 'Autoencoders', 'Transfer Learning'],
  },
  {
    title: 'Computer Vision',
    short: 'Computer Vision',
    icon: '👁️',
    colour: '#FBBF24',
    core: ['YOLOv8', 'OpenCV', 'Object Detection', 'Image Segmentation'],
    skills: ['CNN', 'OpenCV', 'YOLO', 'YOLOv8', 'Detectron2', 'MediaPipe', 'PIL', 'ImageAI', 'Object Detection', 'Image Segmentation', 'Face Recognition', 'OCR', 'Image Classification', 'Feature Extraction', 'Edge Detection', 'Image Processing', 'Video Analysis', 'Pose Estimation', 'Style Transfer'],
  },
  {
    title: 'NLP & LLMs',
    short: 'NLP & LLMs',
    icon: '💬',
    colour: '#38BDF8',
    core: ['Transformers', 'BERT', 'Hugging Face', 'ChatBot', 'Word Embeddings'],
    skills: ['ChatBot', 'BERT', 'Transformers', 'Vectorization', 'Tokenization', 'NLTK', 'Word Embeddings', 'Embeddings', 'TF-IDF', 'Bag of Words', 'RNNs', 'OpenAI', 'Ollama', 'Cohere', 'GPT', 'spaCy', 'Hugging Face', 'LangChain', 'Text Generation', 'Sentiment Analysis', 'Named Entity Recognition', 'POS Tagging', 'Text Classification', 'Question Answering', 'Text Summarization', 'Machine Translation', 'Word2Vec'],
  },
  {
    title: 'Cloud & MLOps',
    short: 'Cloud & MLOps',
    icon: '☁️',
    colour: '#2DD4BF',
    core: ['Azure', 'Azure OpenAI', 'AWS', 'Docker'],
    skills: ['Azure', 'Azure OpenAI', 'Azure AI Foundry', 'Azure ML', 'AWS', 'Docker', 'Nginx', 'MLflow', 'Git', 'CI/CD', 'Model Deployment', 'Model Monitoring'],
  },
  {
    title: 'Backend & Programming',
    short: 'Backend & Code',
    icon: '⚙️',
    colour: '#818CF8',
    core: ['Python', 'FastAPI', 'SQL', 'REST APIs'],
    skills: ['Python', 'SQL', 'FastAPI', 'REST APIs', 'WebSocket', 'Async APIs', 'API Integration', 'Microservices Architecture', 'Streamlit', 'Flask', 'Django', 'HTML', 'CSS', 'Git', 'GitHub'],
  },
  {
    title: 'Data Science',
    short: 'Data Science',
    icon: '📊',
    colour: '#FB7185',
    core: ['Pandas', 'NumPy', 'EDA', 'Power BI', 'Feature Engineering'],
    skills: ['Pandas', 'NumPy', 'SciPy', 'Seaborn', 'Matplotlib', 'EDA', 'Data Preprocessing', 'Plotly', 'Power BI', 'Scikit-learn', 'Statistics', 'Linear Algebra', 'Mathematics', 'Evaluation Metrics', 'GridSearch CV', 'Regularization', 'Feature Engineering', 'Data Cleaning', 'Data Wrangling', 'Hypothesis Testing', 'Cross Validation', 'Model Selection', 'Jupyter', 'Data Analysis', 'Data Mining', 'Time Series Analysis'],
  },
];

const TOTAL = CATEGORIES.reduce((n, c) => n + c.skills.length, 0);

const Skills = () => {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const category = CATEGORIES[active];

  return (
    <Box component="section" id="skills" ref={ref} sx={{ ...sectionBase('b') }}>
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
            Skills
          </Typography>
          <Typography align="center" sx={{ color: palette.textMuted, mb: 6, fontSize: '.92rem' }}>
            {TOTAL} technologies across {CATEGORIES.length} disciplines
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '260px minmax(0, 1fr)' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          {/* category rail — vertical on desktop, swipeable row on mobile */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: 1,
              overflowX: { xs: 'auto', md: 'visible' },
              pb: { xs: 1, md: 0 },
              position: { md: 'sticky' },
              top: { md: 96 },
              '&::-webkit-scrollbar': { height: 4 },
            }}
          >
            {CATEGORIES.map((cat, i) => {
              const on = i === active;
              return (
                <Box
                  key={cat.title}
                  component="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  sx={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    width: { xs: 'auto', md: '100%' },
                    px: 1.75,
                    py: 1.35,
                    cursor: 'pointer',
                    textAlign: 'left',
                    font: 'inherit',
                    borderRadius: 2.5,
                    border: `1px solid ${on ? `${cat.colour}55` : palette.borderSoft}`,
                    backgroundColor: on ? `${cat.colour}14` : 'rgba(13,18,32,.5)',
                    transition: 'all .22s ease',
                    '&:hover': { borderColor: `${cat.colour}55`, backgroundColor: `${cat.colour}0F` },
                  }}
                >
                  <Box component="span" sx={{ fontSize: '1.05rem', lineHeight: 1 }}>
                    {cat.icon}
                  </Box>
                  <Typography
                    sx={{
                      flexGrow: 1,
                      whiteSpace: 'nowrap',
                      fontSize: '.86rem',
                      fontWeight: on ? 700 : 500,
                      color: on ? cat.colour : palette.textMuted,
                    }}
                  >
                    {cat.short}
                  </Typography>
                  <Typography
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      fontSize: '.72rem',
                      fontFamily: 'monospace',
                      color: on ? cat.colour : 'rgba(147,165,200,.6)',
                    }}
                  >
                    {cat.skills.length}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* chips flow at their natural width so the block reads organic */}
          <Box
            sx={{
              minWidth: 0,
              // keeps short categories from collapsing against the 9-item rail
              minHeight: { md: 460 },
              p: { xs: 2.5, md: 3.5 },
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
                background: `linear-gradient(90deg, ${category.colour}, transparent)`,
              },
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 0.5 }}>
                  <Box component="span" sx={{ fontSize: '1.35rem', lineHeight: 1 }}>
                    {category.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', color: category.colour }}>
                    {category.title}
                  </Typography>
                </Stack>
                <Typography sx={{ color: palette.textMuted, fontSize: '.78rem', mb: 2.5 }}>
                  {category.core.length} core · {category.skills.length} total
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {category.skills.map((skill, i) => {
                    const isCore = category.core.includes(skill);
                    return (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.22, delay: Math.min(i * 0.014, 0.4) }}
                      >
                        <Box
                          sx={{
                            px: isCore ? 1.7 : 1.5,
                            py: isCore ? 0.85 : 0.7,
                            borderRadius: 999,
                            whiteSpace: 'nowrap',
                            fontSize: isCore ? '.85rem' : '.79rem',
                            fontWeight: isCore ? 700 : 500,
                            cursor: 'default',
                            color: isCore ? '#05070F' : palette.text,
                            backgroundColor: isCore ? category.colour : `${category.colour}12`,
                            border: `1px solid ${isCore ? category.colour : `${category.colour}33`}`,
                            boxShadow: isCore ? `0 4px 16px ${category.colour}33` : 'none',
                            transition: 'transform .18s ease, box-shadow .18s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: `0 6px 20px ${category.colour}44`,
                            },
                          }}
                        >
                          {skill}
                        </Box>
                      </motion.div>
                    );
                  })}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;
