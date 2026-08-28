import React, { useState } from 'react';
import { VirtueState, VirtueId, SwordTechnique } from '../types';
import { sound } from '../audio';
import { X, BookOpen, Bookmark, Award, Feather, Lock, Play } from 'lucide-react';
import { VideoModal } from './VideoModal';

interface JianghuManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  virtues: Record<VirtueId, VirtueState>;
}

interface VirtueBookmarkDetail {
  id: VirtueId;
  name: string; // 仁、礼、义、智、信
  fullName: string;
  location: string;
  theme: string;
  summary: string;
  epiphanyPoem: string;
  swordMantra: string;
  craftInsight: string;
  color: string;
}

export const JianghuManualModal: React.FC<JianghuManualModalProps> = ({
  isOpen,
  onClose,
  virtues,
}) => {
  // Tabs: REALM (侠客·剑修境界), BOOKMARK (五德·感悟书签), MANUAL (问剑·剑谱绝学)
  const [activeTab, setActiveTab] = useState<'REALM' | 'BOOKMARK' | 'MANUAL'>('REALM');
  const [selectedBookmarkVirtue, setSelectedBookmarkVirtue] = useState<VirtueId>('REN');
  const [selectedTech, setSelectedTech] = useState<number>(0);
  const [practicingTech, setPracticingTech] = useState<SwordTechnique | null>(null);

  if (!isOpen) return null;

  const unlockedCount = (Object.values(virtues) as VirtueState[]).filter(v => v.unlocked).length;

  // 五德感悟心得书签库
  const virtueBookmarks: VirtueBookmarkDetail[] = [
    {
      id: 'REN',
      name: '仁',
      fullName: '仁 · 雪夜炊烟',
      location: '姑苏水乡 · 寒舍草庐',
      theme: '以仁御锋 · 残剑生温',
      summary: '长夜风雪，见妇孺饥寒交迫。干将取折断之残剑为斧，断枯木为柴，燃起草庐温饱炊烟。',
      epiphanyPoem: '残铁断刃亦有情，雪夜炊烟化甘霖。世间百工皆利器，唯怀慈心始通明。',
      swordMantra: '“剑不为戕害，而为护佑生息。心存一念善，顽铁自生温。”',
      craftInsight: '剑锋无仁暴之别，系于持剑者之心。以仁爱融贯，折剑亦足以为天下御寒。',
      color: '#5cb87a',
    },
    {
      id: 'LI',
      name: '礼',
      fullName: '礼 · 剑问圣人',
      location: '曲阜圣坛 · 古柏幽观',
      theme: '收锋守礼 · 敬意归心',
      summary: '入齐鲁圣坛问剑于大儒。干将悟得敬畏之道，敛刃入鞘，深施一揖，以礼驭锋。',
      epiphanyPoem: '古柏森森圣德崇，敛锋入鞘拜长风。君子行藏知止进，礼序端方天地融。',
      swordMantra: '“忠以为质，仁以为卫。出锋易，敛锋难；知止守礼，方成君子之剑。”',
      craftInsight: '剑之形制，锋芒内敛为上。不知礼节进退，则剑必伤己。',
      color: '#dfba73',
    },
    {
      id: 'YI',
      name: '义',
      fullName: '义 · 烈风之断',
      location: '吴都繁市 · 闹市街坊',
      theme: '当为则为 · 仗剑卫道',
      summary: '恶霸横行凌虐老弱，干将仗剑而起，疾风掣电断其凶刃，平息市井喧嚣。',
      epiphanyPoem: '狂澜疾走破长街，浩气横空扫阴霾。仗剑何须论生死，浩然丹魄自崔巍。',
      swordMantra: '“见义不为，无勇也；当为则为，仗剑直指，虽千万人吾往矣。”',
      craftInsight: '铸剑以金玉为心，正如行义于世，断金碎玉，浩气贯通剑髓。',
      color: '#d64d3e',
    },
    {
      id: 'ZHI',
      name: '智',
      fullName: '智 · 空谷之兽',
      location: '青崖幽壑 · 绝壁危谷',
      theme: '以智破妄 · 洞察克敌',
      summary: '深谷凶兽皮坚力沉。干将不与蛮斗，观其势、避其锋，以灵巧妙招化劲降伏。',
      epiphanyPoem: '千钧蛮力吼空谷，凌波化劲避锋芒。观变洞明玄妙理，智巧何须动干戈。',
      swordMantra: '“以柔克刚，避实击虚。水善利万物而不争，心若明镜，万象皆破。”',
      craftInsight: '刚极必折，柔极必靡。以智铸剑知淬火之候；以智驭剑知虚实进退。',
      color: '#66a3d2',
    },
    {
      id: 'XIN',
      name: '信',
      fullName: '信 · 孤山挂剑',
      location: '孤山千仞 · 云巅绝壁',
      theme: '履信守诺 · 挂剑立本',
      summary: '登临孤山践昔日挚友白云之约。干将解下佩剑挂于千仞古松之上，万古长青。',
      epiphanyPoem: '千仞危崖抚白云，故人一诺重千钧。松梢挂剑知音杳，万古苍茫照素心。',
      swordMantra: '“人无信不立，剑无信不真。一诺重于泰山，挂剑全信，归于平淡。”',
      craftInsight: '熔金炼魄非至诚不能聚；千锤百炼非至信不能成。信者，万剑之魂也。',
      color: '#f5efe3',
    },
  ];

  // Swordsman Realm titles based on progress
  const realmTitles = [
    { level: 0, title: '初涉江湖 · 铸剑求道', desc: '尘封炉火，背负残剑，叩问持剑之初心。' },
    { level: 1, title: '剑心微明 · 仁者无敌', desc: '领悟以仁御锋，残铁亦能化雪夜炊烟。' },
    { level: 2, title: '知礼守节 · 君子剑客', desc: '以忠为质，以礼敬人，收锋胜于出锋。' },
    { level: 3, title: '浩然正气 · 侠骨丹心', desc: '当为则为，仗义除恶，玉魂贯通剑脉。' },
    { level: 4, title: '心如明镜 · 运筹帷幄', desc: '刚柔相济，洞察机变，以智御千钧蛮力。' },
    { level: 5, title: '五德圆融 · 万剑归一', desc: '履信守诺，天人合一，终铸绝世仁剑！' },
  ];

  const currentRealm = realmTitles[unlockedCount] || realmTitles[0];

  // Six martial sword techniques
  const techniques: (SwordTechnique & { videoSrc: string })[] = [
    {
      id: 'TECH_1',
      name: '仁剑 · 残火温刃',
      virtueId: 'REN',
      stance: '第一式 · 引火入剑',
      mantra: '“剑不为戕害，而为护佑生息。心存一念善，顽铁化甘霖。”',
      effect: '锻直残身，削木生暖，化杀伐兵刃为救世慈光。',
      unlocked: virtues.REN?.unlocked || false,
      icon: '🪵',
      videoSrc: 'assets/video/tech_1_ren.mp4',
    },
    {
      id: 'TECH_2',
      name: '礼剑 · 虚怀敛锋',
      virtueId: 'LI',
      stance: '第二式 · 抱剑作揖',
      mantra: '“忠以为质，仁以为卫，何持剑乎？收锋敛刃，方见君子。”',
      effect: '克制杀心，依礼受剑，以德化敌于无形。',
      unlocked: virtues.LI?.unlocked || false,
      icon: '🥋',
      videoSrc: 'assets/video/tech_2_li.mp4',
    },
    {
      id: 'TECH_3',
      name: '义剑 · 烈风破煞',
      virtueId: 'YI',
      stance: '第三式 · 龙吟惊风',
      mantra: '“不平则鸣，当断则断。剑格嵌玉，浩气凛然天地间。”',
      effect: '迅捷劈刺，破击街霸，卫弱小于危难。',
      unlocked: virtues.YI?.unlocked || false,
      icon: '⚡',
      videoSrc: 'assets/video/tech_3_yi.mp4',
    },
    {
      id: 'TECH_4',
      name: '智剑 · 凌波化劲',
      virtueId: 'ZHI',
      stance: '第四式 · 顺势制变',
      mantra: '“以柔克刚，避实击虚。静观其变，伺隙而动。”',
      effect: '研习剑理五势，智破山岳巨兽之蛮力。',
      unlocked: virtues.ZHI?.unlocked || false,
      icon: '🌊',
      videoSrc: 'assets/video/tech_4_zhi.mp4',
    },
    {
      id: 'TECH_5',
      name: '信剑 · 绝顶挂剑',
      virtueId: 'XIN',
      stance: '第五式 · 凌虚御风',
      mantra: '“一诺重千斤，生死不相违。功成挂长剑，归隐白云巅。”',
      effect: '千仞绝壁如履平地，履昔日故人之约。',
      unlocked: virtues.XIN?.unlocked || false,
      icon: '🏔️',
      videoSrc: 'assets/video/tech_5_xin.mp4',
    },
    {
      id: 'TECH_6',
      name: '终式 · 天地仁锋',
      virtueId: 'FINAL',
      stance: '绝学 · 五德归一',
      mantra: '“仁以持心，礼以循序，义以决断，智以破妄，信以立本。”',
      effect: '重燃天地造化铸剑炉，天地清明，万物生光。',
      unlocked: unlockedCount >= 5,
      icon: '✨',
      videoSrc: 'assets/video/tech_6_final.mp4',
    },
  ];

  const handleTestStance = () => {
    sound.playSwordDraw();
    setTimeout(() => {
      sound.playGuqinStrum();
    }, 200);
  };

  const handlePracticeVideo = (tech: SwordTechnique & { videoSrc: string }) => {
    sound.playSwordDraw();
    setPracticingTech(tech);
  };

  const currentBookmark = virtueBookmarks.find(b => b.id === selectedBookmarkVirtue) || virtueBookmarks[0];
  const isCurrentBookmarkUnlocked = virtues[currentBookmark.id]?.unlocked;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none">
      {/* Video Modal for Technique Practice Demo */}
      {practicingTech && (
        <VideoModal
          videoSrc={practicingTech.videoSrc || 'assets/video/tech_demo.mp4'}
          title={`【 绝学演练 】${practicingTech.name}`}
          subtitle={`${practicingTech.stance} · ${practicingTech.mantra}`}
          durationSeconds={5}
          onComplete={() => setPracticingTech(null)}
        />
      )}

      <div className="relative w-full max-w-3xl bg-[#0e1512] border border-[#3b554b] rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.98)] p-3.5 sm:p-5 flex flex-col justify-between max-h-[94vh]">
        
        {/* Bronze Inset Border & Corner Rivets */}
        <div className="absolute inset-1.5 border border-[#dfba73]/20 pointer-events-none z-0" />
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#dfba73]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#dfba73]" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#dfba73]" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#dfba73]" />

        {/* Top Bar with Title & Close */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2b3e36] pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[#ffd885] text-base">◇</span>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#f5efe3] tracking-widest flex items-center gap-2">
                <span>【 我的闯关 】</span>
              </h2>
              <p className="text-[11px] font-serif text-[#7bb39d] tracking-wider">
                佩剑「干将」· 问剑春秋 · 研习古谱绝学与五德感悟心得
              </p>
            </div>
          </div>

          <button
            id="manual-modal-close"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#c7beaf] hover:text-[#ffd885] hover:border-[#dfba73] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Tab Navigation Ordered: 侠客·剑修境界 ➔ 五德·感悟书签 ➔ 问剑·剑谱绝学 */}
        <div className="relative z-10 flex gap-2 mb-2.5">
          {/* Tab 1: 侠客·剑修境界 */}
          <button
            id="manual-tab-realm"
            onClick={() => {
              sound.playClick();
              setActiveTab('REALM');
            }}
            className={`flex-1 py-1.5 rounded-sm font-serif text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'REALM'
                ? 'bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                : 'bg-[#131d19] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>侠客·剑修境界</span>
          </button>

          {/* Tab 2: 五德·感悟书签 */}
          <button
            id="manual-tab-bookmark"
            onClick={() => {
              sound.playClick();
              setActiveTab('BOOKMARK');
            }}
            className={`flex-1 py-1.5 rounded-sm font-serif text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'BOOKMARK'
                ? 'bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                : 'bg-[#131d19] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>五德·感悟书签</span>
          </button>

          {/* Tab 3: 问剑·剑谱绝学 */}
          <button
            id="manual-tab-manual"
            onClick={() => {
              sound.playClick();
              setActiveTab('MANUAL');
            }}
            className={`flex-1 py-1.5 rounded-sm font-serif text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'MANUAL'
                ? 'bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                : 'bg-[#131d19] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>问剑·剑谱绝学</span>
          </button>
        </div>

        {/* TAB 1: REALM (侠客·剑修境界) */}
        {activeTab === 'REALM' && (
          <div className="relative z-10 space-y-2.5">
            {/* Current Realm Card */}
            <div className="p-3 sm:p-4 rounded-sm bg-[#131d19] border border-[#3b554b] text-center relative overflow-hidden">
              <div className="inline-block px-2.5 py-0.5 rounded-sm bg-[#16221e] border border-[#b83a2d] text-[#e65a4b] text-[11px] font-serif mb-1 tracking-widest font-bold">
                ◇ 当前剑修境界 ◇
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#ffd885] mb-1 tracking-wide">
                {currentRealm.title}
              </h3>
              <p className="text-xs font-serif text-[#d8cbb8] max-w-md mx-auto leading-relaxed">
                {currentRealm.desc}
              </p>

              {/* Sword Qi Progress Meter */}
              <div className="mt-2.5 max-w-md mx-auto">
                <div className="flex justify-between text-[11px] font-serif text-[#7bb39d] mb-1">
                  <span>剑意修为 / 春秋历练</span>
                  <span className="text-[#ffd885] font-bold">{unlockedCount * 20}% （{unlockedCount}/5 德）</span>
                </div>
                <div className="w-full h-2 bg-[#0e1512] border border-[#2b3e36] rounded-sm p-0.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3b554b] via-[#dfba73] to-[#ffd885] rounded-sm transition-all duration-500 shadow-[0_0_8px_#ffd885]"
                    style={{ width: `${Math.max(5, (unlockedCount / 5) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Five Virtues Seals Grid */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {(Object.values(virtues) as VirtueState[]).map(v => (
                <div
                  key={v.id}
                  className={`p-2 rounded-sm border flex flex-col items-center justify-center text-center transition-all ${
                    v.unlocked
                      ? 'bg-[#16221e] border-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.2)]'
                      : 'bg-[#0e1512] border-[#2b3e36] opacity-60'
                  }`}
                >
                  <span className="text-lg sm:text-xl font-serif font-bold" style={{ color: v.unlocked ? '#ffd885' : '#4e6b5f' }}>
                    {v.name}
                  </span>
                  <span className="text-[10px] font-serif text-[#c7beaf] mt-0.5 line-clamp-1">
                    {v.title}
                  </span>
                  <span className="text-[9px] font-mono mt-0.5" style={{ color: v.unlocked ? '#5cb87a' : '#6d8a7e' }}>
                    {v.unlocked ? '● 已圆满' : '○ 待点亮'}
                  </span>
                </div>
              ))}
            </div>

            {/* Swordsman Blade Companion */}
            <div className="p-2.5 sm:p-3 rounded-sm bg-[#131d19] border border-[#2b3e36] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl">🗡️</span>
                <div>
                  <div className="text-xs font-serif font-bold text-[#ffd885] flex items-center gap-1.5">
                    <span>佩剑 ·「干将·仁锋」</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-[#16221e] text-[#5cb87a] border border-[#5cb87a]/40 font-serif">
                      灵性已通
                    </span>
                  </div>
                  <p className="text-[11px] font-serif text-[#9ab3a6] mt-0.5">
                    名匠手作，历经烈火、重锤、寒石开刃与五德洗礼，藏锋于鞘，威而不露。
                  </p>
                </div>
              </div>

              <button
                onClick={handleTestStance}
                className="shrink-0 px-2.5 py-1 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#ffd885] text-xs font-serif transition-all cursor-pointer active:scale-95"
              >
                拨剑抚弦 🎶
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKMARK (五德·感悟书签 · 紧凑精致·无滚动条一览全貌) */}
        {activeTab === 'BOOKMARK' && (
          <div className="relative z-10 space-y-2">
            {/* Top Bookmark Selectors */}
            <div className="flex items-center justify-between p-1.5 rounded-sm bg-[#131d19] border border-[#2b3e36]">
              <div className="text-xs font-serif text-[#ffd885] flex items-center gap-1 font-bold">
                <Feather className="w-3 h-3 text-[#7bb39d]" />
                <span>点选书签：</span>
              </div>

              <div className="flex gap-1.5">
                {virtueBookmarks.map(b => {
                  const isUnlocked = virtues[b.id]?.unlocked;
                  const isSelected = selectedBookmarkVirtue === b.id;

                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        sound.playSwordSlash();
                        setSelectedBookmarkVirtue(b.id);
                      }}
                      className={`px-2.5 py-0.5 rounded-sm text-xs font-serif transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_8px_rgba(197,160,89,0.4)] font-bold scale-105'
                          : 'bg-[#0e1512] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
                      }`}
                    >
                      <span className="font-serif font-bold text-xs" style={{ color: isUnlocked ? b.color : '#6d8a7e' }}>
                        {b.name}
                      </span>
                      <span className="text-[9px] hidden sm:inline opacity-80">
                        {isUnlocked ? '已悟' : '待悟'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Classical Compact Bookmark Paper Layout (No Scrolling Needed) */}
            <div className="relative p-3 rounded-sm bg-[#ede6d8] border border-[#3b554b] shadow-[inset_0_0_20px_rgba(20,30,26,0.15)] text-[#1a2621] overflow-hidden">
              <div className="absolute inset-1 border border-[#3b554b]/20 pointer-events-none" />

              {isCurrentBookmarkUnlocked ? (
                /* Unlocked State: Compact Two-Column Bookmarking */
                <div className="flex flex-row items-center gap-3">
                  {/* Left Main Content (68%) */}
                  <div className="flex-1 space-y-1.5 text-left">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#cfc5b3] pb-1">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-5 h-5 rounded-sm flex items-center justify-center font-serif text-xs text-white font-bold shadow-sm"
                          style={{ backgroundColor: currentBookmark.color }}
                        >
                          {currentBookmark.name}
                        </div>
                        <h4 className="font-serif font-bold text-sm text-[#1a2621] tracking-wider">
                          {currentBookmark.fullName}
                        </h4>
                        <span className="text-[10px] font-serif text-[#5e776d] hidden sm:inline">
                          ({currentBookmark.location})
                        </span>
                      </div>

                      <span className="px-1.5 py-0.2 rounded-sm text-[10px] font-serif font-bold bg-[#20312a] text-[#ffd885]">
                        已悟剑道
                      </span>
                    </div>

                    {/* Summary */}
                    <div className="text-[11px] font-serif leading-tight text-[#2c3d36]">
                      <strong className="text-[#b83a2d]">【问剑历练】：</strong>
                      {currentBookmark.summary}
                    </div>

                    {/* Craft Insight */}
                    <div className="text-[11px] font-serif leading-tight text-[#2c3d36] p-1.5 rounded-sm bg-[#e2d8c5] border border-[#cfc4b0]">
                      <strong className="text-[#3b554b]">【名匠铸道】：</strong>
                      {currentBookmark.craftInsight}
                    </div>

                    {/* Mantra */}
                    <div className="text-[11px] font-serif text-[#8a2217] italic leading-tight">
                      {currentBookmark.swordMantra}
                    </div>
                  </div>

                  {/* Right Classical Bookmark Ribbon (32% - Compact Vertical Aesthetic) */}
                  <div className="w-28 sm:w-32 shrink-0 bg-[#faf6ed] border border-[#3b554b]/60 rounded-sm p-2 shadow-sm flex flex-col items-center justify-between relative min-h-[145px]">
                    {/* Top Ribbon Cinnabar Tag */}
                    <div className="w-4 h-2 bg-[#b83a2d] -mt-2 rounded-b-sm shadow-xs" />

                    {/* Theme */}
                    <div className="text-center font-serif font-bold text-[11px] text-[#b83a2d] tracking-widest border-b border-[#dfba73]/40 pb-1 w-full">
                      {currentBookmark.theme}
                    </div>

                    {/* Poem in Compact Vertical Flow */}
                    <div className="font-serif text-[10px] text-[#2c3d36] tracking-wider leading-snug text-center my-1">
                      {currentBookmark.epiphanyPoem}
                    </div>

                    {/* Seal */}
                    <div className="w-5 h-5 rounded-sm bg-[#b83a2d] border border-[#8a2217] flex items-center justify-center text-[#faf6ed] text-[9px] font-serif font-bold shadow-xs">
                      {currentBookmark.name}
                    </div>
                  </div>
                </div>
              ) : (
                /* Locked State: Compact & Informative */
                <div className="py-4 flex flex-col items-center justify-center text-center space-y-1.5 max-w-md mx-auto">
                  <div className="w-8 h-8 rounded-full bg-[#20312a]/10 border border-[#3b554b] flex items-center justify-center">
                    <Lock className="w-4 h-4 text-[#3b554b]" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#111916] tracking-wider">
                    【 封 锁 · 待 悟 玄 机 】
                  </h4>
                  <p className="text-[11px] font-serif text-[#4e6b5f] leading-snug">
                    此卷书签封存着「{currentBookmark.name}」之剑德心得与名匠手记。少侠需先通关「{currentBookmark.fullName}」试炼方可解封研读。
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MANUAL (问剑·剑谱绝学) */}
        {activeTab === 'MANUAL' && (
          <div className="relative z-10 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {/* Left Column: Technique List */}
              <div className="md:col-span-1 space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                {techniques.map((tech, idx) => (
                  <button
                    key={tech.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedTech(idx);
                    }}
                    className={`w-full p-1.5 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedTech === idx
                        ? 'bg-[#20312a] border-[#c5a059] text-[#ffd885] shadow-[0_0_10px_rgba(197,160,89,0.3)]'
                        : 'bg-[#131d19] border-[#2b3e36] text-[#c7beaf] hover:border-[#3b554b]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{tech.icon}</span>
                      <span className="text-xs font-serif font-bold line-clamp-1">{tech.name}</span>
                    </div>
                    {tech.unlocked ? (
                      <span className="text-[10px] text-[#5cb87a] font-serif">已悟</span>
                    ) : (
                      <span className="text-[10px] text-[#6d8a7e] font-serif flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> 待解
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Right Column: Selected Technique Detail */}
              <div className="md:col-span-2 p-3 rounded-sm bg-[#131d19] border border-[#3b554b] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#2b3e36] pb-1.5 mb-2">
                    <div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-[#ffd885]">
                        {techniques[selectedTech].name}
                      </h4>
                      <span className="text-[11px] font-serif text-[#7bb39d]">
                        {techniques[selectedTech].stance}
                      </span>
                    </div>
                    <span className="text-xl">{techniques[selectedTech].icon}</span>
                  </div>

                  <div className="p-2 rounded-sm bg-[#0e1512] border border-[#2b3e36] mb-2">
                    <div className="text-[10px] text-[#d64d3e] font-serif font-bold mb-0.5">【 心法口诀 】</div>
                    <p className="text-xs font-serif text-[#f5efe3] italic leading-snug">
                      {techniques[selectedTech].mantra}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#ffd885] font-serif font-bold mb-0.5">【 剑意玄机 】</div>
                    <p className="text-xs font-serif text-[#d8cbb8] leading-snug">
                      {techniques[selectedTech].effect}
                    </p>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-[#2b3e36] flex items-center justify-between">
                  <span className="text-[11px] font-serif text-[#7bb39d]">
                    {techniques[selectedTech].unlocked
                      ? '✦ 剑诀已随心而运 ✦'
                      : '🔒 需通关相应五德试炼以参悟'}
                  </span>

                  <button
                    onClick={() => handlePracticeVideo(techniques[selectedTech])}
                    className="px-3 py-1 rounded-sm bg-[#1e2e27] border border-[#c5a059] hover:border-white text-[#ffd885] hover:text-white text-xs font-serif transition-all cursor-pointer active:scale-95 flex items-center gap-1 shadow-sm"
                  >
                    <Play className="w-3 h-3 fill-[#ffd885]" />
                    <span>演练招式 🎬</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Confirm */}
        <div className="relative z-10 text-center pt-2.5 border-t border-[#2b3e36] mt-2">
          <button
            id="manual-modal-confirm"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-1.5 rounded-sm bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] hover:text-[#fff] transition-all text-xs sm:text-sm font-serif shadow-md cursor-pointer active:scale-95"
          >
            合上卷轴 · 继续问剑
          </button>
        </div>
      </div>
    </div>
  );
};
