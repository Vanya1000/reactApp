import logo from './logo.svg';
import './App.css';
let b = 234;
let c = 345;
let a = () => b * c;//?


const App = () => {
  return (
    <div className="App">
      <Header />
      <Tehnologies />
    </div>
  );
}

const Tehnologies = () => {
  return (
    <ul className="tehologies">
      <li><a href="#"> html</a></li>
      <li><a href="#"> css</a></li>
      <li><a href="#"> scss</a></li>
      <li><a href="#"> js</a></li>
      <li><a href="#"> JSX</a></li>
      <li><a href="#"> react</a></li>
    </ul>
  );
}

const Header = () => {
  return (
    <div className="num">
      <p>123</p>
      <p>456</p>
      <p>789</p>
    </div>
  );
}
export default App;
