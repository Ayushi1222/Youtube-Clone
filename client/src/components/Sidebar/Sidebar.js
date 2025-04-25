import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const sidebarItems = [
    { icon: 'home', label: 'Home', link: '/' },
    { icon: 'trending-up', label: 'Trending', link: '/?category=trending' },
    { icon: 'play', label: 'Subscriptions', link: '/?category=subscriptions' },
    { icon: 'clock', label: 'History', link: '/?category=history' },
    { icon: 'thumbs-up', label: 'Liked Videos', link: '/?category=liked' },
  ];

  return (
    <aside className={`bg-white w-64 fixed top-16 bottom-0 z-10 transition-all duration-300 ${isOpen ? 'left-0' : '-left-64'}`}>
      <div className="px-4 py-6">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.link}
                className="flex items-center px-4 py-3 text-gray-800 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {item.icon === 'home' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>}
                  {item.icon === 'trending-up' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>}
                  {/* {item.icon === 'play' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>} */}
                  {item.icon === 'clock' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>}
                  {item.icon === 'thumbs-up' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>}
                </svg>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;