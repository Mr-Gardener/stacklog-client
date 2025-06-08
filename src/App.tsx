import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import PostPage from './pages/PostPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthForm from './pages/AuthPage';
import Dashboard from './pages/Admin/Dashboard';
import SuperAdminPanel from './pages/Admin/SuperAdmin/AdminPanel';
import AuthorAdminPanel from './pages/Admin/SuperAdmin/AdminPanel';
import CreatePost from './pages/Admin/AuthorAdmin/CreatePost';
import ManageComments from './pages/Admin/SuperAdmin/ManageComments';
import AuthorRequest from './pages/Admin/SuperAdmin/AuthorRequest';


function App() {

  return (
    <div className='bg-gray-100 text-gray-900'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<PostPage />} />
        <Route path='/create' element={<div>Create Post Page</div>} />
        <Route path='/NavBar' element={<NavBar />} />
        <Route path="/login" element={<AuthForm />} />
        {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["superAdmin", "authorAdmin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Super Admin Routes */}
          <Route
            path="/admin/super/panel"
            element={
              <ProtectedRoute allowedRoles={["superAdmin"]}>
                <SuperAdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/super/author-requests"
            element={
              <ProtectedRoute allowedRoles={["superAdmin"]}>
                <AuthorRequest />
              </ProtectedRoute>
            }
          /> 
          <Route
            path="/admin/create-post"
            element={
              <ProtectedRoute allowedRoles={["superAdmin"]}>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          {/* Author Admin Routes */}
          <Route
            path="/admin/author/panel"
            element={
              <ProtectedRoute allowedRoles={["authorAdmin"]}>
                <AuthorAdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/author/create-post"
            element={
              <ProtectedRoute allowedRoles={["authorAdmin"]}>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          {/* Shared admin route */}
          <Route
            path="/admin/manage-comments"
            element={
              <ProtectedRoute allowedRoles={["superAdmin", "authorAdmin"]}>
                <ManageComments />
              </ProtectedRoute>
            }
          />
       



       <Route path="*" element={<h1>Page not found</h1>} />
       </Routes>
    </div>
  );
};



export default App;
