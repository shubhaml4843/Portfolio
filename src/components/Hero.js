import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, IconButton, Avatar, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const texts = ['Gen AI Engineer', 'AI Engineer', 'Data Scientist', 'ML Expert'];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let timeout;
    const typeText = () => {
      const text = texts[textIndex];
      if (currentText.length < text.length) {
        setCurrentText(text.slice(0, currentText.length + 1));
        timeout = setTimeout(typeText, 150);
      } else {
        timeout = setTimeout(() => {
          setCurrentText('');
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    };
    timeout = setTimeout(typeText, 150);
    return () => clearTimeout(timeout);
  }, [currentText, textIndex]);

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 35%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating Orbs */}
      <motion.div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
          top: '10%',
          left: '5%',
          filter: 'blur(40px)'
        }}
        animate={{ y: [0, -30, 0], rotate: [0, 120, 240, 360] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, transparent 70%)',
          top: '60%',
          right: '10%',
          filter: 'blur(40px)'
        }}
        animate={{ y: [0, -25, 0], rotate: [0, -120, -240, -360] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, transparent 70%)',
          bottom: '20%',
          left: '20%',
          filter: 'blur(40px)'
        }}
        animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, delay: 4 }}
      />
      
      <Container maxWidth="xl" sx={{ zIndex: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
            gap: 6,
            alignItems: 'center',
            color: 'white'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#667eea',
                  fontWeight: 600,
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: { xs: '1rem', md: '1.2rem' }
                }}
              >
                Welcome to my Portfolio
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                  fontWeight: 700,
                  mb: 1.5,
                  lineHeight: 1.2,
                  background: 'linear-gradient(135deg, #ffffff 0%, #667eea 50%, #f093fb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Hi, I'm{' '}
                <Box component="span" sx={{ display: 'block', color: '#667eea' }}>
                  Shubham Lokare
                </Box>
              </Typography>
            </Box>

            <Box sx={{ mb: 3, height: '80px', display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {currentText}
                <Box component="span" sx={{ animation: 'blink 1s infinite', color: '#f093fb' }}>|</Box>
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: '#ffffff',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '600px',
                fontWeight: 400
              }}
            >
              🚀 Passionate Gen AI Engineer & Agentic AI specialist in Machine Learning, 
              Deep Learning, Gen AI, Data Science and creating intelligent solutions that transform businesses and drive innovation.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => window.open('tel:+919130884843', '_self')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50px',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 15px 40px rgba(102, 126, 234, 0.6)'
                    }
                  }}
                >
                  Contact Me
                </Button>
              </motion.div>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body1" sx={{ color: '#ffffff', mr: 2, fontWeight: 500 }}>
                Connect with me:
              </Typography>
              {[
                { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/shubhamlokare-aiengineer', color: '#0A66C2' },
                { icon: <GitHubIcon />, href: 'https://github.com/shubhaml4843', color: '#333' },
                { icon: <EmailIcon />, href: 'mailto:shubhamlokare4843@gmail.com', color: '#EA4335' },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    component="a"
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    sx={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      color: 'white',
                      width: 60,
                      height: 60,
                      '&:hover': {
                        background: 'rgba(240, 147, 251, 0.2)',
                        borderColor: '#f093fb',
                        boxShadow: '0 10px 25px rgba(240, 147, 251, 0.3)'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: '300px', md: '450px' },
                height: { xs: '300px', md: '450px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                  rotateX: [0, 2, 0, -2, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(145deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1))',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '30px',
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(102, 126, 234, 0.2)'
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 150, md: 200 },
                    height: { xs: 150, md: 200 },
                    fontSize: { xs: '4rem', md: '6rem' },
                    background: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
                    border: '4px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  🤖
                </Avatar>

                {/* Floating Gen AI Icons */}
                {[
                  { icon: '🧠', top: '10%', left: '10%', delay: 0 },
                  { icon: '⚡', top: '10%', right: '10%', delay: 1 },
                  { icon: '🔮', bottom: '10%', left: '10%', delay: 2 },
                  { icon: '🚀', bottom: '10%', right: '10%', delay: 3 }
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: tech.delay
                    }}
                    style={{
                      position: 'absolute',
                      ...tech,
                      width: '60px',
                      height: '60px',
                      background: 'rgba(102, 126, 234, 0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      border: '1px solid rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    {tech.icon}
                  </motion.div>
                ))}

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
                    borderRadius: '30px'
                  }}
                />
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Box>
  );
};

export default Hero;