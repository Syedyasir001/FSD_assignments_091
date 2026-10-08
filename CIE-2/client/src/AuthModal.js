import Input from "./Input";
import Button from "./Button";
import {useState,useContext} from 'react';
import axios from 'axios';
import AuthModalContext from "./AuthModalContext";
import ClickOutHandler from 'react-clickout-handler';
import UserContext from "./UserContext";

function AuthModal() {
  const [modalType,setModalType] = useState('login');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const modalContext = useContext(AuthModalContext);
  const user = useContext(UserContext);

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

  return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center transition-opacity duration-300 " + visibleClass} style={{backgroundColor:'rgba(0,0,0,.7)', backdropFilter: 'blur(5px)'}}>
      <ClickOutHandler onClickOut={() => modalContext.setShow(false)}>
        <div className="border border-reddit_border w-full max-w-md bg-reddit_dark p-8 text-reddit_text rounded-2xl shadow-2xl relative transform transition-all duration-300 scale-100 mx-4">
          <button onClick={() => modalContext.setShow(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center mb-8">
            {modalType === 'login' ? (
              <>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400 text-sm">Log in to continue to Reddit</p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-white mb-2">Join Reddit</h1>
                <p className="text-gray-400 text-sm">Create an account to join the community</p>
              </>
            )}
          </div>

          <form className="space-y-4" onSubmit={modalType === 'login' ? (e) => { e.preventDefault(); login(); } : register}>
            {modalType === 'register' && (
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">E-mail</label>
                <Input type="email" className="w-full bg-reddit_dark-brighter border border-reddit_border rounded-lg p-3 text-white focus:outline-none focus:border-gray-400 transition-colors" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required />
              </div>
            )}
            <div>
              <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Username</label>
              <Input type="text" className="w-full bg-reddit_dark-brighter border border-reddit_border rounded-lg p-3 text-white focus:outline-none focus:border-gray-400 transition-colors" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Password</label>
              <Input type="password" className="w-full bg-reddit_dark-brighter border border-reddit_border rounded-lg p-3 text-white focus:outline-none focus:border-gray-400 transition-colors" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            </div>

            <Button className="w-full py-3 mt-6 text-lg tracking-wide rounded-xl shadow-lg" type="submit">
              {modalType === 'login' ? 'Log In' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
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
