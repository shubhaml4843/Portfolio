    import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

const Resume = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [showFullResume, setShowFullResume] = useState(false);

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Shubham_Lokare_Resume.pdf';
    alert('Resume download started!');
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
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
                  Experience
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Senior AI Engineer
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Tech Solutions Inc. | Jan 2022 - Present
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                    <li>Developed 15+ ML models improving business efficiency by 40%</li>
                    <li>Led AI team of 5 engineers on enterprise projects</li>
                    <li>Implemented MLOps pipelines reducing deployment time by 60%</li>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
                  Education
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  M.Tech in Computer Science
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Indian Institute of Technology, Mumbai | 2020
                </Typography>
              </Box>

              <Box>
                <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
                  Key Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Docker', 'Kubernetes'].map((skill) => (
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
                onClick={() => setShowFullResume(true)}
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
                View Full Resume
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      <Dialog
        open={showFullResume}
        onClose={() => setShowFullResume(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            borderRadius: 4
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight={700}>
            Complete Resume
          </Typography>
          <IconButton onClick={() => setShowFullResume(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Shubham Lokare
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              AI Engineer & Data Scientist
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              <Typography variant="body1">shubham.lokare@example.com</Typography>
              <Typography variant="body1">+91 98765 43210</Typography>
              <Typography variant="body1">LinkedIn: /in/shubhamlokare</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
              Professional Summary
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Experienced AI Engineer and Data Scientist with 3+ years of expertise in developing and deploying 
              machine learning models, deep learning systems, and data-driven solutions. Proven track record of 
              leading AI initiatives that drive business value and innovation.
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
              Experience
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Senior AI Engineer
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Tech Solutions Inc. | Jan 2022 - Present
              </Typography>
              <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                <li>Developed and deployed 15+ machine learning models improving operational efficiency by 40%</li>
                <li>Led a team of 5 AI engineers on enterprise-level projects worth $2M+</li>
                <li>Implemented MLOps pipelines using Docker, Kubernetes, and AWS, reducing deployment time by 60%</li>
                <li>Built computer vision systems for quality control, achieving 95% accuracy</li>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
              Education
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              M.Tech in Computer Science
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Indian Institute of Technology, Mumbai | 2020
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Specialization: Artificial Intelligence and Machine Learning
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={600} color="primary.main" gutterBottom>
              Certifications
            </Typography>
            <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
              <li>AWS Certified Machine Learning - Specialty</li>
              <li>Google Cloud Professional ML Engineer</li>
              <li>Microsoft Azure AI Engineer Associate</li>
              <li>Deep Learning Specialization - Coursera</li>
              <li>TensorFlow Developer Certificate</li>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Resume;