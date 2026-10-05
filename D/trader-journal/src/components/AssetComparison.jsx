import { useMemo } from 'react'
import './AssetComparison.css'

export default function AssetComparison({ trades }) {
  const comparison = useMemo(() => {
    const closedTrades = trades.filter(t => t.pnl !== null)
    
    const btcTrades = closedTrades.filter(t => t.asset === 'BTC')
    const ethTrades = closedTrades.filter(t => t.asset === 'ETH')
    
    const calcStats = (assetTrades) => {
      const winners = assetTrades.filter(t => t.pnl > 0)
      const totalPnL = assetTrades.reduce((sum, t) => sum + t.pnl, 0)
      const avgPnL = assetTrades.length > 0 ? totalPnL / assetTrades.length : 0
      const winRate = assetTrades.length > 0 ? (winners.length / assetTrades.length * 100) : 0
      const bestTrade = assetTrades.length > 0 ? Math.max(...assetTrades.map(t => t.pnl)) : 0
      
      return {
        trades: assetTrades.length,
        wins: winners.length,
        winRate,
        totalPnL,
        avgPnL,
        bestTrade
      }
    }
    
    return {
      BTC: calcStats(btcTrades),
      ETH: calcStats(ethTrades)
    }
  }, [trades])

  return (
    <div className="section">
      <h2 className="section-title" style={{ marginBottom: '20px' }}>BTC vs ETH</h2>
      <div className="comparison-table">
        <div className="comparison-header">Метрика</div>
        <div className="comparison-header" style={{ textAlign: 'center' }}>BTC</div>
        <div className="comparison-header" style={{ textAlign: 'center' }}>ETH</div>
        
        <div className="comparison-row">Сделок</div>
        <div className="comparison-row" style={{ textAlign: 'center', fontWeight: 600 }}>
          {comparison.BTC.trades}
        </div>
        <div className="comparison-row" style={{ textAlign: 'center', fontWeight: 600 }}>
          {comparison.ETH.trades}
        </div>
        
        <div className="comparison-row">Win Rate</div>
        <div className="comparison-row" style={{ textAlign: 'center', fontWeight: 600 }}>
          {comparison.BTC.winRate.toFixed(1)}%
        </div>
        <div className="comparison-row" style={{ textAlign: 'center', fontWeight: 600 }}>
          {comparison.ETH.winRate.toFixed(1)}%
        </div>
        
        <div className="comparison-row">Total P&L</div>
        <div className={`comparison-row ${comparison.BTC.totalPnL >= 0 ? 'positive' : 'negative'}`} 
             style={{ textAlign: 'center', fontWeight: 600 }}>
          ${comparison.BTC.totalPnL.toFixed(0)}
        </div>
        <div className={`comparison-row ${comparison.ETH.totalPnL >= 0 ? 'positive' : 'negative'}`} 
             style={{ textAlign: 'center', fontWeight: 600 }}>
          ${comparison.ETH.totalPnL.toFixed(0)}
        </div>
        
        <div className="comparison-row">Avg P&L</div>
        <div className="comparison-row" style={{ textAlign: 'center', fontWeight: 600 }}>
          ${comparison.BTC.avgPnL.toFixed(0)}
        </div>
        <div className="comparison-row" style={{ textAlign: 'center', fontWeight: 600 }}>
          ${comparison.ETH.avgPnL.toFixed(0)}
        </div>
        
        <div className="comparison-row">Best Trade</div>
        <div className="comparison-row" style={{ textAlign: 'center', fontWeight: 600 }}>
          ${comparison.BTC.bestTrade.toFixed(0)}
        </div>
        <div className="comparison-row" style={{ textAlign: 'center', fontWeight: 600 }}>
          ${comparison.ETH.bestTrade.toFixed(0)}
        </div>
      </div>
    </div>
  )
}
