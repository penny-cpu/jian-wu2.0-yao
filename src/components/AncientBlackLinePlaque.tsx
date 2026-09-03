import React from 'react';
import { LargeBlackGoldOrnament } from './BlackGoldBorder';

export interface AncientBlackLinePlaqueProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  title?: string;
  id?: string;
}

/**
 * 🏛️【上下两条边黑金色纹路线条勾勒弹窗框】
 * 规范：只做上下两条边的黑金色纹路线条勾勒，纹路线条设计集中在上下两边的中间；
 * 左右两侧完全无边框（border-x-0），四个角落保持干净利落。
 * 适用范围：「我的闯关」、「人物志」、「玩法介绍」弹窗，
 * 第 1 至第 5 关全部的「试炼前情」、「悟剑沉思」与「五德点亮」页面，
 * 以及所有交互页面的识别正确与失败弹窗。
 */
export const AncientBlackLinePlaque: React.FC<AncientBlackLinePlaqueProps> = ({
  children,
  className = '',
  style,
  onClick,
  title,
  id,
}) => {
  // Clean classes: strip any existing full borders so sides remain completely borderless
  const sanitizedClassName = className
    .replace(/border-2\s+border-black/g, '')
    .replace(/border\s+border-black/g, '')
    .trim();

  return (
    <div
      id={id}
      onClick={onClick}
      title={title}
      style={style}
      className={`relative !border-x-0 !border-y-0 rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.98)] ${sanitizedClassName}`}
    >
      {/* Top Edge: Concentrated Black-Gold Warring States Motif in Center */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <LargeBlackGoldOrnament inverted={false} />
      </div>

      {/* Bottom Edge: Concentrated Black-Gold Warring States Motif in Center */}
      <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
        <LargeBlackGoldOrnament inverted={true} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

// Also export as BronzeCornerPlaque for full backwards compatibility
export const BronzeCornerPlaque = AncientBlackLinePlaque;

