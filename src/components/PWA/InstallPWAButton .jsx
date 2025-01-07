import React, { useEffect, useState } from 'react'


const InstallPWAButton = () => {
  const [promptEvent, setPromptEvent] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
      setPromptEvent(event);
    });
  }, []);

  const handleInstall = () => {
    if (promptEvent) {
      promptEvent.prompt(); 
      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setPromptEvent(null); // Reset for future prompts
      });
    }
  };

  return (
    <button 
      onClick={handleInstall}
      disabled={!promptEvent}
    >
      {promptEvent ? 'Install' : 'Install PWA'} 
    </button>
  );
};

export default InstallPWAButton;