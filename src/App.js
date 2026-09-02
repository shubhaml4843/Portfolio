import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import theme from './theme';
import Hero from './components/Hero';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import BackgroundEffects from './components/BackgroundEffects';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BackgroundEffects />
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Hero />
          <Summary />
          <Skills />
          <Projects />
          <Certificates />
          <Resume />
          <Contact />
        </motion.main>
      </div>
    </ThemeProvider>
  );
}

export default App;
