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
      title: 'AI Chatbot Assistant',
      description: 'Intelligent conversational AI using transformer models and NLP techniques for customer support automation.',
      tech: ['Python', 'Transformers', 'FastAPI', 'React', 'Docker'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      github: 'https://github.com/shubhamlokare/ai-chatbot',
      
    },
    {
      title: 'Computer Vision System',
      description: 'Real-time object detection and classification system using deep learning for industrial quality control.',
      tech: ['OpenCV', 'YOLO', 'TensorFlow', 'Flask', 'AWS'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      github: 'https://github.com/shubhamlokare/cv-system',
      
    },
    {
      title: 'Predictive Analytics Platform',
      description: 'Machine learning platform for business forecasting and insights with interactive dashboards.',
      tech: ['Scikit-learn', 'Pandas', 'Streamlit', 'AWS', 'PostgreSQL'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      github: 'https://github.com/shubhamlokare/predictive-analytics',
      
    },
    {
      title: 'NLP Sentiment Analyzer',
      description: 'Advanced sentiment analysis using BERT and custom models for social media monitoring.',
      tech: ['BERT', 'PyTorch', 'Hugging Face', 'Docker', 'MongoDB'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      github: 'https://github.com/shubhamlokare/sentiment-analyzer',
      
    },
    {
      title: 'MLOps Pipeline',
      description: 'End-to-end MLOps pipeline for model deployment, monitoring, and continuous integration.',
      tech: ['MLflow', 'Kubernetes', 'Jenkins', 'Prometheus', 'Grafana'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      github: 'https://github.com/shubhamlokare/mlops-pipeline',
      
    },
    {
      title: 'Recommendation Engine',
      description: 'Collaborative filtering recommendation system for e-commerce with real-time personalization.',
      tech: ['Apache Spark', 'Kafka', 'Redis', 'Python', 'Elasticsearch'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      github: 'https://github.com/shubhamlokare/recommendation-engine',
      
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
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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