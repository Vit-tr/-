import './RecentTrades.css'

export default function RecentTrades({ trades }) {
  const recentTrades = trades.slice(0, 10)

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">Последние сделки</h2>
      </div>
      <div className="table-wrapper">
        <table className="trades-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Стратегия</th>
              <th>Актив</th>
              <th>P&L</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.map(trade => (
              <tr key={trade.id}>
                <td>
                  {new Date(trade.entryTime).toLocaleDateString('ru-RU')}
                </td>
                <td>{trade.strategy === 'STRADDLE' ? 'Straddle' : 'Strangle'}</td>
                <td>{trade.asset}</td>
                <td className={trade.pnl !== null ? (trade.pnl >= 0 ? 'pnl-positive' : 'pnl-negative') : ''}>
                  {trade.pnl !== null ? `$${trade.pnl.toFixed(2)}` : '-'}
                </td>
                <td>
                  <span className={`status-badge ${trade.pnl !== null ? 'status-closed' : 'status-open'}`}>
                    {trade.pnl !== null ? 'Закрыта' : 'Открыта'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
