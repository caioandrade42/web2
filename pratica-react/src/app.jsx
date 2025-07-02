import {useState, useRef} from 'react';
import List from './components/List.jsx';

const App = () =>{

  const [felinos, setFelinos] = useState(["gato", "leão"]);

  const iptFelino = useRef(null);
  function manipulaFormFelinos(e) {
    e.preventDefault();
    setFelinos([...felinos, iptFelino.current.value]);
    iptFelino.current.value = "";
  }
  return (
    <div>
      <h3>Felinos</h3>
      <form onSubmit={manipulaFormFelinos}>
        <label>Novo</label>
        <input ref={iptFelino} />
        <button>+</button>
      </form>
      <List itens={felinos} />
    </div>
  )
}

export default App;