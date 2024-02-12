import './App.css';
import Home from './pages/home';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Home/>
      <Header
        myProfile="det bilde vi vil ha som bruker" // Erstatt med stien til ditt profilbilde
        homeButton="logoOgTittel" // Erstatt med stien til din hjem-logo
        onClick={handleHeaderClick}
      />
    </div>
  );
}

export default App;
