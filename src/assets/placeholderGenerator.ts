// Placeholder Asset Provider with Real Image & Video Fallbacks
import level1ForgeBg from './images/level1_bg_forge_1788096421951.jpg';

/* =========================================================================
 * 首页【五德剑道】背景底图配置位置 (可在下方随时替换新图片文件路径)
 * ========================================================================= */
import introBgImg from './images/intro_bg_1788276445051.jpg';
export const HOME_INTRO_BG_IMAGE = introBgImg;

/* =========================================================================
 * 📜【故事背景（两页简介）背景底图配置位置】
 * 如需更换故事背景两页底图，可直接在此处修改引入的图片文件路径或变量：
 * ========================================================================= */
import bronzePlaqueScrollBg from './images/bronze_scroll_bg_1788276709995.jpg';
export const STORY_PROLOGUE_BG_IMAGE = bronzePlaqueScrollBg;

/* =========================================================================
 * 🗺️【九州五德大地图背景底图配置位置】
 * 如需更换大地图底图，可直接在此处修改引入的图片文件路径或变量：
 * ========================================================================= */
import mapScrollBgImg from './images/map_scroll_bg_hd_1788277069306.jpg';
export const MAP_SCROLL_BG_IMAGE = mapScrollBgImg;

/* =========================================================================
 * 🎭【春秋人物志 · 三大主角人物形象背景底图配置】
 * 如需更换各人物的背景底图，可直接在此处修改引入的图片文件路径：
 * ========================================================================= */
import ganjiangBioBgImg from './images/ganjiang_bio_bg_1787798389392.jpg';
import moyeBioBgImg from './images/moye_bio_bg_1788277575393.jpg';
import ouyeziBioBgImg from './images/ouyezi_bio_bg_1788277591224.jpg';

/* =========================================================================
 * 🌾【第一关（仁 · 雪夜炊烟）三大交互页面与通关小结专属背景底图配置位置】
 * ========================================================================= */
import level1ForgeBgImg from './images/level1_forge_bg_1788327737418.jpg';
import level1GrindBgImg from './images/level1_grind_bg_1788327752026.jpg';
import level1ChopBgImg from './images/level1_chop_bg_1788327763685.jpg';
import level1EpilogueBgImg from './images/level1_epilogue_bg_1788278832759.jpg';

export const LEVEL1_FORGE_STAGE_BG = level1ForgeBgImg;       // 资产1：试炼一 · 垫石锻剑背景图
export const LEVEL1_GRIND_STAGE_BG = level1GrindBgImg;       // 资产2：试炼二 · 寒石开刃背景图
export const LEVEL1_CHOP_STAGE_BG = level1ChopBgImg;         // 资产3：试炼三 · 挥剑劈柴背景图
export const LEVEL1_EPILOGUE_BG_IMAGE = level1EpilogueBgImg; // 资产4：通关小结底图（60%遮罩）

/* =========================================================================
 * 🌲【第二关（礼 · 剑问圣人）各交互阶段背景底图配置位置】
 * ========================================================================= */
import level2ParryStandoffImg from './images/level2_parry_standoff_1788327775188.jpg';
import level2DialogueConfuciusImg from './images/level2_dialogue_confucius_1788327793672.jpg';
import level2ReceiveCeremonyImg from './images/level2_receive_ceremony_1788327806522.jpg';

export const LEVEL2_STAGE_PARRY_BG = level2ParryStandoffImg;       // 资产1：格挡剑与前序/小结底图（子路与干将对峙）
export const LEVEL2_STAGE_DIALOGUE_BG = level2DialogueConfuciusImg;// 资产2：古柏对谈对话框底图（子路、干将、孔子三人对谈）
export const LEVEL2_STAGE_RECEIVE_BG = level2ReceiveCeremonyImg;   // 资产3：双手接剑交互底图（子路行递剑礼予干将、孔子在旁欣慰观看）
export const LEVEL2_CYPRESS_WILDERNESS_BG = level2ParryStandoffImg;// 兼容别名
export const LEVEL2_EPILOGUE_BG_IMAGE = level2ParryStandoffImg;    // 兼容别名（通关小结处统一只使用第一页背景图）

/* =========================================================================
 * ⚔️【第三关（义 · 烈风之断）实景背景与通关小结底图配置位置】
 * 包含关键图片资产位置，可直接在此处修改引入的图片文件路径：
 * 1. LEVEL3_PRELUDE_AND_EPILOGUE_BG : 开头页与通关小结整页底图（干将在古镇街头持剑救下戴玉佩小姑娘）
 * 2. LEVEL3_SWORD_GUARD_BG          : 试炼二（玉魂嵌合）中心弹窗底图（参考图2剑柄与凹槽）
 * 3. LEVEL3_JADE_ORNAMENT_IMAGE     : 试炼二剑形玉珏造型图片（参考图1透雕羊脂白玉质感）
 * ========================================================================= */
import level3RescueGirlBgImg from './images/level3_rescue_girl_bg_1788329167324.jpg';
import level3SwordGuardBgImg from './images/level3_sword_guard_cavity_1788329180078.jpg';
import level3JadeOrnamentImg from './images/level3_jade_plaque_ornament_1788329193469.jpg';

export const LEVEL3_PRELUDE_AND_EPILOGUE_BG = level3RescueGirlBgImg; // 资产1：第三关开头页与通关小结共用底图
export const LEVEL3_EPILOGUE_BG_IMAGE = level3RescueGirlBgImg;       // 兼容别名
export const LEVEL3_STREET_RAIN_BG = level3RescueGirlBgImg;          // 兼容别名
export const LEVEL3_SWORD_GUARD_BG = level3SwordGuardBgImg;          // 资产2：试炼二剑柄凹槽底图
export const LEVEL3_JADE_ORNAMENT_IMAGE = level3JadeOrnamentImg;     // 资产3：剑形玉珏造型图

