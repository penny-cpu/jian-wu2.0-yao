import React from 'react';

export interface WuxiaScrollPageProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: string;
  sealText?: string;
  sealColor?: 'red' | 'gold' | 'jade';
  children?: React.ReactNode;
  className?: string;
  maxHeight?: string;
  compact?: boolean; // For smaller top banners in interactive stages
}

export const WuxiaScrollPage: React.FC<WuxiaScrollPageProps> = ({
  title,
  subtitle,
  badge,
  sealText = '剑',
  sealColor = 'red',
  children,
  className = '',
  maxHeight,
  compact = false,
}) => {
  const sealStyles = {
    red: 'border-[#a8332a] text-[#a8332a] bg-[#a8332a]/10 shadow-[0_0_8px_rgba(168,51,42,0.3)]',
    gold: 'border-[#99732e] text-[#99732e] bg-[#99732e]/10 shadow-[0_0_8px_rgba(153,115,46,0.3)]',
    jade: 'border-[#2d6a4f] text-[#2d6a4f] bg-[#2d6a4f]/10 shadow-[0_0_8px_rgba(45,106,79,0.3)]',
  }[sealColor];

  if (compact) {
    // Compact scroll banner for stage top prompts
    return (
      <div className={`relative w-full max-w-xl mx-auto my-2 select-none ${className}`}>
        {/* Left & Right Scroll Spindle Rod Caps */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-[88%] bg-gradient-to-r from-[#5a3e1b] via-[#8c6530] to-[#402a10] rounded-sm border border-[#caa35c] shadow-lg flex flex-col justify-between items-center py-1 z-20">
          <span className="w-2 h-1 bg-[#dfba73] rounded-full" />
          <span className="w-1.5 h-1.5 bg-[#caa35c] rotate-45" />
          <span className="w-2 h-1 bg-[#dfba73] rounded-full" />
        </div>
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-[88%] bg-gradient-to-l from-[#5a3e1b] via-[#8c6530] to-[#402a10] rounded-sm border border-[#caa35c] shadow-lg flex flex-col justify-between items-center py-1 z-20">
          <span className="w-2 h-1 bg-[#dfba73] rounded-full" />
          <span className="w-1.5 h-1.5 bg-[#caa35c] rotate-45" />
          <span className="w-2 h-1 bg-[#dfba73] rounded-full" />
        </div>

        {/* Parchment Scroll Paper Body */}
        <div
          className="relative mx-2 px-6 py-3.5 rounded-sm shadow-[0_8px_25px_rgba(0,0,0,0.85),inset_0_0_30px_rgba(140,105,58,0.35)] border-y border-[#b89c66] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e4d7bd 0%, #f4ecdc 40%, #e2d3b5 80%, #d5c39e 100%)',
          }}
        >
          {/* Paper Grain & Aged Fiber Texture */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#8c6530_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Top/Bottom Silk Damask Edge Trim */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8c6530] via-[#dfba73] to-[#8c6530]" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8c6530] via-[#dfba73] to-[#8c6530]" />

          {/* Header Content */}
          <div className="relative z-10 text-center">
            {badge && (
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 mb-1 rounded-sm text-xs font-serif font-bold text-[#8f281b] border border-[#a8332a]/40 bg-[#a8332a]/10">
                <span>❖</span>
                <span>{badge}</span>
                <span>❖</span>
              </div>
            )}
            {title && (
              <h3 className="text-base sm:text-lg font-serif font-black text-[#26170d] tracking-wide leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
                {title}
              </h3>
            )}
            {subtitle && (
              <div className="text-xs sm:text-sm font-serif text-[#523d2b] mt-1 tracking-wider leading-relaxed">
                {subtitle}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Full Rich Scroll Page (Image 3 Style)
  return (
    <div className={`relative w-full max-w-2xl mx-auto my-auto select-none ${className}`}>
      {/* Scroll Roll Spindles on Left & Right with Ornate Bronze Mountings */}
      <div className="absolute -left-3.5 sm:-left-4 top-2 bottom-2 w-5 sm:w-6 bg-gradient-to-r from-[#382410] via-[#755225] to-[#2b1b0c] rounded-sm border-y-2 border-[#caa35c] shadow-[0_10px_25px_rgba(0,0,0,0.9)] flex flex-col justify-between items-center py-2 z-20">
        {/* Top Spindle Bronze Finial */}
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#dfba73] to-[#6e4e1e] border border-[#ffe6a3] shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#2b1b0c] rounded-full" />
        </div>
        {/* Middle Silk Tassel / Ring */}
        <div className="w-full h-8 border-y border-[#dfba73]/70 bg-[#a8332a]/40 flex items-center justify-center">
          <div className="w-2 h-2 rotate-45 bg-[#dfba73]" />
        </div>
        {/* Bottom Spindle Bronze Finial */}
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#dfba73] to-[#6e4e1e] border border-[#ffe6a3] shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#2b1b0c] rounded-full" />
        </div>
      </div>

      <div className="absolute -right-3.5 sm:-right-4 top-2 bottom-2 w-5 sm:w-6 bg-gradient-to-l from-[#382410] via-[#755225] to-[#2b1b0c] rounded-sm border-y-2 border-[#caa35c] shadow-[0_10px_25px_rgba(0,0,0,0.9)] flex flex-col justify-between items-center py-2 z-20">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#dfba73] to-[#6e4e1e] border border-[#ffe6a3] shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#2b1b0c] rounded-full" />
        </div>
        <div className="w-full h-8 border-y border-[#dfba73]/70 bg-[#a8332a]/40 flex items-center justify-center">
          <div className="w-2 h-2 rotate-45 bg-[#dfba73]" />
        </div>
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#dfba73] to-[#6e4e1e] border border-[#ffe6a3] shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#2b1b0c] rounded-full" />
        </div>
      </div>

      {/* Main Aged Scroll Paper Membrane */}
      <div
        className="relative mx-3 sm:mx-4 px-6 py-6 sm:px-10 sm:py-8 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.95),inset_0_0_50px_rgba(138,98,48,0.4)] border-y-2 border-[#a6864d] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #d8caa9 0%, #ede3cc 25%, #f7f0df 50%, #eae0c7 75%, #cfbe99 100%)',
          maxHeight: maxHeight || 'auto',
        }}
      >
        {/* Paper Fibers and Watermark Stains */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#6e4e1e_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#8c6530]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#8c6530]/10 blur-3xl pointer-events-none" />

        {/* Top and Bottom Ornate Brocade Trim */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6e4e1e] via-[#dfba73] to-[#6e4e1e] border-b border-[#ffd885]/40" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6e4e1e] via-[#dfba73] to-[#6e4e1e] border-t border-[#ffd885]/40" />

        {/* Red Vermilion Antique Seal Stamp in Upper Right (Image 3 Style) */}
        {sealText && (
          <div
            className={`absolute top-5 right-6 sm:top-6 sm:right-8 w-10 h-10 sm:w-11 sm:h-11 rounded-sm border-2 flex flex-col items-center justify-center font-serif font-black text-sm sm:text-base leading-none select-none rotate-3 pointer-events-none z-10 ${sealStyles}`}
          >
            <div className="border border-current p-0.5 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
              {sealText}
            </div>
          </div>
        )}

        {/* Scroll Content Body */}
        <div className="relative z-10">
          {/* Badge / Category */}
          {badge && (
            <div className="inline-block px-3 py-1 rounded-sm bg-[#8f281b]/10 border border-[#8f281b]/40 text-[#8f281b] text-xs font-serif font-bold tracking-widest mb-3">
              ❖ {badge} ❖
            </div>
          )}

          {/* Main Title Heading (Songti/Kaiti Soot Ink) */}
          {title && (
            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#21140a] tracking-wider drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                {title}
              </h2>
              {/* Brush Calligraphy Divider */}
              <div className="flex items-center gap-2 mt-2 w-full max-w-xs">
                <div className="h-[1.5px] flex-1 bg-gradient-to-r from-[#a8332a] to-transparent" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#a8332a]" />
                <div className="h-[1.5px] flex-1 bg-gradient-to-l from-[#a8332a] to-transparent" />
              </div>
            </div>
          )}

          {subtitle && (
            <div className="text-sm sm:text-base font-serif font-semibold text-[#5a422e] mb-4 tracking-wide">
              {subtitle}
            </div>
          )}

          {/* Children container with warm soot ink font */}
          <div className="font-serif text-[#332216] leading-relaxed text-sm sm:text-base space-y-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
