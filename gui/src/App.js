import './App.css';
import Menu from './Admin/Layout/Components/Menu/Menu';
import Content from './Admin/Layout/Components/Content/Content';
import Header from './Admin/Layout/Components/Header/Header';

function App() {
  return (
    <div className="App">
      <div className='app-menu'>
        <Menu/>
      </div>
      <div className='App-body'>
        <Header/>
        <Content/>
      </div>
      
    </div>
  );
}

export default App;
