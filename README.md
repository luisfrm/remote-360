# Proyecto Node.js con MongoDB y Docker

Este proyecto utiliza Node.js, MongoDB, Docker y Docker Compose para crear un entorno de desarrollo completo. El gestor de paquetes utilizado es `bun` y se requiere tener instalada la versión 22 de Node.js.

## Requisitos

- [Node.js v22](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Bun](https://bun.sh/)

## Instalación

1. **Clonar el Repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. **Instalar Dependencias**:
    ```bash
    bun install
    ```

3. **Configurar Variables de Entorno**:

    Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias. Por ejemplo:

    ```env
    MONGO_URI=mongodb://localhost:27017/remote360
    PORT=4506
    ```

## Uso

### Ejecutar la Aplicación

1. **Iniciar Servicios con Docker Compose**:
    ```bash
    docker-compose up 
    ```

    Tambien puedes agregar el flag `-d` para que la aplicación se ejecute en segundo plano.

    ```bash
    docker-compose up -d
    ```

2. **Verificar que los Servicios Están Corriendo**:
    ```bash
    docker-compose ps
    ```

### Acceso a la Aplicación

Una vez que los contenedores estén en funcionamiento, la aplicación Node.js debería estar disponible en `http://localhost:3000`.

## Scripts

- **Iniciar MongoDB**:
    ```bash
    docker-compose up -d mongodb
    ```

- **Iniciar Todos los Servicios**:
    ```bash
    npm run start-backend
    ```

## Docker Compose

El archivo `docker-compose.yml` se configura de la siguiente manera:

```yaml
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb_remote360
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

volumes:
  mongo-data:

networks:
  app-network:
