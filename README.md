# Guardião Atento

O Guardião Atento é um sistema de monitoramento para idosos que permite o acompanhamento em tempo real de sinais vitais, localização e status geral do paciente. O sistema foi desenvolvido com foco na usabilidade e acessibilidade, oferecendo uma interface intuitiva para cuidadores e familiares.

## Funcionalidades

- **Monitoramento de Sinais Vitais**: Acompanhamento em tempo real de:
  - Frequência cardíaca
  - Pressão arterial
  - Temperatura corporal
  - Saturação de oxigênio

- **Rastreamento de Localização**: 
  - Visualização da localização atual
  - Sistema de geocerca
  - Alertas de saída da área segura

- **Sistema de Notificações**:
  - Alertas de sinais vitais anormais
  - Lembretes de medicação
  - Notificações de atividades

- **Botão de Emergência**:
  - Acionamento rápido de socorro
  - Confirmação para evitar falsos alarmes

- **Interface Responsiva**:
  - Adaptação para diferentes tamanhos de tela
  - Design moderno e intuitivo
  - Alta acessibilidade

## Tecnologias Utilizadas

- React 18
- TypeScript
- Material-UI v5
- Emotion (Styled Components)

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/guardiao-atento.git
```

2. Entre no diretório do projeto:
```bash
cd guardiao-atento
```

3. Instale as dependências:
```bash
npm install
```

4. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

5. Inicie o servidor de desenvolvimento:
```bash
npm start
```

## Estrutura do Projeto

```
src/
  ├── components/         # Componentes React
  │   ├── Header/        # Cabeçalho com notificações
  │   ├── HealthCards/   # Cards de sinais vitais
  │   ├── LocationMap/   # Mapa de localização
  │   ├── PatientStatus/ # Status do paciente
  │   └── SOSButton/     # Botão de emergência
  ├── styles/            # Estilos globais e tema
  │   ├── global.css     # Estilos globais
  │   └── theme.ts       # Configuração do tema
  └── types.ts           # Tipos TypeScript
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- Autor: Seu Nome
- Twitter: [@seutwitter](https://twitter.com/seutwitter)
- Email: seu.email@exemplo.com
- Link do projeto: [https://github.com/seu-usuario/guardiao-atento](https://github.com/seu-usuario/guardiao-atento)
