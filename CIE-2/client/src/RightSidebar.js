import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TimeAgo from 'timeago-react';
import ThemeContext from './ThemeContext';
import { XIcon } from '@heroicons/react/outline';

function RightSidebar() {
  const [recentPosts, setRecentPosts] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get('http://localhost:4000/comments', { withCredentials: true })
      .then(response => {
        // show latest 5
        setRecentPosts(response.data.slice(0, 5));
      });
  }, []);

  function clearRecent() {
    setRecentPosts([]);
  }

  const cardBase =
    'w-64 flex-shrink-0 hidden xl:flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 py-4 px-3 overflow-y-auto transition-colors duration-300 ';
  const cardTheme =
    theme === 'dark'
      ? 'bg-reddit_dark border-l border-reddit_border'
      : 'bg-reddit_light-brightest border-l border-reddit_light_border';

  const panelBase =
    'rounded-2xl border p-4 transition-colors duration-300 ';
  const panelTheme =
    theme === 'dark'
      ? 'bg-reddit_dark-brighter border-reddit_border'
      : 'bg-white border-reddit_light_border shadow-sm';

  const textMain = theme === 'dark' ? 'text-reddit_text' : 'text-reddit_light_text';
  const textMuted = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const divider = theme === 'dark' ? 'border-reddit_border' : 'border-reddit_light_border';

  return (
    <aside className={cardBase + cardTheme}>
      {/* Recent Posts Panel */}
      <div className={panelBase + panelTheme}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}>
            Recent Posts
          </h3>
          {recentPosts.length > 0 && (
            <button
              onClick={clearRecent}
              className="text-xs text-blue-500 hover:text-blue-400 font-semibold transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {recentPosts.length === 0 && (
          <p className={`text-xs ${textMuted} text-center py-4`}>
            No recent posts yet
          </p>
        )}

        <div className="space-y-3">
          {recentPosts.map(post => (
            <Link
              key={post._id}
              to={{
                pathname: '/comments/' + (post.rootId || post._id),
                state: { commentId: post.rootId || post._id },
              }}
              className={`flex gap-2 group rounded-xl p-2 transition-colors duration-150 ${
                theme === 'dark' ? 'hover:bg-reddit_dark-brightest' : 'hover:bg-reddit_light'
              }`}
            >
              {/* Thumbnail placeholder */}
              <div className="w-14 h-14 rounded-lg flex-shrink-0 bg-gradient-to-br from-gray-600 to-gray-800 overflow-hidden flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium ${textMuted} mb-0.5`}>
                  r/{post.board || 'IndianGaming'}
                </p>
                <p
                  className={`text-xs font-semibold leading-tight ${textMain} group-hover:text-reddit_orange transition-colors line-clamp-2`}
                >
                  {post.title || post.body?.slice(0, 60)}
                </p>
                <p className={`text-[10px] mt-1 ${textMuted}`}>
                  <TimeAgo datetime={post.postedAt} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className={`mt-4 px-1 space-y-2 text-[11px] ${textMuted}`}>
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {['Reddit Rules', 'Privacy Policy', 'User Agreement', 'Accessibility'].map(link => (
            <a key={link} href="/" className="hover:underline transition-colors">
              {link}
            </a>
          ))}
        </div>
        <p>Reddit, Inc. © 2026. All rights reserved.</p>
      </div>
    </aside>
  );
}

export default RightSidebar;
