// Web Audio API sound effects & Speech Synthesis for English pronunciation

class SoundController {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Upward cheerful arpeggio (C5 -> E5 -> G5 -> C6)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.26);
    });
  }

  public playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Gentle downward buzzer (F4 -> D4)
    const notes = [349.23, 293.66];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);

      gain.gain.setValueAtTime(0.12, now + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.15);
      osc.stop(now + idx * 0.15 + 0.22);
    });
  }

  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  public playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const chords = [
      [523.25, 659.25], // C - E
      [587.33, 698.46], // D - F
      [659.25, 783.99], // E - G
      [783.99, 1046.50, 1318.51] // G - C - E triumphant
    ];

    chords.forEach((chord, i) => {
      const startTime = now + i * 0.16;
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + (i === chords.length - 1 ? 0.7 : 0.2));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + (i === chords.length - 1 ? 0.75 : 0.22));
      });
    });
  }

  public playChest() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Magical sparkle sound
    const freqs = [659, 830, 987, 1318, 1661];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.06);
      gain.gain.setValueAtTime(0.15, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.27);
    });
  }
}

export const sounds = new SoundController();

// Speech Synthesis for English pronunciation
let currentVoice: SpeechSynthesisVoice | null = null;

function loadVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  // Prefer natural US/UK English voices
  currentVoice =
    voices.find(v => v.lang.startsWith('en-US') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) ||
    voices.find(v => v.lang.startsWith('en-US')) ||
    voices.find(v => v.lang.startsWith('en')) ||
    null;
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoice();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoice();
  };
}

let activeKeepAliveTimer: NodeJS.Timeout | null = null;

export function speakEnglish(text: string, onEnd?: () => void, rate = 0.88): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  try {
    if (activeKeepAliveTimer) {
      clearInterval(activeKeepAliveTimer);
      activeKeepAliveTimer = null;
    }
    window.speechSynthesis.cancel(); // Stop prior speech

    const cleanText = text.replace(/[/*_#~`]/g, '').trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = rate; // Clear & friendly for learners
    utterance.pitch = 1.05; // Slightly cheerful pitch

    if (!currentVoice) {
      loadVoice();
    }
    if (currentVoice) {
      utterance.voice = currentVoice;
    }

    let hasHandledEnd = false;
    const handleEnd = () => {
      if (hasHandledEnd) return;
      hasHandledEnd = true;
      if (activeKeepAliveTimer) {
        clearInterval(activeKeepAliveTimer);
        activeKeepAliveTimer = null;
      }
      if (onEnd) onEnd();
    };

    utterance.onend = handleEnd;
    utterance.onerror = (e) => {
      // If error was simply "canceled" or "interrupted" because user clicked manually, don't double trigger
      handleEnd();
    };

    // Chromium keepalive: long sentences can pause unexpectedly if not pinged
    activeKeepAliveTimer = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 4000);

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    if (onEnd) onEnd();
  }
}

export function stopEnglishSpeech(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    if (activeKeepAliveTimer) {
      clearInterval(activeKeepAliveTimer);
      activeKeepAliveTimer = null;
    }
    window.speechSynthesis.cancel();
  }
}
