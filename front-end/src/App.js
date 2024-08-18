
import './App.css';
import Nav from './components/Nav';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Footer from "./components/Footer";
import SingUp from "./components/SingUp";
import PrivateComponent from "./components/PrivateComponent";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
          <Route path="/" element={<h1>E-Dashboard</h1>} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/profile" element={<h1>User setting</h1>} />

          </Route>


          <Route path="/logout" element={<h1>Logout </h1>} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/login" element={<Login />} />
        

        </Routes>
        
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
