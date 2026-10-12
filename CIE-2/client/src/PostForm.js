import Avatar from "./avatar.png";
import {useContext} from "react";
import PostFormModalContext from "./PostFormModalContext";
import ThemeContext from "./ThemeContext";

function PostForm() {
  const modalContext = useContext(PostFormModalContext);
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div className={`px-6 py-6 transition-colors duration-300 ${isDark ? 'bg-reddit_dark text-gray-400' : 'bg-reddit_light text-gray-600'}`}>
      <div className="max-w-5xl mx-auto">
        <div className={`border p-3 rounded-xl flex items-center shadow-sm hover:border-gray-400 transition-colors ${isDark ? 'border-reddit_border bg-reddit_dark-brighter' : 'border-reddit_light_border bg-white'}`}>
          <div className="rounded-full bg-gray-600 overflow-hidden w-10 h-10 flex-shrink-0">
            <img src={Avatar} alt="" style={{filter:'invert(100%)'}} className="w-full h-full object-cover" />
          </div>
          <form action="" className="flex-grow ml-4 mr-2">
            <input
              type="text"
              onFocus={e => {
                e.preventDefault();
                modalContext.setShow(true);
              }}
              className={`border p-3 px-4 text-sm block w-full rounded-full focus:outline-none focus:border-reddit_orange transition-all ${
                isDark
                  ? 'bg-reddit_dark-brightest border-reddit_border text-white hover:bg-reddit_dark-brighter hover:border-white placeholder-gray-500'
                  : 'bg-reddit_light border-reddit_light_border text-gray-800 hover:bg-white hover:border-gray-400 placeholder-gray-400'
              }`}
              placeholder="Create Post"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;