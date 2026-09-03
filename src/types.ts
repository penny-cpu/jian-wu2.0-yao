export interface AssetConfig {
  backgroundImage?: string;
  introVideo?: string;
  outroVideo?: string;
  summaryImage?: string;
  stageImages?: Record<string, string>;
  extraImages?: Record<string, string>;
  extraVideos?: Record<string, string>;
}

export type VirtueId = 'REN' | 'LI' | 'YI' | 'ZHI' | 'XIN';

export interface VirtueState {
  id: VirtueId;
  name: string;
  title: string;
  fullName: string;
  color: string;
  unlocked: boolean;
  desc: string;
}

export type GameScene = 
  | 'TITLE'
  | 'PROLOGUE'
  | 'MAP'
  | 'LEVEL1'
  | 'LEVEL2'
  | 'LEVEL3'
  | 'LEVEL4'
  | 'LEVEL5'
  | 'FINAL_CHAPTER';

export interface CharacterProfile {
  name: string;
  title: string;
  identity: string;
  studies: string;
  belief: string;
  temperament: string;
  swordHeart: string;
  question: string;
}

export interface StoryOverview {
  title: string;
  values: string;
  intro: string[];
  stages: {
    name: string;
    virtue: string;
    theme: string;
  }[];
}

export interface SwordTechnique {
  id: string;
  name: string;
  virtueId: VirtueId | 'FINAL';
  stance: string;
  mantra: string;
  effect: string;
  unlocked: boolean;
  icon: string;
}
