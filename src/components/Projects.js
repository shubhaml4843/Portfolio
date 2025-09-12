import React from 'react';
import { Box, Container, Typography, Card, CardContent, CardActions, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const Projects = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const projects = [
    {
      title: 'NeuroAct AI 🧠',
      description: '🎯 Problem Solved: Built this to eliminate AI tool fragmentation where data scientists waste 85% of time switching between 8-15 different platforms, losing context and productivity. 🚀 My Solution: Engineered world\'s first RLHF-powered multi-agent system with 10 specialized AI agents (DataAgent, MLAgent, CodeAgent, etc.) orchestrated via LangGraph. Implemented ReAct + Tree of Thoughts reasoning for complex problem-solving. Single natural language query now handles complete end-to-end workflows - from data cleaning to model deployment with executive dashboards. Reduced typical 5-day AI projects to 30-second automated workflows with 95%+ success rate. Features continuous learning through human feedback, making the system smarter with every interaction.',
      tech: ['LangGraph', 'RLHF', 'Multi-Agent Systems', 'ReAct', 'ToT', 'LLMs', 'RAG', 'Python', 'FastAPI', 'Ollama', 'OpenAI', 'Anthropic', 'NetworkX', 'FAISS', 'ChromaDB', 'AsyncIO', 'Pydantic', 'Transformers', 'LangChain', 'AutoML', 'MLOps', 'Docker', 'Microservices'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      github: 'https://github.com/shubhaml4843/NeuroAct-AI',
      demo: 'https://youtu.be/demo-video-link',
    },
    {
      title: 'LangChain RAG System',
      description: 'Enterprise-grade Retrieval-Augmented Generation system using advanced vector databases and semantic search for intelligent document processing. Features Tree of Thoughts reasoning, context-aware responses, conversation memory, and real-time knowledge retrieval. Built with microservices architecture and React dashboard for monitoring and analytics.',
      tech: ['LLMs', 'RAG', 'NLP', 'ReAct', 'ToT', 'ML Pipelines', 'Deep Learning', 'Fine-tuning', 'LangChain', 'ChromaDB', 'FAISS', 'OpenAI'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      github: 'https://github.com/shubhaml4843/langchain-rag',
    },
    {
      title: 'Computer Vision System',
      description: 'Real-time object detection and classification system using YOLO and deep learning for industrial quality control. Features parallel processing with AsyncIO, automated monitoring, Tree of Thoughts for decision making, and React-based dashboard for real-time visualization and control with comprehensive analytics.',
      tech: ['Computer Vision', 'Deep Learning', 'ML Pipelines', 'ReAct', 'ToT', 'NLP', 'YOLO', 'OpenCV', 'PyTorch', 'TensorFlow', 'AWS', 'Docker'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      github: 'https://github.com/shubhaml4843/cv-system',
    },
    {
      title: 'MLOps Pipeline',
      description: 'End-to-end machine learning operations pipeline with automated model training, deployment, monitoring, and continuous integration. Features Tree of Thoughts for model selection, React-based monitoring dashboard, async processing, and comprehensive DevOps integration with fault tolerance and scalability.',
      tech: ['ML Pipelines', 'LLMs', 'Multi-Agent Systems', 'ReAct', 'ToT', 'Deep Learning', 'MLflow', 'Kubernetes', 'Docker', 'Jenkins', 'Prometheus', 'Grafana'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      github: 'https://github.com/shubhaml4843/mlops-pipeline',
    },
    {
      title: 'NLP Sentiment Analyzer',
      description: 'Advanced sentiment analysis using BERT and transformer models for social media monitoring and customer feedback analysis. Features Tree of Thoughts reasoning for complex sentiment understanding, React dashboard for real-time analytics, async processing, and multi-language support with comprehensive NLP pipelines.',
      tech: ['NLP', 'LLMs', 'Deep Learning', 'ReAct', 'ToT', 'Fine-tuning', 'BERT', 'Transformers', 'PyTorch', 'Hugging Face', 'LoRA', 'QLoRA'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      github: 'https://github.com/shubhaml4843/sentiment-analyzer',
    },
    {
      title: 'Predictive Analytics Platform',
      description: 'Machine learning platform for business forecasting and insights with interactive dashboards and automated model selection. Features Tree of Thoughts for intelligent predictions, React-based visualization interface, async data processing, and comprehensive analytics with real-time monitoring and automated reporting.',
      tech: ['ML Pipelines', 'LLMs', 'Reinforcement Learning', 'ReAct', 'ToT', 'NLP', 'RAG', 'Scikit-learn', 'Pandas', 'Streamlit', 'PostgreSQL', 'AWS'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      github: 'https://github.com/shubhaml4843/predictive-analytics',
    }
  ];

  return (
    <Box
      component="section"
      id="projects"
      ref={ref}
      sx={{
        py: 12,
        backgroundColor: '#1e293b'
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
            Projects
          </Typography>
          
          <Typography
            variant="body1"
            align="center"
            sx={{ color: 'text.secondary', mb: 4, fontSize: '0.9rem' }}
          >
            AI & Data Science Solutions
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 4
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotateY: 5 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'background.paper',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
                  }
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    background: project.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      textAlign: 'center',
                      zIndex: 2
                    }}
                  >
                    {project.title.split(' ')[0]}
                  </Typography>
                  

                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600} sx={{ fontSize: '1.1rem' }}>
                    {project.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '0.85rem' }}>
                    {project.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, mb: 2 }}>
                    {project.tech.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                    <Button
                      component="a"
                      href={project.github}
                      target="_blank"
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white'
                        }
                      }}
                    >
                      View Code
                    </Button>
                    {project.demo && (
                      <Button
                        component="a"
                        href={project.demo}
                        target="_blank"
                        variant="contained"
                        startIcon={<LaunchIcon />}
                        sx={{
                          backgroundColor: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.dark'
                          }
                        }}
                      >
                        Demo Video
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;