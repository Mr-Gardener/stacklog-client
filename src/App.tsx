import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthForm from './pages/AuthPage';
import AuthorAdminPanel from './pages/Admin/AuthorAdmin/AuthorPanel';
import AuthorCreatePost from './pages/Admin/AuthorAdmin/CreatePost';
import SuperCreatePost from './pages/Admin/SuperAdmin/CreatePost';
import ManageComments from './pages/Admin/SuperAdmin/ManageComments';
import CreateAuthor from './pages/Admin/SuperAdmin/CreateAuthor';
import ManageAuthors from './pages/Admin/SuperAdmin/ManageAuthors';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminPanel from './pages/Admin/SuperAdmin/AdminPanel';
import DashBoard from './pages/Admin/SuperAdmin/Dashboard';
import ManagePosts from './pages/Admin/SuperAdmin/ManagePosts';
import ViewAuthor from './pages/Admin/SuperAdmin/ViewAuthor';
import EditPost from './pages/Admin/components/EditPost';
import AdminProfile from './pages/Admin/components/AdminProfile';
import EditProfile from './pages/Admin/components/EditProfile';
import AuthorDashboard from './pages/Admin/AuthorAdmin/Dashboard';
import AuthorPosts from './pages/Admin/AuthorAdmin/ManagePost';
import AuthorManageComments from './pages/Admin/AuthorAdmin/ManageComments';
import Layout from './components/Layout';
import AboutMe from './components/About';
import api from './api/Axios';
import { useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';



function App() {

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        console.log("User not logged in");
      }
    };
    verifyUser();
  }, []);

  return (
    <div className='text-gray-900 dark:bg-gray-600' >

      <Routes>
        <Route path='/' element={
          <Layout>
            <Home />
          </Layout>
         } />
        <Route path='/posts/:id' element={
          <Layout>
            <PostPage />
          </Layout>
        } />
        
        <Route path='/about' element={
          <Layout>
            <AboutMe />
          </Layout>
        } />
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
            <Route path="authors/:id" element={<ViewAuthor />} />
            <Route path="manage-authors-posts" element={<ManagePosts />} />
            <Route path="edit-post/:id" element={<EditPost />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="profile/edit" element={<EditProfile />} /> 
            <Route path="manage-comments" element={<ManageComments />} />
            <Route path="create-authors" element={<CreateAuthor />} />
            <Route path="manage-authors" element={<ManageAuthors />} />    
          </Route>

          {/* Author Admin Routes */}
          <Route
            path="/admin/author"
            element={
              <ProtectedRoute allowedRoles={["authorAdmin"]}>
                <AuthorAdminPanel />
              </ProtectedRoute>
            }
          >
            <Route path="author-dashboard" element={<AuthorDashboard />} />
            <Route path="create-post" element={<AuthorCreatePost />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="manage-comments" element={<ManageComments />} />
            <Route path="profile/edit" element={<EditProfile />} /> 
            <Route path="manage-my-posts" element={<AuthorPosts />} />
            <Route path="my-posts-comments" element={<AuthorManageComments />} />
          </Route>          
          {/* End of Author Admin Routes */}

       <Route path="*" element={<h1>Page not found</h1>} />
       
       </Routes>
    </div>
  );
};



export default App;
