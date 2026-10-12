import {useContext} from "react";
import ThemeContext from "./ThemeContext";

function BoardHeader() {
  const {theme} = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <>
      <div className="h-40 bg-cover bg-center relative" style={{backgroundImage:'url("https://styles.redditmedia.com/t5_2qs0q/styles/bannerBackgroundImage_7glcgg5ymxp21.png?width=4000&s=9684bc66e812b8730ad694c3f454da8c00a493d7")'}}>
        <div className={`absolute inset-0 bg-gradient-to-t opacity-80 ${isDark ? 'from-reddit_dark' : 'from-white'} to-transparent`}></div>
      </div>
      <div className={`pb-6 transition-colors duration-300 ${isDark ? 'bg-reddit_dark' : 'bg-white border-b border-reddit_light_border'}`}>
        <div className="mx-auto max-w-5xl px-6 relative flex items-end">
          <div className="h-24 w-24 rounded-full overflow-hidden relative -top-6 border-4 border-reddit_dark bg-white shadow-xl flex-shrink-0">
            <img src="https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg?width=256&format=pjpg&s=0a2e472f6fae0712fee4a3b5d44920fe35dbcdaa" alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="pt-2 pl-6 -mt-6">
            <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              webdev: reddit for web developers
            </h1>
            <h5 className={`font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>r/webdev</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardHeader;