import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Maximize2, Film } from 'lucide-react';

export interface StanceVideoConfig {
  id: string;
  name: string;
  pinyin: string;
  videoUrl: string;        // 视频文件路径 (替换此路径即可加载自定义 mp4 视频)
  durationSeconds: number; // 视频实际时长秒数 (替换视频后请修改此秒数)
  actionDesc: string;      // 招式动作要点描述 (以实际秒数为依据)
  formula?: string;        // 简明剑理口诀 (如：反手走弧，从容拨开枝叶与障碍)
  icon: string;
  accentColor: string;
}

interface StanceVideoPlayerProps {
  stance?: StanceVideoConfig;
  config?: StanceVideoConfig;
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number, totalTime: number) => void;
}

/**
 * 第四关 · 剑谱秘要中心招式动作视频播放器组件 (参考图1风格设计)
 * - 画幅四边扩大，呈现典雅古籍秘卷《剑谱秘要》展开视效
 * - 左页墨书剑谱纲要与口诀，右页展现高帧率水墨武者运剑动态演示
 * - 底部配备标准多媒体控制条：播放/暂停、秒数计数 (0:0X / 0:0X)、进度条、音量与全屏图标
 */
export const StanceVideoPlayer: React.FC<StanceVideoPlayerProps> = ({ stance: stanceProp, config: configProp }) => {
  const stance = stanceProp || configProp || {
    id: 'default',
    name: '剑法精要',
    pinyin: 'Jiàn Fǎ',
    videoUrl: '',
    durationSeconds: 6,
    actionDesc: '运剑守神，动静相生。',
    icon: '⚔️',
    accentColor: '#ffd885'
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [useFallbackAnimation, setUseFallbackAnimation] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const duration = stance.durationSeconds;

  // Reset playback when stance changes
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    startTimeRef.current = performance.now();
    setUseFallbackAnimation(true);
  }, [stance.id, stance.durationSeconds]);

  // Animation / Time Update Loop
  useEffect(() => {
    if (!isPlaying) {
      startTimeRef.current = null;
      return;
    }

    const updateLoop = (now: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = now - currentTime * 1000;
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      if (elapsed >= duration) {
        // Loop video
        startTimeRef.current = now;
        setCurrentTime(0);
      } else {
        setCurrentTime(elapsed);
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, duration, currentTime]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startTimeRef.current = performance.now() - currentTime * 1000;
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    startTimeRef.current = performance.now();
  };

  const formatPlayerTime = (seconds: number) => {
    const s = Math.floor(seconds);
    return `0:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, Math.max(0, (currentTime / duration) * 100));

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Expanded Video Player Stage Screen (参考图1画幅扩大设计，上下幅度再适度增高) */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-sm bg-[#121c17] border-2 border-[#3b554b] shadow-[0_10px_35px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between group">
        
        {/* Ancient Dual-Page Parchment Background (左书墨契，右舞剑华) */}
        <div className="absolute inset-0 bg-[#f7f2e4] flex pointer-events-none">
          {/* Left Page: Parchment & Calligraphy */}
          <div className="relative w-1/2 h-full bg-[#f2ebd9] border-r border-[#d4c5a9] p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
            {/* Paper Texture and Ink Splatters */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(180,150,110,0.15)_0%,transparent_70%)]" />
            <div className="absolute top-2 left-2 text-[10px] text-[#8c7355] font-serif border-b border-[#c8b99d] pb-0.5">
              《剑谱秘要》卷四 · 智
            </div>

            <div className="my-auto z-10 space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1.5 text-[#3b2b1a] font-serif font-black text-sm sm:text-base tracking-wider">
                <span className="text-base">{stance.icon}</span>
                <span>{stance.name}</span>
              </div>
              <div className="text-[11px] sm:text-xs font-serif text-[#66523c] leading-relaxed line-clamp-3">
                {stance.formula || stance.actionDesc}
              </div>
              <div className="text-[10px] font-mono text-[#8c7355]">
                动作周期：{stance.durationSeconds}秒 / 高帧率演练
              </div>
            </div>

            <div className="text-[9px] text-[#a89578] font-serif tracking-widest text-right">
              干将古法剑道图说
            </div>
          </div>

          {/* Right Page: Martial Arts Canvas Stage */}
          <div className="relative w-1/2 h-full bg-[#faf7ef] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,184,178,0.12)_0%,transparent_80%)]" />
            <div className="absolute top-2 right-2 text-[10px] text-[#8c7355] font-serif border-b border-[#c8b99d] pb-0.5">
              动态剑招演示
            </div>
          </div>
        </div>

        {/* Video or Choreography Canvas Layer */}
        <div className="relative w-full h-full flex items-center justify-end z-10 overflow-hidden">
          {stance.videoUrl ? (
            <video
              ref={videoRef}
              src={stance.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover sm:object-contain rounded-sm shadow-inner"
              onTimeUpdate={(e) => {
                const target = e.currentTarget;
                if (target.duration && !isNaN(target.duration)) {
                  setCurrentTime(target.currentTime);
                }
              }}
              onError={() => {
                setUseFallbackAnimation(true);
              }}
            />
          ) : useFallbackAnimation ? (
            <div className="w-full h-full flex items-center justify-center sm:justify-end pr-0 sm:pr-4">
              <SwordChoreographyCanvas
                stanceId={stance.id}
                currentTime={currentTime}
                duration={duration}
                isPlaying={isPlaying}
                accentColor={stance.accentColor}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center sm:justify-end pr-0 sm:pr-4">
              <SwordChoreographyCanvas
                stanceId={stance.id}
                currentTime={currentTime}
                duration={duration}
                isPlaying={isPlaying}
                accentColor={stance.accentColor}
              />
            </div>
          )}
        </div>

        {/* Center Quick Play/Pause Tap Button Overlay on Hover */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          title={isPlaying ? '暂停演示' : '播放演示'}
        >
          <div className="w-11 h-11 rounded-full bg-[#162920]/95 border border-[#dfba73] flex items-center justify-center text-[#ffd885] shadow-xl hover:scale-110 transition-transform">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
          </div>
        </button>

        {/* Bottom Control Bar (参考图1精美播放器操作条) */}
        <div className="relative z-30 w-full bg-[#08120e]/95 border-t border-[#263a31] px-3 py-1.5 flex flex-col gap-1">
          {/* Video Timeline Progress Bar */}
          <div className="relative w-full h-1 bg-[#14231b] rounded-full overflow-hidden border border-[#2d473a]/50 cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-[#5cb87a] via-[#dfba73] to-[#7bf0b5] transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Time, Playback Controls & Status */}
          <div className="flex items-center justify-between text-xs font-mono text-[#d6e0db]">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={togglePlay}
                className="p-1 rounded hover:bg-[#1a3325] text-[#ffd885] transition-colors cursor-pointer"
                title={isPlaying ? '暂停' : '播放'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleRestart}
                className="p-1 rounded hover:bg-[#1a3325] text-[#7bf0b5] transition-colors cursor-pointer"
                title="重头播放"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="text-[#ffd885] font-bold text-[11px] sm:text-xs">
                {formatPlayerTime(currentTime)} / {formatPlayerTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#7bb39d]">
              <span className="text-[10px] sm:text-xs font-serif hidden sm:inline text-[#ffd885]/80">
                {isPlaying ? '● 招式循环演示中' : '❚❚ 暂停中'}
              </span>
              <Volume2 className="w-3.5 h-3.5 text-[#7bb39d] hover:text-[#ffd885] cursor-pointer" />
              <Maximize2 className="w-3.5 h-3.5 text-[#7bb39d] hover:text-[#ffd885] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 专属 5 大剑招的武侠动作动画图形引擎：
 * 1. 挂剑：剑身自下而上反手挑弧线，破开枝叶
 * 2. 掰腕剑：手腕急转偏锋横格，借力滑开冲击
 * 3. 刺剑：直线疾风电掣突刺破空
 * 4. 里外腕花：双重「∞」字形螺旋流光剑影
 * 5. 云剑：头顶与周身 360° 回环行云流水护体
 */
interface SwordChoreographyCanvasProps {
  stanceId: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  accentColor: string;
}

const SwordChoreographyCanvas: React.FC<SwordChoreographyCanvasProps> = ({
  stanceId,
  currentTime,
  duration,
  isPlaying,
}) => {
  const progress = (currentTime % duration) / duration;

  return (
    <svg viewBox="0 0 400 220" className="w-full h-full max-w-[380px] overflow-visible">
      <defs>
        {/* Glow Filters */}
        <filter id="swordGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id="bronzeBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#ffd885" />
          <stop offset="70%" stopColor="#c59846" />
          <stop offset="100%" stopColor="#382613" />
        </linearGradient>

        <linearGradient id="arcTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#7bf0b5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffd885" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Swordsman Silhouette Background (持剑武者剪影) */}
      <g opacity="0.35" transform="translate(140, 60)">
        {/* Head */}
        <circle cx="60" cy="20" r="14" fill="#5cb8b2" />
        {/* Hair Knot */}
        <ellipse cx="60" cy="4" rx="5" ry="6" fill="#dfba73" />
        {/* Torso */}
        <path d="M 45 35 L 75 35 L 85 110 L 35 110 Z" fill="#2d473a" />
        {/* Arms */}
        <path d="M 45 40 L 25 75 L 50 85" stroke="#5cb8b2" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M 75 40 L 95 70 L 70 85" stroke="#5cb8b2" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>

      {/* 1. GUAIJIAN (第 1 式：挂剑 - 反手划弧拨开阻碍) */}
      {stanceId === 'guajian' && (
        <g>
          {/* Sweeping Upward Hook Arc Trail */}
          <path
            d="M 120 170 C 140 190, 260 170, 270 60"
            stroke="url(#arcTrailGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset={220 - progress * 220}
            filter="url(#swordGlow)"
            fill="none"
          />
          {/* Animated Sword along hook path */}
          <g
            style={{
              transform: `translate(${160 + Math.sin(progress * Math.PI * 2) * 50}px, ${
                130 - Math.cos(progress * Math.PI * 2) * 55
              }px) rotate(${progress * 180 - 45}deg)`,
              transformOrigin: '0px 0px',
              transition: isPlaying ? 'none' : 'transform 0.2s ease',
            }}
          >
            <line x1="-30" y1="0" x2="65" y2="0" stroke="url(#bronzeBladeGrad)" strokeWidth="4" strokeLinecap="round" />
            <polygon points="65,0 72,0 65,-3" fill="#ffffff" />
            <line x1="-30" y1="-8" x2="-30" y2="8" stroke="#ffd885" strokeWidth="3" />
            <line x1="-30" y1="0" x2="-45" y2="0" stroke="#3d2b14" strokeWidth="3" />
          </g>
          {/* Foliage parting particles */}
          <circle cx="260" cy="80" r="3" fill="#7bf0b5" className="animate-ping" />
          <text x="200" y="200" textAnchor="middle" fill="#ffd885" fontSize="11" fontFamily="serif">
            【挂剑轨迹】：反手提撩 · 弧线拨障
          </text>
        </g>
      )}

      {/* 2. BAIWANJIAN (第 2 式：掰腕剑 - 腕力横偏借力卸劲) */}
      {stanceId === 'baiwan' && (
        <g>
          {/* Deflection Shield Rings */}
          <circle cx="200" cy="110" r={30 + Math.sin(progress * Math.PI * 4) * 15} stroke="#dfba73" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.6" />
          {/* Animated Tilting Blade */}
          <g
            style={{
              transform: `translate(200px, 110px) rotate(${Math.sin(progress * Math.PI * 4) * 40}deg)`,
              transformOrigin: '0px 0px',
            }}
          >
            <line x1="-50" y1="0" x2="60" y2="0" stroke="url(#bronzeBladeGrad)" strokeWidth="4.5" strokeLinecap="round" filter="url(#swordGlow)" />
            <line x1="-50" y1="-12" x2="-50" y2="12" stroke="#ffd885" strokeWidth="4" />
            <line x1="-50" y1="0" x2="-70" y2="0" stroke="#3d2b14" strokeWidth="3.5" />
          </g>
          {/* Deflected Impact Sparks */}
          <line x1="240" y1="90" x2="270" y2="70" stroke="#ff7733" strokeWidth="2" strokeLinecap="round" />
          <line x1="240" y1="130" x2="270" y2="150" stroke="#ffaa33" strokeWidth="2" strokeLinecap="round" />
          <text x="200" y="200" textAnchor="middle" fill="#ffd885" fontSize="11" fontFamily="serif">
            【掰腕剑轨迹】：横格偏转 · 借力化劲
          </text>
        </g>
      )}

      {/* 3. CIJIAN (第 3 式：刺剑 - 惊鸿直刺牵制消耗) */}
      {stanceId === 'cijian' && (
        <g>
          {/* Piercing Beam */}
          <line
            x1="80"
            y1="110"
            x2="320"
            y2="110"
            stroke="url(#arcTrailGrad)"
            strokeWidth="3"
            strokeDasharray="240"
            strokeDashoffset={240 - progress * 240}
            filter="url(#swordGlow)"
          />
          {/* Thrusting Blade in fast reciprocating motion */}
          <g
            style={{
              transform: `translate(${120 + Math.sin(progress * Math.PI * 6) * 70}px, 110px)`,
              transformOrigin: '0px 0px',
            }}
          >
            <line x1="-40" y1="0" x2="65" y2="0" stroke="url(#bronzeBladeGrad)" strokeWidth="4" strokeLinecap="round" />
            <polygon points="65,0 75,0 65,-4" fill="#ffffff" />
            <line x1="-40" y1="-9" x2="-40" y2="9" stroke="#ffd885" strokeWidth="3.5" />
            <line x1="-40" y1="0" x2="-58" y2="0" stroke="#3d2b14" strokeWidth="3" />
          </g>
          {/* Puncture Starburst */}
          <circle cx="260" cy="110" r="5" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 10px #7bf0b5)' }} />
          <text x="200" y="200" textAnchor="middle" fill="#ffd885" fontSize="11" fontFamily="serif">
            【刺剑轨迹】：沉肩坠肘 · 直取空隙
          </text>
        </g>
      )}

      {/* 4. WANHUA (第 4 式：里外腕花 - 双「∞」字形螺旋翻转) */}
      {stanceId === 'wanhua' && (
        <g>
          {/* Figure-8 Infinity Flower Trails */}
          <path
            d="M 140 110 C 140 70, 200 70, 200 110 C 200 150, 260 150, 260 110 C 260 70, 200 70, 200 110 C 200 150, 140 150, 140 110 Z"
            stroke="#7bf0b5"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            fill="none"
            opacity="0.75"
          />
          {/* Moving Blade on Figure-8 path */}
          <g
            style={{
              transform: `translate(${200 + Math.sin(progress * Math.PI * 4) * 60}px, ${
                110 + Math.sin(progress * Math.PI * 8) * 35
              }px) rotate(${progress * 720}deg)`,
              transformOrigin: '0px 0px',
            }}
          >
            <line x1="-25" y1="0" x2="45" y2="0" stroke="url(#bronzeBladeGrad)" strokeWidth="3.5" strokeLinecap="round" filter="url(#swordGlow)" />
            <line x1="-25" y1="-7" x2="-25" y2="7" stroke="#ffd885" strokeWidth="3" />
          </g>
          <text x="200" y="200" textAnchor="middle" fill="#ffd885" fontSize="11" fontFamily="serif">
            【腕花轨迹】：双旋绕环 · 虚实莫测
          </text>
        </g>
      )}

      {/* 5. YUNJIAN (第 5 式：云剑 - 头顶身侧平圆回环护体) */}
      {stanceId === 'yunjian' && (
        <g>
          {/* Flowing Cloud Circle Path */}
          <ellipse cx="200" cy="110" rx="80" ry="35" stroke="url(#arcTrailGrad)" strokeWidth="3" fill="none" opacity="0.8" filter="url(#swordGlow)" />
          {/* Revolving Cloud Blade */}
          <g
            style={{
              transform: `translate(${200 + Math.cos(progress * Math.PI * 2) * 80}px, ${
                110 + Math.sin(progress * Math.PI * 2) * 35
              }px) rotate(${progress * 360 + 90}deg)`,
              transformOrigin: '0px 0px',
            }}
          >
            <line x1="-30" y1="0" x2="55" y2="0" stroke="url(#bronzeBladeGrad)" strokeWidth="4" strokeLinecap="round" />
            <polygon points="55,0 63,0 55,-3" fill="#ffffff" />
            <line x1="-30" y1="-8" x2="-30" y2="8" stroke="#ffd885" strokeWidth="3" />
          </g>
          <text x="200" y="200" textAnchor="middle" fill="#ffd885" fontSize="11" fontFamily="serif">
            【云剑轨迹】：行云流水 · 护体寻隙
          </text>
        </g>
      )}
    </svg>
  );
};
