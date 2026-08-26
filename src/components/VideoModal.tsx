import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../audio';
import { FastForward, Play, Film } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-[#140e0a] rounded-2xl border-2 border-[#8c6742] shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between">
        {/* Top bar with title and Skip button */}
        <div className="absolute top-0 inset-x-0 p-4 z-20 flex items-center justify-between bg-gradient-to-b from-[#140e0a]/95 to-transparent">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#ffd700]" />
            <span className="text-[#f5ebd7] font-serif font-bold text-base tracking-wider">{title}</span>
            <span className="text-xs text-[#a69279] hidden sm:inline font-serif">（{videoSrc}）</span>
          </div>

          <button
            id="video-skip-btn"
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#241911] border border-[#8c6742] text-[#ffd700] hover:bg-[#332318] hover:border-[#ffd700] hover:text-white transition-all text-xs font-serif shadow-lg cursor-pointer active:scale-95"
          >
            <span>跳过动画</span>
            <FastForward className="w-3.5 h-3.5 text-[#ffd700]" />
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

          {/* Cinematic Graphic Fallback (when local video file is not yet uploaded) */}
          {videoError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-[radial-gradient(ellipse_at_center,#2b1d14_0%,#160f0a_60%,#0c0806_100%)]">
              {/* Dynamic glowing sword ring effect */}
              <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#8c6742]/40 animate-spin" style={{ animationDuration: '12s' }} />
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#ffd700]/50 animate-spin" style={{ animationDuration: '6s' }} />
                <div className="w-20 h-20 rounded-full bg-[#241911] border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center">
                  <span className="text-3xl text-[#ffd700]">🗡️</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-brush text-[#f5ebd7] mb-2 tracking-widest">
                {title}
              </h2>
              <p className="text-sm sm:text-base font-serif text-[#d6c4a5] max-w-md mb-4 leading-relaxed italic">
                “{subtitle}”
              </p>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#241911] border border-[#5c4028] text-[#c5a882] text-xs font-serif">
                <span>[ 剑境绘卷 · {videoSrc} ]</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-20 bg-gradient-to-t from-[#140e0a]/95 to-transparent">
          <div className="w-full h-1.5 bg-[#241911] border border-[#5c4028] rounded-full overflow-hidden mb-1">
            <div
              className="h-full bg-gradient-to-r from-[#8c6742] via-[#ffd700] to-[#f5ebd7] transition-all duration-75 rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#a69279] font-serif">
            <span>❖ 剑意回响中...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
