import Navbar from './Navabr/Navbar';
import Admin from './ProductCompo/Admin'
import CreateProd from './ProductCompo/CreateProd';
import UpdateProd from './ProductCompo/UpdateProd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  
  return (
    <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/admin' element={<Admin />} />
            <Route path='/createProd' element={<CreateProd />} />
            <Route path='/updateProd/:id' element={<UpdateProd />} />
          </Routes>
        </Router>
    </div>
  );
};

export default App;
