import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from './Pages/RoutePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutePage />
      </BrowserRouter>
    </>
  );
}

export default App;
