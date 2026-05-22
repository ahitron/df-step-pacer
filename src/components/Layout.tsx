import { Outlet } from 'react-router-dom';
import { TabBar } from './TabBar';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--df-canvas)' }}>
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 64 }}>
        <Outlet />
      </div>
      <TabBar />
    </div>
  );
}
