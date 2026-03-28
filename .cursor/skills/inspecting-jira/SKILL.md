---
name: inspecting-jira
description: Recupera informacion de Jira con el MCP de Atlassian en modo estrictamente readonly para obtener datos de tickets, comentarios, links, metadatos de proyectos/issue types, busquedas JQL y transiciones disponibles sin modificar estado. Use cuando se necesite inspeccionar Jira o extraer datos estructurados para debugging y validacion.
---

# Inspecting Jira

## Objetivo

Recuperar informacion de Jira usando el MCP de Atlassian en modo estrictamente readonly, entregando solo datos obtenidos y estructura disponible.

## Cuando aplicar este skill

Aplicar cuando se requiera:
- obtener informacion de tickets (`summary`, `description`, `status`, `fields`)
- leer comentarios de un ticket
- obtener relaciones entre tickets (issue links)
- consultar metadatos de proyectos e issue types
- buscar tickets usando JQL
- obtener posibles transiciones de un ticket

## Responsabilidad y limites

- este skill solo recupera informacion de Jira
- no interpreta, no analiza y no toma decisiones sobre los datos obtenidos
- el resultado debe limitarse a:
  - datos obtenidos
  - estructura de la informacion disponible

## Reglas no negociables (readonly estricto)

- nunca modificar Jira por este medio
- no ejecutar herramientas que creen, editen o muten estado
- ante duda sobre si una accion modifica estado, no ejecutarla

## Flujo obligatorio con MCP (Atlassian)

Copiar este checklist y marcar progreso:

```md
Jira Inspection Progress
- [ ] 1. Identificar servidor MCP objetivo (Atlassian)
- [ ] 2. Descubrir tools disponibles y su schema
- [ ] 3. Filtrar tools readonly permitidas
- [ ] 4. Ejecutar lecturas necesarias (ticket, comentarios, links, metadata, JQL, transiciones)
- [ ] 5. Entregar output estructurado sin interpretacion
- [ ] 6. Reportar limites de informacion si aplica
```

### 1) Descubrir tools antes de usar

Antes de llamar cualquier tool:
- inspeccionar los descriptores MCP del servidor de Atlassian
- confirmar parametros y alcance de cada tool
- clasificar cada tool como readonly o mutacion

### 2) Prioridad de uso (lectura primero)

Priorizar tools de lectura en este orden:
1. lectura directa de issue y campos
2. comentarios, links y transiciones disponibles
3. metadata de proyectos/issue types/fields
4. busqueda por JQL para conjuntos de tickets

### 3) Tools permitidas (readonly)

Usar unicamente estas tools para inspeccion:
- `getJiraIssue`
- `searchJiraIssuesUsingJql`
- `getJiraIssueRemoteIssueLinks`
- `getTransitionsForJiraIssue`
- `getVisibleJiraProjects`
- `getJiraProjectIssueTypesMetadata`
- `getJiraIssueTypeMetaWithFields`
- `getIssueLinkTypes`
- `searchAtlassian`
- `fetchAtlassian`
- `getAccessibleAtlassianResources`
- `atlassianUserInfo`

### 4) Tools prohibidas (no readonly)

No usar bajo ningun caso:
- `createJiraIssue`
- `editJiraIssue`
- `addCommentToJiraIssue`
- `transitionJiraIssue`
- `createIssueLink`
- `addWorklogToJiraIssue`

Si una nueva tool aparece y no es claramente readonly, no ejecutar.

## Formato de salida permitido

Responder solo con datos y estructura. Sin inferencias ni recomendaciones.

Plantilla:

```md
## Fuente
- MCP: Atlassian
- Tool(s): <lista>

## Datos obtenidos
- Ticket: <key>
- Summary: ...
- Description: ...
- Status: ...
- Fields: { ... }
- Comments: [ ... ]
- Issue Links: [ ... ]
- Transitions disponibles: [ ... ]

## Estructura disponible
- Proyectos visibles: [ ... ]
- Issue types por proyecto: [ ... ]
- Campos por issue type: [ ... ]

## Limites de consulta (si aplica)
- Datos no disponibles: ...
- Restricciones detectadas: ...
```

## Criterio de seguridad final

Si una accion no es inequívocamente de lectura, no se ejecuta.
