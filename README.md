# SWYW - Send What You Want

## Descripción del Proyecto

**SWYW (Send What You Want)** es un proyecto multipropósito, que funciona como una plataforma versátil capaz de adaptarse a múltiples necesidades. Su flexibilidad le permite servir como herramienta TO-DO, pero también cuenta con una funcionalidad especial de agenda que se activa mediante la opción "remember".

### Características Principales

- **Multipropósito**: Diseñado para adaptarse a diferentes casos de uso según las necesidades del usuario
- **Sistema de Agenda Inteligente**: Funcionalidad de recordatorios y programación activada mediante la opción "remember"
- **Integración MCP**: La funcionalidad de agenda está en fase de desarrollo utilizando Model Context Protocol (MCP)
- **Arquitectura Robusta**: Implementado siguiendo los mejores patrones y principios de desarrollo

---

## Arquitectura del Backend

El backend está desarrollado siguiendo una arquitectura limpia y principios de ingeniería de software de alta calidad:

### Patrones Implementados
- **DAO (Data Access Object)**: Para la abstracción de acceso a datos
- **Patrón Mediador**: Para el desacoplamiento de componentes
- **IoC (Inversión de Control)**: Para la gestión de dependencias
- **DI (Inyección de Dependencias)**: Para un código más testeable y mantenible

### Principios SOLID
El proyecto adhiere estrictamente a los principios SOLID para garantizar código limpio, mantenible y escalable.

### Screaming Architecture
Implementamos Screaming Architecture, donde la estructura del proyecto comunica claramente el propósito del negocio, no los frameworks utilizados.

---

## Estructura del Proyecto

```
SWYW-PROJECT/
├── SWYW-AUTH/          # Servicio de autenticación y base de datos
├── SWYW-BACKEND/       # API principal del sistema
├── docker-compose.yml  # Orquestación completa del stack
└── README.md          # Este archivo
```

---

## Requisitos Previos

- **Docker**: Versión 20.10 o superior
- **Docker Compose**: Versión 2.0 o superior

## Despliegue por Servicios Individuales

### Configuración de la Red Docker

Antes de ejecutar cualquier servicio, es necesario crear la red personalizada que conectará todos los contenedores:

```bash
docker network create swyw
```

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
# Limpiar los contenedores anteriores (si no tienes más contenedores)
docker rm -f $(docker ps -a -q)
```

```bash
# Limpiar solo los ejecutados anteriormente
docker ps
docker rm -f [id] [id] # id de los containers
```

```bash
# Levantar todo el stack
docker compose --env-file .env down #Para asegurarnos de que no hayan instancias anteriores
docker compose --env-file .env up -d --build --force-recreate

# Ver logs
docker-compose logs -f

# Detener servicios
docker compose --env-file .env down
```

---
### Etapa 3: Despliegue automáticamente mediante ansible
La tercera opción o etapa, es usar ansible para que con un solo comando se configure y despligue toda la
applicación.

```bash
  #Primero debemos ingresar a la carpeta ansible donde están todos los playbooks
  cd ansible/

  #Ahora si se va a ejectur en un host nuevo, lo mejor es configurarlo automaticamente para que tengas todas las dependencias necesarias.
  ansible-playbook -i inventory.ini setup_enviroment.yaml

  #Con todas las dependencias necesarias instaladas, ahora si podemos ejecutar el comando de despliegue.
  ansible-playbook -i inventory.ini deploy_app.yaml
```

## Uso de la Aplicación

Una vez que hayas levantado los servicios con `docker compose up`, puedes acceder a la aplicación web:

### Acceso a la Interfaz

1. **Abrir la aplicación**: Ve a [http://localhost:8080](http://localhost:8080) en tu navegador web si se
está corriendo desde tu host, sino ve a  [http://ip-de-tu-vm:8080](http://[ip-de-tu-vm]:8080) si se está corriendo desde una maquina virtual.
2. **Primera vez - Registro**:
   - Si es tu primera vez usando la aplicación, encontrarás una interfaz gráfica con un sistema de login
   - Debes registrarte con tus datos
   - Después del registro serás redirigido automáticamente a la pantalla de inicio de sesión

3. **Inicio de sesión**: Una vez registrado, inicia sesión con tus credenciales

### Crear Notas y Eventos

Una vez dentro de la aplicación:

1. **Agregar nueva nota/evento**:
   - Haz clic en el botón **"+"** para crear una nueva entrada

2. **Completar la información**:
   Por el momento solo hay notas Inteligentes, por eso se debe seguir este esquema:
   - **Título**: Escribe el título de tu nota o evento
   - **Descripción**: Describe detalladamente tu nota. Por ejemplo:
     ```
     "Hoy debo reunirme con Juan, Alberto y Manuel a las 6pm para discutir el tema de acreditación"
     ```

3. **Configurar prioridad**:
   - **Tipo**: Selecciona entre:
     - 🔴 **Urgente**: Para tareas que requieren atención inmediata
     - 🟡 **Normal**: Para tareas regulares
     - 🟢 **Recurrente**: Para tareas que se repiten

4. **Activar recordatorio**:
   - **Tipo recordatorio**: Marca esta opción si quieres que la entrada funcione como un recordatorio
   - Esta funcionalidad activa el sistema de agenda inteligente de SWYW

5. **Guardar**: Confirma la creación de tu nota/evento

### Funcionalidades Adicionales

- **Gestión de tareas**: Visualiza, edita y elimina tus notas y eventos
- **Sistema de recordatorios**: Las entradas marcadas como "recordatorio" activarán notificaciones
- **Organización por prioridad**: Filtra y organiza tus tareas según su nivel de importancia

---

## Estado del Desarrollo

### ✅ Completado
- Backend con arquitectura clean y patrones avanzados
- Servicio de autenticación
- Base de datos configurada
- Dockerización de servicios
- Red personalizada Docker
- Interfaz web funcional
- Sistema de login y registro


### 🚧 En Desarrollo
- Funcionalidad "remember" con integración MCP
- Optimizaciones de performance
- Sistema de notificaciones avanzadas

### 📋 Próximas Funcionalidades
- API de notificaciones push
- Integración con servicios externos
- Documentación de API completa
---

## Conceptos Aplicados

En este proyecto estamos aplicando los siguientes conceptos de containerización y desarrollo aprendidos en clase de devops con nuestro profesor:

1. **Construcción de Imágenes**: Cada servicio tiene su propio Dockerfile optimizado
2. **Ejecución Individual**: Capacidad de ejecutar servicios por separado con `docker run`
3. **Redes Personalizadas**: Implementación de red bridge personalizada `swyw`
4. **Orquestación**: Stack completo gestionado con Docker Compose
5. **Separación de Responsabilidades**: Cada servicio maneja su dominio específico
6. **Escalabilidad**: Arquitectura preparada para crecimiento horizontal
7. **Full Stack**: Integración completa entre backend, base de datos y frontend
8. **Automatización**: Integración con la herramienta ansible, para automatizar la configuración del Servidor
y el despliegue de toda la app.


**SWYW Project** - Desarrollado con 💚 siguiendo las mejores prácticas de ingeniería de software.
