import ClickOutHandler from 'react-clickout-handler';
import {useState,useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import PostFormModalContext from "./PostFormModalContext";
import AuthModalContext from "./AuthModalContext";
import axios from "axios";

function PostFormModal () {

  const modalContext = useContext(PostFormModalContext);
  const authModalContext = useContext(AuthModalContext);

  const visibleClass = modalContext.show ? 'block' : 'hidden';

  const [title,setTitle] = useState('');
  const [body,setBody] = useState('');
  const [newPostId, setNewPostId] = useState(null);

  function createPost() {
    const data = {title,body};
    axios.post('http://localhost:4000/comments', data, {withCredentials:true})
      .then(response => {
        setNewPostId(response.data._id);
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          authModalContext.setShow('login');
        }
      });
  }

  if (newPostId) {
    return (<Redirect to={'/comments/'+newPostId} />);
  }

  return (
    <div
      className={"w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center transition-opacity duration-300 "+visibleClass}  style={{backgroundColor:'rgba(0,0,0,.7)', backdropFilter: 'blur(5px)'}}>
      <ClickOutHandler onClickOut={() => modalContext.setShow(false) }>
        <div className="border border-reddit_border w-full max-w-2xl bg-reddit_dark p-8 text-reddit_text rounded-2xl shadow-2xl relative transform transition-all mx-4">
          <button onClick={() => modalContext.setShow(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mb-6 border-b border-reddit_border pb-4">
            <h1 className="text-xl font-semibold text-white">Create a post</h1>
          </div>
          <Input
            className={'w-full mb-4 bg-reddit_dark-brighter font-medium'}
            placeholder={'Title'}
            onChange={e => setTitle(e.target.value)}
            value={title} />
          <Textarea
            className={'w-full mb-6 min-h-[200px]'}
            placeholder={'Post text (you can use markdown)'}
            onChange={e => setBody(e.target.value)}
            value={body} />
          <div className={'flex justify-end gap-3'}>
            <Button onClick={() => modalContext.setShow(false)}
                    outline className={'px-6 py-2'}>Cancel</Button>
            <Button onClick={() => createPost()} className={'px-6 py-2 bg-reddit_text text-reddit_dark hover:bg-white'}>Post</Button>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default PostFormModal;