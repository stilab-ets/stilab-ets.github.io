# 🧪 Research Lab Web Platform

Une plateforme web interactive pour centraliser, gérer et valoriser les activités scientifiques d’un laboratoire de recherche en génie logiciel.

## 🎯 Objectif du projet

Ce projet vise à concevoir et développer un site web structuré pour un laboratoire de recherche. L’objectif est de centraliser les informations clés du laboratoire et d’en faciliter la gestion et la diffusion, tant en interne qu’à destination de la communauté scientifique et industrielle.

## Environnement de développement

Afin de créer un environnement de dévelopement local conteneurisé, il faut:

1. Installer [Docker](https://www.docker.com/products/docker-desktop/).
2. Créer un fichier `.env` et y ajouter les variables d'environnement suivantes:

```yaml
DB_USER=CHANGEZ_MOI
DB_PASSWORD=CHANGEZ_MOI
```

3. Utiliser la commande `docker compose up`.

La base de données sera disponible au `localhost:5432` et pgAdmin au `localhost:5050`.

Les identifiants de connexion à pgAdmin sont:

Utilisateur: `admin@admin.com`
Mot de passe: `admin123`

## 🚀 Fonctionnalités clés (prévisionnelles)

-   🔬 Gestion des **projets de recherche** (en cours / terminés) avec objectifs, participants, etc.
-   👩‍🔬 Répertoire des **chercheurs** (professeurs, doctorants, étudiants), spécialités, affiliations.
-   👤 Système d’**authentification** et gestion des **profils utilisateurs**.
-   📚 Administration des **publications scientifiques** (articles, thèses, conférences, etc.).
-   📰 Publication de **nouvelles et événements** : workshops, séminaires, prix, recrutements.
-   🛠️ **Dashboard d’administration** pour la gestion des utilisateurs et des contenus.
-   🧩 Évolutif : les étudiants et utilisateurs peuvent proposer de nouvelles fonctionnalités.

## 🏗️ Stack technologique envisagée

| Layer            | Technologie possible                  |
| ---------------- | ------------------------------------- |
| Frontend         | React + TypeScript                    |
| Backend          | Node.js / Express (ou NestJS)         |
| Authentification | JWT, OAuth, ou Firebase Auth          |
| Base de données  | PostgreSQL / MongoDB                  |
| DevOps           | Docker, GitHub Actions, Vercel/Render |
| Tests            | Jest, Playwright, ESLint              |

> Un choix raisonné des technologies sera réalisé au cours du projet en fonction des besoins, des performances attendues, de la sécurité et des coûts.

## 📁 Structure prévue du projet

```bash
src/
├─ components/
│  └─ ResearchProjects/
│      ├─ ResearchProjects.tsx
│      ├─ hooks/
│      ├─ services/
│      └─ subcomponents/
├─ modules/
├─ lib/
├─ test/
└─ resources/
```

🧪 Qualité & DevOps

    CI/CD avec GitHub Actions

    Couverture de tests automatisée

    Suivi des bonnes pratiques de sécurité (auth, données, accès)

    Documentation du code et de l'architecture

📄 Licence

Ce projet est sous licence [MIT](LICENSE.txt).

✨ Ce projet est amené à évoluer. Les membres de l'équipe sont encouragés à proposer de nouvelles idées ou fonctionnalités.
