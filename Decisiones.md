# Proyecto Base para Práctica de Git

Este proyecto es parte del Trabajo Práctico 01 – Git Básico.

Contiene archivos simples para practicar: creación de ramas, commits atómicos, simulación y corrección de errores, Pull Request y versionado.

---

## 1. Configuración inicial

### 1.1 Identidad en Git
En la terminal:
```bash
git config --global user.name  "Coty Strumia"
git config --global user.email "constanzastrumia28@gmail.com"
git config --global init.defaultBranch main

#2. Desarrollar funcionalidad (rama feature/mejoras)
2.1. Creo la rama feature/mejoras
En la terminal:
git checkout -b feature/mejoras

Decisión: trabajar en una rama separada me permite desarrollar sin afectar main (estabilidad).

2.2. Hago al menos 2 commits atómicos con mensajes claros
Commit 1 – Parametrizo el saludo
Archivo: src/app.js
Cambio: la función de saludo recibe un parámetro (nombre) y muestra Hola <nombre>.
Mensaje de commit:
git add src/app.js
git commit -m "feat: parametrizar saludo con nombre en app.js"
Motivo: flexibilizar la salida y preparar el siguiente cambio.
Commit 2 – Agrego segundo modo de saludo
Archivo: src/app.js
Cambio: incorporé saludarEnMayusculas() para imprimir el saludo en mayúsculas.
Mensaje de commit:
git add src/app.js
git commit -m "feat: agregar modo de saludo en mayúsculas en app.js"
Motivo: ofrecer una variante adicional sin romper compatibilidad.
Justificación de commits atómicos: cambios pequeños, trazables y reversibles. Facilitan revisión y bisect.
Subo la rama por primera vez (upstream):
git push -u origin feature/mejoras

#3. Simulación de error en main y arreglo con hotfix
3.1. Simulo un error en main
Me paro en main y rompo a propósito la llamada para generar un fallo rápido.
En la terminal:
git checkout main
# edito src/app.js (ej: renombro la función saludar -> saludarx, pero dejo la llamada saludar();)
git add src/app.js
git commit -m "chore: introducir error simulado en app.js"
git push origin main
Motivo: practicar un hotfix realista sobre la rama estable.

3.2. Creo la rama de hotfix y soluciono el error
En la terminal:
git checkout -b hotfix/arreglos
# restauro el nombre correcto de la función para que la llamada no falle
git add src/app.js
git commit -m "fix: corregir error simulado en app.js"
git push -u origin hotfix/arreglos
Justificación: aislar la corrección y resolver con prioridad sin contaminar otras ramas.

3.3. Integro el hotfix a main
En la terminal:
git checkout main
git merge --no-ff hotfix/arreglos -m "merge: integrar hotfix/arreglos en main"
git push origin main
Decisión: merge con --no-ff para conservar el contexto del hotfix en el historial.

3.4. Propago el fix a la rama de desarrollo
En la terminal:
git checkout feature/mejoras
git merge main -m "merge: traer hotfix desde main a feature/mejoras"
git push
Por qué MERGE y no cherry-pick: mantengo la historia completa del fix y evito duplicar commits si el hotfix afectó más de un archivo. Es el flujo más simple y estándar.

#4. Pull Request y merge de la funcionalidad
4.1. Creo el PR (feature → main)
Base: main
Compare: feature/mejoras
Título: feat: mejoras de saludo (2 commits atómicos)
Descripción (lo que expliqué):
Qué: parametrización del saludo + nuevo modo en mayúsculas.
Por qué: más flexibilidad y legibilidad.
Cómo: 2 commits atómicos; hotfix ya integrado.
Pruebas: node src/app.js muestra resultados correctos.
Impacto: sin ruptura de compatibilidad.

4.2. Merge del PR
Opción elegida: Create a merge commit (conserva los 2 commits atómicos).
(Opcional) Eliminé la rama remota feature/mejoras después del merge.
Sincronizo local:
git checkout main
git pull origin main

#5. Versiono mi trabajo (tag)
5.1. Creo tag v1.0 – versión estable inicial
En la terminal:
git checkout main
git pull origin main
git tag -a v1.0 -m "v1.0: versión estable inicial"
git push origin v1.0
Justificación: uso SemVer. v1.0 marca la primera versión estable del repositorio (feature + hotfix integrados).

#6. Problemas reales y cómo los resolví

“Your local changes would be overwritten by checkout”
Causa: tenía cambios locales sin commit al intentar cambiar de rama.
Solución: hice git commit (o git stash) y luego cambié de rama sin pérdida.

“The current branch has no upstream branch” al hacer git push en la feature
Causa: la rama no estaba trackeada en remoto.
Solución: git push -u origin feature/mejoras.

Intenté merge parado en la rama equivocada (mensaje “Already up to date”)
Recordatorio: siempre me paro en la rama que quiero actualizar y mergeo la otra dentro de esa.

#8. Convenciones que usé
Commits: estilo Conventional Commits (feat:, fix:, docs:, chore:).
Ramas: feature/<nombre> para desarrollo, hotfix/<nombre> para correcciones urgentes.
PRs: base main, compare feature/*; Create a merge commit para conservar commits atómicos.
Regla práctica: main siempre estable; desarrollo aislado; hotfix rápido y luego propagación a las ramas activas.