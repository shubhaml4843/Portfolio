import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Resume = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = process.env.PUBLIC_URL + '/resume/Shubham_Lokare_Resume.pdf.pdf';
    link.download = 'Shubham_Lokare_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      component="section"
      id="resume"
      ref={ref}
      sx={{
        py: 12,
        backgroundColor: '#1e293b'
      }}
    >
      <Container maxWidth="md">
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
            Resume
          </Typography>
          
          <Typography
            variant="body1"
            align="center"
            sx={{ color: 'text.secondary', mb: 4, fontSize: '0.9rem' }}
          >
            Experience & Skills
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 4,
              p: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              mb: 4
            }}
          >
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  Shubham Lokare
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  AI Engineer & Data Scientist
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  shubhamlokare4843@gmail.com | +91 9130884843
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
                  Specializations
                </Typography>
                <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                  <li>Multi-Agent AI Systems & LangGraph Orchestration</li>
                  <li>Healthcare AI & Medical Imaging (RAG, Computer Vision)</li>
                  <li>RLHF & Reinforcement Learning Implementation</li>
                  <li>Production AI Deployment & MLOps</li>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
                  Featured Projects
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • DataSynapse AI - Multi-agent platform with RLHF learning<br/>
                  • Medical ChatBot - RAG-powered clinical assistant<br/>
                  • Radiology Detection - YOLOv8 medical imaging system
                </Typography>
              </Box>

              <Box>
                <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
                  Core Technologies
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['LangGraph', 'RLHF', 'Multi-Agent Systems', 'YOLOv8', 'RAG', 'FastAPI', 'Python', 'PyTorch', 'Docker', 'Healthcare AI'].map((skill) => (
                    <Box
                      key={skill}
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      {skill}
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                sx={{
                  background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                Download PDF
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<VisibilityIcon />}
                onClick={() => window.open(process.env.PUBLIC_URL + '/resume/Shubham_Lokare_Resume.pdf.pdf', '_blank')}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                View PDF Resume
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Resume;