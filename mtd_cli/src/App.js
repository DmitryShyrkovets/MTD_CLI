
import {Login} from './components/account/Login'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Logout} from "./components/account/Logout";
import {Notes} from "./components/notes/Notes";
import {Registration} from "./components/account/Registration";
import {Recovery} from "./components/account/Recovery";

function App() {
    
  return (
    <main className="App">
        <Router>
            <Routes>
                <Route strict path="/login" element={<Login />}/>
                <Route strict path="/registration" element={<Registration />}/>
                <Route strict path="/recovery" element={<Recovery />}/>
                <Route strict path="/logout" element={<Logout />}/>
                <Route strict path="/notes" element={<Notes />}/>
                <Route strict path="/" element={<Notes />}/>
            </Routes>
        </Router>
    </main>
  );
}

export default App;
