# SWYW-BACKEND - Core Application Service

## Descripción

SWYW-BACKEND es el **corazón del ecosistema SWYW**, donde se procesa toda la lógica de negocio principal. Este servicio maneja los "**eventos**" - la unidad fundamental de la aplicación que puede representar tareas, recordatorios, o cualquier actividad programada según las necesidades del usuario.

### Conceptos Centrales

#### Eventos
Los **eventos** son la entidad principal del sistema y pueden funcionar como:
- **Tareas regulares**: Actividades o pendientes sin programación temporal específica
- **Recordatorios inteligentes**: Cuando se activa la opción `remember`, el evento se convierte en un recordatorio programado con funcionalidad MCP

#### Funcionalidad Remember
- **Estado**: Actualmente en desarrollo
- **Propósito**: Transformar eventos en recordatorios inteligentes
- **Tecnología**: Integración con Model Context Protocol (MCP)
- **Activación**: Mediante el campo `remember: true` en el evento

## Arquitectura del Backend

Este servicio está construido siguiendo principios de ingeniería de software de alta calidad:

### Patrones Implementados
- **DAO (Data Access Object)**: Abstracción de acceso a datos
- **Patrón Mediador**: Desacoplamiento entre componentes
- **IoC (Inversión de Control)**: Gestión de dependencias
- **DI (Inyección de Dependencias)**: Código testeable y mantenible

### Principios SOLID
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

### Screaming Architecture
La estructura del proyecto comunica claramente el dominio de negocio:

```
src/
├── config/         # Configuraciones del sistema
├── container/      # Inyección de dependencias
├── dao/           # Acceso a datos
├── db/            # Configuración de base de datos
├── features/      # Funcionalidades por dominio
├── share/         # Componentes compartidos
├── app.ts         # Configuración de la aplicación
└── index.ts       # Punto de entrada
```

## Requisitos Previos

- **Docker**: Versión 20.10 o superior
- **Red Docker**: Red `swyw` creada
- **Servicios Dependencies**: SWYW-AUTH y PostgreSQL ejecutándose

### Verificar Dependencies

```bash
# Verificar que la red existe
docker network ls | grep swyw

# Verificar servicios prerequisitos
docker ps | grep -E "(s-postgres|swyw-auth)"
```

## Configuración y Despliegue

### Paso 1: Preparar Variables de Entorno

Crear archivo `.env` en el directorio `SWYW-BACKEND` si no existe:

```bash
# Configuración del servidor
PORT=3000
DATABASE_URL=
TYPE_DATABASE=
GEMINI_API_KEYI=
ENV_MODEL_AI=gemini
NODE_ENV=production
```

### Paso 2: Construir la Imagen Docker

```bash
# Navegar al directorio del backend si te saliste en algun punto.
cd SWYW-BACKEND

# Construir la imagen
docker build -t swyw-bk:1.0 .

# Verificar la imagen creada
docker images | grep swyw-bk
```

### Paso 3: Ejecutar el Servicio Backend

```bash
docker run -d \
  --env-file .env \
  -p 3002:3000 \
  --name backend-swyw \
  --network swyw \
  swyw-bk:1.0
```

**Parámetros del comando:**
- `--env-file .env`: Carga variables desde archivo
- `-p 3002:3000`: Puerto externo 3002 → puerto interno 3000
- `--name backend-swyw`: Nombre del contenedor
- `--network swyw`: Conecta a la red del proyecto
- `swyw-bk:1.0`: Imagen y tag a ejecutar

## API Endpoints

### Gestión de Eventos

#### Crear Evento
```bash
POST /api/events

# Ejemplo de request
curl -X POST http://localhost:3002/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Comida con Rodry",
    "description": "Se ha planificado una comida el 3 de septiembre a las 4pm con Rodry.",
    "date": "2025-09-03T16:00:00.000Z",
    "participants": "Rodry",
    "type": "urgent",
    "remember": false
  }'
```

#### Estructura del Evento
```typescript
interface Event {
  title: string;           // Título del evento
  description: string;     // Descripción detallada
  date: Date;             // Fecha y hora programada
  participants: string;    // Participantes involucrados
  type: 'normal' | 'urgent' | 'reminder';  // Tipo de evento
  remember: boolean;       // Activar funcionalidad remember (MCP)
}
```

#### Otros Endpoints
```bash
# Listar eventos
GET /api/events

# Health check
GET /health
```

## Verificación del Despliegue

### 1. Verificar que el contenedor esté corriendo

```bash
docker ps | grep backend-swyw

# Output esperado:
# CONTAINER ID   IMAGE         COMMAND                  CREATED         STATUS         PORTS                    NAMES
# xxxxxxxxx      swyw-bk:1.0   "npm start"              2 minutes ago   Up 2 minutes   0.0.0.0:3002->3000/tcp   backend-swyw
```

### 2. Verificar logs del servicio

```bash
# Ver logs del backend
docker logs backend-swyw

# Output esperado:
# Server is running on port 3000
```

### 3. Probar conectividad

```bash
# Health check
curl http://localhost:3002/health

# Test crear evento
curl -X POST http://localhost:3002/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Evento de Prueba",
    "description": "Prueba del backend",
    "date": "2025-01-15T10:00:00.000Z",
    "participants": "Usuario Test",
    "type": "normal",
    "remember": false
  }'
```

## Troubleshooting

### Problema: Backend no puede conectar a la BD
**Solución:**
```bash
# Verificar que PostgreSQL esté corriendo
docker ps | grep s-postgres

# Verificar conectividad de red
docker exec backend-swyw ping s-postgres

# Revisar variables de entorno
docker exec backend-swyw env | grep DB_
```

### Problema: Puerto 3002 ya está en uso
```bash
# Verificar qué usa el puerto
sudo lsof -i :3002

# Usar puerto alternativo
docker run --env-file .env -p 3003:3000 --name backend-swyw --network swyw swyw-bk:1.0
```

### Problema: Servicio Auth no disponible
```bash
# Verificar que el servicio de auth esté corriendo
docker ps | grep swyw-auth

# Probar conectividad desde el backend
docker exec backend-swyw curl http://swyw-auth:4000/health
```

## Desarrollo Local

### Instalación de dependencias
```bash
# Con npm
npm install

# Con bun (si está disponible)
bun install
```

### Ejecutar en modo desarrollo
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start

# Con variables de entorno específicas
NODE_ENV=development npm run dev
```

```bash
# Detener el servicio
docker stop backend-swyw

# Remover contenedor
docker rm backend-swyw

# Remover imagen (opcional)
docker rmi swyw-bk:1.0
```

## Roadmap

### ✅ Implementado
- [x] Gestión completa de eventos
- [x] API RESTful
- [x] Integración con PostgreSQL
- [x] Containerización con Docker
- [x] Arquitectura SOLID

### 🚧 En Desarrollo
- [ ] Funcionalidad Remember con MCP
- [ ] Sistema de notificaciones
- [ ] Autenticación JWT integrada


---

**SWYW-BACKEND** - El corazón de la aplicación desarrollado con arquitectura limpia y principios SOLID.
