import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import PostPage from './pages/PostPage';
import DashBoard from './pages/Admin/DashBoard';
import CreatePost from './pages/Admin/CreatePost';
import AuthorRequest from './pages/Admin/AuthorRequest';
import ManageComments from './pages/Admin/ManageComments';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import AdminRegisterForm from './pages/AdminRegisterForm';

function App() {

  return (
    <div className='bg-gray-100 text-gray-900'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<PostPage />} />
        <Route path='/create' element={<div>Create Post Page</div>} />
        <Route path='/NavBar' element={<NavBar />} />
        <Route path='/admin/dashboard' element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashBoard />
          </ProtectedRoute> 
          } />
        <Route path="/admin/create-post" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CreatePost />
          </ProtectedRoute> 
              } />
       <Route path="/admin/author-requests" element={<AuthorRequest />} />
       <Route path="/admin/comments" element={<ManageComments />} />
       <Route path="/auth" element={<AuthPage />} />
       <Route path="/one-time-admin" element={<AdminRegisterForm />} />


       </Routes>
    </div>
  );
};



export default App;
