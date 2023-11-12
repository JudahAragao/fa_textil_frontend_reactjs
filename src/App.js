import './App.css';
import { AuthProvider } from './context/AuthContext';
import RoutesControl from './routes';
import { BrowserRouter } from 'react-router-dom'

function App() {

  return <BrowserRouter>
    <AuthProvider>
      <RoutesControl />
    </AuthProvider>
  </BrowserRouter>

}

export default App;
