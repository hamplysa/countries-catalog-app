import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Country from './components/Country';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
