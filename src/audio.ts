// Web Audio Sound Synthesizer, Continuous Guqin BGM Engine & SFX
import { GLOBAL_BGM_CONFIG } from './config/audioConfig';

export type SoundFXMode = 'ALL' | 'GUQIN' | 'METAL' | 'MUTE';

export type BGMProgressionPhase =
  | 'CALM'      // 0: 平静 · 幽谷琴音 (初始/大地图)
  | 'BLEAK'     // 1: 萧瑟 · 空山暮雨 (解锁「仁」)
  | 'SOLEMN'    // 2: 肃穆 · 宗庙金石 (解锁「礼」)
  | 'RISING'    // 3: 渐高潮 · 侠骨丹心 (解锁「义」)
  | 'CLIMAX'    // 4: 激昂热血 · 智勇破局 (解锁「智」)
  | 'EPILOGUE'; // 5: 尾声收束 · 五德归一 (解锁「信」/ 最终章天地铸炉)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private soundMode: SoundFXMode = 'ALL';
  private bgmPhase: BGMProgressionPhase = 'CALM';
  private bgmPlaying: boolean = false;
  private bgmIntervalId: number | null = null;
  private currentPhraseIndex: number = 0;
  private masterBgmGain: GainNode | null = null;

  // 🎵 全局音频文件播放器（直接接入 /src/config/audioConfig.ts）
  private globalBgmAudio: HTMLAudioElement | null = null;
  private isCustomBgmActive: boolean = false;

  constructor() {
    // Auto-setup interaction hook to resume AudioContext & play global audio seamlessly on any touch/click
    if (typeof window !== 'undefined') {
      // 1. 初始化自定义音频文件
      this.initGlobalAudioBgm();

      // 2. 监听初次手势，确保现代浏览器中音频无缝自动播放
      const unlockAudio = () => {
        this.initContext();
        this.tryPlayGlobalAudioBgm();
        if (!this.isCustomBgmActive) {
          this.startContinuousGuqinBGM();
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
    }
  }

  /**
   * 🎵 初始化全局音频文件播放器
   * 自动加载 /src/config/audioConfig.ts 中配置的音频资产文件
   */
  public initGlobalAudioBgm() {
    if (typeof window === 'undefined') return;

    const url = GLOBAL_BGM_CONFIG.bgmUrl ? GLOBAL_BGM_CONFIG.bgmUrl.trim() : '';
    if (url && url !== '') {
      try {
        if (!this.globalBgmAudio) {
          this.globalBgmAudio = new Audio(url);
          this.globalBgmAudio.loop = GLOBAL_BGM_CONFIG.loop;
          this.globalBgmAudio.volume = this.isMuted ? 0 : GLOBAL_BGM_CONFIG.volume;
          this.globalBgmAudio.preload = 'auto';

          this.globalBgmAudio.addEventListener('canplay', () => {
            this.isCustomBgmActive = true;
          });

          this.globalBgmAudio.addEventListener('playing', () => {
            this.isCustomBgmActive = true;
          });

          this.globalBgmAudio.addEventListener('error', () => {
            // 当指定路径暂无物理文件时，自动无缝回退至内置古典古琴律动
            this.isCustomBgmActive = false;
            this.startContinuousGuqinBGM();
          });
        }

        if (GLOBAL_BGM_CONFIG.autoPlay) {
          this.tryPlayGlobalAudioBgm();
        }
      } catch (err) {
        console.warn('Custom BGM audio init error:', err);
        this.isCustomBgmActive = false;
        this.startContinuousGuqinBGM();
      }
    } else {
      this.isCustomBgmActive = false;
      this.startContinuousGuqinBGM();
    }
  }

  /**
   * 尝试播放全局背景音乐（兼容各主流浏览器无交互自动播放策略）
   */
  public tryPlayGlobalAudioBgm() {
    if (this.globalBgmAudio && !this.isMuted) {
      this.globalBgmAudio.volume = GLOBAL_BGM_CONFIG.volume;
      const playPromise = this.globalBgmAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isCustomBgmActive = true;
          })
          .catch((err) => {
            // 现代浏览器策略：初次等待玩家首次点击或触摸
            console.log('Audio autoplay pending user interaction:', err?.message || err);
          });
      }
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.globalBgmAudio) {
      this.globalBgmAudio.muted = muted;
      if (!muted) {
        this.globalBgmAudio.volume = GLOBAL_BGM_CONFIG.volume;
        this.tryPlayGlobalAudioBgm();
      }
    }
    if (muted) {
      this.soundMode = 'MUTE';
      if (this.masterBgmGain && this.ctx) {
        this.masterBgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    } else {
      if (this.soundMode === 'MUTE') {
        this.soundMode = 'ALL';
      }
      if (this.masterBgmGain && this.ctx) {
        this.masterBgmGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      }
      if (!this.isCustomBgmActive) {
        this.startContinuousGuqinBGM();
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setSoundMode(mode: SoundFXMode) {
    this.soundMode = mode;
    this.isMuted = mode === 'MUTE';
    if (this.globalBgmAudio) {
      this.globalBgmAudio.muted = this.isMuted;
      if (!this.isMuted) {
        this.tryPlayGlobalAudioBgm();
      }
    }
    if (this.masterBgmGain && this.ctx) {
      this.masterBgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
  }

  public getSoundMode(): SoundFXMode {
    return this.soundMode;
  }

  /**
   * 🎵【持续古琴音乐进阶引擎】
   * 根据解锁进度动态调节古琴音乐情绪：
   * 0关卡: CALM (平静)
   * 1关卡: BLEAK (萧瑟)
   * 2关卡: SOLEMN (肃穆)
   * 3关卡: RISING (渐高潮)
   * 4关卡: CLIMAX (激昂热血)
   * 5关卡/最终章: EPILOGUE (落入尾声收束)
   */
  public setBGMProgressionByCount(unlockedCount: number, isFinalChapter = false) {
    if (isFinalChapter) {
      this.bgmPhase = 'EPILOGUE';
    } else if (unlockedCount === 0) {
      this.bgmPhase = 'CALM';
    } else if (unlockedCount === 1) {
      this.bgmPhase = 'BLEAK';
    } else if (unlockedCount === 2) {
      this.bgmPhase = 'SOLEMN';
    } else if (unlockedCount === 3) {
      this.bgmPhase = 'RISING';
    } else if (unlockedCount >= 4) {
      this.bgmPhase = 'CLIMAX';
    }
    this.startContinuousGuqinBGM();
  }

  public setBGMPhase(phase: BGMProgressionPhase) {
    this.bgmPhase = phase;
    this.startContinuousGuqinBGM();
  }

  public startContinuousGuqinBGM() {
    if (this.bgmPlaying || this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (!this.masterBgmGain) {
      this.masterBgmGain = this.ctx.createGain();
      this.masterBgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      this.masterBgmGain.connect(this.ctx.destination);
    }

    this.bgmPlaying = true;
    this.scheduleNextBgmLoop();
  }

  private scheduleNextBgmLoop() {
    if (!this.bgmPlaying) return;

    // Execute current phrase
    this.playGuqinBgmPhrase();
    this.currentPhraseIndex++;

    // Dynamic interval based on current phase
    let nextDelay = 3800; // ms
    if (this.bgmPhase === 'CALM') nextDelay = 4200;
    else if (this.bgmPhase === 'BLEAK') nextDelay = 3600;
    else if (this.bgmPhase === 'SOLEMN') nextDelay = 3200;
    else if (this.bgmPhase === 'RISING') nextDelay = 2600;
    else if (this.bgmPhase === 'CLIMAX') nextDelay = 2000;
    else if (this.bgmPhase === 'EPILOGUE') nextDelay = 4800;

    if (this.bgmIntervalId) {
      window.clearTimeout(this.bgmIntervalId);
    }
    this.bgmIntervalId = window.setTimeout(() => {
      this.scheduleNextBgmLoop();
    }, nextDelay);
  }

  private playGuqinBgmPhrase() {
    if (this.isMuted || !this.ctx || !this.masterBgmGain) return;
    const t = this.ctx.currentTime;

    // Ancient Pentatonic Frequencies (宫商角徵羽: D, E, G, A, B, D5, E5, G5)
    const D3 = 146.83, A3 = 220.0, D4 = 293.66, E4 = 329.63, G4 = 392.0, A4 = 440.0, B4 = 493.88, D5 = 587.33, E5 = 659.25, G5 = 783.99;

    switch (this.bgmPhase) {
      case 'CALM': {
        // 平静 · 幽谷琴音：低沉空灵单音与双音慢弹，悠远回荡
        const calmPhrases = [
          [D4, 0, 1.8],
          [A4, 0.4, 1.6],
          [G4, 1.1, 2.0],
          [D3, 1.8, 2.8],
        ];
        this.renderPluckSequence(calmPhrases, t, 0.35, true);
        break;
      }
      case 'BLEAK': {
        // 萧瑟 · 空山暮雨：带微弱吟猱滑音与孤寂五度音程
        const bleakPhrases = [
          [E4, 0, 1.6],
          [G4, 0.3, 1.4],
          [D4, 0.8, 2.0],
          [A3, 1.4, 2.5],
        ];
        this.renderPluckSequence(bleakPhrases, t, 0.38, true);
        break;
      }
      case 'SOLEMN': {
        // 肃穆 · 宗庙金石：庄严沉雄，深沉低音散音与肃穆金石谐音
        const solemnPhrases = [
          [D3, 0, 3.0],
          [A3, 0.1, 2.5],
          [D4, 0.5, 1.8],
          [E4, 1.0, 1.6],
          [D4, 1.5, 2.2],
        ];
        this.renderPluckSequence(solemnPhrases, t, 0.42, true);
        break;
      }
      case 'RISING': {
        // 渐高潮 · 侠骨丹心：扫弦琶音，音阶层层拔高
        const risingPhrases = [
          [D4, 0, 1.2],
          [G4, 0.15, 1.2],
          [A4, 0.3, 1.4],
          [D5, 0.5, 1.6],
          [E5, 0.8, 1.8],
          [D4, 1.2, 1.5],
        ];
        this.renderPluckSequence(risingPhrases, t, 0.45, false);
        break;
      }
      case 'CLIMAX': {
        // 激昂热血 · 智勇破局：急促金铁扫弦与高亢泛音激荡
        const climaxPhrases = [
          [D3, 0, 1.5],
          [D4, 0.08, 1.2],
          [A4, 0.18, 1.2],
          [D5, 0.3, 1.5],
          [G5, 0.5, 1.8],
          [E5, 0.75, 1.4],
          [D5, 1.0, 2.0],
        ];
        this.renderPluckSequence(climaxPhrases, t, 0.5, false);
        break;
      }
      case 'EPILOGUE': {
        // 尾声收束 · 五德归一：空明泛音祥和归入宁静
        const epiloguePhrases = [
          [D5, 0, 3.5],
          [A4, 0.5, 3.0],
          [G4, 1.2, 3.2],
          [D4, 2.0, 4.0],
          [D3, 2.8, 4.5],
        ];
        this.renderPluckSequence(epiloguePhrases, t, 0.35, true);
        break;
      }
    }
  }

  private renderPluckSequence(
    notes: number[][],
    baseTime: number,
    vol: number,
    softSlide: boolean
  ) {
    if (!this.ctx || !this.masterBgmGain) return;

    notes.forEach(([freq, delay, dur]) => {
      if (!this.ctx || !this.masterBgmGain) return;
      const t = baseTime + delay;

      // Primary Warm Guqin string (Triangle oscillator for wooden string resonance)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      // Subtle Guqin "Yin/Rou" (吟猱微颤滑音)
      if (softSlide) {
        osc.frequency.linearRampToValueAtTime(freq * 1.015, t + 0.3);
        osc.frequency.linearRampToValueAtTime(freq * 0.99, t + 0.6);
        osc.frequency.linearRampToValueAtTime(freq, t + 1.0);
      }

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc.connect(gain);
      gain.connect(this.masterBgmGain);

      osc.start(t);
      osc.stop(t + dur);

      // Guqin Harmonics / Overtone (泛音晶莹感)
      const overtone = this.ctx.createOscillator();
      const oGain = this.ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2, t);

      oGain.gain.setValueAtTime(0.001, t);
      oGain.gain.linearRampToValueAtTime(vol * 0.3, t + 0.02);
      oGain.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.65);

      overtone.connect(oGain);
      oGain.connect(this.masterBgmGain);

      overtone.start(t);
      overtone.stop(t + dur * 0.65);
    });
  }

  // Play standard UI click sound
  public playClick() {
    if (this.isMuted || this.soundMode === 'MUTE') return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Single realistic Guqin string pluck
  public playGuqinPluckSingle(noteIndex = 0) {
    if (this.isMuted || this.soundMode === 'MUTE') return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [293.66, 329.63, 392.0, 440.0, 587.33, 659.25];
    const freq = notes[noteIndex % notes.length];

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t);
    gain1.gain.setValueAtTime(0.35, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 1.2);
  }

  // Soft metallic blade touch / parry tap
  public playMetalClashSoft() {
    if (this.isMuted || this.soundMode === 'MUTE') return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [1800, 2900, 4200].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.75, t + 0.25);
      gain.gain.setValueAtTime(0.15 / (idx + 1), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  }

  // Hammer striking anvil
  public playHammerStrike() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1400, t);
    osc1.frequency.exponentialRampToValueAtTime(320, t + 0.35);
    gain1.gain.setValueAtTime(0.5, t);
    gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.35);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(220, t);
    osc2.frequency.exponentialRampToValueAtTime(60, t + 0.2);
    gain2.gain.setValueAtTime(0.6, t);
    gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t);
    osc2.stop(t + 0.2);
  }

  // Blade grinding sound
  public playGrind() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(650, t);
    osc.frequency.linearRampToValueAtTime(950, t + 0.2);
    osc.frequency.linearRampToValueAtTime(450, t + 0.4);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Wood chop / sharp slash
  public playChop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.18);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Sword Parry / Clash
  public playParry() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [1760, 2640, 3520].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.4);
      gain.gain.setValueAtTime(0.25 / (i + 1), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  public playSwordClash() {
    this.playParry();
  }

  // Ancient bell / chime for virtue unlock
  public playVirtueChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.12);
      gain.gain.setValueAtTime(0.3, t + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.12);
      osc.stop(t + idx * 0.12 + 1.2);
    });
  }

  // Energy charge hum
  public playEnergyPulse(ratio: number) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150 + ratio * 400, t);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Sparkling Starlight Twinkle sound
  public playStarTwinkle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [2349.32, 2793.83, 3520.0, 4186.01, 5587.65];
    const shuffled = [...freqs].sort(() => 0.5 - Math.random()).slice(0, 3);

    shuffled.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = t + idx * 0.045;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.06, delay + 0.18);

      gain.gain.setValueAtTime(0.001, delay);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, delay + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(delay);
      osc.stop(delay + 0.28);
    });
  }

  public playSwordSlash() {
    this.playStarTwinkle();
  }

  public playSwordDraw() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.linearRampToValueAtTime(2400, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.45);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  public playGuqinStrum() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const pentatonic = [293.66, 329.63, 392.0, 440.0, 587.33];
    pentatonic.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.06);
      gain.gain.setValueAtTime(0.25, t + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 1.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.06);
      osc.stop(t + idx * 0.06 + 1.4);
    });
  }

  public playZenBell() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(216, t);
    osc.frequency.exponentialRampToValueAtTime(108, t + 2.5);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 2.5);
  }
}

export const sound = new SoundEngine();
