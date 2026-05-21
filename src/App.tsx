import { useState } from 'react'
import { loadState, saveState } from './lib/storage'
import type { AppState } from './lib/storage'
import { HomeScreen } from './screens/HomeScreen'
import { ConfigScreen } from './screens/ConfigScreen'
import { TabBar } from './components/TabBar'
import type { Screen } from './components/TabBar'

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [state, setState] = useState<AppState>(loadState)

  const update = (partial: Partial<AppState>) => {
    setState(prev => {
      const next = { ...prev, ...partial }
      saveState(next)
      return next
    })
  }

  return (
    <div className="min-h-full bg-df-canvas flex flex-col">
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 64 }}>
        {screen === 'home' ? (
          <HomeScreen state={state} onUpdate={update} />
        ) : (
          <ConfigScreen state={state} onUpdate={update} />
        )}
      </div>
      <TabBar screen={screen} onNavigate={setScreen} />
    </div>
  )
}
