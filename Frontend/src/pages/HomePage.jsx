import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import PublicHero from './HomePage/PublicHero';
import AuthenticatedHero from './HomePage/AuthenticatedHero';
// --- FIX IS HERE ---
// Import the new, correct modal component.
import VoiceCommandModal from '../components/VoiceCommandModal'; 

import FeaturesSection from './HomePage/FeaturesSection';
import AboutSection from './HomePage/AboutSection';
import WhyNowSection from './HomePage/WhyNowSection';
import HowItWorksSection from './HomePage/HowItWorksSection';
import Spinner from '../components/Spinner';

const HomePage = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [isVoiceModalOpen, setVoiceModalOpen] = useState(false);

    if (isLoading) {
        return ( <div className="flex h-screen w-full items-center justify-center"><Spinner /></div> );
    }
    
  return (
    // Add a relative container to hold the background glows
    <div className="relative">
      {/* Background Glows for the Homepage */}
      <div className="absolute top-0 left-0 w-full h-full -z-0">
          <div className="absolute top-[-10rem] left-[-20rem] w-[50rem] h-[50rem] bg-cyan-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-[20rem] right-[-20rem] w-[50rem] h-[50rem] bg-pink-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-[60rem] left-[0rem] w-[40rem] h-[40rem] bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-10 animate-blob" style={{animationDelay: '4s'}}></div>
      </div>

      <main className="relative z-10">
          {isAuthenticated ? (
            // The AuthenticatedHero now opens the correct modal
            <AuthenticatedHero onVoiceQueryClick={() => setVoiceModalOpen(true)} />
          ) : (
            <PublicHero />
          )}
          
          <FeaturesSection />
          <AboutSection />
          <WhyNowSection />
          <HowItWorksSection />
      </main>
      
      {/* --- FIX IS HERE --- */}
      {/* Use the new VoiceCommandModal component */}
      <VoiceCommandModal 
        isOpen={isVoiceModalOpen} 
        onClose={() => setVoiceModalOpen(false)} 
        onSuccess={() => {
            // Optional: you could add a toast notification here to tell the user 
            // their command was successful and they can see the result on their dashboard.
        }}
      />
    </div>
  );
};

export default HomePage;