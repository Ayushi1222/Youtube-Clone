import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import VideoCard from '../components/VideoCard/VideoCard';
import FilterButtons from '../components/FilterButtons/FilterButtons';
import { getVideos } from '../services/api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const query = useQuery();
  const searchTerm = query.get('search');
  const category = query.get('category');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (category) params.category = category;
        if (activeFilter && activeFilter !== 'All') params.filter = activeFilter;
        
        const data = await getVideos(params);
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchTerm, category, activeFilter]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <FilterButtons activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

{loading ? (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <div className="px-4 py-4">
      {searchTerm && (
        <h2 className="text-lg font-semibold mb-4">
          Search results for: <span className="italic">{searchTerm}</span>
        </h2>
      )}
      
      {videos.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No videos found</h3>
          <p className="mt-2 text-gray-500">Try a different search term or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      )}
    </div>
  )}
</main>
</div>
</div>
);
};

export default Home;