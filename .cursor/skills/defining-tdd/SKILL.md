---
name: defining-tdd
description: Estructura el proceso de TDD para definir casos de uso, inputs/outputs esperados y tests antes de implementar logica. Use cuando el usuario pida implementar features, corregir bugs, refactorizar o validar comportamiento en este proyecto con enfoque de decisiones explicables.
---

# Defining TDD

## Objetivo

Asegurar que nunca se implemente logica sin definir primero los tests y el comportamiento esperado.

## Cuando aplicar este skill

Aplicar cuando se pida:
- implementar una nueva logica o feature
- corregir un bug
- cambiar reglas de decision
- refactorizar comportamiento existente
- validar que una decision del sistema sea explicable y testeable

## Regla no negociable

No escribir ni modificar logica productiva hasta completar:
1. caso(s) de uso definidos
2. input y output esperados por caso
3. tests de casos normales, edge cases y casos con informacion incompleta

Si falta alguno, detener implementacion y completar definicion primero.

## Flujo obligatorio (TDD)

Copiar este checklist y marcar progreso:

```md
TDD Progress
- [ ] 1. Definir caso(s) de uso
- [ ] 2. Especificar input/output esperado por caso
- [ ] 3. Diseñar matriz de pruebas (normal, edge, incompleta)
- [ ] 4. Implementar o ajustar tests
- [ ] 5. Ejecutar tests (debe fallar si es cambio de comportamiento)
- [ ] 6. Implementar solucion minima
- [ ] 7. Ejecutar tests (deben pasar)
- [ ] 8. Verificar explicabilidad de cada decision
```

### 1) Definir caso(s) de uso

Para cada caso, documentar en texto breve:
- contexto
- objetivo de decision
- restriccion principal

Plantilla:

```md
Caso: <nombre>
Contexto: <situacion real>
Decision esperada: <que deberia decidir el sistema>
Razon principal: <evidencia o regla que lo justifica>
```

### 2) Especificar input/output esperado

Para cada caso, explicitar:
- **Input**: datos disponibles (incluyendo campos faltantes si aplica)
- **Output esperado**: decision/resultado exacto y estructura esperada

Plantilla:

```md
Input:
  <payload o campos relevantes>

Output esperado:
  <resultado esperado>
```

### 3) Diseñar matriz de pruebas minima

Incluir siempre estas categorias:
- **Normal**: escenario comun con informacion suficiente
- **Edge case**: limites, combinaciones raras o valores extremos
- **Informacion incompleta**: datos faltantes, ambiguos o parciales

Plantilla:

```md
- [ ] Normal: <descripcion> -> <resultado esperado>
- [ ] Edge: <descripcion> -> <resultado esperado>
- [ ] Incompleta: <descripcion> -> <resultado esperado>
```

### 4) Implementar tests primero

Crear/ajustar tests antes de tocar logica productiva.

Requisitos:
- cada caso definido debe tener al menos un test trazable
- nombres de test deben describir la decision esperada
- test debe fallar cuando el comportamiento actual no cumple lo definido

### 5) Implementar solucion minima

Solo despues de tener tests definidos:
- cambiar la minima cantidad de logica necesaria
- evitar duplicacion
- mantener decisiones explicitas y faciles de rastrear

### 6) Verificar cumplimiento y explicabilidad

Antes de cerrar:
- confirmar que todos los tests de la matriz pasan
- validar cobertura de normal/edge/incompleta
- verificar que cada decision tenga razon explicable

Checklist final:

```md
- [ ] Ninguna logica se implemento antes de definir tests
- [ ] Todos los casos de uso tienen input/output esperado
- [ ] Existen tests para normal, edge e incompleta
- [ ] Implementacion cumple los casos definidos
- [ ] Cada decision puede explicarse con evidencia/regla
```

## Formato de reporte recomendado

Cuando se entregue un cambio, responder con esta estructura:

```md
## Casos definidos
- Caso A: ...
- Caso B: ...

## Input/Output esperado
- Caso A: input ..., output ...
- Caso B: input ..., output ...

## Matriz de pruebas
- Normal: ...
- Edge: ...
- Incompleta: ...

## Resultado de validacion
- Tests antes de implementar: <estado>
- Tests finales: <estado>
- Decisiones explicables: <si/no + evidencia>
```
