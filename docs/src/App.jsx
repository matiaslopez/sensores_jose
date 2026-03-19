import React, { useState, useEffect } from 'react'
import SensorChart from './components/SensorChart'
import TopValuesTable from './components/TopValuesTable'
import './App.css'

function App() {
  const [sensorsData, setSensorsData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSensorData()
    // Auto-reload every 30 seconds to detect new files
    const interval = setInterval(loadSensorData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadSensorData = async () => {
    try {
      // In a real scenario, we'd have an API endpoint to list files
      // For this demo, we'll load the known sensor files
      const sensorFiles = [
        'sensor_humedad_puerta.json',
        'sensor_humedad_ventana.json',
        'sensor_temperatura_sala.json',
        'sensor_temperatura_cocina.json'
      ]

      const dataPromises = sensorFiles.map(async (file) => {
        try {
          const response = await fetch(`${import.meta.env.BASE_URL}data/${file}`)
          if (response.ok) {
            return await response.json()
          }
          return null
        } catch (error) {
          console.error(`Error loading ${file}:`, error)
          return null
        }
      })

      const results = await Promise.all(dataPromises)
      const validData = results.filter(data => data !== null)
      setSensorsData(validData)
      setLoading(false)
    } catch (error) {
      console.error('Error loading sensor data:', error)
      setLoading(false)
    }
  }

  const humiditySensors = sensorsData.filter(s => s.tipo_sensor === 'humedad')
  const temperatureSensors = sensorsData.filter(s => s.tipo_sensor === 'temperatura')

  if (loading) {
    return (
      <div className="app">
        <h1>Dashboard de Sensores</h1>
        <div className="loading">Cargando datos...</div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Dashboard de Sensores</h1>
        <p className="subtitle">Monitoreo de humedad y temperatura en tiempo real</p>
      </header>

      <div className="dashboard-grid">
        {/* Humidity Section */}
        <section className="sensor-section">
          <h2>💧 Sensores de Humedad</h2>
          {humiditySensors.length > 0 ? (
            <>
              <SensorChart sensors={humiditySensors} type="humedad" />
              <TopValuesTable sensors={humiditySensors} type="humedad" />
            </>
          ) : (
            <p className="no-data">No hay datos de sensores de humedad</p>
          )}
        </section>

        {/* Temperature Section */}
        <section className="sensor-section">
          <h2>🌡️ Sensores de Temperatura</h2>
          {temperatureSensors.length > 0 ? (
            <>
              <SensorChart sensors={temperatureSensors} type="temperatura" />
              <TopValuesTable sensors={temperatureSensors} type="temperatura" />
            </>
          ) : (
            <p className="no-data">No hay datos de sensores de temperatura</p>
          )}
        </section>
      </div>

      <footer className="app-footer">
        <p>Última actualización: {new Date().toLocaleString('es-AR')}</p>
        <p>Total de sensores activos: {sensorsData.length}</p>
      </footer>
    </div>
  )
}

export default App