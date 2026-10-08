import Logo from "./logo.png";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  LoginIcon,
  LogoutIcon,
  PlusIcon,
  SearchIcon,
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

function Header() {
  const [userDropdownVisibilityClass,setUserDropdownVisibilityClass] = useState('hidden');
  const [chatDropdownVisibilityClass,setChatDropdownVisibilityClass] = useState('hidden');
  const [bellDropdownVisibilityClass,setBellDropdownVisibilityClass] = useState('hidden');
  const [searchText,setSearchText] = useState('');
  
  const {setRedirect} = useContext(RedirectContext);
  const authModal = useContext(AuthModalContext);
  const postFormModal = useContext(PostFormModalContext);
  const user = useContext(UserContext);

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

  return (
    <header className="w-full bg-reddit_dark sticky top-0 z-50 p-2 border-b border-reddit_border shadow-sm">
      <div className="mx-4 flex items-center relative">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="" className="w-8 h-8 mr-4 rounded-full transition-transform hover:scale-105" />
        </Link>
        <form onSubmit={doSearch} className="bg-reddit_dark-brighter px-4 flex rounded-full border border-reddit_border mx-4 flex-grow focus-within:border-gray-500 focus-within:bg-reddit_dark transition-colors duration-200 shadow-inner">
          <SearchIcon className="text-gray-400 h-5 w-5 mt-2 mr-2" />
          <input type="text" className="bg-transparent text-sm p-2 w-full focus:outline-none text-white"
                 placeholder="Search"
                 value={searchText}
                 onChange={ev => setSearchText(ev.target.value)}
          />
        </form>

        {user.username && (
          <div className="flex items-center gap-1 mx-2 relative">
            <ClickOutHandler onClickOut={() => setChatDropdownVisibilityClass('hidden')}>
              <div className="relative">
                <button onClick={toggleChatDropdown} className="p-2 rounded-full hover:bg-reddit_dark-brighter transition-colors">
                  <ChatIcon className="text-gray-300 w-6 h-6" />
                </button>
                <div className={"absolute right-0 top-10 bg-reddit_dark-brightest border border-reddit_border z-10 rounded-xl shadow-lg text-reddit_text overflow-hidden w-64 " + chatDropdownVisibilityClass}>
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-400">No new messages</p>
                  </div>
                </div>
              </div>
            </ClickOutHandler>
            
            <ClickOutHandler onClickOut={() => setBellDropdownVisibilityClass('hidden')}>
              <div className="relative">
                <button onClick={toggleBellDropdown} className="p-2 rounded-full hover:bg-reddit_dark-brighter transition-colors">
                  <BellIcon className="text-gray-300 w-6 h-6" />
                </button>
                <div className={"absolute right-0 top-10 bg-reddit_dark-brightest border border-reddit_border z-10 rounded-xl shadow-lg text-reddit_text overflow-hidden w-64 " + bellDropdownVisibilityClass}>
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-400">You're all caught up!</p>
                  </div>
                </div>
              </div>
            </ClickOutHandler>
            
            <button onClick={() => postFormModal.setShow(true)} className="p-2 rounded-full hover:bg-reddit_dark-brighter transition-colors">
              <PlusIcon className="text-gray-300 w-6 h-6" />
            </button>
          </div>
        )}

        {!user.username && (
          <div className="mx-2 hidden sm:flex items-center gap-2">
            <Button outline={1} className="mr-1 h-9 px-4 rounded-full font-bold" onClick={() => authModal.setShow('login')}>Log In</Button>
            <Button className="h-9 px-4 rounded-full font-bold bg-reddit_text text-reddit_dark hover:bg-white" onClick={() => authModal.setShow('register')}>Sign Up</Button>
          </div>
        )}

        <ClickOutHandler onClickOut={() => setUserDropdownVisibilityClass('hidden')}>
          <button className="rounded-full flex items-center ml-4 border border-reddit_border p-1 hover:border-gray-500 transition-colors bg-reddit_dark-brighter" onClick={toggleUserDropdown}>
            {!user.username && (
              <UserIcon className="w-6 h-6 text-gray-400 m-1" />
            )}
            {user.username && (
              <div className="bg-gray-600 rounded-full w-8 h-8 overflow-hidden">
                <img src={Avatar} alt="" style={{filter:'invert(100%)'}} className="block w-full h-full object-cover" />
              </div>
            )}
            <ChevronDownIcon className="text-gray-400 w-5 h-5 mx-1" />
          </button>
          <div className={"absolute right-0 top-12 bg-reddit_dark-brightest border border-reddit_border z-10 rounded-xl shadow-lg text-reddit_text overflow-hidden w-56 " + userDropdownVisibilityClass}>
            {user.username && (
              <span className="block py-3 px-4 text-sm font-semibold border-b border-reddit_border">
                Hello, {user.username}!
              </span>
            )}
            {!user.username && (
              <button
                onClick={() => authModal.setShow('login')}
                className="flex items-center w-full py-3 px-4 hover:bg-reddit_dark-brighter transition-colors text-sm font-medium">
                <LoginIcon className="w-5 h-5 mr-3 text-gray-400" />
                Log In / Sign Up
              </button>
            )}
            {user.username && (
              <button
                onClick={() => user.logout()}
                className="flex items-center w-full py-3 px-4 hover:bg-reddit_dark-brighter transition-colors text-sm font-medium text-red-400 hover:text-red-300">
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