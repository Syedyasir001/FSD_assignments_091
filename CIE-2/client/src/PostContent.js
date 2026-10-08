import TimeAgo from 'timeago-react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

function PostContent(props) {
  return (
    <div>
      <div className="flex items-center text-gray-400 text-xs font-semibold tracking-wide uppercase mb-3 gap-2">
        <span>Posted by <span className="text-gray-200 hover:text-white transition-colors cursor-pointer">u/{props.author}</span></span>
        <span>•</span>
        <TimeAgo datetime={props.postedAt} className="text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4 leading-tight">{props.title}</h2>
      <div className="text-base leading-relaxed text-gray-300">
        <ReactMarkdown plugins={[gfm]} children={props.body} />
      </div>
    </div>
  );
}

export default PostContent;