/* =========================================================================
 * 📜【第四关（智 · 空谷之兽）试炼前情/通关小结与试炼二五大背景底图配置位置】
 * 包含关键图片资产位置，可直接在此处修改引入的图片文件路径：
 * 1. LEVEL4_PRELUDE_BG_IMAGE   : 试炼前情背景底图（60%遮罩，参考图：斩兽伏首万民敬仰）
 * 2. LEVEL4_EPILOGUE_BG_IMAGE  : 通关小结背景底图（60%遮罩，参考图：斩兽伏首万民敬仰）
 * 3. LEVEL4_STEP1_BG           : 试炼二第1题背景（密林枝叶遮蔽，神兽潜伏）
 * 4. LEVEL4_STEP2_BG           : 试炼二第2题背景（高岩扑下，巨爪撕风）
 * 5. LEVEL4_STEP3_BG           : 试炼二第3题背景（铁尾如鞭，狂沙横扫）
 * 6. LEVEL4_STEP4_BG           : 试炼二第4题背景（血口狂扑，腕花虚实乱闪）
 * 7. LEVEL4_STEP5_BG           : 试炼二第5题背景（神兽力竭，云剑迂回收势）
 * ========================================================================= */
import level4BeastSlainBgImg from './images/level4_beast_slain_bg_1788330470232.jpg';
import level4Step1BushesBgImg from './images/level4_step1_bushes_bg_1788330486858.jpg';
import level4Step2PounceBgImg from './images/level4_step2_pounce_bg_1788330504626.jpg';
import level4Step3SweepBgImg from './images/level4_step3_sweep_1788337591757.jpg';
import level4Step4JawBgImg from './images/level4_step4_jaw_1788337614257.jpg';
import level4Step5CloudBgImg from './images/level4_step5_cloud_1788337633315.jpg';

export const LEVEL4_PRELUDE_BG_IMAGE = level4BeastSlainBgImg;   // 资产1：第四关试炼前情背景底图（60%遮罩）
export const LEVEL4_EPILOGUE_BG_IMAGE = level4BeastSlainBgImg;  // 资产2：第四关通关小结背景底图（60%遮罩）
export const LEVEL4_STEP1_BG = level4Step1BushesBgImg;          // 资产3：试炼二第1题背景
export const LEVEL4_STEP2_BG = level4Step2PounceBgImg;          // 资产4：试炼二第2题背景
export const LEVEL4_STEP3_BG = level4Step3SweepBgImg;           // 资产5：试炼二第3题背景
export const LEVEL4_STEP4_BG = level4Step4JawBgImg;             // 资产6：试炼二第4题背景
export const LEVEL4_STEP5_BG = level4Step5CloudBgImg;           // 资产7：试炼二第5题背景

/* =========================================================================
 * 📜【第五关（信 · 孤山挂剑）试炼前情/通关小结/登临进度/恭获五德之信背景底图配置位置】
 * 1. LEVEL5_PRELUDE_BG_IMAGE  : 试炼前情背景底图（参考图2：老者授剑与悬剑连环画卷轴，60%遮罩）
 * 2. LEVEL5_EPILOGUE_BG_IMAGE : 通关小结背景底图（参考图2：老者授剑与悬剑连环画卷轴，60%遮罩）
 * 3. LEVEL5_PARKOUR_BG_IMAGE  : 登临进度交互页背景底图（参考图3：落日云海古松悬剑与干将背影，55%遮罩）
 * 4. LEVEL5_REWARD_BG_IMAGE   : 恭获五德之信背景底图（参考图4：恭喜玩家获得五德之信金色绘卷，60%遮罩）
 * ========================================================================= */
import level5ScrollComicBgImg from './images/level5_scroll_comic_bg_1788338618849.jpg';
import level5SunsetSwordBgImg from './images/level5_sunset_sword_bg_1788338631538.jpg';
import level5RewardTrustBgImg from './images/level5_reward_trust_bg_1788338643011.jpg';

export const LEVEL5_PRELUDE_BG_IMAGE = level5ScrollComicBgImg;  // 资产1：试炼前情底图（60%遮罩）
export const LEVEL5_EPILOGUE_BG_IMAGE = level5ScrollComicBgImg; // 资产2：通关小结底图（60%遮罩）
export const LEVEL5_PARKOUR_BG_IMAGE = level5SunsetSwordBgImg;  // 资产3：登临进度交互页底图（55%遮罩）
export const LEVEL5_REWARD_BG_IMAGE = level5RewardTrustBgImg;   // 资产4：恭获五德之信底图（60%遮罩）

export const CHARACTER_BIO_IMAGES = {
  ganjiang: ganjiangBioBgImg, // 干将人物形象底图
  moye: moyeBioBgImg,         // 莫邪人物形象底图
  ouyezi: ouyeziBioBgImg,     // 欧冶子人物形象底图
};

