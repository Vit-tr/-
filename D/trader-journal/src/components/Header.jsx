import './Header.css'

export default function Header({ onAddTrade }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">📊 Дневник Трейдера</h1>
          <nav className="nav">
            <a href="#" className="nav-item active">Dashboard</a>
            <a href="#" className="nav-item">Сделки</a>
            <a href="#" className="nav-item">Аналитика</a>
            <a href="#" className="nav-item">Настройки</a>
          </nav>
        </div>
        <div className="header-right">
          <span className="sync-status">● Bybit Demo Connected</span>
          <button className="btn btn-primary" onClick={onAddTrade}>
            + Добавить сделку
          </button>
        </div>
      </div>
    </header>
  )
}
