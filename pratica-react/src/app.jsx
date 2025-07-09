import { useState, useRef, useContext } from 'react';
import List from './components/List.jsx';
import Select from './components/Select.jsx';
import Table from './components/Table.jsx';
import ThemeContext from './context/theme.js';
import ChangeTheme from './components/ChangeTheme.jsx';

const titles = ['ID', 'NOME', 'IDADE'];

const clients = [

    { id: 1, nome: "Lucas", idade: 45 },

    { id: 2, nome: "Ana", idade: 78 },

    { id: 3, nome: "Bia", idade: 14 },

    { id: 4, nome: "Faulo", idade: 69 }

];



const App = () => {

    // const [nome, setNome] = useState(valor_inicial);

    const baseTheme = useContext(ThemeContext);
    const [theme, setTheme] = useState(baseTheme);
    const [felinos, setFelinos] = useState(['Gato', 'Leopardo']);
    const iptFelino = useRef(null);



    function manipulaFormFelinos(e) {

        e.preventDefault();

        setFelinos([...felinos, iptFelino.current.value]);

    }



    return (

        <div>

            <ChangeTheme theme={theme} setTheme={setTheme}/>

            <h3>Felinos</h3>

            <form onSubmit={manipulaFormFelinos}>

                <label>Novo </label>

                <input ref={iptFelino} />

                <button>+</button>

            </form>

            <List items={felinos} />

            <h3>Municípios</h3>

            <Select />

            <ThemeContext.Provider value={theme}>

                <Table titles={titles} data={clients} />

            </ThemeContext.Provider>



        </div>

    );

};



export default App;