import { useEffect, useRef, useCallback } from 'react';

class SoundManager {
  private audioContext: AudioContext | null = null;
  private ambientSource: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isPlaying = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
  }

  // Create ambient drone using oscillators
  startAmbient() {
    if (!this.audioContext || this.isPlaying) return;

    const ctx = this.audioContext;
    
    // Create a low drone
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(55, ctx.currentTime); // Low A
    
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(82.5, ctx.currentTime); // Low E
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3); // Fade in
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator1.start();
    oscillator2.start();
    
    this.ambientSource = oscillator1;
    this.ambientGain = gainNode;
    this.isPlaying = true;

    // Add subtle modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(2, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator1.frequency);
    lfo.start();
  }

  stopAmbient() {
    if (!this.audioContext || !this.ambientGain) return;
    
    const ctx = this.audioContext;
    this.ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    
    setTimeout(() => {
      this.ambientSource?.stop();
      this.isPlaying = false;
    }, 2000);
  }

  // Play a subtle click sound
  playClick() {
    if (!this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
  }

  // Play hover sound
  playHover() {
    if (!this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.05);
  }

  // Play fragment reveal sound
  playFragmentReveal() {
    if (!this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5);
  }

  resume() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Singleton instance
let soundManager: SoundManager | null = null;

export const getSoundManager = () => {
  if (!soundManager && typeof window !== 'undefined') {
    soundManager = new SoundManager();
  }
  return soundManager;
};

export const useSound = () => {
  const manager = useRef(getSoundManager());

  const playClick = useCallback(() => {
    manager.current?.playClick();
  }, []);

  const playHover = useCallback(() => {
    manager.current?.playHover();
  }, []);

  const playFragmentReveal = useCallback(() => {
    manager.current?.playFragmentReveal();
  }, []);

  const startAmbient = useCallback(() => {
    manager.current?.resume();
    manager.current?.startAmbient();
  }, []);

  const stopAmbient = useCallback(() => {
    manager.current?.stopAmbient();
  }, []);

  useEffect(() => {
    return () => {
      manager.current?.stopAmbient();
    };
  }, []);

  return {
    playClick,
    playHover,
    playFragmentReveal,
    startAmbient,
    stopAmbient,
  };
};

export default SoundManager;