import React, { useState } from 'react';
import { VirtueState, VirtueId, SwordTechnique } from '../types';
import { sound } from '../audio';
import { X, BookOpen, Bookmark, Award, Feather, Swords, Lock, Play } from 'lucide-react';
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
  // Tabs: MANUAL (问剑绝学剑谱), BOOKMARK (五德感悟书签), REALM (侠客剑修境界)
  const [activeTab, setActiveTab] = useState<'MANUAL' | 'BOOKMARK' | 'REALM'>('MANUAL');
  const [selectedBookmarkVirtue, setSelectedBookmarkVirtue] = useState<VirtueId>('REN');
  const [selectedTech, setSelectedTech] = useState<number>(0);
  const [practicingTech, setPracticingTech] = useState<SwordTechnique | null>(null);

  if (!isOpen) return null;

  const unlockedCount = (Object.values(virtues) as VirtueState[]).filter(v => v.unlocked).length;

  // 五德感悟心得书签库（竖排古风书法质感展示）
  const virtueBookmarks: VirtueBookmarkDetail[] = [
    {
      id: 'REN',
      name: '仁',
      fullName: '仁 · 雪夜炊烟',
      location: '姑苏水乡 · 寒舍草庐',
      theme: '【 以仁御锋 · 残剑生温 】',
      summary: '于风雪长夜之中，见妇孺饥寒交迫。干将取折断之残剑，以刃为斧，断枯木为薪柴，燃起草庐中温暖炊烟。',
      epiphanyPoem: '残铁断刃亦有情，雪夜炊烟化甘霖。世间百工皆利器，唯怀慈心始通明。',
      swordMantra: '“剑不为戕害，而为护佑生息。心存一念善，顽铁自生温。”',
      craftInsight: '剑锋本无仁暴之别，系于持剑者之心。断剑之折，非刚之过，乃戾气所摧；若以仁爱融贯，折剑亦足以为天下御寒。',
      color: '#5cb87a',
    },
    {
      id: 'LI',
      name: '礼',
      fullName: '礼 · 剑问圣人',
      location: '曲阜圣坛 · 古柏幽观',
      theme: '【 收锋守礼 · 敬意归心 】',
      summary: '入齐鲁圣坛，问剑于礼乐大儒。剑客拔剑求试，圣人垂目以待。干将悟得敬畏之道，敛刃入鞘，深施一揖。',
      epiphanyPoem: '古柏森森圣德崇，敛锋入鞘拜长风。君子行藏知止进，礼序端方天地融。',
      swordMantra: '“忠以为质，仁以为卫。出锋易，敛锋难；知止守礼，方成君子之剑。”',
      craftInsight: '剑之形制，锋芒内敛为上。凡剑之利，不可极尽；凡剑之威，必依礼而发。不知礼节进退，则剑必伤己。',
      color: '#dfba73',
    },
    {
      id: 'YI',
      name: '义',
      fullName: '义 · 烈风之断',
      location: '吴都繁市 · 闹市街坊',
      theme: '【 当为则为 · 仗剑卫道 】',
      summary: '吴市繁华，却有恶霸横行凌虐老弱。市人侧目避祸，干将仗剑而起，疾风掣电，斩断恶煞手中凶刃，平息市井喧嚣。',
      epiphanyPoem: '狂澜疾走破长街，浩气横空扫阴霾。仗剑何须论生死，浩然丹魄自崔巍。',
      swordMantra: '“见义不为，无勇也；当为则为，仗剑直指，虽千万人吾往矣。”',
      craftInsight: '剑之骨节如玉，需坚不可摧。铸剑以金玉为心，正如行义于世，见恶不退，断金碎玉，以浩然正气贯通剑髓。',
      color: '#d64d3e',
    },
    {
      id: 'ZHI',
      name: '智',
      fullName: '智 · 空谷之兽',
      location: '青崖幽壑 · 绝壁危谷',
      theme: '【 以智破妄 · 洞察克敌 】',
      summary: '深谷凶兽咆哮，皮坚若磐石，力拔千钧。干将不与蛮斗，观其势、辨其隙，凌虚步法，顺势化劲，以灵巧妙招降伏巨兽。',
      epiphanyPoem: '千钧蛮力吼空谷，凌波化劲避锋芒。观变洞明玄妙理，智巧何须动干戈。',
      swordMantra: '“以柔克刚，避实击虚。水善利万物而不争，心若明镜，万象皆破。”',
      craftInsight: '剑理通乎天地变化，刚极必折，柔极必靡。以智铸剑，知刚柔淬火之候；以智驭剑，知虚实进退之机。',
      color: '#66a3d2',
    },
    {
      id: 'XIN',
      name: '信',
      fullName: '信 · 孤山挂剑',
      location: '孤山千仞 · 云巅绝壁',
      theme: '【 履信守诺 · 挂剑立本 】',
      summary: '登临孤山绝顶，践昔日与挚友白云之约。功名利禄皆如过眼云烟，干将解下佩剑，挂于千仞古松之上，浩气长存。',
      epiphanyPoem: '千仞危崖抚白云，故人一诺重千钧。松梢挂剑知音杳，万古苍茫照素心。',
      swordMantra: '“人无信不立，剑无信不真。一诺重于泰山，挂剑全信，归于平淡。”',
      craftInsight: '剑性最真，誓言不违。熔金炼魄，非至诚不能聚；千锤百炼，非至信不能成。信者，五德之宗，万剑之魂也。',
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

  // Six martial sword techniques (with video assets for practice demo)
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none overflow-y-auto">
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

      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0e1512] border border-[#3b554b] rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.98)] p-4 sm:p-6 overflow-y-auto flex flex-col justify-between">
        
        {/* Bronze Inset Border & Corner Rivets */}
        <div className="absolute inset-1.5 border border-[#dfba73]/20 pointer-events-none z-0" />
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#dfba73]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#dfba73]" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#dfba73]" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#dfba73]" />

        {/* Top Bar with Title & Close */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2b3e36] pb-2.5 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[#ffd885] text-lg">◇</span>
            <div>
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#f5efe3] tracking-widest flex items-center gap-2">
                <span>【 江湖秘鉴 · 剑客令 】</span>
              </h2>
              <p className="text-xs font-serif text-[#7bb39d] tracking-wider">
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

        {/* 3 Tab Navigation (问剑绝学剑谱 ➔ 五德感悟书签 ➔ 侠客剑修境界) */}
        <div className="relative z-10 flex gap-2 mb-3">
          {/* Tab 1: 问剑绝学剑谱 */}
          <button
            id="manual-tab-manual"
            onClick={() => {
              sound.playClick();
              setActiveTab('MANUAL');
            }}
            className={`flex-1 py-2 rounded-sm font-serif text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'MANUAL'
                ? 'bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                : 'bg-[#131d19] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#ffd885]" />
            <span>问剑绝学剑谱</span>
          </button>

          {/* Tab 2: 五德感悟书签 (位于剑谱后面) */}
          <button
            id="manual-tab-bookmark"
            onClick={() => {
              sound.playClick();
              setActiveTab('BOOKMARK');
            }}
            className={`flex-1 py-2 rounded-sm font-serif text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'BOOKMARK'
                ? 'bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                : 'bg-[#131d19] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#ffd885]" />
            <span>五德感悟书签</span>
          </button>

          {/* Tab 3: 侠客剑修境界 */}
          <button
            id="manual-tab-realm"
            onClick={() => {
              sound.playClick();
              setActiveTab('REALM');
            }}
            className={`flex-1 py-2 rounded-sm font-serif text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'REALM'
                ? 'bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                : 'bg-[#131d19] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
            }`}
          >
            <Award className="w-4 h-4 text-[#ffd885]" />
            <span>侠客剑修境界</span>
          </button>
        </div>

        {/* TAB: SWORD MANUAL (问剑绝学剑谱) */}
        {activeTab === 'MANUAL' && (
          <div className="relative z-10 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Left Column: Technique List */}
              <div className="md:col-span-1 space-y-2 max-h-[280px] overflow-y-auto pr-1">
                {techniques.map((tech, idx) => (
                  <button
                    key={tech.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedTech(idx);
                    }}
                    className={`w-full p-2.5 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedTech === idx
                        ? 'bg-[#20312a] border-[#c5a059] text-[#ffd885] shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                        : 'bg-[#131d19] border-[#2b3e36] text-[#c7beaf] hover:border-[#3b554b]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{tech.icon}</span>
                      <span className="text-xs font-serif font-bold line-clamp-1">{tech.name}</span>
                    </div>
                    {tech.unlocked ? (
                      <span className="text-[10px] text-[#5cb87a] font-serif">已悟</span>
                    ) : (
                      <span className="text-[10px] text-[#6d8a7e] font-serif flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> 封锁
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Right Column: Selected Technique Detail */}
              <div className="md:col-span-2 p-4 rounded-sm bg-[#131d19] border border-[#3b554b] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#2b3e36] pb-2 mb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#ffd885]">
                        {techniques[selectedTech].name}
                      </h4>
                      <span className="text-xs font-serif text-[#7bb39d]">
                        {techniques[selectedTech].stance}
                      </span>
                    </div>
                    <span className="text-2xl">{techniques[selectedTech].icon}</span>
                  </div>

                  <div className="p-3 rounded-sm bg-[#0e1512] border border-[#2b3e36] mb-3">
                    <div className="text-[11px] text-[#d64d3e] font-serif font-bold mb-1">【 心法口诀 】</div>
                    <p className="text-xs sm:text-sm font-serif text-[#f5efe3] italic leading-relaxed">
                      {techniques[selectedTech].mantra}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] text-[#ffd885] font-serif font-bold mb-1">【 剑意玄机 】</div>
                    <p className="text-xs font-serif text-[#d8cbb8] leading-relaxed">
                      {techniques[selectedTech].effect}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#2b3e36] flex items-center justify-between">
                  <span className="text-xs font-serif text-[#7bb39d]">
                    {techniques[selectedTech].unlocked
                      ? '✦ 剑诀已铭记于胸，随心而运 ✦'
                      : '🔒 需通关相应五德试炼以参悟'}
                  </span>

                  {/* 演练招式按钮：对应跳转出视频资产 */}
                  <button
                    onClick={() => handlePracticeVideo(techniques[selectedTech])}
                    className="px-4 py-1.5 rounded-sm bg-[#1e2e27] border border-[#c5a059] hover:border-white text-[#ffd885] hover:text-white text-xs font-serif transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-[0_0_12px_rgba(197,160,89,0.25)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#ffd885]" />
                    <span>演练招式 🎬</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: BOOKMARK (五德感悟书签 · 仅解锁对应关卡后方显示书签页文字) */}
        {activeTab === 'BOOKMARK' && (
          <div className="relative z-10 space-y-3">
            {/* Top Bookmark Selectors Styled as Classical Bronze Inscribed Ribbons */}
            <div className="flex items-center justify-between p-2 rounded-sm bg-[#131d19] border border-[#2b3e36]">
              <div className="text-xs font-serif text-[#ffd885] flex items-center gap-1.5 font-bold">
                <Feather className="w-3.5 h-3.5 text-[#7bb39d]" />
                <span>点选书签：</span>
              </div>

              <div className="flex gap-1.5 sm:gap-2">
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
                      className={`relative px-2.5 sm:px-4 py-1 rounded-sm text-xs font-serif transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_10px_rgba(197,160,89,0.4)] font-bold scale-105'
                          : 'bg-[#0e1512] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
                      }`}
                    >
                      <span className="font-serif font-bold text-sm" style={{ color: isUnlocked ? b.color : '#6d8a7e' }}>
                        {b.name}
                      </span>
                      <span className="text-[10px] hidden sm:inline">
                        {isUnlocked ? '已悟' : '待解锁'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Classical Silk & Rubbing Stele Canvas */}
            <div className="relative p-4 sm:p-6 rounded-sm bg-[#e8e0d0] border-2 border-[#3b554b] shadow-[inset_0_0_40px_rgba(20,30,26,0.3)] text-[#1a2621] overflow-hidden min-h-[350px] flex flex-col justify-between">
              
              {/* Bronze Inset Border */}
              <div className="absolute inset-1.5 border border-[#3b554b]/30 pointer-events-none" />
              <div className="absolute top-2 left-2 text-[10px] font-serif text-[#4e6b5f] tracking-widest pointer-events-none">
                〖 春秋干将 · 五德金石铭卷 〗
              </div>
              <div className="absolute top-2 right-3 text-[10px] font-serif text-[#4e6b5f] tracking-widest pointer-events-none">
                {isCurrentBookmarkUnlocked ? '● 剑心已彻 · 心得已铭' : '🔒 关卡待破 · 封存未启'}
              </div>

              {/* Conditional Display: Only show text content after unlocking the corresponding level */}
              {isCurrentBookmarkUnlocked ? (
                /* Unlocked State: Full Story, Craft Insights & Vertical Script Calligraphy */
                <div className="my-auto py-2 flex flex-col lg:flex-row items-center justify-between gap-4 animate-fade-in">
                  
                  {/* Left Side: Summary & Insights */}
                  <div className="flex-1 w-full space-y-3 bg-[#f5efe3]/90 p-4 rounded-sm border border-[#c4baa8] shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#cfc5b3] pb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-sm flex items-center justify-center font-serif text-xl text-white font-bold shadow-md"
                          style={{ backgroundColor: currentBookmark.color }}
                        >
                          {currentBookmark.name}
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1a2621] tracking-wider">
                            {currentBookmark.fullName}
                          </h3>
                          <p className="text-[11px] font-serif text-[#4e6b5f]">
                            历练地界：{currentBookmark.location}
                          </p>
                        </div>
                      </div>

                      <div className="px-2 py-0.5 rounded-sm text-xs font-serif font-bold shadow-sm bg-[#20312a] text-[#ffd885]">
                        五德已点亮
                      </div>
                    </div>

                    {/* 故事与悟道梗概 */}
                    <div className="text-xs font-serif leading-relaxed text-[#2c3d36]">
                      <strong className="text-[#b83a2d]">【 问剑历练 】：</strong>
                      {currentBookmark.summary}
                    </div>

                    {/* 铸剑心悟 */}
                    <div className="text-xs font-serif leading-relaxed text-[#2c3d36] p-2.5 rounded-sm bg-[#e8e0d0] border border-[#d2c7b5]">
                      <strong className="text-[#3b554b]">【 名匠铸道心得 】：</strong>
                      {currentBookmark.craftInsight}
                    </div>
                  </div>

                  {/* Right Side: Traditional Vertical Script Stele Rubbing Ribbon */}
                  <div className="w-full lg:w-auto flex items-center justify-center shrink-0">
                    <div className="relative px-6 sm:px-8 py-5 bg-[#faf6ed] border border-[#3b554b] rounded-sm shadow-[0_6px_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-4 sm:gap-6 min-h-[220px]">
                      
                      {/* Cinnabar Seal on Top */}
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-4 bg-[#b83a2d] shadow-sm rounded-t-sm" />

                      {/* Column 1 (Leftmost in RTL): 朱砂印章与落款 */}
                      <div className="flex flex-col items-center justify-between h-full py-1">
                        <div className="w-6 h-6 rounded-sm bg-[#b83a2d] border border-[#8a2217] flex items-center justify-center text-[#faf6ed] text-[10px] font-serif font-bold shadow-sm">
                          {currentBookmark.name}
                        </div>
                        <div className="text-[11px] font-serif text-[#4e6b5f] tracking-widest [writing-mode:vertical-rl] leading-tight my-2">
                          春秋干将手记
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#b83a2d]" />
                      </div>

                      {/* Column 2: 铸剑口诀 */}
                      <div className="font-serif text-xs sm:text-sm text-[#2c3d36] [writing-mode:vertical-rl] tracking-[0.25em] leading-relaxed font-semibold border-r border-[#d2c7b5] pr-2 sm:pr-3 py-1">
                        {currentBookmark.swordMantra}
                      </div>

                      {/* Column 3: 诗偈感悟 */}
                      <div className="font-serif text-sm sm:text-base text-[#111916] [writing-mode:vertical-rl] tracking-[0.3em] leading-loose font-bold border-r border-[#d2c7b5] pr-2 sm:pr-3 py-1 drop-shadow-sm">
                        {currentBookmark.epiphanyPoem}
                      </div>

                      {/* Column 4 (Rightmost in RTL): 主题大字标题 */}
                      <div className="font-serif text-base sm:text-lg text-[#b83a2d] [writing-mode:vertical-rl] tracking-[0.35em] leading-none font-bold py-1">
                        {currentBookmark.theme}
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                /* Locked State: Masked / Sealed Content */
                <div className="my-auto py-6 flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-full bg-[#20312a]/10 border border-[#3b554b] flex items-center justify-center shadow-inner">
                    <Lock className="w-8 h-8 text-[#3b554b]" />
                  </div>
                  
                  <div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#111916] tracking-wider mb-2">
                      【 封 锁 · 待 悟 玄 机 】
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-[#4e6b5f] leading-relaxed max-w-md mx-auto">
                      此卷书签封存着「{currentBookmark.name}」之剑德心得与名匠手记。少侠需先前往九州图通关「{currentBookmark.fullName}」试炼，以心铸剑，方可解封研读。
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#20312a]/10 border border-[#3b554b]/50 text-xs font-serif text-[#3b554b]">
                    <span>🔒 通关对应关卡后自动显现真迹</span>
                  </div>
                </div>
              )}

              {/* Bottom Quote & Audio Button */}
              <div className="flex items-center justify-between border-t border-[#c4baa8] pt-2 mt-2 text-xs font-serif text-[#4e6b5f]">
                <span>◇ 剑由铁铸 · 心由德成 · 铭金琢石 ◇</span>
                <button
                  onClick={handleTestStance}
                  className="px-3 py-1 rounded-sm bg-[#20312a] border border-[#3b554b] text-[#ffd885] hover:text-[#fff] transition-all cursor-pointer active:scale-95 text-xs flex items-center gap-1"
                >
                  <span>抚剑感怀</span>
                  <span>🎶</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: REALM (侠客剑修境界) */}
        {activeTab === 'REALM' && (
          <div className="relative z-10 space-y-3">
            {/* Current Realm Card */}
            <div className="p-4 sm:p-5 rounded-sm bg-[#131d19] border border-[#3b554b] text-center relative overflow-hidden">
              <div className="inline-block px-3 py-1 rounded-sm bg-[#16221e] border border-[#b83a2d] text-[#e65a4b] text-xs font-serif mb-2 tracking-widest font-bold">
                ◇ 当前剑修境界 ◇
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#ffd885] mb-2 tracking-wide">
                {currentRealm.title}
              </h3>
              <p className="text-xs sm:text-sm font-serif text-[#d8cbb8] max-w-md mx-auto leading-relaxed">
                {currentRealm.desc}
              </p>

              {/* Sword Qi Progress Meter */}
              <div className="mt-4 max-w-md mx-auto">
                <div className="flex justify-between text-xs font-serif text-[#7bb39d] mb-1.5">
                  <span>剑意修为 / 春秋历练</span>
                  <span className="text-[#ffd885] font-bold">{unlockedCount * 20}% （{unlockedCount}/5 德）</span>
                </div>
                <div className="w-full h-2.5 bg-[#0e1512] border border-[#2b3e36] rounded-sm p-0.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3b554b] via-[#dfba73] to-[#ffd885] rounded-sm transition-all duration-500 shadow-[0_0_10px_#ffd885]"
                    style={{ width: `${Math.max(5, (unlockedCount / 5) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Five Virtues Seals Grid */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {(Object.values(virtues) as VirtueState[]).map(v => (
                <div
                  key={v.id}
                  className={`p-2.5 rounded-sm border flex flex-col items-center justify-center text-center transition-all ${
                    v.unlocked
                      ? 'bg-[#16221e] border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                      : 'bg-[#0e1512] border-[#2b3e36] opacity-60'
                  }`}
                >
                  <span className="text-xl sm:text-2xl font-serif font-bold" style={{ color: v.unlocked ? '#ffd885' : '#4e6b5f' }}>
                    {v.name}
                  </span>
                  <span className="text-[10px] font-serif text-[#c7beaf] mt-1 line-clamp-1">
                    {v.title}
                  </span>
                  <span className="text-[9px] font-mono mt-0.5" style={{ color: v.unlocked ? '#5cb87a' : '#6d8a7e' }}>
                    {v.unlocked ? '● 已圆满' : '○ 待点亮'}
                  </span>
                </div>
              ))}
            </div>

            {/* Swordsman Blade Companion */}
            <div className="p-3 sm:p-4 rounded-sm bg-[#131d19] border border-[#2b3e36] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">🗡️</span>
                <div>
                  <div className="text-xs sm:text-sm font-serif font-bold text-[#ffd885] flex items-center gap-2">
                    <span>佩剑 ·「干将·仁锋」</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#16221e] text-[#5cb87a] border border-[#5cb87a]/40 font-serif">
                      灵性已通
                    </span>
                  </div>
                  <p className="text-xs font-serif text-[#9ab3a6] mt-0.5">
                    名匠手作，历经烈火、重锤、寒石开刃与五德洗礼，藏锋于鞘，威而不露。
                  </p>
                </div>
              </div>

              <button
                onClick={handleTestStance}
                className="shrink-0 px-3 py-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#ffd885] text-xs font-serif transition-all cursor-pointer active:scale-95"
              >
                拨剑抚弦 🎶
              </button>
            </div>
          </div>
        )}

        {/* Footer Confirm */}
        <div className="relative z-10 text-center pt-3 border-t border-[#2b3e36] mt-3">
          <button
            id="manual-modal-confirm"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-8 py-2 rounded-sm bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] hover:text-[#fff] transition-all text-xs sm:text-sm font-serif shadow-lg cursor-pointer active:scale-95"
          >
            合上秘鉴 · 继续问剑
          </button>
        </div>
      </div>
    </div>
  );
};

