import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WrapperPage from './pages/WrapperPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<WrapperPage component="home" />} />
        <Route exact path='/compiler' element={<WrapperPage component="compiler" />} />
        <Route exact path='/editor' element={<WrapperPage component="filemanager" />} />
        <Route exact path='/messanger' element={<WrapperPage component="messages" />} />
        <Route exact path='/login' element={<WrapperPage component="login" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
