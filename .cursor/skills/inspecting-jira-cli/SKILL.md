---
name: inspecting-jira-cli
description: Explora de forma segura la CLI de Atlassian (acli) en modo solo lectura para descubrir comandos, entender su uso y documentar capacidades de consulta en Jira sin modificar datos. Use cuando se necesite aprender o mapear capacidades de acli con comandos help.
---

# Inspecting Jira CLI

## Objetivo

Explorar la CLI de Atlassian (`acli`) para entender que comandos existen y como usarlos de forma segura, enfocandose en capacidades de consulta de Jira sin modificar estado.

## Cuando aplicar este skill

Aplicar cuando se requiera:
- descubrir comandos disponibles de `acli`
- entender sintaxis y jerarquia de comandos en Jira CLI
- identificar comandos utiles para consultar informacion
- documentar capacidades de la herramienta antes de automatizar flujos

## Responsabilidad y limites

- este skill solo explora y documenta capacidades de la CLI
- no ejecuta operaciones que modifiquen Jira
- no prueba comandos de escritura
- no asume que un comando es seguro si no queda claro en su ayuda

## Reglas no negociables (readonly estricto)

- usar comandos de ayuda (`--help`) como mecanismo principal de exploracion
- no ejecutar comandos de `create`, `edit`, `delete`, `transition`, `archive`, `restore`, `assign`, `link`, `comment`, `attachment` o equivalentes
- si un comando no es claramente de solo lectura, no ejecutarlo
- priorizar exploracion pasiva (help y, solo si es claramente seguro, comandos de lectura)

## Flujo obligatorio de exploracion segura

Copiar este checklist y marcar progreso:

```md
Jira CLI Inspection Progress
- [ ] 1. Verificar disponibilidad de `acli`
- [ ] 2. Explorar comando raiz con `acli --help`
- [ ] 3. Explorar namespace Jira con `acli jira --help`
- [ ] 4. Explorar submodulos relevantes (`workitem`, `project`, etc.) con `--help`
- [ ] 5. Clasificar comandos: consulta vs potencial escritura
- [ ] 6. Resumir capacidades de consulta detectadas
- [ ] 7. Reportar hallazgos y limites de seguridad
```

### 1) Comandos base recomendados

Ejecutar primero:

```bash
acli --help
acli jira --help
acli jira workitem --help
acli jira project --help
```

Luego ampliar solo con `--help` en subcomandos utiles de consulta.

### 2) Criterio de clasificacion de comandos

Clasificar cada comando encontrado en:
- `consulta segura`: describe lectura de informacion (`list`, `view`, `search`, `--help`)
- `potencial escritura`: puede cambiar estado (`create`, `edit`, `delete`, `transition`, etc.)
- `no claro`: la ayuda no permite asegurar que sea readonly

Para `potencial escritura` o `no claro`: no ejecutar.

### 3) Alcance permitido de ejecucion

Permitido:
- `--help` en cualquier nivel de comando
- comandos de lectura solo si son inequívocamente readonly

No permitido:
- cualquier comando que cree, edite, borre, archive, restaure, transicione o vincule entidades
- cualquier comando con efectos laterales no confirmados

## Formato de salida obligatorio

```md
## Fuente
- Herramienta: acli (Atlassian CLI)
- Modo: readonly (exploracion segura)

## Comandos ejecutados
- Comando: `<comando>`
  - Que hace: <explicacion simple>
  - Tipo: consulta segura | potencial escritura | no claro
  - Hallazgo relevante: <insight puntual>

## Capacidades de consulta identificadas
- <lista de capacidades readonly utiles para Jira>

## Riesgos y limites detectados
- <comandos o areas no ejecutadas por seguridad>
- <ambiguedades encontradas en la ayuda>
```

## Estilo de explicacion

- explicar cada comando en lenguaje simple y directo
- evitar jerga innecesaria
- destacar primero lo util para consulta de Jira
- mantener foco en aprendizaje seguro de la herramienta

## Criterio final de seguridad

Si una accion no es inequívocamente de lectura, no se ejecuta.
Este skill prioriza exploracion segura y trazable de capacidades de `acli`.
