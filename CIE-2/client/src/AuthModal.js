import Input from "./Input";
import Button from "./Button";
import {useState,useContext} from 'react';
import axios from 'axios';
import AuthModalContext from "./AuthModalContext";
import ClickOutHandler from 'react-clickout-handler';
import UserContext from "./UserContext";
import ThemeContext from "./ThemeContext";

function AuthModal() {
  const [modalType,setModalType] = useState('login');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const modalContext = useContext(AuthModalContext);
  const user = useContext(UserContext);
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const visibleClass = modalContext.show ? 'block' : 'hidden';
  if (modalContext.show && modalContext.show !== modalType) {
    setModalType(modalContext.show);
  }

  function register(e) {
    e.preventDefault();
    const data = {email,username,password};
    axios.post('http://localhost:4000/register', data, {withCredentials:true})
      .then(() => {
        user.setUser({username});
        modalContext.setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
      });
  }

  function login() {
    const data = {username,password};
    axios.post('http://localhost:4000/login', data, {withCredentials:true})
	  .then(() => {
	    modalContext.setShow(false);
	    user.setUser({username})
	  });
  }

  const cardBg = isDark
    ? 'bg-reddit_dark border-reddit_border text-reddit_text'
    : 'bg-white border-reddit_light_border text-reddit_light_text';
  const inputBg = isDark
    ? 'bg-reddit_dark-brighter border-reddit_border text-white focus:border-gray-400 placeholder-gray-500'
    : 'bg-reddit_light border-reddit_light_border text-gray-800 focus:border-gray-400 placeholder-gray-400';

  return (
    <div className={`w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center transition-opacity duration-300 ${visibleClass}`} style={{backgroundColor:'rgba(0,0,0,.7)', backdropFilter: 'blur(5px)'}}>
      <ClickOutHandler onClickOut={() => modalContext.setShow(false)}>
        <div className={`border w-full max-w-md p-8 rounded-2xl shadow-2xl relative transform transition-all duration-300 scale-100 mx-4 ${cardBg}`}>
          <button onClick={() => modalContext.setShow(false)} className={`absolute top-4 right-4 transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center mb-8">
            {modalType === 'login' ? (
              <>
                <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Log in to continue to Reddit</p>
              </>
            ) : (
              <>
                <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Join Reddit</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Create an account to join the community</p>
              </>
            )}
          </div>

          <form className="space-y-4" onSubmit={modalType === 'login' ? (e) => { e.preventDefault(); login(); } : register}>
            {modalType === 'register' && (
              <div>
                <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>E-mail</label>
                <Input type="email" className={`w-full border rounded-lg p-3 focus:outline-none transition-colors ${inputBg}`} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required />
              </div>
            )}
            <div>
              <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Username</label>
              <Input type="text" className={`w-full border rounded-lg p-3 focus:outline-none transition-colors ${inputBg}`} value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Password</label>
              <Input type="password" className={`w-full border rounded-lg p-3 focus:outline-none transition-colors ${inputBg}`} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </div>

            <Button className="w-full py-3 mt-6 text-lg tracking-wide rounded-xl shadow-lg" type="submit">
              {modalType === 'login' ? 'Log In' : 'Sign Up'}
            </Button>
          </form>

          <div className={`mt-8 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {modalType === 'login' ? (
              <p>New to Reddit? <button className="text-blue-500 hover:text-blue-400 font-semibold transition-colors ml-1" onClick={() => modalContext.setShow('register')}>SIGN UP</button></p>
            ) : (
              <p>Already have an account? <button className="text-blue-500 hover:text-blue-400 font-semibold transition-colors ml-1" onClick={() => modalContext.setShow('login')}>LOG IN</button></p>
            )}
          </div>
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default AuthModal;
