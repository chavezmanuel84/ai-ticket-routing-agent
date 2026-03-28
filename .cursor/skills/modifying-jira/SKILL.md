---
name: modifying-jira
description: Realiza cambios en Jira con el MCP de Atlassian de forma controlada, segura y trazable, incluyendo creacion/edicion de issues, comentarios, links, transiciones y worklogs. Use cuando se necesite modificar Jira con aprobacion explicita previa y validacion estricta de parametros.
---

# Modifying Jira

## Objetivo

Ejecutar modificaciones en Jira de forma segura, explicita y auditable usando el MCP de Atlassian, evitando cambios accidentales o ambiguos.

## Cuando aplicar este skill

Aplicar cuando se solicite:
- crear issues
- editar campos de un issue
- agregar comentarios
- crear links entre issues
- transicionar un issue
- registrar worklogs (si aplica)

## Reglas no negociables

- nunca ejecutar acciones de escritura automaticamente
- toda accion de escritura requiere aprobacion explicita previa
- sin aprobacion explicita, limitarse a describir la accion propuesta
- si hay ambiguedad en issue, proyecto, campos, issue type, transicion o comentario, no ejecutar
- no asumir valores faltantes
- no ejecutar cambios destructivos o innecesarios
- no editar multiples cosas si no fue solicitado explicitamente
- no usar tools de escritura si una tool de lectura es suficiente
- antes de escribir, dejar claro que la accion modifica estado en Jira

## Flujo obligatorio con MCP (Atlassian)

Copiar este checklist y marcar progreso:

```md
Jira Modification Progress
- [ ] 1. Entender claramente el cambio solicitado
- [ ] 2. Identificar issue(s) y proyecto(s) afectados
- [ ] 3. Descubrir tools del MCP y leer schema antes de usar
- [ ] 4. Elegir solo tools necesarias (lectura primero)
- [ ] 5. Verificar que la accion sea correcta y necesaria
- [ ] 6. Confirmar parametros exactos a enviar
- [ ] 7. Resumir accion/impacto y pedir aprobacion explicita
- [ ] 8. Ejecutar solo tras aprobacion explicita
- [ ] 9. Reportar resultado y trazabilidad de la modificacion
```

### 1) Entender antes de modificar

Definir:
- que cambio se solicita exactamente
- por que es necesario
- que estado de Jira se vera afectado

Plantilla:

```md
Solicitud: <accion concreta>
Necesidad: <motivo>
Estado afectado: <que cambia en Jira>
```

### 2) Identificar objetivo con precision

Confirmar de forma inequívoca:
- issue key(s) objetivo (`ABC-123`, etc.)
- proyecto objetivo (si aplica)
- tipo de issue (si crea issue)
- transicion exacta (si transiciona issue)
- campos y valores exactos (si edita issue)
- texto final del comentario (si agrega comentario)
- horas/tiempo/descripcion (si registra worklog)

Si algo falta o es ambiguo, detener ejecucion y pedir precision.

### 3) Descubrir tools y schemas antes de usar

Antes de cualquier llamada:
- descubrir tools disponibles del servidor MCP de Atlassian
- leer schema/descriptor de cada tool candidata
- clasificar tools en lectura vs escritura
- usar solo las necesarias para la accion solicitada

### 4) Priorizacion de lectura previa

Usar lectura para validar contexto antes de escribir (si aplica):
- `getJiraIssue`
- `searchJiraIssuesUsingJql`
- `getTransitionsForJiraIssue`
- `getJiraProjectIssueTypesMetadata`
- `getJiraIssueTypeMetaWithFields`
- `getIssueLinkTypes`
- `getJiraIssueRemoteIssueLinks`

Si con lectura alcanza para resolver la solicitud, no escribir.

### 5) Tools de escritura permitidas bajo aprobacion explicita

Solo ejecutar tras aprobacion explicita:
- `createJiraIssue`
- `editJiraIssue`
- `addCommentToJiraIssue`
- `createIssueLink`
- `transitionJiraIssue`
- `addWorklogToJiraIssue`

### 6) Resumen obligatorio antes de modificar

Antes de ejecutar cualquier tool de escritura, mostrar:

```md
## Accion propuesta (pendiente de aprobacion)
- Accion a ejecutar: ...
- Issue(s) afectados: ...
- Campos/valores a modificar: ...
- Efecto esperado: ...
- Confirmacion: Esta accion modifica estado en Jira.
```

Sin aprobacion explicita posterior a este resumen, no ejecutar.

### 7) Ejecucion controlada

Con aprobacion explicita:
- ejecutar una sola accion por vez, salvo que el usuario pida explicitamente varias
- enviar exactamente los parametros confirmados
- evitar side effects no solicitados

### 8) Reporte de trazabilidad post-ejecucion

Despues de modificar, reportar:

```md
## Resultado de modificacion Jira
- Tool ejecutada: ...
- Parametros enviados: ...
- Issue(s) impactados: ...
- Resultado devuelto por Jira: ...
- Estado final observado (si aplica): ...
```

## Politica de ambiguedad

No ejecutar escrituras cuando haya dudas sobre:
- issue o proyecto objetivo
- campo/valor a modificar
- tipo de issue a crear
- transicion correcta
- contenido del comentario
- datos del worklog

En esos casos, responder con:
1) que falta confirmar
2) propuesta de accion (sin ejecutar)
3) solicitud de aprobacion explicita una vez aclarado

## Criterio final de seguridad

Toda escritura en Jira debe ser:
- solicitada explicitamente
- validada con parametros concretos
- aprobada explicitamente antes de ejecutar
- limitada al minimo cambio necesario
- reportada con trazabilidad completa
