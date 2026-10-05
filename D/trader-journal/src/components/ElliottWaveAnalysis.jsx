import { useMemo } from 'react'
import './ElliottWaveAnalysis.css'

const waveLabels = {
  WAVE_1: 'Wave 1',
  WAVE_2: 'Wave 2',
  WAVE_3: 'Wave 3',
  WAVE_4: 'Wave 4',
  WAVE_5: 'Wave 5'
}

export default function ElliottWaveAnalysis({ trades }) {
  const waveStats = useMemo(() => {
    const closedTrades = trades.filter(t => t.pnl !== null && t.elliottWave)
    
    const stats = {}
    Object.keys(waveLabels).forEach(wave => {
      const waveTrades = closedTrades.filter(t => t.elliottWave === wave)
      const winners = waveTrades.filter(t => t.pnl > 0)
      const totalPnL = waveTrades.reduce((sum, t) => sum + t.pnl, 0)
      const avgPnL = waveTrades.length > 0 ? totalPnL / waveTrades.length : 0
      const winRate = waveTrades.length > 0 ? (winners.length / waveTrades.length * 100) : 0
      
      stats[wave] = {
        label: waveLabels[wave],
        trades: waveTrades.length,
        wins: winners.length,
        losses: waveTrades.length - winners.length,
        winRate,
        avgPnL
      }
    })
    
    return Object.values(stats)
  }, [trades])

  const bestWave = waveStats.reduce((best, wave) => 
    wave.winRate > best.winRate ? wave : best
  , waveStats[0] || { winRate: 0 })

  return (
    <div className="section">
      <h2 className="section-title" style={{ marginBottom: '20px' }}>Анализ по волнам Эллиотта</h2>
      <div className="stats-grid">
        {waveStats.map(wave => (
          <div key={wave.label} className="stat-item">
            <div className="stat-label">
              {wave.label}
              {wave.label === bestWave.label && ' - Лучшая'}
            </div>
            <div className={`stat-value ${wave.winRate >= 60 ? 'positive' : wave.winRate < 50 ? 'negative' : ''}`}>
              {wave.winRate.toFixed(1)}%
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {wave.wins}W / {wave.losses}L • Avg ${wave.avgPnL.toFixed(0)}
            </div>
          </div>
        ))}
        
        <div className="stat-item">
          <div className="stat-label">Рекомендация</div>
          <div style={{ fontSize: '13px', marginTop: '8px', lineHeight: '1.5' }}>
            {bestWave.label} показывает лучший результат ({bestWave.winRate.toFixed(0)}%)
          </div>
        </div>
      </div>
    </div>
  )
}
