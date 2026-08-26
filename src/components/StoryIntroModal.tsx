import React from 'react';
import { sound } from '../audio';
import { X, BookOpen, Feather } from 'lucide-react';

interface StoryIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryIntroModal: React.FC<StoryIntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0e1512] border border-[#3b554b] rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.95)] p-6 sm:p-8 overflow-y-auto">
        {/* Bronze Inset Border & Corner Rivets */}
        <div className="absolute inset-1.5 border border-[#dfba73]/20 pointer-events-none z-0" />
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#dfba73]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#dfba73]" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#dfba73]" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#dfba73]" />

        {/* Close Button */}
        <button
          id="story-modal-close"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#c7beaf] hover:text-[#ffd885] hover:border-[#dfba73] transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Values Banner */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#16221e] border border-[#b83a2d] text-[#e65a4b] text-xs font-serif mb-2">
            <Feather className="w-3.5 h-3.5" />
            <span>◇ 剑道核心宏旨 ◇</span>
          </div>
          <blockquote className="text-sm sm:text-base font-serif text-[#ffd885] font-semibold leading-relaxed bg-[#131d19] p-3.5 rounded-sm border border-[#2e473d] shadow-inner">
            “剑由铁铸，心由德成；五德存于心，方知手中之剑为何而出。”
          </blockquote>
        </div>

        {/* Story Summary Section */}
        <div className="mb-5 space-y-2.5">
          <h3 className="text-sm sm:text-base font-serif font-bold text-[#dfba73] flex items-center gap-2 border-b border-[#2b3e36] pb-2">
            <BookOpen className="w-4 h-4 text-[#7bb39d]" />
            <span>【 故事溯源 · 问剑九州 】</span>
          </h3>
          <p className="text-xs sm:text-sm font-serif text-[#d8cbb8] leading-relaxed">
            半生炉火，千锤百炼。干将曾以为，剑越锋利，便越接近铸剑的极致。直到亲眼看见自己所铸之剑染上鲜血，他第一次开始怀疑：
          </p>
          <p className="text-xs sm:text-sm font-serif text-[#ffd885] italic pl-3 border-l-2 border-[#d64d3e] my-2 bg-[#131d19] p-2">
            “我铸了一辈子的剑，到底是在守护人，还是在杀人？”
          </p>
          <p className="text-xs sm:text-sm font-serif text-[#d8cbb8] leading-relaxed">
            自此，炉火熄灭，剑心破碎。许久之后，干将重新背起长剑，踏上问剑之旅。前路之上，五段因剑而起的故事正等待着他——
          </p>
          <div className="p-2.5 rounded-sm bg-[#131d19] text-xs font-serif text-[#dfba73] text-center border border-[#2b3e36] tracking-widest">
            ◈ 雪夜炊烟 ◈ 剑问圣人 ◈ 烈风之断 ◈ 空谷之兽 ◈ 孤山挂剑 ◈
          </div>
        </div>

        {/* Gameplay Summary Section */}
        <div className="mb-5 space-y-2.5">
          <h3 className="text-sm sm:text-base font-serif font-bold text-[#dfba73] flex items-center gap-2 border-b border-[#2b3e36] pb-2">
            <span className="text-[#d64d3e]">◆</span>
            <span>【 试炼剑意 · 刚柔舞韵 】</span>
          </h3>
          <p className="text-xs sm:text-sm font-serif text-[#d8cbb8] leading-relaxed">
            从识剑、持剑到出剑，在一次次点击、滑动、蓄力、判断与闪避中，体会如何控制力量，如何圆柔进退，也学会在面对不义与困境时，坚守自己的选择与承诺。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
            <div className="p-2.5 rounded-sm bg-[#131d19] border border-[#2b3e36] text-[#d8cbb8]">
              <strong className="text-[#ffd885]">◇ 知进退：</strong>知道何时出剑，何时收剑
            </div>
            <div className="p-2.5 rounded-sm bg-[#131d19] border border-[#2b3e36] text-[#d8cbb8]">
              <strong className="text-[#7bb39d]">◇ 刚柔并济：</strong>何时以刚破局，何时以柔化力
            </div>
          </div>
          <p className="text-xs font-serif text-[#9ab3a6] pt-1">
            五段旅程对应五种德性：<strong className="text-[#ffd885]">仁 · 礼 · 义 · 智 · 信</strong>。每完成一段历练，便点亮一德，也补全一分破碎的剑心。
          </p>
        </div>

        {/* Footer Button */}
        <div className="text-center pt-2 border-t border-[#2b3e36]">
          <button
            id="story-modal-confirm"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-8 py-2 rounded-sm bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] hover:text-[#fff] transition-all text-xs sm:text-sm font-serif shadow-lg cursor-pointer active:scale-95"
          >
            领悟剑道 · 开始探索
          </button>
        </div>
      </div>
    </div>
  );
};