export const ASSET_MAP: Record<string, string> = {
  // Title & Prologue
  intro_bg: introBgImg,
  cover_bg: introBgImg,
  intro_bg2: bronzePlaqueScrollBg,
  story_prologue_bg: bronzePlaqueScrollBg,
  map_scroll_bg: mapScrollBgImg,
  manual_bg: 'assets/images/manual_modal_bg.jpg',
  
  // Character Card & Bio Portraits
  char_ganjiang: ganjiangBioBgImg,
  char_moye: moyeBioBgImg,
  char_ouyezi: ouyeziBioBgImg,

  // Level 1: 仁
  level1_bg_forge: level1ForgeBgImg,
  level1_bg_grind: level1GrindBgImg,
  level1_bg_chop: level1ChopBgImg,
  level1_bg_summary: level1EpilogueBgImg,

  // Level 2: 礼
  level2_bg_parry: level2ParryStandoffImg,
  level2_bg_dialogue: level2DialogueConfuciusImg,
  level2_bg_receive: level2ReceiveCeremonyImg,
  level2_bg_salute: level2ReceiveCeremonyImg,
  level2_bg_summary: level2ParryStandoffImg,

  // Level 3: 义
  level3_bg_combat: level3RescueGirlBgImg,
  level3_bg_jade: level3RescueGirlBgImg,
  level3_bg_release: level3RescueGirlBgImg,
  level3_bg_summary: level3RescueGirlBgImg,
  level3_sword_guard: level3SwordGuardBgImg,
  level3_jade_plaque: level3JadeOrnamentImg,
  level3_slash: 'assets/images/level3_slash.jpg',
  level3_thrust: 'assets/images/level3_thrust.jpg',
  level3_jade_icon: level3JadeOrnamentImg,

  // Level 4: 智
  level4_bg_secret: level4BeastSlainBgImg,
  level4_bg_step12: level4Step1BushesBgImg,
  level4_bg_step34: level4Step3SweepBgImg,
  level4_bg_step5: level4Step5CloudBgImg,
  level4_bg_step1: level4Step1BushesBgImg,
  level4_bg_step2: level4Step2PounceBgImg,
  level4_bg_step3: level4Step3SweepBgImg,
  level4_bg_step4: level4Step4JawBgImg,
  level4_bg_summary: level4BeastSlainBgImg,
  level4_prelude_bg: level4BeastSlainBgImg,

  // Level 5: 信
  level5_bg_run1: level5SunsetSwordBgImg,
  level5_bg_run2: level5SunsetSwordBgImg,
  level5_bg_parkour: level5SunsetSwordBgImg,
  level5_bg_tree: level5ScrollComicBgImg,
  level5_bg_summary: level5ScrollComicBgImg,
  level5_prelude_bg: level5ScrollComicBgImg,
  level5_epilogue_bg: level5ScrollComicBgImg,
  level5_reward_bg: level5RewardTrustBgImg,

  // Final Chapter
  final_bg_furnace: 'assets/images/final_bg_furnace.jpg',
  final_chapter_bg: 'assets/images/final_chapter_bg.jpg',
  final_summary_bg: 'assets/images/final_summary_bg.jpg',
  memory_ren: 'assets/images/memory_ren.jpg',
  memory_li: 'assets/images/memory_li.jpg',
  memory_yi: 'assets/images/memory_yi.jpg',
  memory_zhi: 'assets/images/memory_zhi.jpg',
  memory_xin: 'assets/images/memory_xin.jpg',

  // UI Buttons
  btn_primary_bg: 'assets/images/ui_btn_primary.png',
  btn_secondary_bg: 'assets/images/ui_btn_secondary.png',
  btn_bronze_bg: 'assets/images/ui_btn_bronze.png',
  btn_jade_bg: 'assets/images/ui_btn_jade.png',
  btn_crimson_bg: 'assets/images/ui_btn_crimson.png',
  btn_action_bg: 'assets/images/ui_btn_action.png',
};

export const VIDEO_MAP: Record<string, string> = {
  vid_level1_start: 'assets/video/level1_start.mp4',
  vid_level1_end: 'assets/video/level1_end.mp4',
  vid_level2_start: 'assets/video/level2_start.mp4',
  vid_level2_end: 'assets/video/level2_end.mp4',
  vid_level3_start: 'assets/video/level3_start.mp4',
  vid_level3_end: 'assets/video/level3_end.mp4',
  vid_level4_start: 'assets/video/level4_start.mp4',
  vid_level4_end: 'assets/video/level4_end.mp4',
  vid_level5_start: 'assets/video/level5_start.mp4',
  vid_level5_end: 'assets/video/level5_end.mp4',
  vid_final_opening: 'assets/video/final_opening.mp4',
  vid_final_ending: 'assets/video/final_ending.mp4',
  level4_tech_1: 'assets/video/level4_tech_1.mp4',
  level4_tech_2: 'assets/video/level4_tech_2.mp4',
  level4_tech_3: 'assets/video/level4_tech_3.mp4',
  level4_tech_4: 'assets/video/level4_tech_4.mp4',
  level4_tech_5: 'assets/video/level4_tech_5.mp4',
};

