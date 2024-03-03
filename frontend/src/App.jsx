import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
