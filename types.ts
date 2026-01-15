
export type Urgency = 'urgent' | '15days' | '30days' | 'anytime';

export interface Lead {
  id: string;
  brands: string[];
  models: string[];
  yearMin: number;
  yearMax: number;
  kmMax: number;
  priceMin: number;
  priceMax: number;
  urgency: Urgency;
  buyerName: string;
  buyerEmail: string;
  buyerWhatsApp: string;
  location: string; // Cidade/Estado
  acceptsRemoteProposals: boolean; // Se aceita propostas de fora da região
  status: 'new' | 'unlocked';
  unlockCount: number; // Quantidade de revendas que solicitaram o contato
  createdAt: string;
}

export interface Dealership {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  credits: number;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'active' | 'pending' | 'blocked';
  joinedAt: string;
  region: string; // Região da revenda
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Moderator' | 'Support';
  status: 'active' | 'inactive';
  lastLogin: string;
}

export enum AppMode {
  BUYER = 'buyer',
  DEALER = 'dealer',
  ADMIN = 'admin'
}
