import React from 'react';
import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Certificates = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const certificates = [
    {
      title: 'AWS Certified Machine Learning - Specialty',
      issuer: 'Amazon Web Services',
      date: '2024',
      type: 'Cloud Certification',
      color: '#FF9900'
    },
    {
      title: 'Google Cloud Professional ML Engineer',
      issuer: 'Google Cloud Platform',
      date: '2023',
      type: 'Cloud Certification',
      color: '#4285F4'
    },
    {
      title: 'Microsoft Azure AI Engineer Associate',
      issuer: 'Microsoft Azure',
      date: '2024',
      type: 'Cloud Certification',
      color: '#0078D4'
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'Coursera - Andrew Ng',
      date: '2023',
      type: 'Online Course',
      color: '#0056D3'
    },
    {
      title: 'TensorFlow Developer Certificate',
      issuer: 'TensorFlow',
      date: '2023',
      type: 'Technical Certification',
      color: '#FF6F00'
    },
    {
      title: 'Machine Learning Engineering for Production',
      issuer: 'Coursera - DeepLearning.AI',
      date: '2024',
      type: 'Specialization',
      color: '#00D4AA'
    },
    {
      title: 'Data Science Professional Certificate',
      issuer: 'IBM',
      date: '2022',
      type: 'Professional Certificate',
      color: '#1261FE'
    },
    {
      title: 'Advanced Data Science with R',
      issuer: 'Johns Hopkins University',
      date: '2023',
      type: 'University Course',
      color: '#68217A'
    }
  ];

  return (
    <Box
      component="section"
      id="certificates"
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
            Certificates
          </Typography>
          
          <Typography
            variant="body1"
            align="center"
            sx={{ color: 'text.secondary', mb: 4, fontSize: '0.9rem' }}
          >
            Professional Certifications
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 3
          }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
                  borderRadius: 4,
                  p: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: cert.color
                  }
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: cert.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {cert.type.includes('Certification') ? (
                        <EmojiEventsIcon sx={{ color: 'white', fontSize: '2rem' }} />
                      ) : (
                        <SchoolIcon sx={{ color: 'white', fontSize: '2rem' }} />
                      )}
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Chip
                        label={cert.date}
                        size="small"
                        sx={{
                          backgroundColor: cert.color,
                          color: 'white',
                          fontWeight: 600,
                          mb: 1
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    fontWeight={600}
                    sx={{ color: 'text.primary' }}
                  >
                    {cert.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                    fontWeight={500}
                  >
                    {cert.issuer}
                  </Typography>
                  
                  <Chip
                    label={cert.type}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: cert.color,
                      color: cert.color,
                      fontWeight: 500,
                      mt: 1
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Certificates;