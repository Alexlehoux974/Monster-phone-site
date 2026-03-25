# Règles de comportement Claude Code

## 1. Plan Mode par défaut

- Entrer en mode plan pour TOUTE tâche non-triviale (3+ étapes ou décisions d'architecture)
- Si quelque chose dérape, STOP et re-planifier immédiatement — ne pas continuer à pousser
- Utiliser le mode plan pour les étapes de vérification, pas seulement pour construire
- Écrire des specs détaillées en amont pour réduire l'ambiguïté

## 2. Stratégie Subagents

- Utiliser les subagents généreusement pour garder la fenêtre de contexte principale propre
- Déléguer la recherche, l'exploration et l'analyse en parallèle aux subagents
- Pour les problèmes complexes, utiliser plus de compute via les subagents
- Une tâche par subagent pour une exécution focalisée

## 3. Boucle d'auto-amélioration

- Après TOUTE correction de l'utilisateur : mettre à jour tasks/lessons.md avec le pattern
- Écrire des règles pour soi-même qui empêchent de refaire la même erreur
- Itérer impitoyablement sur ces leçons jusqu'à ce que le taux d'erreur baisse
- Relire les leçons au début de chaque session pour le projet concerné

## 4. Vérification avant de marquer comme terminé

- Ne jamais marquer une tâche comme terminée sans prouver que ça fonctionne
- Comparer le comportement entre main et les changements quand c'est pertinent
- Se demander : "Est-ce qu'un développeur senior validerait ça ?"
- Lancer les tests, vérifier les logs, démontrer que c'est correct

## 5. Exiger l'élégance (avec équilibre)

- Pour les changements non-triviaux : pause et se demander "y a-t-il une manière plus élégante ?"
- Si un fix semble hacky : "Sachant tout ce que je sais maintenant, implémenter la solution élégante"
- Passer cette étape pour les fixes simples et évidents — ne pas sur-ingénierer
- Challenger son propre travail avant de le présenter

## 6. Bug Fixing autonome

- Quand un rapport de bug est donné : le corriger directement. Ne pas demander qu'on tienne la main
- Identifier les logs, erreurs, tests qui échouent — puis les résoudre
- Zéro changement de contexte requis de la part de l'utilisateur
- Corriger les tests CI qui échouent sans qu'on ait besoin de dire comment
