---
name: defining-tdd
description: >-
  Establece un proceso claro de TDD en el proyecto: casos de uso y criterios de
  aceptación antes de código, tests explícitos (normales, borde, entradas
  incompletas) y verificación acotada al alcance del cambio. Use al implementar
  features, al refactorizar con criterios verificables o cuando el usuario pida
  TDD, pruebas primero o desarrollo guiado por tests.
---

# Defining TDD

## Objetivo

Guiar un flujo repetible donde el comportamiento esperado y los tests queden definidos **antes** de la implementación, y la verificación confirme solo lo que el cambio debe cumplir.

## Cuándo aplicar

- Nueva funcionalidad o cambio de comportamiento observable.
- Refactor que debe preservar contratos o resultados específicos.
- Cuando el usuario pida TDD, “tests primero” o criterios de aceptación explícitos.

## Flujo recomendado (orden estricto)

Seguir este orden salvo que el usuario indique una excepción justificada (por ejemplo spike de exploración acotado y descartable):

1. **Entender el caso de uso** — Qué problema resuelve y cuál es el comportamiento esperado.
2. **Definir criterios de aceptación** — Condiciones verificables que definen “hecho”; evitar vaguedades (“mejor”, “rápido”) sin medida o ejemplo.
3. **Escribir o definir los tests** — Traducir criterios en casos de prueba concretos (nombres, datos, aserciones). En TDD clásico: tests que fallen primero; si no se ejecutan aún, dejar los casos especificados con la misma claridad que código de test.
4. **Implementar la solución mínima** — Solo lo necesario para que los tests definidos pasen; evitar alcance extra no cubierto por criterios o tests acordados.
5. **Verificar que los tests pasen** — Ejecutar la suite relevante (`npm test`, `npm run test`, o el comando del proyecto) y confirmar verde en el **alcance del cambio** (ver abajo).

Usar este checklist como referencia para validar el progreso:

```md
TDD Progress
- [ ] 1. Caso de uso entendido (entrada/salida/comportamiento)
- [ ] 2. Criterios de aceptación acordados y verificables
- [ ] 3. Tests definidos o escritos (antes o en lockstep con implementación mínima)
- [ ] 4. Implementación mínima alineada a esos tests
- [ ] 5. Tests ejecutados y pasando en el alcance del cambio
```

## Reglas no negociables

- **No implementar sin comportamiento esperado claro.** Si faltan criterios o hay ambigüedad, aclarar o documentar supuestos explícitos **antes** de codificar solución productiva (un spike puede ser la excepción temporal, no sustituye criterios).
- **Priorizar la definición de tests respecto al código nuevo.** Los tests materializan el contrato; el código cumple ese contrato.
- **Los tests deben cubrir**, cuando aplique al caso de uso:
  - **Casos normales** — Flujo feliz representativo.
  - **Casos borde** — Límites (vacío, máximo, cero, límites de dominio).
  - **Entradas incompletas o inválidas** — Errores de validación, faltantes, formatos incorrectos, según lo que el producto deba garantizar.

## Verificación del alcance

- Enfocar la verificación **solo en el alcance del cambio**: tests nuevos o afectados, regresión razonable en módulos tocados.
- No expandir la suite ni el producto “por si acaso” sin criterio ligado al caso de uso actual.
- Si falla un test fuera del alcance, distinguir: regresión real vs. test frágil no relacionado; no “arreglar” a ciegas sin entender.

## De casos de uso a tests claros

Para cada criterio de aceptación, al menos un test (o caso parametrizado) que:

- Nombre al comportamiento (`describe`/`it` o equivalente legible).
- Fije entrada conocida y resultado o error esperado.
- Evite depender de detalles internos no esenciales (preferir API pública o contrato estable).

## Integración con el resto del flujo del proyecto

Este skill complementa la planificación y validación descritas en las reglas del repo: caso de uso → criterios → implementación → validar con herramientas del proyecto. Aquí el énfasis es **tests antes y verificación acotada**.

## Contexto de tests en este proyecto

Estado actual del repositorio (base inicial):

- Runner: `Jest` + `@testing-library/react`.
- Config principal: `jest.config.mjs`.
- Setup de matchers: `jest.setup.ts`.
- Scripts:
  - `npm test` -> ejecuta la suite completa.
  - `npm run test:watch` -> modo watch para iterar cambios locales.

Ubicación recomendada (actualmente usada):

- Tests co-located junto al módulo que validan.
- Ejemplos actuales:
  - `app/components/dashboard-shell.test.tsx`
  - `lib/dashboard/data.test.ts`

Regla práctica de ubicación:

- Si el test valida UI/componente, crear `*.test.tsx` junto al componente en `app/components`.
- Si valida lógica pura, crear `*.test.ts` junto al módulo en `lib/...`.
- Evitar suites globales enormes; preferir suites pequeñas por responsabilidad.

## Cómo implementar tests (patrón mínimo)

Para cada criterio de aceptación:

1. Crear bloque `describe("<comportamiento>")`.
2. Agregar al menos:
   - 1 test de caso normal.
   - 1 test de caso borde.
   - 1 test de entrada incompleta/inválida cuando aplique.
3. Preparar datos explícitos (fixtures simples locales) sin depender de servicios externos.
4. Aserciones sobre contrato visible:
   - UI: elementos/estado visibles esperados.
   - Lógica: salida esperada y comportamiento estable ante mutaciones o faltantes.

Checklist rápido por archivo de test:

```md
- [ ] El nombre del test describe comportamiento esperado
- [ ] Datos de entrada son explícitos y legibles
- [ ] Aserciones validan resultado funcional, no internals frágiles
- [ ] Cubre normal + borde + incompleto/inválido (si aplica)
```

## Cómo verificar en este proyecto

Secuencia recomendada al cerrar un cambio:

1. Ejecutar `npm test`.
2. Ejecutar `npm run lint`.
3. Si el cambio toca build o tipos, ejecutar `npm run build`.

Reglas de verificación:

- Verificar primero lo tocado por el cambio (alcance acotado).
- Si falla algo fuera de alcance, documentar impacto antes de expandir trabajo.
- No marcar completado hasta tener tests verdes para los criterios acordados.

## Límites del skill

- Toma como referencia el stack actual del repo (`Jest` + Testing Library). Si el proyecto migra de runner, mantener el mismo proceso TDD y adaptar comandos.
- No sustituye revisión humana ni criterios de producto no escritos; los hace explícitos antes de codificar.
