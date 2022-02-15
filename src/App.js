import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <TaskList></TaskList>
      </div>
      <Footer />
    </div>
  );
}

export default App;
