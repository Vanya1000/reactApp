import logo from './logo.svg';
import './App.css';
import Tehnologies from './Tehnologies.js';
import Header from './Header.js';
let b = 234;
let c = 345;
let a = () => b * c;


const App = () => {
  return (
    <div className="App">
      <Header />
      <Tehnologies />
    </div>
  );
}

export default App;
