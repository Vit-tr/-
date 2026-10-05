import { useMemo } from 'react'
import './KPICards.css'

export default function KPICards({ trades }) {
  const stats = useMemo(() => {
    const closedTrades = trades.filter(t => t.pnl !== null)
    const totalPnL = closedTrades.reduce((sum, t) => sum + t.pnl, 0)
    const winners = closedTrades.filter(t => t.pnl > 0)
    const losers = closedTrades.filter(t => t.pnl <= 0)
    const winRate = closedTrades.length > 0 
      ? (winners.length / closedTrades.length * 100) 
      : 0
    
    const activeTrades = trades.filter(t => t.pnl === null)
    const btcActive = activeTrades.filter(t => t.asset === 'BTC').length
    const ethActive = activeTrades.filter(t => t.asset === 'ETH').length
    
    const avgWin = winners.length > 0 
      ? winners.reduce((sum, t) => sum + t.pnl, 0) / winners.length 
      : 0
    const avgLoss = losers.length > 0 
      ? Math.abs(losers.reduce((sum, t) => sum + t.pnl, 0) / losers.length)
      : 0
    
    const expectancy = closedTrades.length > 0
      ? (winRate / 100 * avgWin) - ((100 - winRate) / 100 * avgLoss)
      : 0
    
    return {
      totalPnL,
      winRate,
      winners: winners.length,
      losers: losers.length,
      activeTrades: activeTrades.length,
      btcActive,
      ethActive,
      expectancy
    }
  }, [trades])

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-label">Total P&L</div>
        <div className={`kpi-value ${stats.totalPnL >= 0 ? 'positive' : 'negative'}`}>
          ${stats.totalPnL.toFixed(2)}
        </div>
        <div className={`kpi-change ${stats.totalPnL >= 0 ? 'positive' : 'negative'}`}>
          {stats.totalPnL >= 0 ? '▲' : '▼'} {Math.abs((stats.totalPnL / 10000) * 100).toFixed(1)}% от начального
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-label">Win Rate</div>
        <div className="kpi-value">{stats.winRate.toFixed(1)}%</div>
        <div className="kpi-change">
          {stats.winners}W / {stats.losers}L ({stats.winners + stats.losers} сделок)
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-label">Активные позиции</div>
        <div className="kpi-value">{stats.activeTrades}</div>
        <div className="kpi-change">
          {stats.btcActive} BTC • {stats.ethActive} ETH
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-label">Expectancy</div>
        <div className={`kpi-value ${stats.expectancy >= 0 ? 'positive' : 'negative'}`}>
          ${stats.expectancy.toFixed(2)}
        </div>
        <div className="kpi-change">на сделку</div>
      </div>
    </div>
  )
}
