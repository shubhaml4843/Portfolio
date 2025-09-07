import React, { useState } from 'react';
import { Box, Container, Typography, Chip, Card, CardContent, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const skillCategories = [
    {
      title: 'AI & Gen AI',
      skills: ['LLM','LangChain', 'LangGraph', 'GANs', 'Diffusion Models','Multimodal Models','AutoGen', 'RAG','Agentic RAG', 'MCP', 'GPT', 'DALL-E', 'Transformers', 'VAE', 'Agentic AI', 'Ollama', 'Cohere', 'Hugging Face', 'LoRA', 'QLoRA Fine-tuning', 'Stable Diffusion', 'Claude', 'Gemini', 'BERT', 'T5', 'CLIP', 'Whisper']
    },
    {
      title: 'ML & Deep Learning',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Supervised Learning', 'Unsupervised Learning', 'Decision Trees', 'Random Forest', 'Embeddings', 'Logistic Regression', 'PCA', 'Clustering', 'Ensemble Learning', 'CNN', 'RNN', 'LSTM', 'ANN', 'XGBoost', 'SVM', 'Neural Networks', 'KNN', 'ARIMA', 'SARIMA', 'Gradient Boosting', 'Naive Bayes', 'K-Means', 'DBSCAN', 'GAN', 'Autoencoders', 'Transfer Learning']
    },
    {
      title: 'Computer Vision',
      skills: ['CNN', 'OpenCV', 'YOLO', 'Detectron2', 'MediaPipe', 'PIL', 'ImageAI', 'Object Detection', 'Image Segmentation', 'Face Recognition', 'OCR', 'Image Classification', 'Feature Extraction', 'Edge Detection', 'Image Processing', 'Video Analysis', 'Pose Estimation', 'Style Transfer']
    },
    {
      title: 'NLP & LLMs',
      skills: ['ChatBot','BERT', 'Transformers', 'Vectorization', 'Tokenization', 'NLTK', 'Word Embeddings', 'Embeddings', 'TF-IDF', 'Bag of Words', 'RNNs', 'OpenAI', 'Ollama', 'Cohere', 'GPT', 'spaCy', 'Hugging Face', 'LangChain', 'Text Generation', 'Sentiment Analysis', 'Named Entity Recognition', 'POS Tagging', 'Text Classification', 'Question Answering', 'Text Summarization', 'Machine Translation', 'Word2Vec']
    },
    {
      title: 'Cloud & MLOps',
      skills: ['AWS', 'Docker', 'MLflow','Git']
    },
    {
      title: 'Programming',
      skills: ['Python', 'SQL', 'HTML', 'CSS', 'FastAPI', 'Streamlit', 'Flask', 'Django', 'REST APIs', 'Git', 'GitHub']
    },
    {
      title: 'Data Science',
      skills: ['Pandas', 'NumPy', 'SciPy', 'Seaborn', 'Matplotlib', 'EDA', 'Data Preprocessing', 'Plotly', 'Power BI', 'Scikit-learn', 'Statistics', 'Linear Algebra', 'Mathematics', 'Evaluation Metrics', 'GridSearch CV', 'Regularization', 'Feature Engineering', 'Data Cleaning', 'Data Wrangling', 'Hypothesis Testing', 'Cross Validation', 'Model Selection', 'Jupyter','Data Analysis', 'Data Mining', 'Time Series Analysis']
    }
  ];

  return (
    <Box
      component="section"
      id="skills"
      ref={ref}
      sx={{
        py: 12,
        backgroundColor: '#0f172a'
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Skills
          </Typography>
          
          <Typography
            variant="body1"
            align="center"
            sx={{ color: 'text.secondary', mb: 4, fontSize: '0.9rem' }}
          >
            Technologies & Tools
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 4,
              '& .MuiTab-root': {
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '1rem',
                '&.Mui-selected': {
                  color: 'primary.main'
                }
              }
            }}
          >
            {skillCategories.map((category, index) => (
              <Tab key={index} label={category.title} />
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 4,
              p: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  mb: 4,
                  fontWeight: 700,
                  color: 'primary.main'
                }}
              >
                {skillCategories[activeTab].title}
              </Typography>
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 2
                }}
              >
                {skillCategories[activeTab].skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        textAlign: 'center',
                        py: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'secondary.main',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)'
                        }
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {skill}
                      </Typography>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills;