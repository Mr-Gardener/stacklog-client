import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {

    const dummyPosts = [
        { id: 1, title: "Getting Started with React", tags: ["react", "frontend"] },
        { id: 2, title: "Introduction to Web3", tags: ["blockchain", "web3"] },
        
      ];

      const [searchQuery, setSearchQuery] = useState("");

      const filteredPost = searchQuery ? dummyPosts.filter(post => 
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : [];

    return(
        <div>
            <h2>StackLog</h2>

            <input 
                type="text"
                placeholder="search posts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                />

                <ul>
                    {filteredPost.map((post) => (
                            <li key={post.id} className="py-2 border-b">
                                {post.title}
                            </li>
                        ))
                    }
                </ul>

            <div className='flex flex-col'>
            <Link className="" to="" >Create</Link>
            <Link className="" to="">Blog</Link>
            <Link className="" to="">About</Link>
            </div>

            <div>

            </div>
        </div>
    );
};

export default NavBar;
