# Externalisation des textes en JavaScript

## 1\. Pourquoi externaliser les textes ?

L'externalisation consiste à sortir les textes écrits directement dans le code HTML ou JavaScript pour les stocker dans des fichiers séparés.

Au lieu d'écrire :



```html
<h1>Planet Pulse</h1>
```

On stocke le texte dans un fichier JSON et on le récupère avec une fonction :



```js
<h1>${externalization("homepage.title")}</h1>
```

**Avantages :**

- Centraliser les textes de l'application.
- Faciliter leur modification.
- Éviter de répéter les textes dans plusieurs composants.
- Préparer l'application à prendre en charge plusieurs langues.

## 2\. Externalization vs. Internationalization (i18n)

**Externalization** : sortir les textes du code et les placer dans des fichiers séparés.

**Internationalization (i18n)** : concevoir l'application pour qu'elle puisse s'adapter à différentes langues et conventions culturelles.

L'externalisation est une première étape vers l'internationalisation, mais elle ne suffit pas à elle seule pour gérer plusieurs langues.

Par exemple, on pourra plus tard remplacer `en.json` par `fr.json` selon la langue choisie.

## 3\. Séparer les responsabilités

Chaque fichier a un rôle précis.



```text
frontend/
├── assets/
│   └── locales/
│       └── en.json
└── src/
    ├── services/
    │   └── externalization.js
    └── components/
        ├── Header.js
        └── HomePage.js
```

- `assets/locales/en.json` : contient les textes anglais.
- `services/externalization.js` : récupère les textes à partir de leurs clés.
- `components/` : construit l'interface et utilise les textes récupérés.

Les données sont séparées de la logique qui les utilise.

## 4\. Le fichier JSON

Notre fichier `en.json` contient les textes regroupés par section :



```json
{
  "header": {
    "title": "🌍 Planet Pulse",
    "home": "Home",
    "countries": "Countries"
  },
  "homepage": {
    "title": "Planet Pulse",
    "subtitle": "Track various environmental indicators by country"
  },
  "import": {
    "button": "Import Countries 🌍"
  }
}
```

Le format JSON permet de stocker des données structurées.

Ici, les textes sont organisés dans des objets imbriqués (_nested objects_). Cette organisation facilite la lecture et la maintenance lorsque le nombre de textes augmente.

Attention : JSON contient des données, pas des fonctions JavaScript.

## 5\. Importer le JSON dans JavaScript

Dans `externalization.js` :



```js
import en from "../../assets/locales/en.json"
    with { type: "json" };
```

Cette syntaxe utilise les attributs d'importation pour charger le fichier JSON comme module.

La variable `en` contient l'objet JavaScript correspondant aux données du fichier.

Il n'est pas nécessaire d'utiliser `fetch()` pour cette approche.

L'importation est directement liée au module JavaScript. Selon l'environnement et la configuration du projet, la prise en charge de cette syntaxe doit être vérifiée.

## 6\. Créer la fonction d'externalisation



```js
import en from "../../assets/locales/en.json"
    with { type: "json" };

export default function externalization(externalizedText) {
    const externalizationParameters = externalizedText.split(".");
    const section = externalizationParameters[0];
    const element = externalizationParameters[1];

    return en[section][element];
}
```

Cette fonction reçoit une chaîne de caractères, par exemple `"header.title"`.

Elle effectue quatre opérations :

1. `.split(".")` sépare la chaîne au niveau du point.
2. `section` récupère la première partie : `"header"`.
3. `element` récupère la seconde partie : `"title"`.
4. `en[section][element]` récupère le texte dans le JSON.

Résultat :



```js
externalization("header.title");
// "🌍 Planet Pulse"

externalization("import.button");
// "Import Countries 🌍"
```

Cette fonction est indépendante : une fonction simple suffit, sans créer de classe ni de méthode.

## 7\. Comprendre la notation par crochets

En JavaScript, on peut accéder aux propriétés d'un objet de deux façons.

Avec la notation par points :



```js
en.header.title
```

Avec la notation par crochets :



```js
en["header"]["title"]
```

Ces deux expressions accèdent à la même valeur.

La notation par crochets est particulièrement utile lorsqu'on utilise des variables :



```js
const section = "header";
const element = "title";

en[section][element];
```

Le résultat est `"🌍 Planet Pulse"`.

Dans notre fonction, les crochets permettent donc de récupérer dynamiquement les propriétés.

## 8\. Pourquoi ne pas utiliser directement un point ?

Il existe deux manières d'organiser les clés.

### JSON imbriqué — notre choix actuel



```json
{
  "header": {
    "title": "🌍 Planet Pulse"
  }
}
```

On utilise :



```js
en[section][element]
```

### JSON plat — une autre possibilité



```json
{
  "header.title": "🌍 Planet Pulse"
}
```

On utilise alors :



```js
en["header.title"]
```

Dans un objet plat, `"header.title"` est une seule clé. JavaScript n'interprète pas automatiquement le point comme un chemin vers un objet imbriqué.

Les deux approches sont valides. Le choix dépend de l'organisation souhaitée et des outils de traduction utilisés. Dans notre projet, nous conservons le JSON imbriqué.

## 9\. Utiliser la fonction dans les composants

Dans chaque composant, on importe la fonction :



```js
import externalization
    from "../../services/externalization.js";
```

Puis on l'utilise dans le template.

Exemple dans `Header.js` :



```js
${externalization("header.title")}
${externalization("header.home")}
${externalization("header.countries")}
```

Exemple dans `HomePage.js` :



```js
${externalization("homepage.title")}
${externalization("homepage.subtitle")}
```

Exemple dans `ImportCountries.js` :



```js
${externalization("import.button")}
```

Les composants ne contiennent donc plus directement les textes anglais : ils demandent à la fonction de les récupérer.

## 10\. Pourquoi exporter la fonction ?

Dans `externalization.js`, on écrit :



```js
export default function externalization(...) {
    // ...
}
```

Cela permet aux autres modules d'importer et d'utiliser cette fonction.

Par exemple :



```js
import externalization
    from "../../services/externalization.js";
```

Il faut distinguer deux choses :

- Le JSON est importé dans le service.
- La fonction est exportée vers les composants.

Les composants n'ont pas besoin d'importer directement le JSON.

## 11\. Points à retenir

- **Externalisation** : séparer les textes du code.
- **Internationalisation** : préparer l'application à différentes langues et conventions culturelles.
- **JSON** : stocker les textes sous forme de données structurées.
- **Fonction indépendante** : récupérer un texte à partir d'une clé.
- **`split(".")`** : séparer une clé en plusieurs parties.
- **Notation par crochets** : accéder à une propriété à partir d'une chaîne ou d'une variable.
- **`import`** : rendre un module disponible dans un autre module.
- **`export default`** : exposer la fonction pour permettre son importation ailleurs.

### Limite actuelle

La fonction suppose que chaque clé possède exactement deux parties et que la section ainsi que le texte existent. Une clé inconnue peut provoquer une erreur.

Pour un premier projet, cette solution est suffisante et facile à comprendre. On pourra ajouter une gestion des clés manquantes et du changement de langue lorsque ce sera nécessaire.