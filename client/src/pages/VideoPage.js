import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import Comments from '../components/Comments/Comments';
import { getVideoById, getRelatedVideos } from '../services/api';
import VideoCard from '../components/VideoCard/VideoCard';

const VideoPage = () => {
const { videoId } = useParams();
const [sidebarOpen, setSidebarOpen] = useState(false);
const [video, setVideo] = useState(null);
const [relatedVideos, setRelatedVideos] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchData = async () => {
setLoading(true);
try {
const videoData = await getVideoById(videoId);
setVideo(videoData);

const related = await getRelatedVideos(videoId);
setRelatedVideos(related);
} catch (error) {
console.error('Error fetching video:', error);
} finally {
setLoading(false);
}
};

fetchData();
}, [videoId]);

const toggleSidebar = () => {
setSidebarOpen(!sidebarOpen);
};

return (
<div className="min-h-screen bg-gray-50">
<Header toggleSidebar={toggleSidebar} />
<div className="flex">
<Sidebar isOpen={sidebarOpen} />
<main className={`flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
  {loading ? (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    video && (
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoPlayer video={video} />
            <Comments videoId={video.videoId} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <VideoCard key={relatedVideo.videoId} video={relatedVideo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  )}
</main>
</div>
</div>
);
};

export default VideoPage;