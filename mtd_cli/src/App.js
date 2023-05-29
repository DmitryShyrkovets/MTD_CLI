
import {Login} from './components/account/Login'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Logout} from "./components/account/Logout";
import {Notes} from "./components/notes/Notes";

function App() {
    
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route strict path="/login" element={<Login />}/>
                <Route strict path="/logout" element={<Logout />}/>
                <Route strict path="/notes" element={<Notes />}/>
                <Route strict path="/" element={<Notes />}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
