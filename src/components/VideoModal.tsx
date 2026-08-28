import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../audio';
import { FastForward, Film, Sparkles } from 'lucide-react';

interface VideoModalProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  onComplete: () => void;
  durationSeconds?: number;
  autoPlay?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  videoSrc,
  title = '剧情动画',
  subtitle = '剑心初成 · 意境显现',
  onComplete,
  durationSeconds = 4,
}) => {
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
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

  return (
    <div className="fixed inset-0 z-50 bg-[#060a08]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none">
      {/* Ornate Bronze and Gold-Jade Styled Modal Frame */}
      <div className="relative w-full max-w-4xl aspect-video bg-gradient-to-b from-[#0c1512] via-[#101b17] to-[#080d0b] rounded-sm border-2 border-[#3b554b] shadow-[0_0_60px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col justify-between">
        
        {/* Ancient Bronze & Inset Gold Filigree Corners */}
        <div className="absolute inset-1.5 border border-[#dfba73]/25 pointer-events-none z-30" />
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#dfba73] z-30" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#dfba73] z-30" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#dfba73] z-30" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#dfba73] z-30" />

        {/* Top bar with title and Skip button in Bronze & Jade style */}
        <div className="absolute top-0 inset-x-0 px-4 py-3 sm:px-6 sm:py-3.5 z-40 flex items-center justify-between bg-gradient-to-b from-[#0a110e]/95 via-[#0e1713]/80 to-transparent border-b border-[#2b3e36]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-sm bg-[#16241e] border border-[#dfba73]/60 flex items-center justify-center shadow-sm">
              <Film className="w-3.5 h-3.5 text-[#ffd885]" />
            </div>
            <span className="text-[#f5efe3] font-serif font-bold text-sm sm:text-base tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {title}
            </span>
            <span className="text-[11px] text-[#7bb39d] hidden sm:inline font-serif opacity-85">
              （{videoSrc}）
            </span>
          </div>

          <button
            id="video-skip-btn"
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3.5 py-1 sm:py-1.5 rounded-sm bg-gradient-to-r from-[#1b2b24] via-[#283e34] to-[#1b2b24] border border-[#c5a059] text-[#ffd885] hover:border-[#ffd885] hover:text-white transition-all text-xs font-serif shadow-[0_0_12px_rgba(197,160,89,0.25)] cursor-pointer active:scale-95"
          >
            <span className="font-bold tracking-wider">跳过动画</span>
            <FastForward className="w-3.5 h-3.5 text-[#ffd885]" />
          </button>
        </div>

        {/* Video or Fallback Animated Canvas */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {!videoError ? (
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted
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
              <div className="relative w-36 h-36 mb-5 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border border-[#3b554b] animate-spin"
                  style={{ animationDuration: '14s' }}
                />
                <div
                  className="absolute inset-2 rounded-full border-2 border-dashed border-[#dfba73]/60 animate-spin"
                  style={{ animationDuration: '7s' }}
                />
                {/* Center Jade-Gold Seal Disc */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a2b23] via-[#243a30] to-[#121c17] border-2 border-[#dfba73] shadow-[0_0_35px_rgba(223,186,115,0.4),inset_0_0_15px_rgba(92,184,122,0.35)] flex items-center justify-center">
                  <span className="text-3xl text-[#ffd885] drop-shadow-[0_0_8px_#ffd885]">🗡️</span>
                </div>
              </div>

              {/* Title with Brush Texture and Warm Gold-Jade Radiance */}
              <h2 className="text-2xl sm:text-3xl font-brush text-[#f5efe3] mb-2 tracking-[0.2em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                {title}
              </h2>
              
              <p className="text-xs sm:text-sm md:text-base font-serif text-[#ffd885] max-w-md mb-3.5 leading-relaxed italic drop-shadow-md">
                “{subtitle}”
              </p>

              {/* Classical Bronze Inscribed Tag */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-sm bg-[#131f1a] border border-[#3b554b] text-[#7bb39d] text-xs font-serif shadow-inner">
                <Sparkles className="w-3 h-3 text-[#dfba73]" />
                <span>[ 剑境绘卷 · {videoSrc} ]</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Progress Bar in Antique Bronze & Gold-Jade Texture */}
        <div className="absolute bottom-0 inset-x-0 px-4 py-3 sm:px-6 sm:py-3.5 z-40 bg-gradient-to-t from-[#0a110e]/95 via-[#0e1713]/80 to-transparent border-t border-[#2b3e36]/60">
          <div className="w-full h-2 bg-[#090f0c] border border-[#2b3e36] rounded-sm overflow-hidden mb-1.5 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#2e473d] via-[#5cb87a] via-[#dfba73] to-[#ffe5a3] transition-all duration-75 rounded-xs shadow-[0_0_12px_rgba(223,186,115,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#7bb39d] font-serif">
            <span className="flex items-center gap-1">
              <span className="text-[#ffd885]">❖</span>
              <span>剑意回响中...</span>
            </span>
            <span className="text-[#ffd885] font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
