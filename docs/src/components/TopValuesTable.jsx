import React, { useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import './TopValuesTable.css'

function TopValuesTable({ sensors, type }) {
  const topValues = useMemo(() => {
    // Collect all measurements from all sensors with sensor name
    const allMeasurements = []
    
    sensors.forEach(sensor => {
      sensor.medidas.forEach(medida => {
        allMeasurements.push({
          sensor: sensor.nombre_sensor,
          valor: medida.valor,
          timestamp: medida.timestamp
        })
      })
    })

    // Sort by value descending and take top 3
    return allMeasurements
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 3)
  }, [sensors])

  const unit = type === 'humedad' ? '%' : '°C'

  const formatDate = (timestamp) => {
    try {
      return format(parseISO(timestamp), "dd/MM/yyyy HH:mm", { locale: es })
    } catch {
      return timestamp
    }
  }

  const getMedalEmoji = (index) => {
    const medals = ['🥇', '🥈', '🥉']
    return medals[index] || ''
  }

  return (
    <div className="top-values-table">
      <h3>🏆 Top 3 Valores Máximos</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Sensor</th>
              <th>Valor</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {topValues.map((item, index) => (
              <tr key={index} className={`rank-${index + 1}`}>
                <td className="medal-cell">
                  <span className="medal">{getMedalEmoji(index)}</span>
                </td>
                <td className="sensor-cell">{item.sensor}</td>
                <td className="value-cell">
                  <strong>{item.valor.toFixed(1)}</strong> {unit}
                </td>
                <td className="timestamp-cell">{formatDate(item.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopValuesTable