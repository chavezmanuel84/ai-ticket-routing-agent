---
name: modifying-database
description: Define un flujo controlado y trazable para cambios de base de datos con Supabase usando migraciones no interactivas. Use cuando se necesite modificar schema, tablas, constraints, indices o estructura de datos en este proyecto.
---

# Modifying Database

## Objetivo

Realizar cambios de base de datos de forma controlada, trazable y segura, manteniendo consistencia con el enfoque TDD del proyecto.

## Cuando aplicar este skill

Aplicar cuando se requiera:
- cambiar schema o estructura de tablas
- agregar/quitar columnas, constraints o indices
- modificar relaciones entre tablas
- introducir cambios que impacten datos, tests o logica existente

## Reglas no negociables

- no hacer cambios manuales ad hoc sin migraciones
- toda modificacion estructural debe quedar versionada en una migracion
- los nombres de migracion deben ser claros y descriptivos
- los cambios deben ser pequenos, verificables y alineados a TDD
- antes de modificar, revisar impacto en datos, tests y logica existente
- todos los comandos de Supabase deben ejecutarse con `--non-interactive`

## Flujo obligatorio de cambios

Copiar este checklist y marcar progreso:

```md
Database Change Progress
- [ ] 1. Entender el cambio, objetivo e impacto
- [ ] 2. Definir casos (normal, edge, datos legacy o incompletos) e impacto esperado
- [ ] 3. Crear migracion descriptiva (no interactiva)
- [ ] 4. Editar migracion con cambio minimo necesario
- [ ] 5. Ejecutar migraciones localmente (no interactivo)
- [ ] 6. Verificar datos, tests y comportamiento del sistema
- [ ] 7. Si entorno local inconsistente, reset controlado (solo local)
- [ ] 8. Confirmar trazabilidad completa del cambio
```

### 1) Entender antes de modificar

Antes de tocar schema o estructura:
- definir que cambio se necesita
- definir objetivo funcional del cambio
- identificar impacto en tablas, relaciones, datos existentes y logica del sistema

Plantilla:

```md
Cambio requerido: <descripcion concreta>
Objetivo: <para que se hace>
Impacto esperado:
- Datos: <si/no + detalle>
- Tests: <si/no + detalle>
- Logica: <si/no + detalle>
```

### 2) Definir casos y validacion (TDD)

Antes de implementar la migracion, definir:
- caso normal
- edge case
- caso con datos legacy, valores nulos o datos historicos incompletos

Plantilla:

```md
- [ ] Normal: <escenario> -> <resultado esperado>
- [ ] Edge: <escenario> -> <resultado esperado>
- [ ] Legacy/Incompleta: <escenario> -> <resultado esperado>
```

### 3) Crear migracion (siempre no interactivo)

Usar este comando:

```bash
supabase migration new nombre_descriptivo --non-interactive
```

Reglas de nombrado:
- describir el cambio real (`add_ticket_priority_column`, `create_routing_rules_table`)
- evitar nombres vagos (`update`, `fix`, `changes`)

### 4) Editar la migracion generada

Luego de crear el archivo, editar esa migracion para aplicar el cambio necesario.

Reglas:
- aplicar solo el cambio minimo requerido
- mantener SQL claro y revisable
- evitar mezclar multiples objetivos en una sola migracion

### 5) Ejecutar migraciones localmente (siempre no interactivo)

Usar:

```bash
supabase migration up --non-interactive
```

### 6) Verificar despues de migrar

Despues de aplicar migraciones:
- verificar que el schema quedo como se esperaba
- ejecutar tests relevantes
- validar que la logica existente sigue funcionando
- confirmar que no se rompio comportamiento previo

### 7) (Opcional) Reset local solo si hay inconsistencia

Si el entorno local queda inconsistente durante desarrollo, se puede usar:

```bash
supabase db reset --non-interactive
```

Condiciones:
- solo en entorno local
- entendiendo que reinicia completamente la base de datos
- volver a correr migraciones y validaciones luego del reset
- solo como ultimo recurso en entorno local

## Checklist final de disciplina y trazabilidad

```md
- [ ] El cambio fue entendido (requerimiento, objetivo, impacto)
- [ ] No hubo cambios manuales ad hoc fuera de migraciones
- [ ] La migracion tiene nombre claro y descriptivo
- [ ] Se aplico con comandos no interactivos (--non-interactive)
- [ ] El cambio fue pequeno y verificable
- [ ] Se reviso impacto en datos, tests y logica existente
- [ ] El sistema se verifico correctamente despues de migrar
```

## Formato de reporte recomendado

```md
## Cambio de base de datos
- Requerimiento: ...
- Objetivo: ...

## Impacto analizado
- Datos: ...
- Tests: ...
- Logica: ...

## Migracion
- Nombre: ...
- Comando usado: supabase migration new ... --non-interactive
- Cambios aplicados: ...

## Validacion
- Comando aplicado: supabase migration up --non-interactive
- Tests ejecutados: ...
- Resultado del sistema: ...

## Incidencias locales (si aplica)
- Se uso reset local: si/no
- Comando: supabase db reset --non-interactive
- Motivo y resultado: ...
```
