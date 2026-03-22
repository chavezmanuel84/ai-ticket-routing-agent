---
name: inspecting-database
description: Inspecciona la base de datos del proyecto con el MCP de Supabase en modo estrictamente readonly para entender schema, tablas, columnas, relaciones y datos de soporte para debugging. Use cuando se necesite aclarar estructura actual, validar comportamiento, reproducir problemas o consultar informacion sin modificar datos.
---

# Inspecting Database

## Objetivo

Inspeccionar la base de datos de este proyecto de forma segura, trazable y estrictamente de solo lectura usando el MCP de Supabase, sin alterar el estado del sistema en ningun momento.

## Cuando aplicar este skill

Aplicar cuando se requiera:
- entender el esquema actual de la base de datos
- revisar tablas, columnas, relaciones y estructura disponible
- extraer informacion para debugging
- consultar datos para validar comportamiento o reproducir problemas

## Reglas no negociables (readonly estricto)

- nunca modificar la base de datos por este medio
- no ejecutar `INSERT`, `UPDATE`, `DELETE`, `UPSERT`, `MERGE`, `ALTER`, `DROP`, `TRUNCATE`, `CREATE`, `REPLACE`, `GRANT`, `REVOKE` ni llamadas que cambien estado
- no usar comandos o herramientas de MCP que creen, editen o eliminen objetos/datos
- si se usa SQL, permitir solo consultas de lectura (`SELECT`, `WITH ... SELECT`, `EXPLAIN`, introspeccion de catalogos)
- ante duda sobre si una accion modifica estado, no ejecutarla

## Flujo obligatorio de inspeccion con MCP

Copiar este checklist y marcar progreso:

```md
Database Inspection Progress
- [ ] 1. Identificar servidor MCP objetivo (supabase)
- [ ] 2. Descubrir herramientas MCP disponibles para inspeccion
- [ ] 3. Priorizar herramientas nativas de introspeccion/schema
- [ ] 4. Ejecutar consultas/lecturas necesarias (solo readonly)
- [ ] 5. Contrastar hallazgos con el problema o caso de debugging
- [ ] 6. Reportar evidencia y limites de la inspeccion
```

### 1) Identificar y preparar contexto

- confirmar que se trabajara contra el MCP `supabase`
- definir que se quiere responder: schema, relacion, datos de validacion o reproduccion

Plantilla:

```md
Objetivo de inspeccion: <pregunta concreta>
Alcance: <schema/tablas/campos/datos puntuales>
Restricciones: readonly estricto
```

### 2) Descubrir herramientas MCP antes de usar

Antes de llamar cualquier tool, inspeccionar descriptores para saber:
- que herramientas existen
- que parametros requieren
- cuales son seguras para lectura

Priorizar herramientas orientadas a:
- metadata de schema
- listado de tablas/columnas/relaciones
- ejecucion de consultas de lectura

### 3) Prioridad de uso (de mayor a menor)

1. herramientas MCP de introspeccion de schema/metadata
2. herramientas MCP para listar objetos de base de datos
3. consultas SQL de solo lectura cuando lo anterior no alcance

Evitar SQL si una herramienta MCP dedicada ya responde la pregunta de forma mas segura.

### 4) SQL readonly seguro (cuando sea necesario)

Permitir:
- `SELECT ...`
- `WITH cte AS (...) SELECT ...`
- `EXPLAIN SELECT ...`
- consultas a vistas de catalogo (`information_schema`, `pg_catalog`) en modo lectura

Restringir:
- cualquier sentencia DDL/DML o multiples sentencias mezcladas
- funciones/procedimientos con efectos de escritura

Buenas practicas:
- limitar volumen (`LIMIT`) para debugging
- seleccionar columnas necesarias (evitar `SELECT *` salvo exploracion inicial)
- documentar filtros y supuestos usados

### 5) Validacion de hallazgos

Para cada respuesta de debugging o schema:
- incluir evidencia concreta (tabla, columnas, tipos, FK, filas ejemplo)
- distinguir hecho observado vs suposicion
- mencionar huecos de informacion cuando no haya evidencia suficiente

## Formato de reporte recomendado

```md
## Inspeccion realizada
- Objetivo: ...
- Alcance: ...

## Herramientas MCP usadas
- Tool A: <para que se uso>
- Tool B: <para que se uso>

## Hallazgos de schema/estructura
- Tablas: ...
- Columnas clave: ...
- Relaciones: ...

## Datos de soporte (readonly)
- Consulta: ...
- Resultado relevante: ...

## Conclusiones para debugging/validacion
- Hipotesis confirmada: si/no + evidencia
- Pendientes o limites: ...
```

## Criterio de seguridad final

Si una accion no es inequívocamente de lectura, no se ejecuta.
