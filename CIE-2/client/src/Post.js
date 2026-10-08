import {Link} from "react-router-dom";
import PostContent from "./PostContent";

function Post(props) {

  let postClasses = "block rounded-2xl overflow-hidden transition-all duration-300 ";
  if (props.isListing) {
    postClasses += " bg-reddit_dark-brighter p-5 mx-auto max-w-5xl mb-6 border border-reddit_border hover:border-gray-500 shadow-md hover:shadow-lg";
  } else {
    postClasses += " border-none max-w-5xl mx-auto";
  }
  return (
    <div className="text-reddit_text px-6 pb-4">
      {props.open && (
        <div className={postClasses}>
          <PostContent {...props} />
        </div>
      )}
      {!props.open && (
        <Link to={{pathname:'/comments/'+(props.rootId || props._id),state:{commentId:(props.rootId || props._id)}}} className={postClasses}>
          <PostContent {...props} />
        </Link>
      )}
    </div>
  );
}

export default Post;