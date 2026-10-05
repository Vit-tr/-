import { useState } from 'react'
import Header from './components/Header'
import KPICards from './components/KPICards'
import EquityChart from './components/EquityChart'
import RecentTrades from './components/RecentTrades'
import AssetComparison from './components/AssetComparison'
import ElliottWaveAnalysis from './components/ElliottWaveAnalysis'
import StrategyBreakdown from './components/StrategyBreakdown'
import AddTradeModal from './components/AddTradeModal'
import { useTradeStore } from './store/tradeStore'
import './App.css'

function App() {
  const [showModal, setShowModal] = useState(false)
  const { trades, addTrade } = useTradeStore()

  const handleAddTrade = (tradeData) => {
    addTrade(tradeData)
    setShowModal(false)
  }

  return (
    <div className="app">
      <Header onAddTrade={() => setShowModal(true)} />
      
      <div className="container">
        <KPICards trades={trades} />
        
        <EquityChart trades={trades} />
        
        <div className="two-column">
          <RecentTrades trades={trades} />
          <AssetComparison trades={trades} />
        </div>
        
        <ElliottWaveAnalysis trades={trades} />
        
        <StrategyBreakdown trades={trades} />
      </div>

      {showModal && (
        <AddTradeModal 
          onClose={() => setShowModal(false)}
          onSave={handleAddTrade}
        />
      )}
    </div>
  )
}

export default App
