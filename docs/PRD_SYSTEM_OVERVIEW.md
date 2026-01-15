
# AutoMatch - Visão Geral do Sistema

## Objetivo
Conectar compradores de veículos a revendas através de leads de alta intenção, eliminando o ruído das buscas tradicionais.

## Arquitetura de Módulos

### 1. Buyer Engine (B2C)
*   **Função**: Captação de intenção de compra.
*   **Rota**: `/#/cadastrar`
*   **Vínculo**: Gera leads para o ecossistema.

### 2. Dealer Marketplace (B2B)
*   **Função**: Painel para lojistas e gestão de leads.
*   **Rotas**: `/#/dealer/login`, `/#/dealer/dashboard`
*   **Vínculo**: Consome o Finance Engine para recargas.

### 3. Finance Engine (Stripe Integration)
*   **Função**: Processamento de pagamentos e conciliação de créditos.
*   **Tecnologia**: Stripe API (Checkout + Webhooks).
*   **Vínculo**: Libera créditos no Dealer Marketplace após confirmação de pagamento.

### 4. Admin Core (Backoffice)
*   **Função**: Auditoria financeira e gestão global.
*   **Vínculo**: Monitora transações do Finance Engine.

## Fluxo de Dados
[Comprador] -> [Lead] -> [Lojista] -> [Pagamento Stripe] -> [Crédito Liberado] -> [WhatsApp Match]
