import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import PostPage from './pages/PostPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthForm from './pages/AuthPage';
import SuperAdminPanel from './pages/Admin/SuperAdmin/AdminPanel';
import AuthorAdminPanel from './pages/Admin/SuperAdmin/AdminPanel';
import AuthorCreatePost from './pages/Admin/AuthorAdmin/CreatePost';
import SuperCreatePost from './pages/Admin/SuperAdmin/CreatePost';
import ManageComments from './pages/Admin/SuperAdmin/ManageComments';
import AuthorRequest from './pages/Admin/SuperAdmin/AuthorRequest';
import CreateAuthor from './pages/Admin/SuperAdmin/CreateAuthor';
import ManageAuthors from './pages/Admin/SuperAdmin/ManageAuthors';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminPanel from './pages/Admin/SuperAdmin/AdminPanel';
import DashBoard from './pages/Admin/SuperAdmin/Dashboard';
import ManagePosts from './pages/Admin/SuperAdmin/ManagePosts';


function App() {


  return (
    <div className='text-gray-900'>
      {/* <NavBar /> */}
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
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          {/* Super Admin Routes */}
          <Route
            path="/admin/super"
            element={
              <ProtectedRoute allowedRoles={["superAdmin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            {/* These will render inside <Outlet /> in SuperAdminPanel */}
            <Route path="admin-dashboard" element={<DashBoard />} />
            <Route path="create-post" element={<SuperCreatePost />} />
            <Route path="author-requests" element={<AuthorRequest />} />
            <Route path="/admin/super/manage-authors-posts" element={<ManagePosts />} />
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
