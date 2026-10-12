import Logo from "./logo.png";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  LoginIcon,
  LogoutIcon,
  MoonIcon,
  PlusIcon,
  SearchIcon,
  SunIcon,
  UserIcon
} from "@heroicons/react/outline";
import Avatar from "./avatar.png";
import ClickOutHandler from 'react-clickout-handler';
import Button from "./Button";
import {useState,useContext} from 'react';
import AuthModalContext from "./AuthModalContext";
import PostFormModalContext from "./PostFormModalContext";
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import RedirectContext from "./RedirectContext";
import ThemeContext from "./ThemeContext";

function Header() {
  const [userDropdownVisibilityClass,setUserDropdownVisibilityClass] = useState('hidden');
  const [chatDropdownVisibilityClass,setChatDropdownVisibilityClass] = useState('hidden');
  const [bellDropdownVisibilityClass,setBellDropdownVisibilityClass] = useState('hidden');
  const [searchText,setSearchText] = useState('');
  
  const {setRedirect} = useContext(RedirectContext);
  const authModal = useContext(AuthModalContext);
  const postFormModal = useContext(PostFormModalContext);
  const user = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  function toggleUserDropdown() {
    setUserDropdownVisibilityClass(prev => prev === 'hidden' ? 'block' : 'hidden');
    setChatDropdownVisibilityClass('hidden');
    setBellDropdownVisibilityClass('hidden');
  }
  
  function toggleChatDropdown() {
    setChatDropdownVisibilityClass(prev => prev === 'hidden' ? 'block' : 'hidden');
    setUserDropdownVisibilityClass('hidden');
    setBellDropdownVisibilityClass('hidden');
  }
  
  function toggleBellDropdown() {
    setBellDropdownVisibilityClass(prev => prev === 'hidden' ? 'block' : 'hidden');
    setUserDropdownVisibilityClass('hidden');
    setChatDropdownVisibilityClass('hidden');
  }

  function doSearch(ev) {
    ev.preventDefault();
    setRedirect('/search/'+encodeURIComponent(searchText));
  }

  // Derived theme classes
  const headerBg   = isDark ? 'bg-reddit_dark border-reddit_border' : 'bg-white border-reddit_light_border';
  const searchBg   = isDark ? 'bg-reddit_dark-brighter border-reddit_border focus-within:bg-reddit_dark focus-within:border-gray-500' : 'bg-reddit_light border-reddit_light_border focus-within:bg-white focus-within:border-gray-400';
  const searchText2 = isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400';
  const iconColor  = isDark ? 'text-gray-400' : 'text-gray-500';
  const dropdownBg = isDark ? 'bg-reddit_dark-brightest border-reddit_border' : 'bg-white border-reddit_light_border shadow-xl';
  const dropdownText = isDark ? 'text-reddit_text' : 'text-reddit_light_text';
  const avatarBtnBg = isDark ? 'bg-reddit_dark-brighter border-reddit_border hover:border-gray-500' : 'bg-reddit_light border-reddit_light_border hover:border-gray-400';
  const iconBtnHover = isDark ? 'hover:bg-reddit_dark-brighter' : 'hover:bg-reddit_light';

  return (
    <header className={`w-full sticky top-0 z-50 p-2 border-b shadow-sm transition-colors duration-300 ${headerBg}`}>
      <div className="mx-4 flex items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Reddit" className="w-8 h-8 mr-4 rounded-full transition-transform hover:scale-105" />
        </Link>

        {/* Search bar */}
        <form onSubmit={doSearch} className={`px-4 flex rounded-full border mx-4 flex-grow transition-colors duration-200 shadow-inner ${searchBg}`}>
          <SearchIcon className={`h-5 w-5 mt-2 mr-2 ${iconColor}`} />
          <input
            type="text"
            className={`bg-transparent text-sm p-2 w-full focus:outline-none ${searchText2}`}
            placeholder="Search Reddit"
            value={searchText}
            onChange={ev => setSearchText(ev.target.value)}
          />
        </form>

        {/* Authenticated actions */}
        {user.username && (
          <div className="flex items-center gap-1 mx-2 relative">
            <ClickOutHandler onClickOut={() => setChatDropdownVisibilityClass('hidden')}>
              <div className="relative">
                <button onClick={toggleChatDropdown} className={`p-2 rounded-full transition-colors ${iconBtnHover}`}>
                  <ChatIcon className={`w-6 h-6 ${iconColor}`} />
                </button>
                <div className={`absolute right-0 top-10 border z-10 rounded-xl shadow-lg overflow-hidden w-64 ${dropdownBg} ${dropdownText} ${chatDropdownVisibilityClass}`}>
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-400">No new messages</p>
                  </div>
                </div>
              </div>
            </ClickOutHandler>
            
            <ClickOutHandler onClickOut={() => setBellDropdownVisibilityClass('hidden')}>
              <div className="relative">
                <button onClick={toggleBellDropdown} className={`p-2 rounded-full transition-colors ${iconBtnHover}`}>
                  <BellIcon className={`w-6 h-6 ${iconColor}`} />
                </button>
                <div className={`absolute right-0 top-10 border z-10 rounded-xl shadow-lg overflow-hidden w-64 ${dropdownBg} ${dropdownText} ${bellDropdownVisibilityClass}`}>
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-400">You're all caught up!</p>
                  </div>
                </div>
              </div>
            </ClickOutHandler>
            
            <button onClick={() => postFormModal.setShow(true)} className={`p-2 rounded-full transition-colors ${iconBtnHover}`}>
              <PlusIcon className={`w-6 h-6 ${iconColor}`} />
            </button>
          </div>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 mx-1 ${iconBtnHover}`}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark
            ? <SunIcon className="w-5 h-5 text-yellow-400" />
            : <MoonIcon className="w-5 h-5 text-indigo-500" />
          }
        </button>

        {/* Login/Signup buttons for guests */}
        {!user.username && (
          <div className="mx-2 hidden sm:flex items-center gap-2">
            <Button outline={1} className="mr-1 h-9 px-4 rounded-full font-bold" onClick={() => authModal.setShow('login')}>Log In</Button>
            <Button className={`h-9 px-4 rounded-full font-bold ${isDark ? 'bg-reddit_text text-reddit_dark hover:bg-white' : 'bg-reddit_orange text-white hover:bg-orange-600 border-reddit_orange'}`} onClick={() => authModal.setShow('register')}>Sign Up</Button>
          </div>
        )}

        {/* User dropdown */}
        <ClickOutHandler onClickOut={() => setUserDropdownVisibilityClass('hidden')}>
          <button
            className={`rounded-full flex items-center ml-4 border p-1 transition-colors ${avatarBtnBg}`}
            onClick={toggleUserDropdown}
          >
            {!user.username && (
              <UserIcon className={`w-6 h-6 m-1 ${iconColor}`} />
            )}
            {user.username && (
              <div className="bg-gray-600 rounded-full w-8 h-8 overflow-hidden">
                <img src={Avatar} alt="" style={{filter:'invert(100%)'}} className="block w-full h-full object-cover" />
              </div>
            )}
            <ChevronDownIcon className={`w-5 h-5 mx-1 ${iconColor}`} />
          </button>
          <div className={`absolute right-0 top-12 border z-10 rounded-xl shadow-lg overflow-hidden w-56 ${dropdownBg} ${dropdownText} ${userDropdownVisibilityClass}`}>
            {user.username && (
              <span className={`block py-3 px-4 text-sm font-semibold border-b ${isDark ? 'border-reddit_border' : 'border-reddit_light_border'}`}>
                Hello, {user.username}!
              </span>
            )}
            {!user.username && (
              <button
                onClick={() => authModal.setShow('login')}
                className={`flex items-center w-full py-3 px-4 transition-colors text-sm font-medium ${iconBtnHover}`}>
                <LoginIcon className={`w-5 h-5 mr-3 ${iconColor}`} />
                Log In / Sign Up
              </button>
            )}
            {user.username && (
              <button
                onClick={() => user.logout()}
                className={`flex items-center w-full py-3 px-4 transition-colors text-sm font-medium text-red-400 hover:text-red-300 ${iconBtnHover}`}>
                <LogoutIcon className="w-5 h-5 mr-3" />
                Logout
              </button>
            )}
          </div>
        </ClickOutHandler>
      </div>
    </header>
  );
}

export default Header;