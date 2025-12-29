
import React from 'react';
import { 
  Car, 
  Search, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase 
} from 'lucide-react';
import { AdminUser } from './types';

export const CAR_BRANDS = [
  "Volkswagen", "Chevrolet", "Fiat", "Toyota", "Hyundai", 
  "Jeep", "Honda", "Renault", "Nissan", "Ford", "BMW", 
  "Mercedes-Benz", "Audi", "Mitsubishi", "Peugeot", "Citroën"
];

export const COUNTRY_CODES = [
  { code: '+55', country: 'Brasil', flag: '🇧🇷', mask: '(00) 00000-0000' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸', mask: '(000) 000-0000' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹', mask: '000 000 000' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', mask: '00000 000000' },
  { code: '+34', country: 'Espanha', flag: '🇪🇸', mask: '000 000 000' },
  { code: '+49', country: 'Alemanha', flag: '🇩🇪', mask: '0000 0000000' },
  { code: '+33', country: 'França', flag: '🇫🇷', mask: '0 00 00 00 00' },
  { code: '+39', country: 'Itália', flag: '🇮🇹', mask: '000 000 0000' },
];

export const CAR_MODELS_BY_BRAND: Record<string, string[]> = {
  "Volkswagen": ["Gol", "Polo", "Nivus", "T-Cross", "Taos", "Virtus", "Amarok"],
  "Chevrolet": ["Onix", "Onix Plus", "Tracker", "Spin", "Cruze", "S10", "Equinox"],
  "Fiat": ["Strada", "Mobi", "Argo", "Pulse", "Fastback", "Toro", "Cronos"],
  "Toyota": ["Corolla", "Corolla Cross", "Hilux", "Yaris", "SW4"],
  "Honda": ["HR-V", "Civic", "City", "City Hatch"],
  "Hyundai": ["HB20", "HB20S", "Creta", "Tucson"],
  "Jeep": ["Renegade", "Compass", "Commander"],
  "BMW": ["320i", "X1", "X3", "X5"],
  "Ford": ["Ranger", "Territory", "Mustang"],
  "Renault": ["Kwid", "Sandero", "Duster", "Oroch"],
};

export const MOCK_LEADS: any[] = [
  {
    id: '1',
    brands: ['Volkswagen'],
    models: ['Nivus'],
    yearMin: 2021,
    yearMax: 2024,
    kmMax: 40000,
    priceMin: 100000,
    priceMax: 135000,
    urgency: '15days',
    buyerName: 'João Silva',
    buyerEmail: 'joao@email.com',
    buyerWhatsApp: '+5511999998888',
    location: 'Florianópolis - SC',
    acceptsRemoteProposals: true,
    status: 'new',
    createdAt: '2025-12-01T10:00:00Z'
  },
  {
    id: '12',
    brands: ['Toyota'],
    models: ['Hilux'],
    yearMin: 2023,
    yearMax: 2025,
    kmMax: 2000,
    priceMin: 280000,
    priceMax: 350000,
    urgency: 'urgent',
    buyerName: 'Gustavo Lima',
    buyerEmail: 'gl@embaixador.com',
    buyerWhatsApp: '+5565911110000',
    location: 'Cuiabá - MT',
    acceptsRemoteProposals: true,
    status: 'new',
    createdAt: '2025-12-05T10:45:00Z'
  }
];

export const MOCK_DEALERS: any[] = [
  {
    id: 'd1',
    name: 'Auto Mecânica Premium',
    email: 'vendas@automecanica.com.br',
    cnpj: '12.345.678/0001-90',
    credits: 15,
    plan: 'Professional',
    status: 'active',
    region: 'Florianópolis - SC',
    joinedAt: '2025-01-15T10:00:00Z'
  }
];

export const MOCK_ADMINS: AdminUser[] = [
  {
    id: 'adm1',
    name: 'Admin Master',
    email: 'master@automatch.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2025-12-01T08:00:00Z'
  }
];

export const URGENCY_LABELS: Record<string, string> = {
  'urgent': 'Imediata (Urgente)',
  '15days': 'Em até 15 dias',
  '30days': 'Em até 30 dias',
  'anytime': 'Sem pressa'
};

export type Language = 'PR' | 'US' | 'ES';

export const TRANSLATIONS: Record<Language, any> = {
  PR: {
    nav: {
      home: "Início",
      buy: "Quero Comprar",
      dealers: "Revendas",
      dashboard: "Dashboard",
      logout: "Sair"
    },
    hero: {
      tag: "O Futuro da Compra Automotiva",
      title1: "O carro ideal",
      title2: "encontra você.",
      subtitle: "Pare de procurar. Cadastre sua intenção e receba propostas diretas das melhores revendas do país e do exterior.",
      cta_buy: "Quero Encontrar",
      cta_dealer: "Sou uma Revenda"
    },
    footer: {
      tagline: "Conectando intenções reais de compra às melhores oportunidades do mercado global.",
      platform: "Plataforma",
      support: "Suporte",
      compliance: "Compliance"
    }
  },
  US: {
    nav: {
      home: "Home",
      buy: "Buy Now",
      dealers: "Dealers",
      dashboard: "Dashboard",
      logout: "Logout"
    },
    hero: {
      tag: "The Future of Car Buying",
      title1: "Your ideal car",
      title2: "finds you.",
      subtitle: "Stop searching. Register your intent and receive direct proposals from the best dealerships nationwide and abroad.",
      cta_buy: "Find My Car",
      cta_dealer: "I'm a Dealer"
    },
    footer: {
      tagline: "Connecting real buying intent to the best opportunities in the global market.",
      platform: "Platform",
      support: "Support",
      compliance: "Compliance"
    }
  },
  ES: {
    nav: {
      home: "Inicio",
      buy: "Comprar",
      dealers: "Concesionarios",
      dashboard: "Panel",
      logout: "Salir"
    },
    hero: {
      tag: "El Futuro de la Compra de Autos",
      title1: "El coche ideal",
      title2: "te encuentra.",
      subtitle: "Deja de buscar. Registra tu intención y recibe propuestas directas de los mejores concesionarios nacionales y del extranjero.",
      cta_buy: "Encontrar Mi Coche",
      cta_dealer: "Soy un Concesionario"
    },
    footer: {
      tagline: "Conectando la intención de compra real con las mejores oportunidades del mercado global.",
      platform: "Plataforma",
      support: "Soporte",
      compliance: "Cumplimiento"
    }
  }
};
