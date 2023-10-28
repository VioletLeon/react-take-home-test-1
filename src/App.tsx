import { ReactElement } from 'react';
import Contacts from './pages/Contacts';

const App = (): ReactElement => (
  <div className="App container">
    <h1 className="text-center">Brew Ninja Test App</h1>
    <Contacts />
  </div>
);

export default App;
