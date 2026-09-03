import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../audio';
import { FastForward, Film, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface VideoModalProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  onComplete: () => void;
  durationSeconds?: number;
  autoPlay?: boolean;
}

/**
 * 🎬【全关卡影画播放器组件】
 * 1. 采用纯黑四边线条勾勒（Clean 4-side Black Linework），四个角保持纯净利落；
 * 2. 支持视频全音频原声播放（Sound/Audio Enabled），内置音量开关与原声保障；
 * 3. 视频源若为本地或网络 mp4 即可直接播放原画原声，若缺失则优雅呈现古风剑意动画。
 */
export const VideoModal: React.FC<VideoModalProps> = ({
  videoSrc,
  title = '剧情动画',
  subtitle = '剑心初成 · 意境显现',
  onComplete,
  durationSeconds = 6,
}) => {
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    const durationMs = durationSeconds * 1000;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);

      if (elapsed >= durationMs) {
        window.clearInterval(interval);
        handleFinish();
      }
    }, 50);

    timerRef.current = interval;

    // Try starting video playback with sound
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.play().catch(() => {
        // Fallback if browser requires user gesture for unmuted audio
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsAudioMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [durationSeconds]);

  const handleFinish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {
        // ignore
      }
    }
    onComplete();
  };

  const handleSkip = () => {
    sound.playClick();
    handleFinish();
  };

  const toggleSound = () => {
    sound.playClick();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsAudioMuted(nextMuted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060a08]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-fade-in">
      {/* 4-side clean black line frame container */}
      <div className="relative w-full max-w-4xl aspect-video bg-gradient-to-b from-[#0c1512] via-[#101b17] to-[#080d0b] rounded-none border-2 border-black shadow-[0_0_60px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col justify-between">
        
        {/* Double Black Lines (Inner subtle hairline) */}
        <div className="absolute inset-[3px] border border-black/70 pointer-events-none z-30" />

        {/* Top bar with title, Audio Toggle, and Skip button */}
        <div className="absolute top-0 inset-x-0 px-4 py-3 sm:px-6 sm:py-3.5 z-40 flex items-center justify-between bg-gradient-to-b from-[#0a110e]/95 via-[#0e1713]/80 to-transparent border-b border-black">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-none border border-black bg-[#16241e] flex items-center justify-center shadow-sm">
              <Film className="w-3.5 h-3.5 text-[#ffd885]" />
            </div>
            <span className="text-[#f5efe3] font-serif font-bold text-sm sm:text-base tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {title}
            </span>
            <span className="text-[11px] text-[#7bb39d] hidden sm:inline font-serif opacity-85">
              （{videoSrc}）
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle Button */}
            <button
              id="video-sound-btn"
              onClick={toggleSound}
              className="flex items-center gap-1 px-3 py-1 sm:py-1.5 rounded-none border border-black bg-[#16241e] text-[#ffd885] hover:text-white transition-all text-xs font-serif cursor-pointer active:scale-95 shadow-sm"
              title={isAudioMuted ? '点击开启视频原声' : '点击静音'}
            >
              {isAudioMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#d64d3e]" />
                  <span className="text-[#ffd885]">开启声音</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#5cb87a]" />
                  <span>视频原声中</span>
                </>
              )}
            </button>

            {/* Skip Button */}
            <button
              id="video-skip-btn"
              onClick={handleSkip}
              className="flex items-center gap-1.5 px-3.5 py-1 sm:py-1.5 rounded-none border border-black bg-[#1a2d24] text-[#ffd885] hover:text-white transition-all text-xs font-serif shadow-sm cursor-pointer active:scale-95"
            >
              <span className="font-bold tracking-wider">跳过动画</span>
              <FastForward className="w-3.5 h-3.5 text-[#ffd885]" />
            </button>
          </div>
        </div>

        {/* Video or Fallback Animated Canvas */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {!videoError ? (
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              playsInline
              onEnded={handleFinish}
              onError={() => setVideoError(true)}
              className="w-full h-full object-contain"
            />
          ) : null}

          {/* Cinematic Bronze-Patina & Jade Fallback */}
          {videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-[radial-gradient(ellipse_at_center,#172620_0%,#0e1714_55%,#060a08_100%)]">
              {/* Dynamic Bronze-Patina & Jade Glowing Ring */}
              <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border border-black animate-spin"
                  style={{ animationDuration: '14s' }}
                />
                <div
                  className="absolute inset-2 rounded-full border-2 border-dashed border-[#dfba73]/60 animate-spin"
                  style={{ animationDuration: '7s' }}
                />
                {/* Center Seal Disc */}
                <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#1a2b23] via-[#243a30] to-[#121c17] border-2 border-black shadow-[0_0_35px_rgba(223,186,115,0.4)] flex items-center justify-center">
                  <span className="text-3xl text-[#ffd885] drop-shadow-[0_0_8px_#ffd885]">🗡️</span>
                </div>
              </div>

              {/* Title with Brush Texture */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5efe3] mb-2 tracking-[0.2em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                {title}
              </h2>
              
              <p className="text-xs sm:text-sm md:text-base font-serif text-[#ffd885] max-w-md mb-3 leading-relaxed italic drop-shadow-md">
                “{subtitle}”
              </p>

              {/* Classical Inscribed Tag */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-none border border-black bg-[#131f1a] text-[#7bb39d] text-xs font-serif shadow-inner">
                <Sparkles className="w-3 h-3 text-[#dfba73]" />
                <span>[ 剑境画卷 · 声音已就绪 · {videoSrc} ]</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Cinematic Progress Bar (4-side black framed) */}
        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#090f0c] border-t border-black z-40">
          <div
            className="h-full bg-gradient-to-r from-[#1b3327] via-[#dfba73] to-[#ffd885] transition-all duration-75 shadow-[0_0_8px_#dfba73]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
