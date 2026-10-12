import Post from "./Post";
import {useState, useEffect, useContext} from "react";
import axios from "axios";
import ThemeContext from "./ThemeContext";
import RootCommentContext from "./RootCommentContext";

function PostsListing() {
  const [comments, setComments] = useState([]);
  const [commentsTotals, setCommentsTotals] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const {theme} = useContext(ThemeContext);

  function refreshVotes(commentsList = comments) {
    const commentsIds = commentsList.map(c => c._id);
    if (commentsIds.length === 0) return;
    axios.post('http://localhost:4000/votes', {commentsIds}, {withCredentials:true})
      .then(response => {
        setCommentsTotals(response.data.commentsTotals);
        setUserVotes(response.data.userVotes);
      });
  }

  useEffect(() => {
    axios.get('http://localhost:4000/comments', {withCredentials:true})
      .then(response => {
        setComments(response.data);
        refreshVotes(response.data);
      });
  }, []);

  return (
    <div className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-reddit_dark' : 'bg-reddit_light'}`}>
      <RootCommentContext.Provider value={{refreshVotes, commentsTotals, userVotes}}>
        {comments.map(comment => (
          <Post key={comment._id} {...comment} isListing={true} />
        ))}
      </RootCommentContext.Provider>
    </div>
  );
}

export default PostsListing;