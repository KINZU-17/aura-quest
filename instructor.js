/**
 * Audio Instructor System
 * Text-to-speech workout guidance with voice selection
 */

class AudioInstructor {
  constructor() {
    this.enabled = false;
    this.voice = null;
    this.voices = [];
    this.selectedVoiceType = localStorage.getItem('instructorVoice') || 'female';
    this.volume = parseFloat(localStorage.getItem('instructorVolume')) || 0.8;
    this.rate = parseFloat(localStorage.getItem('instructorRate')) || 1.0;
    this.speaking = false;
    this.queue = [];
    this.supported = 'speechSynthesis' in window;

    if (this.supported) {
      speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
      this.loadVoices();
    }
  }

  loadVoices() {
    this.voices = speechSynthesis.getVoices();
    this.selectVoice();
  }

  selectVoice() {
    if (!this.supported) return;

    const available = this.voices.filter(v => {
      if (this.selectedVoiceType === 'female') {
        return v.name.toLowerCase().includes('female') ||
               v.name.toLowerCase().includes('woman') ||
               v.lang.startsWith('en-') && v.name.toLowerCase().includes('english');
      } else {
        return v.name.toLowerCase().includes('male') ||
               v.name.toLowerCase().includes('man') ||
               (v.lang.startsWith('en-') && !v.name.toLowerCase().includes('female'));
      }
    });

    if (available.length === 0) {
      available.push(...this.voices.filter(v => v.lang.startsWith('en')));
    }
    if (available.length === 0 && this.voices.length > 0) {
      available.push(this.voices[0]);
    }

    this.voice = available[0] || null;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      if (!this.supported) {
        this.showBrowserAlert();
        this.enabled = false;
        return;
      }
      if (this.voices.length === 0) {
        setTimeout(() => this.loadVoices(), 100);
      }
      this.speak('Audio instructor enabled. Ready to guide your workout.');
    } else {
      this.stop();
    }
    this.updateUI();
    return this.enabled;
  }

  setVoiceType(type) {
    this.selectedVoiceType = type;
    localStorage.setItem('instructorVoice', type);
    this.selectVoice();
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('instructorVolume', this.volume);
  }

  setRate(rate) {
    this.rate = Math.max(0.5, Math.min(2, rate));
    localStorage.setItem('instructorRate', this.rate);
  }

  speak(text, force = false) {
    if (!this.enabled && !force) return;
    if (!this.supported) return;

    this.queue.push(text);
    if (this.speaking) return;
    this.processQueue();
  }

  processQueue() {
    if (this.queue.length === 0) {
      this.speaking = false;
      return;
    }

    this.speaking = true;
    const text = this.queue.shift();

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.volume = this.volume;
    utterance.rate = this.rate;
    utterance.pitch = this.selectedVoiceType === 'female' ? 1.1 : 0.9;

    utterance.onend = () => {
      this.speaking = false;
      setTimeout(() => this.processQueue(), 100);
    };

    utterance.onerror = () => {
      this.speaking = false;
      setTimeout(() => this.processQueue(), 100);
    };

    speechSynthesis.speak(utterance);
  }

  speakWorkoutStart(workout) {
    if (!this.enabled) return;
    const type = workout.isTimed ? 'timed hold' : 'repetition';
    const detail = workout.isTimed ? `${workout.duration} seconds` : workout.goal;
    this.speak(`Starting ${workout.name}. ${type}: ${detail}. ${workout.instructions ? workout.instructions[0] : 'Focus on your form.'}`);
  }

  speakWorkoutComplete(workout) {
    if (!this.enabled) return;
    this.speak(`Great job! ${workout.name} complete. ${workout.xp} XP earned.`);
  }

  speakLevelUp(level) {
    if (!this.enabled) return;
    const ranks = ['Recruit', 'Squire', 'Warrior', 'Knight', 'Champion', 'Legend'];
    const rank = ranks[Math.min(Math.floor(level / 5), ranks.length - 1)];
    this.speak(`Level up! You reached level ${level}. Rank: ${rank}!`);
  }

  speakCountdown(seconds) {
    if (!this.enabled) return;
    if (seconds <= 10) {
      this.speak(seconds.toString());
    }
  }

  stop() {
    if (this.supported) {
      speechSynthesis.cancel();
    }
    this.speaking = false;
    this.queue = [];
  }

  showBrowserAlert() {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#ff4444;color:white;padding:12px 24px;border-radius:8px;z-index:10000;font-size:14px;text-align:center;max-width:300px;';
    div.innerHTML = 'Your browser does not support speech synthesis.<br>Try Chrome or Edge for audio guidance.';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
  }

  updateUI() {
    const btn = document.getElementById('instructor-btn');
    const status = document.getElementById('instructor-status');
    if (btn) {
      btn.textContent = this.enabled ? '🔊 ON' : '🔇 OFF';
      btn.style.background = this.enabled ? 'rgba(0,242,254,0.2)' : 'rgba(255,255,255,0.1)';
      btn.style.color = this.enabled ? '#00f2fe' : '#999';
    }
    if (status) {
      status.textContent = this.enabled ? `(voice: ${this.selectedVoiceType})` : '(inactive)';
    }
  }
}

// NOTE: the global `instructor` is declared in app.js (GLOBAL STATE).
// Declaring it here too caused a duplicate-declaration SyntaxError that
// broke app.js. This file assigns/uses that shared global.

function initInstructor() {
  instructor = new AudioInstructor();

  const btn = document.getElementById('instructor-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const enabled = instructor.toggle();
      const txt = document.getElementById('toggle-instructor');
      if (txt) txt.textContent = enabled ? '🔊 DISABLE' : '🔇 ENABLE';
      const vt = document.getElementById('voice-type');
      if (vt) vt.disabled = !enabled;
    });
  }
}

function toggleInstructorPanel() {
  const panel = document.getElementById('instructor-panel');
  if (panel) {
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  }
}
