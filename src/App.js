import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Canil from './Componentes/Canil';
import Rotas from './Componentes/Rotas';

function App() {
  return (
    <div className="App">
      <Rotas>
      <Canil></Canil>
      </Rotas>
    </div>
  );
}

export default App;
