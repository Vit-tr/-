import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Генерируем начальные демо-данные
const generateDemoTrades = () => {
  const trades = []
  const strategies = ['STRADDLE', 'STRANGLE']
  const assets = ['BTC', 'ETH']
  const waves = ['WAVE_1', 'WAVE_2', 'WAVE_3', 'WAVE_4', 'WAVE_5']
  
  for (let i = 0; i < 48; i++) {
    const strategy = strategies[Math.random() > 0.5 ? 0 : 1]
    const asset = assets[Math.random() > 0.6 ? 0 : 1]
    const entryDate = new Date(2026, 6, Math.floor(Math.random() * 90))
    const exitDate = new Date(entryDate.getTime() + (1 + Math.floor(Math.random() * 2)) * 24 * 60 * 60 * 1000)
    const pnl = (Math.random() - 0.35) * 600
    
    trades.push({
      id: `trade-${i}`,
      strategy,
      asset,
      entryTime: entryDate.toISOString(),
      exitTime: Math.random() > 0.1 ? exitDate.toISOString() : null,
      callStrike: asset === 'BTC' ? 67000 + Math.floor(Math.random() * 4000) : 3500 + Math.floor(Math.random() * 300),
      putStrike: asset === 'BTC' ? 67000 - Math.floor(Math.random() * 4000) : 3500 - Math.floor(Math.random() * 300),
      callEntryPrice: 0.03 + Math.random() * 0.07,
      putEntryPrice: 0.03 + Math.random() * 0.07,
      callExitPrice: Math.random() > 0.1 ? 0.02 + Math.random() * 0.12 : null,
      putExitPrice: Math.random() > 0.1 ? 0.02 + Math.random() * 0.12 : null,
      quantity: 1,
      pnl: Math.random() > 0.1 ? pnl : null,
      entryIV: 50 + Math.random() * 60,
      elliottWave: waves[Math.floor(Math.random() * waves.length)],
      entryReason: 'Прорыв уровня сопротивления',
      emotionalState: 'CALM',
      tags: ['#breakout', '#high-iv']
    })
  }
  
  return trades.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime))
}

export const useTradeStore = create(
  persist(
    (set) => ({
      trades: generateDemoTrades(),
      
      addTrade: (trade) => set((state) => ({
        trades: [{ ...trade, id: `trade-${Date.now()}` }, ...state.trades]
      })),
      
      updateTrade: (id, updates) => set((state) => ({
        trades: state.trades.map(t => t.id === id ? { ...t, ...updates } : t)
      })),
      
      deleteTrade: (id) => set((state) => ({
        trades: state.trades.filter(t => t.id !== id)
      }))
    }),
    {
      name: 'trader-journal-storage'
    }
  )
)
