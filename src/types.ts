/**
 * Types & Interfaces for Crypto Safety Global (CSG)
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppView = 
  | 'home' 
  | 'about'
  | 'start-here' 
  | 'beginner-guides' 
  | 'security-centre' 
  | 'reviews' 
  | 'stablecoins-and-payments' 
  | 'countries' 
  | 'blog' 
  | 'resources' 
  | 'faq' 
  | 'legal'
  | 'contact'
  | 'exchanges-directory';

export interface CryptoScam {
  id: string;
  title: string;
  subtitle?: string;
  category: 'phishing' | 'giveaway' | 'poisoning' | 'malware' | 'impersonation';
  severity: 'CRITICAL' | 'ACTIVE' | 'MODERATE' | 'LOW';
  description: string;
  details: string; // Detail guidelines for prevention modal
  iconName: string;
}

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  contentLabel?: string;
  subtext: string;
  readTime: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface LocalExchange {
  id: string;
  name: string;
  status: 'SAFE' | 'SECURED' | 'CAUTION' | 'DANGEROUS';
  rating: number;
  description: string;
  pros: string[];
  supportStatus: string;
  liquidity: string;
  badgeColorClass: string;
  alerts?: string;
}

export interface P2PChecklistItem {
  id: string;
  text: string;
  isImportant: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  imageSrc: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'basics' | 'buying' | 'stablecoins' | 'wallets' | 'regulation' | 'advanced';
  excerpt: string;
  content: string;
  readTime: string;
  steps?: string[];
  safetyNotes: string[];
  author: string;
  lastUpdated: string;
}

export interface PlatformReview {
  id: string;
  name: string;
  type: 'exchange' | 'wallet';
  globalRating: number;
  safetyScore: number; // Out of 100
  pros: string[];
  cons: string[];
  verdict: string;
  isAffiliate: boolean;
  affiliateUrl?: string;
  securityFeatures: string[];
  supportedRegions: string[];
  badgeColorClass: string;
  lastReviewed: string;
}

export interface CountryProfile {
  id: string;
  name: string;
  region: string;
  flagEmoji: string;
  overview: string;
  legalStatus: 'Fully Legal' | 'Restricted' | 'Under Observation' | 'Complex';
  regulatorName: string;
  taxPolicy: string;
  recommendedPractices: string[];
  localRisks: string[];
  activeRamps: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  fileType: string;
  downloadUrl?: string;
  category: 'checklist' | 'calculator' | 'template' | 'handbook';
}

