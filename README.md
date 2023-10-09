# Djoky

Djoky est une application web, que je fais afin de me challenger sur mes compétences web. Elle permettra de gérer une liste d'exercices, principalement de musculations et d'afficher pour chaque utilisateur les séances de sport qu'il a fait. En bonus, je vais essayer d'afficher un petit suivi statistiques des informations récoltées dans le temps.

Etant moi même un sportif je trouve le projet très enrichissant car je vais pouvoir l'utiliser, et le faire évoluer à mon rythme.

## FRONT END

Ce projet est réalisé avec **Nextjs 13.4.10** et entièrement en typescript car le langage oblige d'avoir une certaine rigueur au niveau du code, que je trouve quasi indispensable pour maintenir un projet dans le temps.

J'ai voulu découvrir la component librairy **ChakraUI** qui de loin me semblait être simple et rapide. Je suis satisfait du résultat pour l'instant je n'ai pas eu d'obstacles insurmontables.
## BACK END

Le projet fonctionne avec une api en back end, entièrement développée en **nodejs** avec le framework **Nestjs**

Le projet est en `private` car il est le fruit de nombreuses heures de formations, de recherches et de synthétisation des informations autour du framework.

Peut être que je le changerai à l'avenir... après tout le concept d'API REST en lui même reste quelque chose de simple. Nestjs n'est qu'un moyen d'y parvenir mais qui possède un écosystème de fonctionnalités très utile et impressionant.


## Exemple .env.local

```bash
NEXT_PUBLIC_API_URL="http://localhost:3333/api"
```