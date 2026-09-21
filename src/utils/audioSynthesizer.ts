// Web Audio procedural synthesizer for Nuscuria organisms

class BioAcousticEngine {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playOrganismSound(pitchHz: number, waveform: OscillatorType = 'sine', bpm: number = 50) {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.stop();

      const now = this.ctx.currentTime;

      // Primary oscillator
      this.osc = this.ctx.createOscillator();
      this.osc.type = waveform;
      this.osc.frequency.setValueAtTime(pitchHz, now);

      // Sub-harmonic oscillator (rich analog warmth)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(Math.max(30, pitchHz / 2), now);

      // Filter
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(Math.min(800, pitchHz * 3), now);
      this.filterNode.Q.setValueAtTime(3.5, now);

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.12, now + 1.2);

      // LFO for breathing cadence
      const lfoRate = Math.max(0.15, bpm / 60 / 2); // Slow breath cycle
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(lfoRate, now);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(pitchHz * 0.4, now);

      this.lfo.connect(this.filterNode.frequency);
      this.lfo.start();

      // Connections
      this.osc.connect(this.filterNode);
      this.subOsc.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc.start(now);
      this.subOsc.start(now);
      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio synthesis could not start:', e);
    }
  }

  public triggerHeartbeat(bpm: number = 48) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {
      console.warn('Heartbeat trigger error:', e);
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      if (this.gainNode) {
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      }
      setTimeout(() => {
        if (this.osc) {
          try { this.osc.stop(); } catch {}
          this.osc.disconnect();
          this.osc = null;
        }
        if (this.subOsc) {
          try { this.subOsc.stop(); } catch {}
          this.subOsc.disconnect();
          this.subOsc = null;
        }
        if (this.lfo) {
          try { this.lfo.stop(); } catch {}
          this.lfo.disconnect();
          this.lfo = null;
        }
        this.isPlaying = false;
      }, 900);
    } catch {
      this.isPlaying = false;
    }
  }

  public getActive() {
    return this.isPlaying;
  }
}

export const bioAudio = new BioAcousticEngine();
