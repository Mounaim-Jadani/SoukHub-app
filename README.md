# SoukHub

SoukHub est une application e-commerce MERN composée de :

- **Frontend** : React 18, React Router, Redux Toolkit, Tailwind CSS et Axios.
- **Backend** : Node.js, Express, Mongoose, JWT, Multer et Nodemailer.
- **Base de données** : MongoDB.
- **Développement local** : Mailpit fournit une boîte mail de test pour les liens d'activation.

Le dépôt contient deux projets Node séparés : le backend utilise le `package.json` à la racine et le frontend utilise `frontend/package.json`.

## Ouvrir le site avec Docker

### Prérequis

- Docker Desktop ou Docker Engine avec Docker Compose v2 (`docker compose`).
- Git, si le projet vient d'un dépôt Git.

### Démarrage

Depuis le dossier racine de SoukHub :

```bash
docker compose up --build
```

Pour démarrer en arrière-plan :

```bash
docker compose up --build -d
```

Les valeurs locales de MongoDB, JWT et Mailpit possèdent des valeurs par défaut
dans Compose. Pour les remplacer, crée un fichier `.env` à la racine (il ne
doit pas être commité) et définis par exemple `JWT_SECRET_KEY` et
`ACTIVATION_SECRET`.

Le premier démarrage télécharge les images Docker et installe les dépendances des deux applications. Il peut donc prendre quelques minutes.

### URLs à ouvrir dans le navigateur

Une fois les conteneurs démarrés, ouvre :

- **Site SoukHub** : <http://localhost:3000>
- **Vérification du backend** : <http://localhost:8000/health>
- **Boîte mail de test** : <http://localhost:8025>

La boîte mail Mailpit reçoit les emails d'activation envoyés pendant le développement. Aucun vrai email n'est envoyé.

### Commandes utiles

```bash
# Voir l'état des services
docker compose ps

# Voir les logs du backend
docker compose logs -f backend

# Arrêter les services sans supprimer les données
docker compose down

# Arrêter et supprimer aussi MongoDB et les uploads persistants
docker compose down -v
```

Les mêmes actions sont disponibles avec `make docker-up`, `make docker-down`
et `make docker-logs`.

Les données MongoDB sont stockées dans `mongo_data` et les images uploadées dans `uploads_data`.

## Installation locale sans Docker

Le runtime recommandé est Node.js **18.20.8**, indiqué dans `.nvmrc`.

### Backend

```bash
npm ci
cp backend/config/.env.example backend/config/.env
npm start
```

Le backend écoute sur <http://localhost:8000>. Cette méthode nécessite une instance MongoDB locale accessible par `DB_URL`.

### Frontend

Dans un deuxième terminal :

```bash
cd frontend
npm ci
npm start
```

Le frontend de développement s'ouvre sur <http://localhost:3000>. Les URLs API peuvent être changées avec `REACT_APP_API_URL` et `REACT_APP_BACKEND_URL` avant le démarrage.

## Vérifications

Après installation des dépendances :

```bash
make test
make build
```

`make test` vérifie la syntaxe du backend et exécute le test frontend sans mode watch. `make build` compile le frontend de production.

## Fonctionnalités présentes

- Navigation d'accueil, catalogue, produits les plus vendus, événements et FAQ.
- Inscription et connexion utilisateur.
- Création et connexion vendeur avec activation par email.
- Dashboard vendeur pour gérer produits, événements et coupons.
- Profil utilisateur, panier, checkout et pages de paiement déjà présentes dans l'interface.
- Upload d'avatars et d'images dans le dossier persistant `uploads`.

## Points à prévoir pour une version réellement prête à la production

L'analyse du code montre que certaines fonctions affichées dans l'interface ne sont pas encore un flux métier complet :

1. Le panier et les totaux du paiement contiennent encore des données statiques dans plusieurs composants.
2. Aucun endpoint backend de commande/paiement complet n'est actuellement défini.
3. Les reviews, ratings et recommandations décrits par l'ancien README ne sont pas encore implémentés côté API.
4. Les secrets présents dans `docker-compose.yml` sont uniquement des valeurs locales de démonstration ; ils doivent être remplacés par des variables secrètes en production.
5. Il faut ajouter des tests d'intégration pour l'inscription, l'activation, l'authentification, les uploads et le checkout.

Pendant le développement, le formulaire de création d'événement et son retour
API sont maintenant compatibles avec le flux Redux. La protection complète des
ressources vendeur, les commandes et le paiement restent à finaliser.

La prochaine étape recommandée est de choisir un seul flux métier à finaliser, par exemple **panier réel → création de commande → paiement**, puis de le développer et le tester de bout en bout.
