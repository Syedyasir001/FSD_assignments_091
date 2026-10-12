import Comment from "./Comment";
import {useContext} from "react";
import ThemeContext from "./ThemeContext";

function CommentPage(props) {
  const commentId = props.match.params.id;
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const bgClass = isDark ? "bg-reddit_dark" : "bg-reddit_light";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgClass}`}>
      <div className="w-full">
        <Comment id={commentId} />
      </div>
    </div>
  );
}

export default CommentPage;