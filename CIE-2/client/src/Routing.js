import Header from "./Header";
import {BrowserRouter as Router, Redirect} from "react-router-dom";
import RoutingSwitch from "./RoutingSwitch";
import PostFormModal from "./PostFormModal";
import AuthModal from "./AuthModal";
import {useContext, useEffect} from "react";
import RedirectContext from "./RedirectContext";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import ThemeContext from "./ThemeContext";

function Routing() {
  const {redirect,setRedirect} = useContext(RedirectContext);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    if (redirect) {
      setRedirect(false);
    }
  }, [redirect]);

  return (
    <Router>
      {redirect && (
        <Redirect to={redirect} />
      )}
      {!redirect && (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-reddit_dark text-reddit_text' : 'bg-reddit_light text-reddit_light_text'}`}>
          <Header />
          <div className="flex">
            <LeftSidebar />
            <main className="flex-1 min-w-0">
              <RoutingSwitch />
            </main>
            <RightSidebar />
          </div>
          <PostFormModal />
          <AuthModal />
        </div>
      )}
    </Router>
  );
}

export default Routing;