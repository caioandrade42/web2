import { createRoot } from 'react-dom/client';

import App from './app';



const root = document.getElementById('root');

const app = createRoot(root);



app.render(<App/>);