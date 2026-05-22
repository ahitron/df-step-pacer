import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { AppStateProvider } from './contexts/AppStateContext';
import { Layout } from './components/Layout';
import { HomeScreen } from './screens/HomeScreen';
import { ConfigScreen } from './screens/ConfigScreen';

export function App() {
  return (
    <CustomThemeProvider>
      <AppStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomeScreen />} />
              <Route path="config" element={<ConfigScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppStateProvider>
    </CustomThemeProvider>
  );
}
