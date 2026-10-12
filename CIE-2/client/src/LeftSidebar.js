import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  FireIcon,
  NewspaperIcon,
  SearchCircleIcon,
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PuzzleIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import ThemeContext from './ThemeContext';

const navItems = [
  { label: 'Home', icon: HomeIcon, to: '/' },
  { label: 'Popular', icon: FireIcon, to: '/' },
  { label: 'News', icon: NewspaperIcon, to: '/' },
  { label: 'Explore', icon: SearchCircleIcon, to: '/' },
];

const games = [
  {
    label: "Guess Moby's Ga...",
    color: 'from-blue-500 to-purple-600',
    badge: 'NEW',
    players: '51K monthly players',
  },
  { label: 'Word Grind', color: 'from-green-500 to-teal-600' },
  { label: 'Dot Connect Puzzle', color: 'from-yellow-400 to-orange-500' },
  { label: 'Dice Fight', color: 'from-red-500 to-pink-600' },
];

function LeftSidebar() {
  const [gamesExpanded, setGamesExpanded] = useState(true);
  const [feedsExpanded, setFeedsExpanded] = useState(true);
  const { theme } = useContext(ThemeContext);

  const itemClass =
    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-150 ' +
    (theme === 'dark'
      ? 'text-reddit_text hover:bg-reddit_dark-brighter'
      : 'text-reddit_light_text-darker hover:bg-reddit_light');

  const activeItemClass =
    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ' +
    (theme === 'dark'
      ? 'bg-reddit_dark-brighter text-white'
      : 'bg-reddit_light text-reddit_light_text');

  const sectionLabel =
    'px-4 py-2 text-xs font-bold tracking-widest uppercase flex items-center justify-between ' +
    (theme === 'dark' ? 'text-gray-400' : 'text-gray-500');

  return (
    <aside
      className={
        'w-64 flex-shrink-0 hidden lg:flex flex-col py-4 overflow-y-auto h-[calc(100vh-3.5rem)] sticky top-14 transition-colors duration-300 ' +
        (theme === 'dark' ? 'bg-reddit_dark border-r border-reddit_border' : 'bg-reddit_light-brightest border-r border-reddit_light_border')
      }
    >
      {/* Main nav */}
      <nav className="space-y-0.5 px-2">
        {navItems.map((item, i) => (
          <Link
            key={item.label}
            to={item.to}
            className={i === 0 ? activeItemClass : itemClass}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${i === 0 ? 'text-reddit_orange' : ''}`} />
            {item.label}
          </Link>
        ))}
        <div className={itemClass}>
          <PlusCircleIcon className="w-5 h-5 flex-shrink-0" />
          Start a community
        </div>
      </nav>

      {/* Divider */}
      <div className={`my-3 mx-4 border-t ${theme === 'dark' ? 'border-reddit_border' : 'border-reddit_light_border'}`} />

      {/* Games on Reddit */}
      <div>
        <button
          onClick={() => setGamesExpanded(v => !v)}
          className={sectionLabel + ' w-full text-left'}
        >
          <span>Games on Reddit</span>
          {gamesExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
        </button>

        {gamesExpanded && (
          <div className="space-y-1 px-2 mt-1">
            {games.map(game => (
              <button
                key={game.label}
                className={
                  'flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ' +
                  (theme === 'dark'
                    ? 'text-reddit_text hover:bg-reddit_dark-brighter'
                    : 'text-reddit_light_text-darker hover:bg-reddit_light')
                }
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${game.color} flex-shrink-0 flex items-center justify-center`}>
                  <PuzzleIcon className="w-4 h-4 text-white" />
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="truncate">{game.label}</span>
                    {game.badge && (
                      <span className="text-[9px] bg-reddit_orange text-white px-1 py-0.5 rounded font-bold flex-shrink-0">
                        {game.badge}
                      </span>
                    )}
                  </div>
                  {game.players && (
                    <p className="text-xs text-gray-500 truncate">{game.players}</p>
                  )}
                </div>
              </button>
            ))}
            <button
              className={
                'flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ' +
                (theme === 'dark'
                  ? 'text-gray-400 hover:bg-reddit_dark-brighter hover:text-white'
                  : 'text-gray-500 hover:bg-reddit_light hover:text-gray-700')
              }
            >
              <div className="w-8 h-8 rounded-lg bg-gray-600 flex-shrink-0 flex items-center justify-center">
                <SearchCircleIcon className="w-4 h-4 text-white" />
              </div>
              Discover More
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className={`my-3 mx-4 border-t ${theme === 'dark' ? 'border-reddit_border' : 'border-reddit_light_border'}`} />

      {/* Custom Feeds */}
      <div>
        <button
          onClick={() => setFeedsExpanded(v => !v)}
          className={sectionLabel + ' w-full text-left'}
        >
          <span>Custom Feeds</span>
          {feedsExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
        </button>

        {feedsExpanded && (
          <div className="px-2 mt-1">
            <button
              className={
                'flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ' +
                (theme === 'dark'
                  ? 'text-reddit_text hover:bg-reddit_dark-brighter'
                  : 'text-reddit_light_text-darker hover:bg-reddit_light')
              }
            >
              <PlusCircleIcon className="w-5 h-5 flex-shrink-0 text-reddit_orange" />
              Create Custom Feed
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default LeftSidebar;
