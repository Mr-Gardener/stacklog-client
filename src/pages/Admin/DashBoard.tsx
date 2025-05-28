import { Link } from "react-router-dom";

const DashBoard = () => {

    return (
        <div className="min-h-screen p-6 lg:pl-[140px] bg-gray-100">
             <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
             <ul className="space-y-4">
                <li>
                <Link to="/admin/create-post" className="text-blue-600 hover:underline">➕ Create Post</Link>
                </li>
                <li>
                <Link to="/admin/author-requests" className="text-blue-600 hover:underline">👤 Handle Author Requests</Link>
                </li>
                <li>
                <Link to="/admin/comments" className="text-blue-600 hover:underline">💬 Approve/Reject Comments</Link>
                </li>
             </ul>
        </div>
    )
}

export default DashBoard;