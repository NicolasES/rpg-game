# ⚔️ RPG Game Simulation API

Este é um projeto de simulação de RPG desenvolvido como parte de um portfólio técnico, focado na aplicação de padrões de arquitetura e design de software avançados. A API gerencia a criação de personagens, raças, classes e equipamentos, utilizando princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**.

## 🚀 Tecnologias e Ferramentas

- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicativos eficientes e escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e produtividade.
- **[Prisma ORM](https://www.prisma.io/)**: ORM moderno para interação type-safe com o banco de dados.
- **[MySQL](https://www.mysql.com/)**: Banco de dados relacional para persistência de dados.
- **[Docker](https://www.docker.com/)**: Containerização para facilitar o ambiente de desenvolvimento.
- **[Jest](https://jestjs.io/)**: Framework de testes para garantir a qualidade do código (Unitários e E2E).

## 🏗️ Arquitetura e Design

O projeto foi estruturado seguindo os princípios da **Clean Architecture**, visando a independência de frameworks, testabilidade e separação de preocupações:

1.  **Domain (Domínio)**: Contém o coração do negócio — Entidades, Objetos de Valor e Interfaces de Repositório. É a camada mais interna e não depende de nada externo.
2.  **Application (Aplicação)**: Implementa os Casos de Uso (Use Cases) do sistema, orquestrando o fluxo de dados de e para as entidades.
3.  **Infrastructure (Infraestrutura)**: Implementações técnicas detalhadas, como persistência em banco de dados (Prisma), integração com drivers externos e serviços.
4.  **Presentation (Apresentação)**: Controladores NestJS (Controllers) que lidam com as requisições HTTP e devolvem as respostas ao cliente.

### Princípios Aplicados:
*   **DDD**: Modelagem rica orientada ao domínio.
*   **SOLID**: Código limpo, extensível e de fácil manutenção.
*   **Dependency Injection**: Utilizada nativamente via NestJS para desacoplamento de classes.

## 🛠️ Como Executar o Projeto

### Pré-requisitos
*   Docker e Docker Compose instalados.
*   Node.js instalado (opcional, se rodar fora do Docker).

### Passo a Passo

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/NicolasES/rpg-game.git
    cd rpg-game
    ```

2.  **Suba os containers da aplicação**:
    ```bash
    docker compose up -d
    ```

3.  **Instale as dependências locally (se necessário para o VS Code)**:
    ```bash
    cd api
    npm install
    ```

4.  **Execute as Migrations e o Seed**:
    ```bash
    # Dentro do container ou localmente, se configurado
    npx prisma migrate dev
    ```

## 🧪 Testes

O projeto conta com cobertura de testes para garantir a confiabilidade das regras de negócio:

*   **Testes Unitários**: Focados nas entidades e lógica de domínio.
    ```bash
    npm run test
    ```
*   **Testes E2E (End-to-End)**: Validando o fluxo completo da API.
    ```bash
    npm run test:e2e
    ```

## 📝 Documentação da API

Principais rotas implementadas:
*   `POST /character`: Criação de um novo personagem vinculando raças e classes.
... em construção.

---
Desenvolvido por **Nicolas ES**.
