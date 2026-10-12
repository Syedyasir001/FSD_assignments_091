import {Link} from "react-router-dom";
import PostContent from "./PostContent";
import {useContext, useState} from "react";
import ThemeContext from "./ThemeContext";
import Voting from "./Voting";
import {ChatAltIcon, ShareIcon} from "@heroicons/react/outline";

function Post(props) {
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  const [copied, setCopied] = useState(false);

  let postClasses = "flex flex-col transition-all duration-300 ";
  if (props.isListing) {
    postClasses += isDark
      ? " bg-reddit_dark-brighter mx-auto mb-4 border border-reddit_border hover:border-gray-500 rounded-2xl p-4"
      : " bg-white mx-auto mb-4 border border-reddit_light_border hover:border-gray-400 rounded-2xl p-4";
  } else {
    // When open on its own page, mimic Reddit's flat look
    postClasses += isDark 
      ? " bg-reddit_dark-brighter border-b border-reddit_border p-4 pt-6"
      : " bg-white border-b border-reddit_light_border p-4 pt-6";
  }

  const textColor = isDark ? 'text-reddit_text' : 'text-reddit_light_text';
  const iconBtnClass = isDark ? 'hover:bg-[#2d3a40] bg-reddit_dark-brightest text-gray-400 hover:text-white' : 'hover:bg-gray-200 bg-gray-100 text-gray-600 hover:text-gray-900';

  function handleShare(e) {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.origin + '/comments/' + (props.rootId || props._id);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const ContentWrapper = props.open ? 'div' : Link;
  const contentProps = props.open ? {} : {
    to: {pathname:'/comments/'+(props.rootId || props._id),state:{commentId:(props.rootId || props._id)}}
  };

  return (
    <div className={`${textColor} ${props.isListing ? 'px-0 sm:px-6' : ''}`}>
      <div className={postClasses}>
        
        {/* Main Content */}
        <ContentWrapper {...contentProps} className="block">
          <PostContent {...props} />
        </ContentWrapper>
        
        {/* Action Bar */}
        <div className="flex items-center gap-3 mt-4">
          <Voting commentId={props._id} layout="horizontal" />

          {!props.open && (
            <ContentWrapper {...contentProps} className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors text-sm font-bold ${iconBtnClass}`}>
              <ChatAltIcon className="w-5 h-5" />
              <span>Comments</span>
            </ContentWrapper>
          )}
          
          <button onClick={handleShare} className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors text-sm font-bold ${iconBtnClass}`}>
            <ShareIcon className="w-5 h-5" />
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Post;