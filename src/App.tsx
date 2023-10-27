import { ReactElement } from 'react';
import ContactManager from './components/ContactManager';

const App = (): ReactElement => (
  <div className="App container">
    <h1 className="text-center">Brew Ninja Test App</h1>
    <ContactManager />
  </div>
);

export default App;
