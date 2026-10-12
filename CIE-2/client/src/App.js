import './style.css';
import AuthModalContext from "./AuthModalContext";
import {useState,useEffect} from "react";
import axios from 'axios';
import UserContext from "./UserContext";
import Routing from "./Routing";
import PostFormModalContext from "./PostFormModalContext";
import RedirectContext from "./RedirectContext";
import ThemeContext from "./ThemeContext";

function App() {
  const [showAuthModal,setShowAuthModal] = useState(false);
  const [showPostFormModal,setShowPostFormModal] = useState(false);
  const [user,setUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('reddit_theme') || 'dark';
  });

  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})
      .then(response => setUser(response.data));
  }, []);

  useEffect(() => {
    // Apply / remove 'dark' class on document root for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('reddit_theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }

  function logout() {
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
      .then(() => setUser({}));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <AuthModalContext.Provider value={{show:showAuthModal,setShow:setShowAuthModal}}>
        <PostFormModalContext.Provider value={{show:showPostFormModal,setShow:setShowPostFormModal}}>
          <UserContext.Provider value={{...user, logout, setUser}}>
            <RedirectContext.Provider value={{redirect,setRedirect}}>
              <Routing />
            </RedirectContext.Provider>
          </UserContext.Provider>
        </PostFormModalContext.Provider>
      </AuthModalContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
