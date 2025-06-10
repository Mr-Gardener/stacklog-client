import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import PostPage from './pages/PostPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthForm from './pages/AuthPage';
import Dashboard from './pages/Admin/AdminLayout';
import SuperAdminPanel from './pages/Admin/SuperAdmin/AdminPanel';
import AuthorAdminPanel from './pages/Admin/SuperAdmin/AdminPanel';
import AuthorCreatePost from './pages/Admin/AuthorAdmin/CreatePost';
import SuperCreatePost from './pages/Admin/SuperAdmin/CreatePost';
import ManageComments from './pages/Admin/SuperAdmin/ManageComments';
import AuthorRequest from './pages/Admin/SuperAdmin/AuthorRequest';
import CreateAuthor from './pages/Admin/SuperAdmin/CreateAuthor';
import ManageAuthors from './pages/Admin/SuperAdmin/ManageAuthors';


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
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["superAdmin", "authorAdmin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Super Admin Routes */}
          <Route
            path="/admin/super"
            element={
              <ProtectedRoute allowedRoles={["superAdmin"]}>
                <SuperAdminPanel />
              </ProtectedRoute>
            }
          >
            {/* These will render inside <Outlet /> in SuperAdminPanel */}
            <Route path="create-post" element={<SuperCreatePost />} />
            <Route path="author-requests" element={<AuthorRequest />} />
            <Route path="manage-comments" element={<ManageComments />} />
            <Route path="create-authors" element={
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <CreateAuthor />
                  </ProtectedRoute>
                        } />
            <Route path="manage-authors"  element={
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <ManageAuthors />
                  </ProtectedRoute>
                }/>
                
          </Route>

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
                <AuthorCreatePost />
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
