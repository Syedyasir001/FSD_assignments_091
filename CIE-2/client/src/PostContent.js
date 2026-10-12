import TimeAgo from 'timeago-react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {useContext} from "react";
import ThemeContext from "./ThemeContext";
import {Link, useHistory} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/outline";

function PostContent(props) {
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const history = useHistory();

  function goBack(e) {
    e.preventDefault();
    e.stopPropagation();
    history.push('/');
  }

  return (
    <div>
      <div className="flex items-center mb-3 text-sm">
        {props.open && (
          <button onClick={goBack} className={`mr-2 p-1.5 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`}>
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        )}
        
        <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center mr-2 text-white font-bold text-xs ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
          r/
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            <span className={`font-bold hover:underline cursor-pointer ${isDark ? 'text-gray-200' : 'text-black'}`}>
              r/webdev
            </span>
            <span className="text-gray-500 text-xs">•</span>
            <TimeAgo datetime={props.postedAt} className="text-gray-500 text-xs" />
          </div>
          <span className={`text-xs hover:underline cursor-pointer ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            u/{props.author}
          </span>
        </div>
      </div>
      
      <h2 className={`text-2xl font-bold mb-2 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {props.title}
      </h2>
      <div className={`text-base leading-relaxed break-words ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
        <ReactMarkdown 
          plugins={[gfm]} 
          children={props.body} 
          components={{
            img: ({node, ...props}) => (
              <div className={`my-4 overflow-hidden rounded-xl border flex justify-center ${isDark ? 'border-gray-700 bg-[#1A1A1B]' : 'border-gray-200 bg-gray-50'}`}>
                <img className="max-w-full h-auto max-h-[500px] object-contain" {...props} alt={props.alt || ''} />
              </div>
            )
          }}
        />
      </div>
    </div>
  );
}

export default PostContent;