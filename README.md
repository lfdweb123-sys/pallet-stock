# Pallet Stock

Boutique e-commerce (Next.js + Firebase) pour la vente de lots d'électronique et de
gros électroménager à prix de liquidation. Pas de back-office : le catalogue est
codé en dur dans `lib/products.js`.

## ⚠️ Sécurité — à faire avant tout

Le fichier de clé de service Firebase Admin que tu as partagé dans le chat
(`palletstock-98a52-firebase-adminsdk-fbsvc-...json`) **a été exposé** et doit être
considéré comme compromis :

1. Va dans **Firebase Console → Paramètres du projet → Comptes de service**.
2. Supprime/révoque l'ancienne clé et **génère une nouvelle clé privée**.
3. Utilise cette nouvelle clé uniquement pour remplir les variables
   `FIREBASE_CLIENT_EMAIL` et `FIREBASE_PRIVATE_KEY` dans Vercel (jamais dans un fichier committé).

## Stack

- **Next.js 14** (Pages Router, JavaScript — pas de TypeScript pour éviter les erreurs de build)
- **Tailwind CSS** — design "ticket d'entrepôt" (voir tokens dans `tailwind.config.js`)
- **Firebase** : Firestore (commandes) + Authentication email/mot de passe (compte client optionnel)
- **Brevo** : emails transactionnels (confirmation commande, instructions de virement, paiement reçu/échoué)
- **GeniusPay** : paiement par carte
- **NowPayments** : paiement en cryptomonnaie
- **Virement bancaire** : coordonnées affichées directement après la commande + envoyées par email
- **DeepL** : route `/api/translate` pour traduire du contenu dynamique (l'interface elle-même est déjà traduite IT/FR/EN dans `lib/i18n.js`)
- **Smartsupp** : chat en direct sur la page d'accueil

## Structure du catalogue

Tout le catalogue est dans `lib/products.js`. Pour ajouter, modifier ou retirer un
produit, édite directement ce fichier (slug, prix, stock, description IT/FR/EN) puis
redéploie. Aucune base de données n'est utilisée pour les produits.

## Photos produits

Les visuels actuels sont des **placeholders SVG génériques par catégorie**
(`public/images/products/*.svg`) — je n'ai pas le droit de récupérer des photos de
produits protégées (Sony, Apple, Samsung, Bosch, etc.) sur le web. Pour des photos
réelles :

1. Dépose tes images dans `public/images/products/` (ex. `ps5-slim-digital.jpg`).
2. Mets à jour le champ `image` du produit correspondant dans `lib/products.js`.

## Variables d'environnement

Copie `.env.example` en `.env.local` pour le développement local. En production,
ajoute chaque variable dans **Vercel → Project Settings → Environment Variables**.

Variables clés à configurer avant le lancement :

| Variable | Description |
|---|---|
| `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` | Nouvelle clé de service Firebase Admin (voir section sécurité) |
| `BREVO_API_KEY`, `ADMIN_EMAIL` | Emails transactionnels et notifications admin |
| `GENIUSPAY_API_KEY`, `GENIUSPAY_API_SECRET`, `GENIUSPAY_PROXY_URL` | Paiement carte |
| `NOWPAYMENTS_API_KEY`, `NOWPAYMENTS_IPN_SECRET` | Paiement crypto |
| `DEEPL_API_KEY` | Traduction dynamique (optionnel) |
| `NEXT_PUBLIC_BASE_URL` | URL de production (ex. `https://www.palletstock.com`) |

## Webhooks à configurer chez les fournisseurs

- **GeniusPay** → URL de webhook : `https://TON-DOMAINE/api/geniuspay-webhook`
- **NowPayments** → URL IPN : `https://TON-DOMAINE/api/nowpayments-ipn`

## Firestore

- `firestore.rules` : les commandes ne sont jamais écrites par le client — seules les
  routes `/api/*` (Firebase Admin SDK) peuvent créer/modifier une commande. Le client
  authentifié peut uniquement **lire** ses propres commandes (`uid` correspondant).
- `firestore.indexes.json` : index composite nécessaire pour la page "Mes commandes".

Déploiement des règles (si tu utilises la Firebase CLI) :
```bash
firebase deploy --only firestore:rules,firestore:indexes
```
Sinon, copie simplement le contenu de `firestore.rules` dans Firebase Console →
Firestore Database → Règles.

## Connexion / compte client

La connexion n'est **jamais obligatoire** pour commander. Un client peut créer un
compte (email/mot de passe via Firebase Auth) pour retrouver l'historique de ses
commandes sur `/account/ordini`. S'il est connecté au moment de la commande, son
`uid` est automatiquement associé à la commande.

## Installation locale

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev
```

## Déploiement sur Vercel

1. Pousse ce projet sur GitHub (le fichier `.gitignore` exclut déjà `.env*` et tout fichier de clé Firebase).
2. Importe le repo dans Vercel.
3. Renseigne toutes les variables d'environnement de `.env.example`.
4. Déploie.

## Pages principales

| Route | Description |
|---|---|
| `/` | Accueil (hero, catégories, produits en vedette, chat Smartsupp) |
| `/negozio` | Catalogue complet avec filtres par catégorie |
| `/prodotto/[slug]` | Fiche produit |
| `/carrello` | Panier |
| `/checkout` | Formulaire de commande + choix du paiement |
| `/ordine-confermato` | Confirmation (+ coordonnées bancaires si virement) |
| `/account/accedi`, `/account/registrati`, `/account/ordini` | Compte client optionnel |
| `/legale/privacy`, `/termini`, `/cookie`, `/note-legali` | Pages légales |
| `/contatti` | Contact |

## Limites connues / à prévoir

- Les prix indiqués dans `lib/products.js` sont des estimations de marché — à vérifier/ajuster avant le lancement réel.
- Le chat Smartsupp est inclus uniquement sur la page d'accueil, comme demandé. Pour l'avoir sur tout le site, déplace le composant `<SmartsuppChat />` de `pages/index.js` vers `pages/_app.js`.
- Aucun panneau d'administration : la gestion des commandes se fait via la console Firebase (collection `orders`) et les emails reçus sur `ADMIN_EMAIL`.
