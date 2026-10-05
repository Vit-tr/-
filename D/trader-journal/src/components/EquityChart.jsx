import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Section.css'

export default function EquityChart({ trades }) {
  const equityData = useMemo(() => {
    const closedTrades = trades
      .filter(t => t.pnl !== null && t.exitTime)
      .sort((a, b) => new Date(a.exitTime) - new Date(b.exitTime))
    
    let runningEquity = 10000
    let peak = runningEquity
    const data = []
    
    closedTrades.forEach(trade => {
      runningEquity += trade.pnl
      peak = Math.max(peak, runningEquity)
      const drawdown = ((runningEquity - peak) / peak) * 100
      
      data.push({
        date: new Date(trade.exitTime).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }),
        equity: Math.round(runningEquity),
        drawdown: Math.round(drawdown * 10) / 10
      })
    })
    
    return data
  }, [trades])

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Equity Curve & Drawdown</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={equityData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" style={{ fontSize: '12px' }} />
          <YAxis yAxisId="left" style={{ fontSize: '12px' }} />
          <YAxis yAxisId="right" orientation="right" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }} 
          />
          <Legend />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="equity" 
            stroke="var(--primary)" 
            strokeWidth={2}
            name="Equity ($)"
            dot={false}
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="drawdown" 
            stroke="var(--danger)" 
            strokeWidth={2}
            name="Drawdown (%)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
