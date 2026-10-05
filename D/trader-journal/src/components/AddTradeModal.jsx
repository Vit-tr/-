import { useState } from 'react'
import './AddTradeModal.css'

export default function AddTradeModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    strategy: 'STRADDLE',
    asset: 'BTC',
    entryTime: new Date().toISOString().slice(0, 16),
    expiryDate: '',
    callStrike: '',
    putStrike: '',
    callEntryPrice: '',
    putEntryPrice: '',
    callExitPrice: '',
    putExitPrice: '',
    quantity: '1',
    entryIV: '',
    elliottWave: '',
    emotionalState: 'CALM',
    supportLevel: '',
    resistanceLevel: '',
    entryReason: '',
    tags: []
  })

  const [tagInput, setTagInput] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleStrategyChange = (strategy) => {
    setFormData({ ...formData, strategy })
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      const tag = tagInput.trim().startsWith('#') ? tagInput.trim() : `#${tagInput.trim()}`
      setFormData({ ...formData, tags: [...formData.tags, tag] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (index) => {
    setFormData({ 
      ...formData, 
      tags: formData.tags.filter((_, i) => i !== index) 
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const tradeData = {
      ...formData,
      entryTime: new Date(formData.entryTime).toISOString(),
      callStrike: parseFloat(formData.callStrike),
      putStrike: parseFloat(formData.putStrike),
      callEntryPrice: parseFloat(formData.callEntryPrice),
      putEntryPrice: parseFloat(formData.putEntryPrice),
      callExitPrice: formData.callExitPrice ? parseFloat(formData.callExitPrice) : null,
      putExitPrice: formData.putExitPrice ? parseFloat(formData.putExitPrice) : null,
      quantity: parseFloat(formData.quantity),
      entryIV: formData.entryIV ? parseFloat(formData.entryIV) : null,
      supportLevel: formData.supportLevel ? parseFloat(formData.supportLevel) : null,
      resistanceLevel: formData.resistanceLevel ? parseFloat(formData.resistanceLevel) : null,
      pnl: null,
      exitTime: null
    }
    
    onSave(tradeData)
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Добавить сделку</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Тип стратегии</label>
                <div className="strategy-selector">
                  <div 
                    className={`strategy-option ${formData.strategy === 'STRADDLE' ? 'selected' : ''}`}
                    onClick={() => handleStrategyChange('STRADDLE')}
                  >
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>Straddle</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Одинаковые страйки
                    </div>
                  </div>
                  <div 
                    className={`strategy-option ${formData.strategy === 'STRANGLE' ? 'selected' : ''}`}
                    onClick={() => handleStrategyChange('STRANGLE')}
                  >
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>Strangle</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Разные страйки
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Базовый актив *</label>
                <select name="asset" value={formData.asset} onChange={handleChange} required>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Дата и время входа *</label>
                <input 
                  type="datetime-local" 
                  name="entryTime" 
                  value={formData.entryTime}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Страйк Call *</label>
                <input 
                  type="number" 
                  name="callStrike" 
                  value={formData.callStrike}
                  onChange={handleChange}
                  placeholder="67000" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Страйк Put *</label>
                <input 
                  type="number" 
                  name="putStrike" 
                  value={formData.putStrike}
                  onChange={handleChange}
                  placeholder="67000" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Цена входа Call *</label>
                <input 
                  type="number" 
                  step="0.001"
                  name="callEntryPrice" 
                  value={formData.callEntryPrice}
                  onChange={handleChange}
                  placeholder="0.05" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Цена входа Put *</label>
                <input 
                  type="number" 
                  step="0.001"
                  name="putEntryPrice" 
                  value={formData.putEntryPrice}
                  onChange={handleChange}
                  placeholder="0.05" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Количество контрактов *</label>
                <input 
                  type="number" 
                  step="0.01"
                  name="quantity" 
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="1.0" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>IV при входе (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  name="entryIV" 
                  value={formData.entryIV}
                  onChange={handleChange}
                  placeholder="65.5" 
                />
              </div>

              <div className="form-group">
                <label>Волна Эллиотта</label>
                <select name="elliottWave" value={formData.elliottWave} onChange={handleChange}>
                  <option value="">Не указано</option>
                  <option value="WAVE_1">Волна 1 (Импульсная)</option>
                  <option value="WAVE_2">Волна 2 (Коррекция)</option>
                  <option value="WAVE_3">Волна 3 (Сильная импульсная)</option>
                  <option value="WAVE_4">Волна 4 (Коррекция)</option>
                  <option value="WAVE_5">Волна 5 (Финальная импульсная)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Эмоциональное состояние</label>
                <select name="emotionalState" value={formData.emotionalState} onChange={handleChange}>
                  <option value="CALM">Спокойный</option>
                  <option value="CONFIDENT">Уверенный</option>
                  <option value="ANXIOUS">Тревожный</option>
                  <option value="FOMO">FOMO</option>
                  <option value="REVENGE">Реванш</option>
                </select>
              </div>

              <div className="form-group">
                <label>Уровень поддержки</label>
                <input 
                  type="number" 
                  name="supportLevel" 
                  value={formData.supportLevel}
                  onChange={handleChange}
                  placeholder="66500" 
                />
              </div>

              <div className="form-group">
                <label>Уровень сопротивления</label>
                <input 
                  type="number" 
                  name="resistanceLevel" 
                  value={formData.resistanceLevel}
                  onChange={handleChange}
                  placeholder="68000" 
                />
              </div>

              <div className="form-group full-width">
                <label>Причина входа</label>
                <textarea 
                  name="entryReason" 
                  value={formData.entryReason}
                  onChange={handleChange}
                  placeholder="Опишите причину входа в сделку..."
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label>Теги</label>
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleAddTag}
                  placeholder="Введите тег и нажмите Enter" 
                />
                <div className="tag-container">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="tag">
                      {tag}
                      <span className="tag-remove" onClick={() => handleRemoveTag(index)}>×</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn-primary">Сохранить сделку</button>
          </div>
        </form>
      </div>
    </div>
  )
}
