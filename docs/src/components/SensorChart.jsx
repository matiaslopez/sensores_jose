import React, { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import './SensorChart.css'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0']

function SensorChart({ sensors, type }) {
  const [selectedSensors, setSelectedSensors] = useState(
    sensors.reduce((acc, sensor) => {
      acc[sensor.nombre_sensor] = true
      return acc
    }, {})
  )

  const [timeRange, setTimeRange] = useState('all')

  // Prepare data for the chart
  const chartData = useMemo(() => {
    if (sensors.length === 0) return []

    // Get all unique timestamps across all sensors
    const timestampSet = new Set()
    sensors.forEach(sensor => {
      sensor.medidas.forEach(medida => {
        timestampSet.add(medida.timestamp)
      })
    })

    const sortedTimestamps = Array.from(timestampSet).sort()

    // Apply time range filter
    let filteredTimestamps = sortedTimestamps
    if (timeRange !== 'all') {
      const count = parseInt(timeRange)
      filteredTimestamps = sortedTimestamps.slice(-count)
    }

    // Build data points
    return filteredTimestamps.map(timestamp => {
      const dataPoint = { timestamp }
      
      sensors.forEach(sensor => {
        const medida = sensor.medidas.find(m => m.timestamp === timestamp)
        if (medida && selectedSensors[sensor.nombre_sensor]) {
          dataPoint[sensor.nombre_sensor] = medida.valor
        }
      })

      return dataPoint
    })
  }, [sensors, selectedSensors, timeRange])

  const toggleSensor = (sensorName) => {
    setSelectedSensors(prev => ({
      ...prev,
      [sensorName]: !prev[sensorName]
    }))
  }

  const formatXAxis = (timestamp) => {
    try {
      return format(parseISO(timestamp), 'HH:mm', { locale: es })
    } catch {
      return timestamp
    }
  }

  const formatTooltipLabel = (timestamp) => {
    try {
      return format(parseISO(timestamp), "dd/MM/yyyy HH:mm", { locale: es })
    } catch {
      return timestamp
    }
  }

  const unit = type === 'humedad' ? '%' : '°C'

  return (
    <div className="sensor-chart">
      <div className="chart-controls">
        <div className="sensor-toggles">
          <span className="control-label">Sensores:</span>
          {sensors.map((sensor, index) => (
            <label key={sensor.nombre_sensor} className="sensor-toggle">
              <input
                type="checkbox"
                checked={selectedSensors[sensor.nombre_sensor]}
                onChange={() => toggleSensor(sensor.nombre_sensor)}
              />
              <span 
                className="sensor-name"
                style={{ color: COLORS[index % COLORS.length] }}
              >
                {sensor.nombre_sensor}
              </span>
            </label>
          ))}
        </div>

        <div className="time-range-selector">
          <span className="control-label">Rango:</span>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="all">Todos</option>
            <option value="10">Últimos 10</option>
            <option value="20">Últimos 20</option>
            <option value="50">Últimos 50</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxis}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            label={{ value: unit, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={formatTooltipLabel}
            formatter={(value) => [`${value.toFixed(1)} ${unit}`, '']}
          />
          <Legend />
          {sensors.map((sensor, index) => (
            selectedSensors[sensor.nombre_sensor] && (
              <Line
                key={sensor.nombre_sensor}
                type="monotone"
                dataKey={sensor.nombre_sensor}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name={sensor.nombre_sensor}
              />
            )
          ))}
          <Brush 
            dataKey="timestamp" 
            height={30} 
            stroke="#667eea"
            tickFormatter={formatXAxis}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SensorChart