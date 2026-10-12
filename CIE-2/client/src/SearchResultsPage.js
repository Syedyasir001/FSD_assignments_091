import {useEffect, useState, useContext} from "react";
import axios from "axios";
import Post from "./Post";
import ThemeContext from "./ThemeContext";
import RootCommentContext from "./RootCommentContext";

function SearchResultsPage(props) {
  const {text} = props.match.params;
  const [comments,setComments] = useState([]);
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
    axios.get('http://localhost:4000/comments?search='+text, {withCredentials:true})
      .then(response => {
        setComments(response.data);
        refreshVotes(response.data);
      });
  }, [text]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-reddit_dark' : 'bg-reddit_light'}`}>
      <div className="pt-6">
        <RootCommentContext.Provider value={{refreshVotes, commentsTotals, userVotes}}>
          {comments.map(comment => (
            <Post key={comment._id} {...comment} isListing={true} />
          ))}
        </RootCommentContext.Provider>
        {comments.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No results found for "{text}"
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;