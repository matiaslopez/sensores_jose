# Dashboard de Sensores

Dashboard interactivo para monitoreo de sensores de humedad y temperatura en tiempo real.

## 🚀 Características

- **Visualización de Series Temporales**: Gráficos interactivos con Recharts
- **Filtros dinámicos**: Selección de sensores y rangos de tiempo
- **Zoom**: Herramienta de brush para hacer zoom en períodos específicos
- **Top 3 Valores**: Tabla con los valores máximos registrados
- **Detección automática**: Recarga datos cada 30 segundos para detectar nuevos sensores
- **Responsive**: Diseño adaptable a diferentes tamaños de pantalla

## 📁 Estructura de Datos

Los sensores se almacenan en archivos JSON en la carpeta `data/` con la siguiente estructura:

```json
{
  "nombre_sensor": "puerta",
  "tipo_sensor": "humedad",
  "medidas": [
    { "timestamp": "2026-03-19T10:00:00", "valor": 45.2 },
    { "timestamp": "2026-03-19T10:10:00", "valor": 46.1 }
  ]
}
```

### Tipos de sensores soportados:
- `humedad`: Mediciones cada 10 minutos (valores en %)
- `temperatura`: Mediciones cada 5 minutos (valores en °C)

## 🛠️ Instalación y Uso

### Instalar dependencias:
```bash
npm install
```

### Ejecutar en modo desarrollo:
```bash
npm run dev
```

El dashboard estará disponible en: http://localhost:5173/

### Construir para producción:
```bash
npm run build
```

### Vista previa de producción:
```bash
npm run preview
```

## 📊 Sensores Incluidos

El proyecto incluye 4 sensores de ejemplo:
- `sensor_humedad_puerta.json` - Sensor de humedad en puerta
- `sensor_humedad_ventana.json` - Sensor de humedad en ventana
- `sensor_temperatura_sala.json` - Sensor de temperatura en sala
- `sensor_temperatura_cocina.json` - Sensor de temperatura en cocina

## ➕ Agregar Nuevos Sensores

1. Crear un nuevo archivo JSON en `data/` siguiendo la estructura especificada
2. Agregarlo al array `sensorFiles` en `src/App.jsx` (línea ~21)
3. El dashboard lo detectará automáticamente

## 🎨 Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **Recharts** - Librería de gráficos
- **date-fns** - Manejo de fechas
- **CSS3** - Estilos y diseño responsive

## 📝 Funcionalidades del Dashboard

### Gráficos de Series Temporales
- Visualización de múltiples sensores simultáneamente
- Toggle para mostrar/ocultar sensores individuales
- Selector de rango temporal (últimos 10, 20, 50 o todos)
- Herramienta de zoom con brush interactivo
- Tooltips informativos con valores y timestamps

### Tabla Top 3
- Muestra los 3 valores más altos registrados
- Medallas 🥇🥈🥉 para cada posición
- Información de sensor, valor y timestamp
- Destacado visual por ranking

## 🔄 Actualización Automática

El dashboard recarga los datos cada 30 segundos automáticamente para detectar:
- Nuevos archivos de sensores
- Actualizaciones en los datos existentes
- Cambios en las mediciones