import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    } else if (diffInDays < 365) {
      return `${Math.floor(diffInDays / 30)} months ago`;
    }
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <Link to={`/video/${video.videoId}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
          src={video.thumbnail || "https://via.placeholder.com/320x180"}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-gray-600 mt-1">{video.uploader}</p>
          <div className="flex text-gray-500 text-sm mt-1">
            <span>{formatViews(video.views)}</span>
            <span className="mx-1">•</span>
            <span>{formatDate(video.uploadDate)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;