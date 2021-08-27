import {BrowserRouter as Router, Route} from 'react-router-dom'
import Products from "./components/body/products/Products";
import DetailProduct from "./components/body/detailProduct/detailProduct";

function App() {
  return (
    <Router>
      <div className="App">
        
        <Route path = "/" component = {Products} exact/>
        <Route path = "/product/:id" component = {DetailProduct} exact/>
       
      </div>
    </Router>
  );
}  

export default App;
