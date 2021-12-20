# Projet : Eval-EM-T1-2021 - Bug Report tickets

## Url de visualisation :

-   #### 01. [Description](#01)
-   #### 02. [Stack utilisée](#02)
    -   ##### [Stack](#02-1)
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

Vous trouverez la documentation du service ici : http://greenvelvet.alwaysdata.net/bugTracker/index.html

Objectifs Vous devez effectuer l’intégration des pages de l’application en HTML, CSS et Javascript et gérer la communication avec le serveur.

<a name='02'></a>

## 02. Stack utilisée

<a name='02-1'></a>

### Important !

#### Il est bien dit que l'on peux utiliser tout les frameworks JS que l'on souhaite, et comme j'ai déjà fait ce genre de projets en HTML/Js Natif ainsi que React.js, et que cette année, nous allons pratiquer du Vue.js, j'ai donc décidé de profiter de ce petit projet pour mon apprendre à utiliser de manière basique "Vue.js" avec "Vite.js", framework que je n'ai encore jamais utilisé.

#### ( Utilisation de Vue.js v3 )

#### J'ai aussi choisi d'utiliser pour les styles, le préprocesseur CSS "Less" (https://lesscss.org/), non pas que c'est nécessaire, mais j'avais envie d'essayer, car comme pour Vue.js, je ne l'ai pas encore pratiqué.

##### Stack

| Utilisation              | Nom                 |
| ------------------------ | ------------------- |
| Front-end                | Javascript / Vue.js |
| Design                   | Scss                |
| Bundler                  | Webpack             |
| Déploiement & Production | Vercel              |
| Repo                     | Github              |

<a name='02-1'></a>

##### Liste des API's REST

| Nom       | Language | Documentation                                        |
| --------- | -------- | ---------------------------------------------------- |
| API Kwick | Node.js  | http://greenvelvet.alwaysdata.net/kwick/doc/api.html |

<a name='03'></a>

## 03. Liste des librairies

<a name='03-1'></a>

##### Utilitaires

| Nom                                                | Utilisation                      |
| -------------------------------------------------- | -------------------------------- |
| "vue": "^3.2.25"                                   | Basique Javascript               |
| "vite": "^2.7.2" / "@vitejs/plugin-vue" : "^2.0.0" | Framework Vue.js                 |
| "axios": "^0.21.4",                                | Appels API REST                  |
| "vue-toastify": "^1.8.1"                           | Fonctionalités des notifications |

<a name='03-2'></a>

##### Configuration

Toutes les librairies ci-dessous sont utilisés pour la configuration :

\_

<a name='04'></a>

## 04. Parcours utilisateur / Features

<a name='04-1'></a>

### Accès à l'application :

L'utilisateur doit rensiegner ses identifiants pour accéder aux services de l'application

<a name='04-2'></a>

### Pages :

<a name='04-2-1'></a>

#### - Page de connexion

\_Sur cette page, l'utilisateur peux

#### - Page d'inscription

\_Sur cette page, l'utilisateur peux

#### - Page principale ( Liste des bugs )

\_Sur cette page, l'utilisateur peux

#### - Page d'édition de bug

\_Sur cette page, l'utilisateur peux
