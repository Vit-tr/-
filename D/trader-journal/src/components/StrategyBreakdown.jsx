import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Section.css'

export default function StrategyBreakdown({ trades }) {
  const data = useMemo(() => {
    const closedTrades = trades.filter(t => t.pnl !== null)
    
    const straddleTrades = closedTrades.filter(t => t.strategy === 'STRADDLE')
    const strangleTrades = closedTrades.filter(t => t.strategy === 'STRANGLE')
    
    const calcStats = (strategyTrades) => {
      const winners = strategyTrades.filter(t => t.pnl > 0)
      const totalPnL = strategyTrades.reduce((sum, t) => sum + t.pnl, 0)
      const avgPnL = strategyTrades.length > 0 ? totalPnL / strategyTrades.length : 0
      const winRate = strategyTrades.length > 0 ? (winners.length / strategyTrades.length * 100) : 0
      
      return {
        count: strategyTrades.length,
        totalPnL: Math.round(totalPnL),
        avgPnL: Math.round(avgPnL),
        winRate: Math.round(winRate * 10) / 10
      }
    }
    
    return [
      {
        strategy: 'Straddle',
        ...calcStats(straddleTrades)
      },
      {
        strategy: 'Strangle',
        ...calcStats(strangleTrades)
      }
    ]
  }, [trades])

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Сравнение стратегий</h2>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="strategy" style={{ fontSize: '12px' }} />
          <YAxis style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }} 
          />
          <Legend />
          <Bar dataKey="totalPnL" fill="var(--primary)" name="Total P&L ($)" />
          <Bar dataKey="winRate" fill="var(--success)" name="Win Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
