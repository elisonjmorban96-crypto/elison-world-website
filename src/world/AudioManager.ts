import { useEffect, useRef, useCallback } from 'react';

interface AudioManagerOptions {
  ambientSrc?: string;
  fragments?: Record<string, string>;
  fullTrackSrc?: string;
}

export class AudioManager {
  private ambient: HTMLAudioElement | null = null;
  private fragments: Map<string, HTMLAudioElement> = new Map();
  private fullTrack: HTMLAudioElement | null = null;
  private isMuted = false;

  constructor(options: AudioManagerOptions = {}) {
    if (options.ambientSrc) {
      this.ambient = new Audio(options.ambientSrc);
      this.ambient.loop = true;
      this.ambient.volume = 0.3;
    }

    if (options.fragments) {
      Object.entries(options.fragments).forEach(([id, src]) => {
        const audio = new Audio(src);
        audio.volume = 0.7;
        this.fragments.set(id, audio);
      });
    }

    if (options.fullTrackSrc) {
      this.fullTrack = new Audio(options.fullTrackSrc);
      this.fullTrack.volume = 0.9;
    }
  }

  startAmbient() {
    if (this.ambient && !this.isMuted) {
      this.ambient.play().catch(() => {});
    }
  }

  stopAmbient() {
    if (this.ambient) {
      this.ambient.pause();
      this.ambient.currentTime = 0;
    }
  }

  playFragment(id: string) {
    if (this.isMuted) return;
    const audio = this.fragments.get(id);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }

  playFullTrack() {
    if (this.isMuted) return;
    if (this.fullTrack) {
      this.fullTrack.play().catch(() => {});
    }
  }

  stopFullTrack() {
    if (this.fullTrack) {
      this.fullTrack.pause();
      this.fullTrack.currentTime = 0;
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambient) {
      this.ambient.muted = muted;
    }
    this.fragments.forEach(audio => audio.muted = muted);
    if (this.fullTrack) {
      this.fullTrack.muted = muted;
    }
  }

  destroy() {
    this.stopAmbient();
    this.stopFullTrack();
    this.fragments.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

export const useAudioManager = (options: AudioManagerOptions) => {
  const managerRef = useRef<AudioManager | null>(null);

  useEffect(() => {
    managerRef.current = new AudioManager(options);
    return () => {
      managerRef.current?.destroy();
    };
  }, []);

  const playFragment = useCallback((id: string) => {
    managerRef.current?.playFragment(id);
  }, []);

  const playFullTrack = useCallback(() => {
    managerRef.current?.playFullTrack();
  }, []);

  const startAmbient = useCallback(() => {
    managerRef.current?.startAmbient();
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    managerRef.current?.setMuted(muted);
  }, []);

  return {
    playFragment,
    playFullTrack,
    startAmbient,
    setMuted,
  };
};