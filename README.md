# SWYW - Send What You Want

## Descripción del Proyecto

**SWYW (Send What You Want)** es un proyecto multipropósito, que funciona como una plataforma versátil capaz de adaptarse a múltiples necesidades. Su flexibilidad le permite servir como herramienta
TO-DO, pero también cuenta con una funcionalidad especial de agenda que se activa mediante la opción "remember".

### Características Principales

- **Multipropósito**: Diseñado para adaptarse a diferentes casos de uso según las necesidades del usuario
- **Sistema de Agenda Inteligente**: Funcionalidad de recordatorios y programación activada mediante la opción "remember"
- **Integración MCP**: La funcionalidad de agenda está en fase de desarrollo utilizando Model Context Protocol (MCP)
- **Arquitectura Robusta**: Implementado siguiendo los mejores patrones y principios de desarrollo

### Arquitectura del Backend

El backend está desarrollado siguiendo una arquitectura limpia y principios de ingeniería de software de alta calidad:

#### Patrones Implementados
- **DAO (Data Access Object)**: Para la abstracción de acceso a datos
- **Patrón Mediador**: Para el desacoplamiento de componentes
- **IoC (Inversión de Control)**: Para la gestión de dependencias
- **DI (Inyección de Dependencias)**: Para un código más testeable y mantenible

#### Principios SOLID
El proyecto adhiere estrictamente a los principios SOLID para garantizar código limpio, mantenible y escalable.

#### Screaming Architecture
Implementamos Screaming Architecture, donde la estructura del proyecto comunica claramente el propósito del negocio, no los frameworks utilizados.

## Estructura del Proyecto

```
SWYW-PROJECT/
├── SWYW-AUTH/          # Servicio de autenticación y base de datos
├── SWYW-BACKEND/       # API principal del sistema
├── docker-compose.yml  # Orquestación completa del stack
└── README.md          # Este archivo
```

## Requisitos Previos

- **Docker**: Versión 20.10 o superior
- **Docker Compose**: Versión 2.0 o superior

## Configuración de la Red Docker

Antes de ejecutar cualquier servicio, es necesario crear la red personalizada que conectará todos los contenedores:

```bash
docker network create swyw
```

## Despliegue por Servicios Individuales

### Etapa 1: Ejecución de Servicios por Separado

Para demostrar la construcción de imágenes y ejecución individual de cada servicio, sigue estos pasos en orden:

#### 1. Base de Datos y Autenticación

El primer servicio que debe iniciarse es la base de datos junto con el servicio de autenticación.

**📁 Consulta las instrucciones detalladas en: [`SWYW-AUTH/README.md`](./SWYW-AUTH/README.md)**

Este README contiene:
- Construcción de la imagen Docker
- Configuración de la base de datos
- Ejecución del contenedor con `docker run`
- Conexión a la red `swyw`

#### 2. Backend Principal

Una vez que la base de datos esté funcionando, procede con el servicio backend.

**📁 Consulta las instrucciones detalladas en: [`SWYW-BACKEND/README.md`](./SWYW-BACKEND/README.md)**

Este README incluye:
- Build del Dockerfile del backend
- Configuración de variables de entorno
- Ejecución con `docker run`
- Conexión a la red personalizada

### Etapa 2: Orquestación con Docker Compose

Para el despliegue completo del stack utilizando Docker Compose:

```bash
# limpiar los contenedores anteriores (si no tienes más contenedores)
docker rm -f $(docker ps -a -q)


#limpiar solo los ejeecutados anteriormente
docker ps

docker rm -f [id] [id] #id de los containers
```

```bash


# Levantar todo el stack
docker compose --env-file .env up -d

# Levantar con modificaciones y forzar
docker compose --env-file .env up -d --build --force-recreate

# Ver logs
docker-compose logs -f

# Detener servicios
docker compose --env-file .env down
```
### Configurar Estructura de Base de Datos

Una vez que PostgreSQL esté corriendo, debemos crear la tabla de usuarios:

```bash
# Acceder al contenedor de PostgreSQL
docker exec -it s-postgres bash

# Conectar a PostgreSQL como usuario postgres
psql -U postgres

# Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    create_at TIMESTAMP DEFAULT NOW(),
    pass TEXT NOT NULL
);

# Salir de PostgreSQL
\q

# Salir del contenedor
exit
```

## Estado del Desarrollo

### ✅ Completado
- Backend con arquitectura clean y patrones avanzados
- Servicio de autenticación
- Base de datos configurada
- Dockerización de servicios
- Red personalizada Docker

### 🚧 En Desarrollo
- Funcionalidad "remember" con integración MCP
- Optimizaciones de performance

### 📋 Próximas Funcionalidades
- API de notificaciones
- Integración con servicios externos
- Documentación de API completa

## Conceptos Demostrados

Este proyecto demuestra los siguientes conceptos de containerización:

1. **Construcción de Imágenes**: Cada servicio tiene su propio Dockerfile optimizado
2. **Ejecución Individual**: Capacidad de ejecutar servicios por separado con `docker run`
3. **Redes Personalizadas**: Implementación de red bridge personalizada `swyw`
4. **Orquestación**: Stack completo gestionado con Docker Compose
5. **Separación de Responsabilidades**: Cada servicio maneja su dominio específico
6. **Escalabilidad**: Arquitectura preparada para crecimiento horizontal

## Contribución

Para contribuir al proyecto:

1. Revisa la documentación específica de cada servicio
2. Sigue las convenciones de código establecidas
3. Respeta los principios SOLID implementados
4. Mantén la coherencia con la Screaming Architecture

---

**SWYW Project** - Desarrollado con 💚 siguiendo las mejores prácticas de ingeniería de software.
