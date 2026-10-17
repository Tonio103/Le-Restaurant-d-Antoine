# Le restaurant d'Antoine

Site de recettes de famille : quantités ajustables, mode cuisine pas à pas, minuteurs,
liste de courses, assistant du chef et mini-jeux. Site statique (HTML, CSS, JavaScript),
sans étape de compilation.

## Tester en local

Depuis le dossier du projet :

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Organisation des fichiers

| Fichier | Rôle |
| --- | --- |
| `recettes-data.js` | **Toutes les recettes** : textes, ingrédients, étapes, minuteurs, astuces, allergènes, origines et sources. |
| `site.js` | En-tête, pied de page, accueil, pages recettes, mode cuisine, minuteurs, liste de courses, recherche. |
| `site.css` | Direction artistique (couleurs, typographies, thème clair/sombre, animations). |
| `chatbot.js` | Assistant du chef (fonctionne dans le navigateur, sans IA ni envoi de données). |
| `likes-firebase.js`, `reviews-firebase.js` | Likes des recettes et livre d'or (Firebase Firestore : collections `likes` et `reviews`). |
| `jeux.css`, `jeu-memory.js`, `jeu-quiz.js`, `jeu-commandes.js` | Les mini-jeux Memory, Quiz et Coup de feu. |
| `index2.html`, `game-animated.js`, `styles.css`, `assets/` | Le jeu de course « Service infini ». |
| `img/` | Photos optimisées au format WebP (grand format + vignette `-640`). Les photos d'origine sont conservées à la racine. |

## Modifier une recette

Tout se passe dans `recettes-data.js` : change le texte voulu, enregistre, c'est tout.
Les quantités sont recalculées automatiquement selon le nombre de portions.

- `qte: null` affiche la note à la place d'une quantité (ex. « selon le goût »).
- `fixe: true` garde la même quantité quel que soit le nombre de portions (ex. une pincée de sel).
- `optionnel: true` affiche l'étiquette « option ».
- `minuteurs: [{ secondes: 600, label: "Cuisson" }]` ajoute un bouton minuteur à une étape.

## Recettes sans photo : couvertures illustrées

Une recette dont la liste `images` est vide reçoit automatiquement une couverture dessinée
(champ `cover` : `motif`, `fond`, `encre`, `accent`). Motifs disponibles : `cocotte`, `plat-four`,
`assiette`, `bol`, `tarte`, `verre`, `tasse`, `poele`, `ramequin`, `biscuit`, `cloche`, `poisson`, `gateau`, `coquille`, `coupe`.
Dès que tu ajoutes une photo dans `images`, elle remplace la couverture partout.

Le champ `alias` (facultatif) liste d'autres façons de nommer la recette, pour l'assistant
(ex. `["quiche", "quiche lorraine"]`).

## Ajouter une recette

1. Dans `recettes-data.js`, copie un bloc de recette complet et change la `key`
   (sans accent ni espace), le `url`, les textes et les images.
2. Copie une page recette existante (par exemple `crepes.html`), renomme-la comme le `url`,
   et change `data-recipe="crepes"` par la nouvelle `key` (ainsi que le titre et la description).
3. Ajoute tes photos dans `img/` (WebP conseillé, mais PNG et JPG fonctionnent aussi).

La recette apparaît alors automatiquement sur l'accueil, dans la recherche, l'assistant,
la page Origines et les jeux.

## Données gardées dans le navigateur

Le thème, les minuteurs, la liste de courses, la progression des recettes et les records
des jeux sont enregistrés dans le navigateur du visiteur (`localStorage`) : rien n'est envoyé
sur un serveur. Seuls les likes et les avis passent par Firebase, et le formulaire de questions
par Formspree.

## Mises à jour et cache des navigateurs

Les pages chargent les fichiers CSS et JavaScript avec un numéro de version
(`site.css?v=20261017-4`). Après une modification de ces fichiers, change ce numéro
dans les pages HTML pour que les visiteurs reçoivent tout de suite la nouvelle version.