// Generates Wuxia UI Button Textured Background Asset Placeholder
export function getButtonImage(key: string, variant: string = 'primary'): string {
  const colorMap: Record<string, { start: string; mid: string; end: string; border: string }> = {
    primary: { start: '#1f2e27', mid: '#2a4237', end: '#1a2822', border: '#dfba73' },
    bronze: { start: '#24201a', mid: '#362f25', end: '#1e1a14', border: '#c5a059' },
    jade: { start: '#12261e', mid: '#1e3d30', end: '#0f1f18', border: '#5cb87a' },
    crimson: { start: '#2d1816', mid: '#42201d', end: '#241312', border: '#d64d3e' },
    secondary: { start: '#16221e', mid: '#20302a', end: '#141d1a', border: '#3b554b' },
    action: { start: '#c5a059', mid: '#ffd885', end: '#b38d45', border: '#f5efe3' },
    subtle: { start: '#111916', mid: '#192420', end: '#0d1311', border: '#2b3e36' },
  };

  const palette = colorMap[variant] || colorMap.primary;

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="70" viewBox="0 0 300 70">
    <defs>
      <linearGradient id="btnGrad_${variant}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${palette.start}" />
        <stop offset="50%" stop-color="${palette.mid}" />
        <stop offset="100%" stop-color="${palette.end}" />
      </linearGradient>
      <linearGradient id="btnBorder_${variant}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${palette.border}" />
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${palette.border}" />
      </linearGradient>
    </defs>
    
    <!-- Button Background Pill / Slab -->
    <rect x="2" y="2" width="296" height="66" rx="3" fill="url(#btnGrad_${variant})" />
    
    <!-- Ancient Bronze Decorative Pattern / Inscription Texture -->
    <path d="M10,8 L290,8" stroke="${palette.border}" stroke-width="0.8" opacity="0.3" stroke-dasharray="8 4" />
    <path d="M10,62 L290,62" stroke="${palette.border}" stroke-width="0.8" opacity="0.3" stroke-dasharray="8 4" />
    
    <!-- Corner Rivets / Filigree -->
    <polygon points="6,6 16,6 6,16" fill="${palette.border}" opacity="0.8" />
    <polygon points="294,6 284,6 294,16" fill="${palette.border}" opacity="0.8" />
    <polygon points="6,64 16,64 6,54" fill="${palette.border}" opacity="0.8" />
    <polygon points="294,64 284,64 294,54" fill="${palette.border}" opacity="0.8" />
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Generates Chinese Silk Landscape Scroll Map placeholder (Fig 3 style: 《九州五德圖 / 京郊八景》)
export function getMapScrollPlaceholder(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <defs>
      <!-- Rice paper antique gradient -->
      <linearGradient id="silkBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f7f1e5" />
        <stop offset="50%" stop-color="#ede3d1" />
        <stop offset="100%" stop-color="#dfd0ba" />
      </linearGradient>

      <!-- Soft mountain wash gradients -->
      <linearGradient id="mountFar" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#8ba892" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#b6cbbd" stop-opacity="0.1" />
      </linearGradient>

      <linearGradient id="mountMid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#466b57" stop-opacity="0.85" />
        <stop offset="60%" stop-color="#698b76" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#a4bcaa" stop-opacity="0.2" />
      </linearGradient>

      <linearGradient id="mountFront" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#6d5843" />
        <stop offset="40%" stop-color="#4e3d2c" />
        <stop offset="100%" stop-color="#2d2217" />
      </linearGradient>

      <!-- Crimson Sun Gradient -->
      <radialGradient id="sunGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#e65a3b" />
        <stop offset="70%" stop-color="#c84628" />
        <stop offset="100%" stop-color="#a8341a" stop-opacity="0.85" />
      </radialGradient>
    </defs>

    <!-- Silk / Rice Paper Canvas -->
    <rect width="1600" height="900" fill="url(#silkBg)" />

    <!-- Paper Texture Speckles / Subtle Wash -->
    <rect width="1600" height="900" fill="#a48c69" opacity="0.04" />
    <line x1="60" y1="40" x2="60" y2="860" stroke="#8c7353" stroke-width="1.5" opacity="0.4" />
    <line x1="1540" y1="40" x2="1540" y2="860" stroke="#8c7353" stroke-width="1.5" opacity="0.4" />

    <!-- Red Sunset / Dawn Orb -->
    <circle cx="430" cy="240" r="38" fill="url(#sunGrad)" />

    <!-- Far Mist & Blue-Green Mountains (Layer 1) -->
    <path d="M0,600 Q300,380 600,480 T1200,420 T1600,520 L1600,900 L0,900 Z" fill="url(#mountFar)" />
    <path d="M100,550 Q450,300 800,450 T1400,340 T1600,460 L1600,900 L0,900 Z" fill="url(#mountFar)" opacity="0.7"/>

    <!-- Mid Qinglü (Blue-Green) Peak (Layer 2 - 白鹿青崖 & 幽壑) -->
    <path d="M720,700 Q880,240 1020,440 T1200,680 L1200,900 L700,900 Z" fill="url(#mountMid)" />
    <path d="M780,680 Q920,260 1000,420 T1150,680 Z" fill="#385846" opacity="0.6" />

    <!-- Left Ancient Citadel / Pagoda Mountain (Layer 3 - 长安都城 / 万岁山寺) -->
    <path d="M0,720 Q120,460 260,540 T560,780 L560,900 L0,900 Z" fill="url(#mountFront)" opacity="0.85"/>
    <!-- Citadel Walls & Pagoda silhouette -->
    <g transform="translate(240, 500)" opacity="0.85">
      <!-- 7-story Pagoda -->
      <rect x="-14" y="0" width="28" height="160" fill="#6d2e24" />
      <polygon points="-24,30 24,30 0,0" fill="#3a1813" />
      <polygon points="-28,60 28,60 0,30" fill="#3a1813" />
      <polygon points="-32,90 32,90 0,60" fill="#3a1813" />
      <polygon points="-36,120 36,120 0,90" fill="#3a1813" />
      <polygon points="-40,150 40,150 0,120" fill="#3a1813" />
      <!-- Surrounding roofs -->
      <rect x="-110" y="110" width="180" height="45" fill="#54251e" opacity="0.9" />
      <polygon points="-120,110 -40,90 40,90 80,110" fill="#301410" />
    </g>

    <!-- Mid Forest & Daoist Temple (郊外梨林 / 道观) -->
    <g transform="translate(680, 520)" opacity="0.75">
      <!-- Temple Pavilion -->
      <polygon points="-25,40 25,40 0,15" fill="#3d2c1e" />
      <rect x="-15" y="40" width="30" height="35" fill="#5a412c" />
      <!-- Pine and Pear trees -->
      <circle cx="-50" cy="50" r="35" fill="#4d6e59" opacity="0.7" />
      <circle cx="-30" cy="30" r="28" fill="#e8dacb" opacity="0.8" />
      <circle cx="45" cy="45" r="32" fill="#587d65" opacity="0.7" />
    </g>

    <!-- Right Waterway, Bridge & Water Town (风陵渡口 / 水乡小镇) -->
    <path d="M960,780 C1100,740 1350,750 1600,700 L1600,900 L960,900 Z" fill="#7d6a54" opacity="0.7" />
    <!-- River Surface -->
    <path d="M1000,750 Q1300,720 1600,760 L1600,900 L1000,900 Z" fill="#b8c8be" opacity="0.5" />
    <!-- Water Town House Silhouettes -->
    <g transform="translate(1360, 720)" opacity="0.8">
      <rect x="0" y="0" width="90" height="60" fill="#3d3023" />
      <polygon points="-10,0 100,0 45,-25" fill="#241c14" />
      <rect x="110" y="15" width="70" height="50" fill="#4a3b2c" />
      <polygon points="100,15 190,15 145,-10" fill="#241c14" />
      <!-- Small Ferry Pier -->
      <rect x="-60" y="40" width="60" height="8" fill="#5c4530" />
      <line x1="-50" y1="48" x2="-50" y2="75" stroke="#3d2e20" stroke-width="4" />
      <line x1="-20" y1="48" x2="-20" y2="75" stroke="#3d2e20" stroke-width="4" />
    </g>

    <!-- Flock of Wild Geese in V-formation -->
    <g opacity="0.65" stroke="#3d3226" stroke-width="2" fill="none">
      <path d="M640,280 Q648,274 656,280 Q664,274 672,280" />
      <path d="M680,260 Q688,254 696,260 Q704,254 712,260" />
      <path d="M720,240 Q728,234 736,240 Q744,234 752,240" />
      <path d="M760,255 Q768,249 776,255 Q784,249 792,255" />
      <path d="M800,270 Q808,264 816,270 Q824,264 832,270" />
      <path d="M840,285 Q848,279 856,285 Q864,279 872,285" />
    </g>

    <!-- Foreground Mountain Cliffs and Rocks (Bottom Edge) -->
    <path d="M0,860 Q200,810 420,840 T900,830 T1350,850 T1600,830 L1600,900 L0,900 Z" fill="#2e2217" />

    <!-- Top Right: Calligraphic Inscription & Seal (题跋与朱文印章) -->
    <g transform="translate(1320, 110)" opacity="0.85">
      <!-- Seal -->
      <rect x="150" y="10" width="36" height="36" rx="4" fill="#a6321e" />
      <text x="168" y="34" text-anchor="middle" font-family="'Songti SC', 'SimSun', serif" font-size="16" font-weight="bold" fill="#f5ebd7">干</text>
      <!-- Running Script Poem Lines (Simulated Calligraphy) -->
      <text x="130" y="30" font-family="'Kaiti', 'STKaiti', serif" font-size="14" fill="#3a2f24" letter-spacing="4" writing-mode="vertical-rl">
        天地铸炉火初生
      </text>
      <text x="105" y="45" font-family="'Kaiti', 'STKaiti', serif" font-size="14" fill="#3a2f24" letter-spacing="4" writing-mode="vertical-rl">
        五德归心剑气横
      </text>
      <text x="80" y="60" font-family="'Kaiti', 'STKaiti', serif" font-size="13" fill="#6d5843" letter-spacing="3" writing-mode="vertical-rl">
        干将莫邪同修处
      </text>
      <text x="55" y="75" font-family="'Kaiti', 'STKaiti', serif" font-size="12" fill="#8c735a" letter-spacing="2" writing-mode="vertical-rl">
        九州问道载青史
      </text>
    </g>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Generates Wuxia Character Card Portrait (Fig 2 style: 《剑来》黑金卡牌立绘)
export function getCardCharacterImage(name: string, role: string, toneColor: string = '#D4AF37'): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <defs>
      <!-- Dark Gold Texture Background -->
      <radialGradient id="charBg" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stop-color="#2a1f16" />
        <stop offset="50%" stop-color="#140e0a" />
        <stop offset="100%" stop-color="#070504" />
      </radialGradient>
      <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffe699" />
        <stop offset="50%" stop-color="${toneColor}" />
        <stop offset="100%" stop-color="#73582e" />
      </linearGradient>
      <linearGradient id="swordBladeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="40%" stop-color="${toneColor}" />
        <stop offset="100%" stop-color="#2a1a0c" />
      </linearGradient>
      <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Dark Canvas -->
    <rect width="600" height="800" fill="url(#charBg)" />

    <!-- Ambient Golden Dust / Sparks in the air -->
    <g opacity="0.6">
      <circle cx="180" cy="180" r="2.5" fill="#ffd700" filter="url(#goldGlow)"/>
      <circle cx="450" cy="220" r="3" fill="#ffe066" filter="url(#goldGlow)"/>
      <circle cx="280" cy="380" r="2" fill="#ffd700"/>
      <circle cx="120" cy="450" r="2.5" fill="#ffd700"/>
      <circle cx="500" cy="400" r="3.5" fill="#ffb833" filter="url(#goldGlow)"/>
      <circle cx="360" cy="120" r="2" fill="#fff"/>
    </g>

    <!-- Sword Qi Arc Backdrop -->
    <path d="M60,650 Q280,180 540,320" stroke="url(#swordBladeGlow)" stroke-width="3" fill="none" opacity="0.4" filter="url(#goldGlow)"/>
    <path d="M80,680 Q300,220 520,350" stroke="#d4af37" stroke-width="1" fill="none" opacity="0.3"/>

    <!-- Heroic Swordsman Silhouette & Art Representation -->
    <g transform="translate(300, 420)">
      <!-- Back Cape / Robe Flowing in Wind -->
      <path d="M-80,-60 Q-180,60 -120,240 Q-20,260 20,250 Q10,120 -20,-60 Z" fill="#1b2820" opacity="0.9"/>
      
      <!-- Swordsman Torso & Dark Green Linen Armor (Liu Xianyang style) -->
      <path d="M-60,-120 Q-75,40 -45,180 Q0,210 45,180 Q75,40 60,-120 Z" fill="#223328" stroke="#131e18" stroke-width="3"/>
      
      <!-- Belt & Leather Straps -->
      <rect x="-50" y="20" width="100" height="22" rx="4" fill="#3d2a1c" stroke="#6e4f34" stroke-width="2"/>
      <rect x="-14" y="16" width="28" height="30" rx="3" fill="#8c6a38" stroke="#ffd700" stroke-width="1.5"/>

      <!-- Right Arm Holding Ancient Sword -->
      <path d="M40,-80 Q100,-20 90,80 Q70,120 50,110 Q55,40 30,-50 Z" fill="#1c2b22" />
      <!-- Golden Veins / Tattoo glow on arm (Dragon Bone Mark) -->
      <path d="M60,10 Q80,45 65,90" stroke="#ffd700" stroke-width="2" fill="none" opacity="0.8" filter="url(#goldGlow)"/>

      <!-- Legendary Ancient Sword (干将剑 / 龙骨剑) -->
      <g transform="translate(60, 95) rotate(-35)">
        <!-- Blade with dazzling edge -->
        <polygon points="-6,-260 6,-260 8,0 -8,0" fill="url(#swordBladeGlow)" stroke="#fff" stroke-width="0.8" filter="url(#goldGlow)"/>
        <!-- Full groove -->
        <line x1="0" y1="-240" x2="0" y2="-10" stroke="#997a3d" stroke-width="1.5" />
        <!-- Guard -->
        <rect x="-24" y="0" width="48" height="10" rx="3" fill="#8c6742" stroke="#ffd700" stroke-width="1.5"/>
        <!-- Handle Wrapped -->
        <rect x="-6" y="10" width="12" height="40" fill="#2b1a0e" stroke="#52391e" stroke-width="1"/>
        <!-- Pommel with Dragon Core -->
        <circle cx="0" cy="54" r="8" fill="#a6321e" stroke="#ffd700" stroke-width="2"/>
      </g>

      <!-- Head, High Ponytail & Face Silhouette -->
      <!-- Flowing High Ponytail -->
      <path d="M-15,-200 Q-90,-240 -120,-140 Q-150,-50 -100,20 Q-110,-70 -50,-150 Z" fill="#0d0a08" />
      <path d="M-10,-190 Q-70,-220 -90,-120" stroke="#332417" stroke-width="3" fill="none"/>
      
      <!-- Head & Neck -->
      <path d="M-25,-160 Q-25,-210 15,-205 Q40,-190 35,-150 Q25,-120 -10,-120 Z" fill="#e0c29f"/>
      <!-- Shadow on face -->
      <path d="M-20,-165 Q0,-185 25,-155 Q10,-130 -15,-130 Z" fill="#c49a72" opacity="0.6"/>
      <!-- Sharp gaze & eyes -->
      <polygon points="12,-168 22,-165 14,-162" fill="#140e0a" />
      <circle cx="16" cy="-165" r="1.5" fill="#ffd700" filter="url(#goldGlow)"/>

      <!-- Dragon bone glowing marks on neck/face -->
      <path d="M-5,-140 Q15,-135 20,-125" stroke="#ffd700" stroke-width="1.5" fill="none" opacity="0.8"/>
    </g>

    <!-- Bottom Vignette / Mist -->
    <rect y="640" width="600" height="160" fill="url(#charBg)" opacity="0.95" />
    
    <!-- Character Title Watermark -->
    <text x="300" y="720" text-anchor="middle" font-family="'Songti SC', 'SimSun', serif" font-size="20" font-weight="bold" fill="url(#goldEdge)" letter-spacing="6">
      ${role} · ${name}
    </text>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Generates Courtyard & Pine Garden Sanctuary Landscape (Fig 2 style: 曲阜圣坛 · 古柏幽观)
export function getDialogueCourtyardPlaceholder(): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <defs>
      <linearGradient id="ctBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#b6dbbf" />
        <stop offset="40%" stop-color="#cfebd2" />
        <stop offset="100%" stop-color="#ebd9bd" />
      </linearGradient>
      <linearGradient id="treeGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffcc33" />
        <stop offset="60%" stop-color="#e6a817" />
        <stop offset="100%" stop-color="#b37d0c" />
      </linearGradient>
      <linearGradient id="treeGreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#699e69" />
        <stop offset="60%" stop-color="#4d7c4d" />
        <stop offset="100%" stop-color="#345434" />
      </linearGradient>
      <linearGradient id="roofOrange" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#e07148" />
        <stop offset="100%" stop-color="#a64421" />
      </linearGradient>
    </defs>

    <!-- Base Canvas -->
    <rect width="1600" height="900" fill="url(#ctBg)" />

    <!-- Distant Mountain Wash -->
    <path d="M0,320 Q400,200 800,260 T1600,220 L1600,900 L0,900 Z" fill="#92baa0" opacity="0.35" />

    <!-- Red Courtyard Wall running diagonally -->
    <polygon points="100,50 1600,320 1600,420 100,150" fill="#a6442e" opacity="0.9" />
    <polygon points="100,50 1600,320 1600,340 100,70" fill="url(#roofOrange)" />

    <!-- Classical Cobblestone Pathway in Garden -->
    <path d="M-100,900 L550,250 L680,250 L1100,900 Z" fill="#dfd0ba" stroke="#bda88e" stroke-width="4" />
    <!-- Flagstone grid lines -->
    <line x1="200" y1="650" x2="800" y2="650" stroke="#cbb497" stroke-width="2" />
    <line x1="300" y1="500" x2="750" y2="500" stroke="#cbb497" stroke-width="2" />
    <line x1="400" y1="380" x2="700" y2="380" stroke="#cbb497" stroke-width="2" />

    <!-- Golden Ginkgo Trees & Ancient Pines (Left & Center) -->
    <g transform="translate(180, 420)">
      <!-- Pine Trunk -->
      <path d="M0,0 Q-20,120 -40,240 L-10,240 Q10,120 15,0 Z" fill="#543c29" />
      <!-- Lush Leaves -->
      <circle cx="-30" cy="-60" r="110" fill="url(#treeGreen)" />
      <circle cx="40" cy="-40" r="90" fill="url(#treeGreen)" opacity="0.9" />
    </g>

    <!-- Golden Tree (Fig 2 style) -->
    <g transform="translate(480, 260)">
      <path d="M0,0 L-10,160 L10,160 Z" fill="#61442c" />
      <circle cx="-40" cy="-30" r="85" fill="url(#treeGold)" />
      <circle cx="30" cy="-50" r="95" fill="url(#treeGold)" />
      <circle cx="0" cy="-10" r="75" fill="#ffd84d" opacity="0.9" />
    </g>

    <!-- Central Pine Tree (Behind Characters) -->
    <g transform="translate(850, 320)">
      <path d="M0,0 Q10,100 0,220 L25,220 Q20,100 15,0 Z" fill="#4a3523" />
      <circle cx="-50" cy="-60" r="120" fill="url(#treeGreen)" />
      <circle cx="50" cy="-70" r="110" fill="url(#treeGreen)" />
      <circle cx="0" cy="-120" r="100" fill="#5b945b" />
    </g>

    <!-- Right Side: Ancient Chinese Pavilion / Hexagonal Gazebo (Fig 2 style 凉亭) -->
    <g transform="translate(1420, 560)">
      <!-- Pavilion Roof (Gold & Cyan Trim) -->
      <polygon points="0,-160 -180,-60 180,-60" fill="url(#roofOrange)" />
      <polygon points="0,-180 -200,-50 200,-50" fill="none" stroke="#258c80" stroke-width="12" />
      <!-- Golden finial on roof -->
      <circle cx="0" cy="-175" r="14" fill="#ffd700" stroke="#8c6742" stroke-width="2" />
      <!-- Pillar columns -->
      <rect x="-140" y="-50" width="16" height="240" fill="#8c2e1c" />
      <rect x="-40" y="-50" width="16" height="240" fill="#8c2e1c" />
      <rect x="60" y="-50" width="16" height="240" fill="#8c2e1c" />
      <rect x="130" y="-50" width="16" height="240" fill="#8c2e1c" />
      <!-- Red Guardrails -->
      <rect x="-140" y="100" width="280" height="25" fill="#6d2214" />
      <!-- Stone Base -->
      <polygon points="-160,190 160,190 140,240 -140,240" fill="#ad9c88" />
    </g>

    <!-- Stone Lantern Posts (Fig 2 style 石灯笼) -->
    <g transform="translate(900, 480)">
      <rect x="-10" y="0" width="20" height="60" fill="#998774" />
      <polygon points="-24,0 24,0 0,-18" fill="#5c4d3e" />
      <rect x="-14" y="0" width="28" height="18" fill="#e8d5b5" />
    </g>
    <g transform="translate(360, 420)">
      <rect x="-8" y="0" width="16" height="50" fill="#998774" />
      <polygon points="-20,0 20,0 0,-15" fill="#5c4d3e" />
      <rect x="-12" y="0" width="24" height="15" fill="#e8d5b5" />
    </g>

    <!-- Tiny Miniature Background Characters (Fig 2 Background Figurines) -->
    <!-- Mini Scholar 1 in courtyard -->
    <g transform="translate(800, 500) scale(0.65)">
      <circle cx="0" cy="-20" r="10" fill="#f0d5b6" />
      <path d="-10,-10 L10,-10 L14,30 L-14,30 Z" fill="#205566" />
      <rect x="-8" y="-30" width="16" height="12" fill="#141414" />
    </g>
    <!-- Mini Sword Scholar 2 -->
    <g transform="translate(250, 120) scale(0.6)">
      <circle cx="0" cy="-20" r="10" fill="#f0d5b6" />
      <path d="-10,-10 L10,-10 L14,30 L-14,30 Z" fill="#8c2e1c" />
    </g>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// SVG Placeholder generator with traditional Chinese ink & sword mood
export function getPlaceholderImage(key: string, title: string, subtitle: string = '', accentColor: string = '#D4AF37'): string {
  if (key === 'intro_bg' || key === 'cover_bg') {
    return introBgImg;
  }
  if (key === 'intro_bg2' || key === 'story_prologue_bg') {
    return bronzePlaqueScrollBg;
  }
  if (key === 'level1_bg_forge') {
    return level1ForgeBgImg;
  }
  if (key === 'level1_bg_grind') {
    return level1GrindBgImg;
  }
  if (key === 'level1_bg_chop') {
    return level1ChopBgImg;
  }
  if (key === 'level1_bg_summary') {
    return level1EpilogueBgImg;
  }
  if (key === 'map_scroll_bg') {
    return mapScrollBgImg;
  }
  if (key === 'level2_bg_summary') {
    return level2ParryStandoffImg;
  }
  if (key === 'level2_bg_parry') {
    return level2ParryStandoffImg;
  }
  if (key === 'level2_bg_dialogue') {
    return level2DialogueConfuciusImg;
  }
  if (key === 'level2_bg_receive' || key === 'level2_bg_salute') {
    return level2ReceiveCeremonyImg;
  }
  if (key === 'level3_bg_summary' || key === 'level3_bg_combat' || key === 'level3_bg_jade' || key === 'level3_bg_release') {
    return level3RescueGirlBgImg;
  }
  if (key === 'level3_sword_guard') {
    return level3SwordGuardBgImg;
  }
  if (key === 'level3_jade_icon' || key === 'level3_jade_plaque') {
    return level3JadeOrnamentImg;
  }
  if (key === 'level4_bg_summary' || key === 'level4_prelude_bg' || key === 'level4_bg_secret') {
    return level4BeastSlainBgImg;
  }
  if (key === 'level4_bg_step1' || key === 'level4_bg_step12') {
    return level4Step1BushesBgImg;
  }
  if (key === 'level4_bg_step2') {
    return level4Step2PounceBgImg;
  }
  if (key === 'level4_bg_step3' || key === 'level4_bg_step34') {
    return level4Step3SweepBgImg;
  }
  if (key === 'level4_bg_step4') {
    return level4Step4JawBgImg;
  }
  if (key === 'level4_bg_step5') {
    return level4Step5CloudBgImg;
  }
  if (key === 'char_ganjiang' || key === 'char_moye' || key === 'char_ouyezi') {
    return getCardCharacterImage(title, subtitle, accentColor);
  }

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#1e1814" />
        <stop offset="60%" stop-color="#120f0d" />
        <stop offset="100%" stop-color="#080706" />
      </radialGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF0B3" />
        <stop offset="50%" stop-color="${accentColor}" />
        <stop offset="100%" stop-color="#8C7853" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <!-- Background Canvas -->
    <rect width="800" height="600" fill="url(#bgGrad)" />
    
    <!-- Mountain and Mist Silhouettes -->
    <path d="M0,450 Q180,360 380,430 T800,410 L800,600 L0,600 Z" fill="#181310" opacity="0.8"/>
    <path d="M0,490 Q220,420 520,480 T800,470 L800,600 L0,600 Z" fill="#0f0c0a" opacity="0.9"/>
    
    <!-- Decorative Border Frame -->
    <rect x="20" y="20" width="760" height="560" rx="10" fill="none" stroke="${accentColor}" stroke-width="1.5" opacity="0.4" />
    <rect x="26" y="26" width="748" height="548" rx="8" fill="none" stroke="${accentColor}" stroke-width="0.5" opacity="0.2" />
    
    <!-- Corner Ornaments -->
    <path d="M30,50 L50,30 L70,30 M30,50 L30,70" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M770,50 L750,30 L730,30 M770,50 L770,70" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M30,550 L50,570 L70,570 M30,550 L30,530" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.8"/>
    <path d="M770,550 L750,570 L730,570 M770,550 L770,530" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.8"/>
    
    <!-- Center Sword Motif -->
    <g transform="translate(400, 240)" filter="url(#glow)">
      <circle cx="0" cy="0" r="70" fill="#201812" stroke="${accentColor}" stroke-width="1.5" opacity="0.6"/>
      <!-- Sword blade -->
      <path d="M0,-55 L6,-10 L4,40 L0,48 L-4,40 L-6,-10 Z" fill="url(#goldGrad)" />
      <!-- Guard -->
      <rect x="-18" y="10" width="36" height="5" rx="2" fill="${accentColor}" />
      <!-- Hilt -->
      <rect x="-3" y="15" width="6" height="24" rx="1" fill="#4a3728" />
      <!-- Pommel -->
      <circle cx="0" cy="42" r="5" fill="${accentColor}" />
    </g>
    
    <!-- Title Text -->
    <text x="400" y="375" text-anchor="middle" font-family="'Songti SC', 'SimSun', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" letter-spacing="4">
      ${title}
    </text>
    
    <!-- Subtitle Text -->
    <text x="400" y="415" text-anchor="middle" font-family="'Songti SC', 'SimSun', serif" font-size="15" fill="#C5B595" opacity="0.85" letter-spacing="2">
      ${subtitle}
    </text>

    <!-- Asset Key Note -->
    <text x="400" y="540" text-anchor="middle" font-family="monospace" font-size="11" fill="#7D705C" opacity="0.6">
      [ 资产占位: ${key} ]
    </text>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

