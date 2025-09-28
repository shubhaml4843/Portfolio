import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const Projects = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const projects = [
    {
      title: 'DataSypane AI 🧠',
      description: '🎯 Problem Solved: Built DataSynapse AI to eliminate AI tool fragmentation where data scientists waste 85% of time switching between 8-15 different platforms. 🚀 My Solution: Engineered production-ready multi-agent system with 10 specialized AI agents orchestrated via LangGraph with RLHF continuous learning. Features intelligent workflow automation, performance caching system (95% faster responses), and enterprise-grade scalability. Single query like "Build customer churn model with dashboard" automatically orchestrates DataAgent → MLAgent → ModelEvaluationAgent → VisualizationAgent in 30 seconds. Includes React frontend, FastAPI backend, Docker deployment, and comprehensive testing suite. System learns from user feedback and improves routing accuracy by 40% after 100 interactions.',
      tech: ['LangGraph', 'RLHF', 'Multi-Agent Systems', 'ReAct', 'Python', 'FastAPI', 'Ollama', 'React', 'Docker', 'Pytest', 'AsyncIO', 'Pydantic', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Matplotlib', 'Seaborn', 'RAG', 'LLMs', 'AutoML', 'Performance Caching', 'Enterprise Architecture', 'Microservices'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      github: 'https://github.com/shubhaml4843/NeuroAct-AI_Project',
      demo: 'https://youtu.be/demo-video-link',
    },
    {
      title: 'Medical ChatBot 🏥',
      description: '🎯 Problem Solved: Built AI-powered medical assistant to eliminate manual clinical report analysis bottlenecks where healthcare professionals spend 60% of time on paperwork instead of patient care. 🚀 My Solution: Engineered comprehensive medical chatbot with advanced RAG architecture using FAISS vector embeddings and BAAI/bge-large-en model for semantic search. Features intelligent diagnosis engine with treatment recommendations, automated PDF report generation, and multi-format clinical data processing (PDF, DOC, DOCX, JSON, CSV up to 50MB). Built interactive Flask web interface with real-time chat, session management, and professional medical report formatting. Processes clinical data in 2-5 seconds with HIPAA compliance, CUDA optimization, and local data processing for privacy. Includes comprehensive testing suite, error handling, and scalable architecture supporting multiple concurrent medical consultations.',
      tech: ['Python', 'Flask', 'RAG', 'FAISS', 'NLP', 'Hugging Face', 'PyTorch', 'LangChain', 'OpenAI', 'PDF Processing', 'Medical AI', 'Clinical Data', 'Transformers', 'Vector Search', 'Healthcare', 'HIPAA Compliance'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      github: 'https://github.com/shubhaml4843/Medical_chatBot',
    },
    {
      title: 'Radiology Object Detection 🩻',
      description: '🎯 Problem Solved: Built advanced medical imaging system to automate radiology analysis where radiologists spend 70% of time on manual image interpretation, leading to diagnostic delays and human error. 🚀 My Solution: Engineered production-ready radiology detection system using YOLOv8 (You Only Look Once v8) for accurate object detection in medical images. Features high-performance FastAPI backend, interactive web UI for image upload and results visualization, and Docker containerization for seamless deployment. Integrates with Roboflow for custom dataset training and model management. Built modern web interface with real-time detection results, supports CUDA optimization for GPU acceleration, and includes comprehensive API documentation with Swagger UI. Processes radiology images with high accuracy and provides detailed detection annotations for medical professionals.',
      tech: ['YOLOv8', 'FastAPI', 'Computer Vision', 'Medical Imaging', 'Docker', 'Roboflow', 'Python', 'JavaScript', 'HTML/CSS', 'CUDA', 'OpenCV', 'Pydantic', 'Uvicorn', 'Swagger UI', 'Healthcare AI', 'Deep Learning'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      github: 'https://github.com/shubhaml4843/radiology_object_detection',
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