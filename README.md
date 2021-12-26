# Projet : Eval-EM-T1-2021 - Bug Report tickets

## Url de Démo : https://eval-em-t1-2021.vercel.app/

## Installation local :

> `$ npm install && npm run dev`

-   #### 01. [Description](#01)
-   #### 02. [Stack technique utilisée](#02)
    -   ##### [Stack technique](#02-1)
    -   ##### [Liste des API's REST](#02-1)
-   #### 03. [Liste des librairies](#03)
    -   ##### [Utilitaires](#03-1)
    -   ##### [Configuration](#03-2)
-   #### 04. [Parcours utilisateur / Features](#04)
    -   ##### [Accès à l'application](#04-1)
    -   ##### [Pages](#04-2)

<a name='01'></a>

## 01. Description

Vous devez réaliser la partie front d’un outil de tracé de bug.

Cette application web permet à une équipe de développeurs de consigner une liste de bug et de les traiter méthodiquement.

La partie serveur est prête, il vous faut réaliser la partie client.

Objectifs Vous devez effectuer l’intégration des pages de l’application en HTML, CSS et Javascript et gérer la communication avec le serveur.

<a name='02'></a>

## 02. Stack technique utilisée

<a name='02-1'></a>

### Pourquoi cette stack technique ?

##### <u>Vue.js v3 </u> : Selon le brief, Il est précisé que l'on peux utiliser tout les frameworks JS que l'on souhaite, et comme au cours de mes années de formation à l'école multimédia, j'ai déjà réalisé ce genre de projets en HTML/Js jQuery ainsi que React.js, et que cette année, nous allons pratiquer du Vue.js, j'ai donc décidé de profiter de ce petit projet pour mon apprendre à utiliser de manière basique "Vue.js" avec "Vite.js", framework que je n'ai encore jamais utilisé.

##### <u>Framework Vite </u> : Framework leger compatible avec Vue3

##### <u>Less </u> : Je n'avais jamais utilisé le préprocesseur Css "Less", j'ai voulu essayer. Je n'ai pas souhaité intégrer des librairies d'UI comme Vuetify ou Quasar, car cela aurait donné un résultat trop différent des compétences évalués, ducoup mes composants vue sont semblables à du Html/CSS basique.

##### <u>jQuery</u> : Malré que l'utilisation de jQuery est non recommandé avec Vue.js, J'ai choisi d'inclure jQuery pour répondre au critère évalué :

> Qualité du JQuery - Bonne utilisation de la bibliothêque JQuery, gestionnaires d'évènements, traversing

##### J'ai donc inclus des "traversing", des gestions d'évenements. Les éléments gérés en jquery sont :

##### - L'animation de changement de status

##### - L'animation de transition de pages

##### - Le bouton ScrollToTop

##### Stack technique

| Utilisation              | Nom                 |
| ------------------------ | ------------------- |
| Front-end                | Javascript / Vue.js |
| Design                   | Less                |
| Bundler                  | Vite                |
| Déploiement & Production | Vercel              |
| Repo                     | Github              |

<a name='02-1'></a>

##### Liste des API's REST

| Nom            | Language | Documentation                                             |
| -------------- | -------- | --------------------------------------------------------- |
| API BugTracker | Node.js  | http://greenvelvet.alwaysdata.net/bugTracker/doc/api.html |

<a name='03'></a>

## 03. Liste des librairies

<a name='03-1'></a>

##### Utilitaires

| Nom                                                | Utilisation         |
| -------------------------------------------------- | ------------------- |
| "vue": "^3.2.25"                                   | Basique / Version 3 |
| "vite": "^2.7.2" / "@vitejs/plugin-vue" : "^2.0.0" | Framework Vue.js    |
| "vue-router": "^4.0.12"                            | Router Vue          |
| "vue-toastification": "^2.0.0-rc.5"                | Notifications       |
| "less": "^4.1.2"                                   | Préprocesseur CSS   |

<a name='03-2'></a>

##### Configuration

Toutes les librairies ci-dessous sont utilisés pour la configuration :

        "@vue/cli-plugin-babel": "5.0.0-beta.7",
        "@vue/cli-service": "^4.5.15",
        "eslint": "^8.5.0",
        "eslint-config-prettier": "^8.3.0",
        "eslint-plugin-vue": "^8.2.0",
        "prettier": "2.5.1"

<a name='04'></a>

## 04. Parcours utilisateur / Features

<a name='04-1'></a>

### Accès à l'application :

L'utilisateur doit renseigner ses identifiants pour accéder aux services de l'application. ( Pages "Liste des bugs" et "Ajout d'un bug") L'utilisateur a accès aux pages de connexion et d'inscription si il n'est pas connecté

<a name='04-2'></a>

### Pages :

<a name='04-2-1'></a>

#### - Page de connexion

Sur cette page, l'utilisateur peut renseigner son identifiant ainsi que son mot de passe pour se connecter à l'application, s'il n'a pas de mot de passe, il peut se rendre sur la page d'inscription. Un lien du repo github est aussi présent. Ces trois champs sont requis.

#### - Page d'inscription

Sur cette page, l'utilisateur peut s'inscrire à l'application en renseignant un identifiant ainsi que son mot de passe en double. Ces deux champs sont requis. L'utilisateur ne peut pas créer un compte avec un identifiant déjà utilisé par un autre compte. Une fois validé, l'utilisateur est connecté automatiquement à l'application.

#### - Page principale ( Liste des bugs )

Sur cette page, l'utilisateur peut voir tous les bugs de tous les utilisateurs, changer leurs états ou bien les supprimer. Un compteur dans la Navbar indique le nombre de bugs selon l'affichage.Malgré que les informations se modifient en fonction des interactions de l'utilisateur, la liste des bugs se rafraîchit automatiquement toutes les 30 secondes pour prévenir des changements faits par les autres personnes ( ne pas surcharger d'appels aussi ).

#### - Page principale ( Liste des bugs de l'utilisateur )

Sur cette page, l'utilisateur peut voir tous les bugs ayant été créés par lui-même, changer leur état ou bien les supprimer. Un compteur dans la Navbar indique le nombre de bugs selon l'affichage. Malgré que les informations se modifient en fonction des interactions de l'utilisateur, la liste des bugs se rafraîchit automatiquement toutes les 30 secondes pour prévenir des changements faits par les autres personnes ( ne pas surcharger d'appels aussi ).

#### - Page d'ajout de bug

Sur cette page, l'utilisateur peut créer un nouveau bug en lui donnant un titre et une description, puis en appuyant sur le bouton "Sauvegarder le nouveau bug". Ces deux champs sont requis.
