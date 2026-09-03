import React, { useState, useEffect } from 'react';
import { sound } from '../audio';
import { X, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { BronzeCornerPlaque } from './BronzeCornerPlaque';
import { BronzeFiligreeButton } from './BronzeFiligreeButton';

interface StoryIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryIntroModal: React.FC<StoryIntroModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [revealedLines, setRevealedLines] = useState<number>(1);

  const maxLines = 5;

  useEffect(() => {
    if (!isOpen) return;
    setRevealedLines(1);
    const interval = setInterval(() => {
      setRevealedLines((prev) => {
        if (prev < maxLines) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [currentPage, isOpen, maxLines]);

  if (!isOpen) return null;

  const handleFastForward = () => {
    if (revealedLines < maxLines) {
      setRevealedLines(maxLines);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060a08]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto">
      {/* Background Container with Warring States Bronze Corner Linework (图4设计) */}
      <BronzeCornerPlaque
        className="relative w-full max-w-2xl bg-[#16221e]/98 p-6 sm:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.95)] animate-fade-in my-auto cursor-pointer"
        onClick={handleFastForward}
        title={revealedLines < maxLines ? "点击可立即显示本页全文" : ""}
      >
        {/* Close Button Top Right */}
        <button
          id="story-modal-close"
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onClose();
          }}
          className="absolute top-2 right-2 z-40 p-1.5 rounded-sm bg-[#111916]/90 border border-[#3b554b] text-[#7bb39d] hover:text-[#ffd885] hover:border-[#dfba73] transition-colors cursor-pointer shadow-sm active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title Section */}
        <div className="text-center mb-5">
          <div className="inline-block px-3 py-0.5 rounded-sm bg-[#111916] border border-[#dfba73] text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
            ❖ 故 事 简 介 ❖
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#f5efe3] tracking-[0.3em] drop-shadow-sm">
            {currentPage === 1 ? '剑 心 破 碎' : '启 程 问 剑'}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1 text-[#dfba73]">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#dfba73]" />
            <span className="text-xs text-[#dfba73]">❖</span>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#dfba73]" />
          </div>
        </div>

        {/* Narrative Content */}
        <div className="w-full min-h-[200px] flex flex-col justify-center text-left">
          {currentPage === 1 && (
            <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed tracking-wide">
              <p className={`transition-all duration-1000 ease-out transform ${revealedLines >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                半生炉火，千锤百炼。
              </p>
              <p className={`transition-all duration-1000 ease-out transform ${revealedLines >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                干将曾以为，剑越锋利，便越接近铸剑的极致。
              </p>
              <p className={`transition-all duration-1000 ease-out transform ${revealedLines >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                直到亲眼看见自己所铸之剑染上鲜血，他第一次开始怀疑：
              </p>
              <p className={`font-serif font-bold text-base sm:text-lg text-[#ffd885] py-0.5 tracking-wider transition-all duration-1000 ease-out transform ${revealedLines >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                “我铸了一辈子的剑，到底是在守护人，还是在杀人？”
              </p>
              <p className={`font-bold text-[#7bb39d] transition-all duration-1000 ease-out transform ${revealedLines >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                自此，炉火熄灭，剑心破碎。
              </p>
            </div>
          )}

          {currentPage === 2 && (
            <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed tracking-wide">
              <p className={`transition-all duration-1000 ease-out transform ${revealedLines >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                许久之后，干将重新背起长剑，踏上问剑之旅。
              </p>
              <p className={`transition-all duration-1000 ease-out transform ${revealedLines >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                前路之上，五段因剑而起的故事正等待着他——
              </p>
              <div className={`py-0.5 transition-all duration-1000 ease-out transform ${revealedLines >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <span className="font-bold text-[#ffd885] tracking-wider bg-[#1f2f29] border border-[#dfba73]/40 px-3 py-1 rounded-[3px] inline-block shadow-sm text-xs sm:text-sm">
                  雪夜炊烟 · 剑问圣人 · 烈风之断 · 空谷之兽 · 孤山挂剑
                </span>
              </div>
              <p className={`transition-all duration-1000 ease-out transform ${revealedLines >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                五段相遇，五次抉择。<br />
                他要寻找的，不是一柄更锋利的剑，<br />
                而是一个答案——
              </p>
              <p className={`text-base sm:text-lg md:text-xl font-bold text-[#ffd885] tracking-widest pt-1 transition-all duration-1000 ease-out transform ${revealedLines >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                人，究竟为何持剑？
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions inside Modal */}
        <div className="mt-5 pt-3 flex items-center justify-between border-t border-[#3b554b]">
          {currentPage === 2 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                setCurrentPage(1);
              }}
              className="flex items-center gap-1 text-xs sm:text-sm font-serif font-bold text-[#7bb39d] hover:text-[#ffd885] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一页</span>
            </button>
          ) : (
            <div className="text-xs font-serif text-[#7bb39d] font-bold">
              {revealedLines < maxLines ? '❖ 慢读品悟中...' : '第 1 / 2 页'}
            </div>
          )}

          {currentPage === 1 ? (
            <BronzeFiligreeButton
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                setCurrentPage(2);
              }}
              variant="gold"
              size="sm"
              rightOrnament={<ChevronRight className="w-3.5 h-3.5" />}
            >
              <span>翻阅下卷</span>
            </BronzeFiligreeButton>
          ) : (
            <BronzeFiligreeButton
              onClick={(e) => {
                e.stopPropagation();
                sound.playVirtueChime();
                onClose();
              }}
              variant="gold"
              size="sm"
              rightOrnament={<Compass className="w-3.5 h-3.5" />}
            >
              <span>启程问剑</span>
            </BronzeFiligreeButton>
          )}
        </div>
      </BronzeCornerPlaque>
    </div>
  );
};
