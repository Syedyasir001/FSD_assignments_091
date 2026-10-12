import axios from 'axios';
import {useContext} from "react";
import RootCommentContext from "./RootCommentContext";
import ThemeContext from "./ThemeContext";

import AuthModalContext from "./AuthModalContext";

function Voting(props) {
  const rootCommentInfo = useContext(RootCommentContext);
  const {commentsTotals, userVotes} = rootCommentInfo;
  const {commentId, layout = 'vertical'} = props;
  const {theme} = useContext(ThemeContext);
  const authModal = useContext(AuthModalContext);
  const isDark = theme === 'dark';

  const total = commentsTotals && commentId in commentsTotals
    ? commentsTotals[commentId]
    : 0;

  const userVote = userVotes && commentId in userVotes
    ? userVotes[commentId]
    : 0;

  function sendVote(direction = 'up') {
    const directionNumber = direction === 'up' ? 1 : -1;
    if (directionNumber === userVote) {
      direction = 'unvote';
    }
    const url = 'http://localhost:4000/vote/'+props.commentId+'/'+direction;
    axios.get(url, {withCredentials:true})
      .then(() => {
        rootCommentInfo.refreshVotes();
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          authModal.setShow('login');
        }
      });
  }

  function handleVoteUp(e) {
    e.preventDefault();
    e.stopPropagation();
    sendVote('up');
  }

  function handleVoteDown(e) {
    e.preventDefault();
    e.stopPropagation();
    sendVote('down');
  }

  function arrowButton(directionName = 'up') {
    const directionNumber = directionName === 'up' ? 1 : -1;
    let classNames = 'inline-block h-5 relative ';
    classNames += layout === 'vertical' ? 'top-1 ' : '';

    if (directionNumber === userVote) {
      classNames += ' text-reddit_red';
    } else {
      classNames += isDark
        ? ' text-gray-400 hover:text-reddit_red'
        : ' text-gray-500 hover:text-reddit_red';
    }

    if (directionName === 'up') {
      return (
        <button onClick={handleVoteUp} className={classNames}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        </button>
      );
    } else {
      return (
        <button onClick={handleVoteDown} className={classNames}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      );
    }
  }

  // Pill styling for horizontal, box for vertical
  const containerBg = isDark
    ? (layout === 'horizontal' ? 'bg-reddit_dark-brightest hover:bg-[#2d3a40]' : 'bg-reddit_dark-brightest border-transparent hover:border-reddit_border')
    : (layout === 'horizontal' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-reddit_light border-transparent hover:border-reddit_light_border');
    
  const flexDir = layout === 'horizontal' ? 'flex-row items-center space-x-1.5 px-2 py-1 rounded-full' : 'flex-col items-center p-2 rounded-xl border mr-4 shadow-sm';

  return (
    <div 
      className={`inline-flex transition-colors ${flexDir} ${containerBg}`}
      onClick={(e) => e.preventDefault() || e.stopPropagation()}
    >
      {arrowButton('up')}
      <div className={`font-bold text-sm ${layout === 'vertical' ? 'my-1' : ''} ${userVote === 1 ? 'text-reddit_orange' : userVote === -1 ? 'text-blue-500' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {total}
      </div>
      {arrowButton('down')}
    </div>
  );
}

export default Voting;