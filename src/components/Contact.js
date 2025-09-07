import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, TextField, Button, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email',
      value: 'shubhamlokare4843@gmail.com',
      link: 'mailto:shubhamlokare4843@gmail.com',
      color: '#EA4335'
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      value: '+91 9130884843',
      link: 'tel:+919130884843',
      color: '#34A853'
    },
    {
      icon: <LinkedInIcon />,
      title: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://linkedin.com/in/shubhamlokare-aiengineer',
      color: '#0A66C2'
    },
    {
      icon: <GitHubIcon />,
      title: 'GitHub',
      value: 'View my code',
      link: 'https://github.com/shubhaml4843',
      color: '#333'
    }
  ];

  const socialLinks = [
    { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/shubhamlokare-aiengineer', color: '#0A66C2' },
    { icon: <GitHubIcon />, href: 'https://github.com/shubhaml4843', color: '#333' },
    { icon: <EmailIcon />, href: 'mailto:shubhamlokare4843@gmail.com', color: '#EA4335' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you! Your message has been sent successfully.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box
      component="section"
      id="contact"
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
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Get In Touch
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            sx={{ color: 'text.secondary', mb: 6 }}
          >
            Let's discuss your next AI project
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography variant="h4" fontWeight={600} gutterBottom sx={{ mb: 4 }}>
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'grid', gap: 3, mb: 4 }}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card
                      component="a"
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 3,
                        p: 3,
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 15px 30px rgba(99, 102, 241, 0.2)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          backgroundColor: info.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {info.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {info.value}
                        </Typography>
                      </Box>
                    </Card>
                  </motion.div>
                ))}
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Follow Me
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        component="a"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          backgroundColor: social.color,
                          color: 'white',
                          width: 50,
                          height: 50,
                          '&:hover': {
                            backgroundColor: social.color,
                            opacity: 0.8
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 4,
                  p: 4,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h4" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Send Message
                  </Typography>
                  
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            endIcon={<SendIcon />}
                            fullWidth
                            sx={{
                              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                              borderRadius: '50px',
                              py: 1.5,
                              fontSize: '1rem',
                              fontWeight: 600
                            }}
                          >
                            Send Message
                          </Button>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;