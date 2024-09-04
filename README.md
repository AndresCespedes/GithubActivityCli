# GitHub Activity CLI

## Descripción

GitHub Activity CLI es una herramienta de línea de comandos (CLI) que permite a los usuarios obtener y gestionar la actividad reciente de cualquier usuario de GitHub. Con esta herramienta, puedes consultar la actividad de un usuario, filtrar eventos específicos, guardar la información en archivos, y más.

## Características

- Obtener la actividad reciente de un usuario de GitHub.
- Consultar la información básica de un usuario de GitHub (nombre, biografía, repositorios públicos, seguidores, etc.).
- Filtrar la actividad por tipo de evento (commits, issues, estrellas, pull requests).
- Guardar la actividad en archivos JSON para su posterior revisión.
- Asignar alias a los nombres de usuario para facilitar su uso.

## Requisitos

- Node.js (v16 o superior)
- NPM (Node Package Manager)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tuusuario/githubactivitycli.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd githubactivitycli
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

4. Puedes instalar el CLI globalmente para usarlo desde cualquier ubicación:

   ```bash
   npm install -g
   ```

# Uso

## Comandos Básicos

1. Obtener la actividad reciente de un usuario:

   ```bash
   gac activity <username>
   ```

2. Obtener la información de un usuario:

   ```bash
   gac info <username>
   ```

3. Agregar un alias para un usuario:

   ```bash
   gac add-alias <username> <alias>
   ```

4. Filtrar la actividad por tipo de evento:

   ```bash
   gac filter <username> <filter>
   ```

5. Guardar la actividad en un archivo JSON:

   ```bash
   gac save <username> <filename> <filter>
   ```

6. Ver el historial guardado:

   ```bash
   gac history
   ```
