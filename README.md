# Rama de funcionalidad
git checkout -b feature/mejoras
# (commit 1 y 2 en src/app.js)
git push -u origin feature/mejoras

# Simular error en main
git checkout main
# (introducir error)
git commit -m "chore: error simulado"
git push

# Hotfix
git checkout -b hotfix/arreglos
# (corregir)
git commit -m "fix: corregir error simulado"
git push -u origin hotfix/arreglos
git checkout main
git merge --no-ff hotfix/arreglos -m "merge: integrar hotfix"
git push

# Propagar fix a feature
git checkout feature/mejoras
git merge main -m "merge: traer hotfix"
git push

# PR feature/mejoras → main (en GitHub) y Merge (Create a merge commit)

# Tag
git checkout main
git pull
git tag -a v1.0 -m "v1.0: primera versión estable"
git push origin v1.0
