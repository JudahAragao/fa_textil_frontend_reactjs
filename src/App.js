import { ApiRequestProvider } from './context/ApiRequestContextProvider';
import { AuthProvider } from './context/AuthContext';
import RoutesControl from './routes';
import { BrowserRouter } from 'react-router-dom'

function App() {

  return <BrowserRouter>
    <AuthProvider>
      <ApiRequestProvider >
        <RoutesControl />
      </ApiRequestProvider>
    </AuthProvider>
  </BrowserRouter>

}

export default App;
