# Requerimientos

Quiero hacer una app en React o similar que sea un Dashboard de sensores de humedad y temperatura.

Los datos estarán en la carpeta data/ (de momento fabrica algunos fake) y se toman cada 10 minutos la humedad y cada 5 la temperatura. Asumamos valores comunes en el ambiente.
Cada sensor es un archivo, el mismo tendrá un json con la siguiente estructura:

```
{ 
    "nombre_sensor": "puerta",
    "tipo_sensor": "humedad",
    "medidas": [....]
}
```

El dashboard debe tener:
- La serie temporal de ambos sensores con filtros, zoom, y herramientas para ver
- Un tabla el top 3 de valores de cada indicador


Si se agregan archivos nuevos en data se deben agregar a la visualización automaticamente.