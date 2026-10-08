import Avatar from "./avatar.png";
import {useContext} from "react";
import PostFormModalContext from "./PostFormModalContext";

function PostForm() {
  const modalContext = useContext(PostFormModalContext);
  return (
    <div className="bg-reddit_dark px-6 py-6 text-gray-400">
      <div className="max-w-5xl mx-auto">
        <div className="border border-reddit_border p-3 rounded-xl flex items-center bg-reddit_dark-brighter shadow-sm hover:border-gray-500 transition-colors">
          <div className="rounded-full bg-gray-600 overflow-hidden w-10 h-10 flex-shrink-0">
            <img src={Avatar} alt="" style={{filter:'invert(100%)'}} className="w-full h-full object-cover" />
          </div>
          <form action="" className="flex-grow ml-4 mr-2">
            <input type="text"
                   onFocus={e => {
                     e.preventDefault();
                     modalContext.setShow(true);
                   }}
                   className="bg-reddit_dark-brightest border border-reddit_border p-3 px-4 text-sm block w-full rounded-full hover:bg-reddit_dark-brighter hover:border-white focus:outline-none focus:border-white transition-all text-white" placeholder="Create Post" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;