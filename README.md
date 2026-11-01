# ClientHub

Application de gestion client de Théo Bourgoin ([Psyker](https://github.com/Psyker)).

La première version vise la gestion des clients et contacts, des interventions
et des licences logicielles, avec un compte utilisateur authentifié.
Le mode SaaS et la facturation sont reportés. L'application web et l'API précèdent
la future application iPhone et le serveur MCP.

## Structure

- `backend/` : Laravel, Lighthouse GraphQL, Sanctum et Socialite.
- `frontend/` : Next.js et Panda CSS.
- `mobile/` : base Expo/React Native pour la future application iPhone.

## Installation

Prérequis : Node.js indiqué dans `.nvmrc`, Corepack et Docker avec intégration WSL
activée si nécessaire.

```shell
git clone https://github.com/Psyker/clienthub.git
cd clienthub
nvm use
corepack enable
corepack install
pnpm install --frozen-lockfile
```

Depuis `backend/`, installer les dépendances PHP :

```shell
cd backend
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/app" \
    -w /app \
    composer:latest \
    composer install --ignore-platform-reqs
cp .env.example .env
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
```

Ne copier `.env` et ne générer la clé que lors de la première installation.
Si l'environnement local existe déjà et que le bootstrap Composer échoue faute
d'extension Redis, terminer l'installation avec `./vendor/bin/sail composer install`
après le démarrage de Sail.

Depuis la racine du dépôt, démarrer le web :

```shell
pnpm --filter @clienthub/frontend dev
```

- Web : http://localhost:3000
- API GraphQL : http://localhost:8000/graphql
- Mailpit : http://localhost:8025

Les identifiants OAuth doivent être configurés pour utiliser les connexions
correspondantes. Le starter ne crée pas automatiquement le compte personnel.

## Vérifications

Depuis la racine :

```shell
pnpm --filter @clienthub/frontend lint
pnpm --filter @clienthub/frontend ts:check
pnpm --filter @clienthub/frontend test:ci
pnpm --filter @clienthub/frontend build
pnpm --filter @clienthub/backend test:ci
pnpm test:security
```

Le patch `patches/deepmerge@4.3.1.patch` protège la fusion des objets contre
la pollution de prototype décrite dans
[GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4).
L'audit npm continue à signaler la version amont, car il ne tient pas compte de
ce patch local. L'alerte n'est pas ignorée ; `pnpm test:security` couvre le scénario
vulnérable et la compatibilité d'Expo CLI avec la version corrigée de Zod.
Le patch devra être retiré lorsqu'un correctif amont vérifié sera disponible.

## Mobile

```shell
pnpm --filter @clienthub/mobile dev
```

Les identifiants natifs prévus sont `com.psyker.clienthub`. Ils restent à
confirmer lors de la configuration des comptes développeur et de la signature.
Le projet n'est lié à aucun propriétaire Expo/EAS. Il sera associé au compte
retenu lors de la préparation des builds iPhone. Le schéma URL Google iOS du
starter (`<YOUR_IOS_URL_SCHEME>`) reste à remplacer par celui de ton client OAuth
avant de résoudre la configuration native et de construire l’application.
Les icônes mobiles sont encore
les visuels génériques du starter. Le code Android du starter reste disponible.

## Provenance

Ce projet est basé sur [LaraStack](https://github.com/Liinkiing/larastack),
créé par Omar Jbara ([Liinkiing](https://github.com/Liinkiing)), importé au commit
`7aa218b71f4477ce98cc265d71cbc3988349803f`.
Les licences et crédits des dépendances et ressources tierces sont conservés.
