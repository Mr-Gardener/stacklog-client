import { useState } from "react";
import Navbar from "./NavBar";
import SearchOverlay from "./SearchOverlay";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      <Navbar onSearchToggle={() => setShowSearch(true)} />
      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
