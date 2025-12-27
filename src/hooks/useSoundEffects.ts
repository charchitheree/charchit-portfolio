import { useRef, useCallback } from 'react';

// Sound effect URLs - using simple oscillator-based sounds
const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'square', volume: number = 0.1) => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio not supported or blocked
    }
  }, [getAudioContext]);

  const playClick = useCallback(() => {
    playTone(800, 0.05, 'square', 0.08);
  }, [playTone]);

  const playHover = useCallback(() => {
    playTone(600, 0.03, 'sine', 0.05);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    const ctx = getAudioContext();
    try {
      // Ascending arpeggio
      [523, 659, 784].forEach((freq, i) => {
        setTimeout(() => playTone(freq, 0.15, 'square', 0.08), i * 80);
      });
    } catch (e) {}
  }, [getAudioContext, playTone]);

  const playNavigate = useCallback(() => {
    playTone(440, 0.08, 'triangle', 0.06);
    setTimeout(() => playTone(550, 0.08, 'triangle', 0.06), 50);
  }, [playTone]);

  const playType = useCallback(() => {
    playTone(300 + Math.random() * 200, 0.02, 'square', 0.03);
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(200, 0.15, 'sawtooth', 0.08);
  }, [playTone]);

  const playPowerUp = useCallback(() => {
    [262, 330, 392, 523].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.12, 'square', 0.07), i * 60);
    });
  }, [playTone]);

  return {
    playClick,
    playHover,
    playSuccess,
    playNavigate,
    playType,
    playError,
    playPowerUp,
  };
};

export default useSoundEffects;
