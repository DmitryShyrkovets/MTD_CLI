import * as Pages from './pages/index'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    
  return (
    <>
        <Router>
            <Routes>
                <Route strict path="/login" element={<Pages.Login />}/>
                <Route strict path="/registration" element={<Pages.Registration />}/>
                <Route strict path="/recovery" element={<Pages.Recovery />}/>
                <Route strict path="/notes" element={<Pages.Notes />}/>
                <Route strict path="/notes/:id" element={<Pages.Detail />}/>
                <Route strict path="/profile" element={<Pages.Profile />}/>
                <Route strict path="/" element={<Pages.Notes />}/>
            </Routes>
        </Router>
    </>
  );
}

export default App;
