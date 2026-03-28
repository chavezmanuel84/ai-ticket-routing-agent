---
name: analyze-ticket-context
description: Analiza informacion de tickets Jira en modo estrictamente readonly para convertirla en contexto estructurado listo para toma de decisiones, incluyendo resumen, tipo de caso, claridad, faltantes, señales y riesgos. Use cuando se necesite preparar contexto antes de decidir acciones o enrutamiento.
---

# Analyze Ticket Context

## Objetivo

Convertir la informacion de un ticket Jira en un contexto estructurado, claro y util para que otros skills tomen decisiones posteriores.

## Cuando aplicar este skill

Aplicar cuando se requiera:
- analizar un ticket antes de decidir una accion
- estructurar contexto para enrutamiento o escalamiento posterior
- detectar faltantes, ambiguedades y riesgos en la informacion del ticket
- separar informacion relevante de ruido

## Responsabilidad y limites

- este skill prepara contexto; no toma decisiones finales
- no decide a que equipo escalar
- no decide que accion ejecutar
- no modifica Jira bajo ningun caso
- no asume informacion no presente en el ticket

## Reglas no negociables (readonly estricto)

- no ejecutar ninguna accion que modifique Jira
- no usar tools de escritura del MCP de Atlassian
- si una tool no es claramente readonly, no ejecutarla
- ante inconsistencias o informacion faltante, reportarlo explicitamente

## Flujo obligatorio con MCP (Atlassian)

Copiar este checklist y marcar progreso:

```md
Ticket Context Analysis Progress
- [ ] 1. Identificar ticket objetivo y alcance del analisis
- [ ] 2. Descubrir tools disponibles y revisar schema antes de usar
- [ ] 3. Filtrar y usar solo tools readonly necesarias
- [ ] 4. Obtener datos del ticket (summary, description, status, fields, comments, links)
- [ ] 5. Organizar informacion relevante y remover ruido
- [ ] 6. Identificar tipo de caso, claridad, faltantes y riesgos
- [ ] 7. Entregar contexto estructurado sin decisiones finales
```

### 1) Descubrir tools antes de usar

Antes de llamar cualquier tool:
- inspeccionar descriptores del MCP de Atlassian
- confirmar parametros y alcance
- clasificar tools en readonly vs escritura
- usar solo las herramientas necesarias para la tarea

### 2) Tools readonly permitidas

Usar unicamente tools de lectura como:
- `getJiraIssue`
- `searchJiraIssuesUsingJql`
- `getJiraIssueRemoteIssueLinks`
- `getVisibleJiraProjects`
- `getJiraProjectIssueTypesMetadata`
- `getJiraIssueTypeMetaWithFields`
- `getIssueLinkTypes`
- `searchAtlassian`
- `fetchAtlassian`
- `getAccessibleAtlassianResources`
- `atlassianUserInfo`

### 3) Tools prohibidas (escritura)

No usar bajo ningun caso:
- `createJiraIssue`
- `editJiraIssue`
- `addCommentToJiraIssue`
- `transitionJiraIssue`
- `createIssueLink`
- `addWorklogToJiraIssue`

Si aparece una tool nueva y no es claramente de lectura, no ejecutar.

## Extraccion minima requerida

Para cada ticket analizado, obtener cuando exista:
- `summary`
- `description`
- `status`
- campos relevantes del issue
- comentarios
- issue links

Si algun bloque no esta disponible, indicarlo como faltante (no inferir).

## Criterios de analisis (sin decidir accion)

### 1) Tipo de caso detectado

Clasificar en:
- `bug`
- `duda`
- `feature`
- `otro`

Usar solo evidencia textual del ticket. Si la evidencia no alcanza, usar `otro` y explicitar ambiguedad.

### 2) Nivel de claridad del ticket

Clasificar en:
- `alto`
- `medio`
- `bajo`

Guia:
- `alto`: problema, contexto y expectativa estan claros
- `medio`: hay base suficiente pero faltan detalles relevantes
- `bajo`: informacion fragmentada, contradictoria o insuficiente

### 3) Informacion faltante

Identificar faltantes criticos para decision posterior, por ejemplo:
- pasos de reproduccion
- resultado esperado vs actual
- alcance funcional
- entorno/version
- evidencia tecnica (logs, errores, capturas)

### 4) Senales relevantes

Destacar senales con impacto para decision posterior, por ejemplo:
- urgencia explicita
- bloqueo operativo
- dependencia con otros tickets
- recurrencia reportada
- contradicciones entre descripcion y comentarios

### 5) Riesgos o ambiguedades

Marcar riesgos que puedan afectar decisiones posteriores:
- requerimiento ambiguo
- falta de contexto tecnico
- lenguaje impreciso
- multiples interpretaciones posibles

## Reduccion de ruido

Durante la estructuracion:
- excluir contenido irrelevante para entender el caso
- evitar repetir informacion redundante
- conservar trazabilidad con evidencia textual concreta
- no eliminar datos potencialmente criticos por error

## Formato de salida obligatorio

```md
## Fuente
- MCP: Atlassian
- Tool(s) readonly usadas: <lista>
- Ticket: <issue-key>

## Resumen claro del ticket
- <resumen breve y fiel al contenido>

## Tipo de caso detectado
- Tipo: bug | duda | feature | otro
- Evidencia: <texto/campos/comentarios que justifican>

## Nivel de claridad del ticket
- Nivel: alto | medio | bajo
- Justificacion: <por que>

## Informacion faltante
- <lista de faltantes o "sin faltantes criticos detectados">

## Senales relevantes detectadas
- <lista de senales relevantes>

## Riesgos o ambiguedades
- <lista de riesgos/ambiguedades o "no se detectan riesgos relevantes">

## Notas de consistencia
- Inconsistencias detectadas: <si/no + detalle>
- Supuestos realizados: ninguno
```

## Criterio final de seguridad y alcance

Este skill solo prepara contexto estructurado y verificable desde Jira en modo readonly.
No modifica estado, no ejecuta decisiones y no reemplaza la etapa de decision posterior.
