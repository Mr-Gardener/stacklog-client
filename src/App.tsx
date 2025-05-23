import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import PostPage from './pages/PostPage';

function App() {

  return (
    <div className='bg-gray-100 text-gray-900'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<PostPage />} />
        <Route path='/create' element={<div>Create Post Page</div>} />
        <Route path='/NavBar' element={<NavBar />} />
      </Routes>
    </div>
  );
};

export default App;
