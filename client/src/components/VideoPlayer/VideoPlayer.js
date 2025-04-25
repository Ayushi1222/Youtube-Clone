import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const VideoPlayer = ({ video }) => {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes || 0);
  const [dislikeCount, setDislikeCount] = useState(video.dislikes || 0);

  const handleLike = () => {
    if (!user) return;
    
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
    
    // API call to update likes would go here
  };

  const handleDislike = () => {
    if (!user) return;
    
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    } else {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
      
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    }
    
    // API call to update dislikes would go here
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <div className="aspect-w-16 aspect-h-9 bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <div className="flex justify-between items-center mt-2">
          <div className="text-gray-600">
            {formatViews(video.views)} • {formatDate(video.uploadDate)}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center ${liked ? 'text-blue-600' : 'text-gray-700'}`}
            >
              <svg className="w-6 h-6 mr-1" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
              </svg>
              {likeCount}
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center ${disliked ? 'text-blue-600' : 'text-gray-700'}`}
            >
              <svg className="w-6 h-6 mr-1" fill={disliked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"></path>
              </svg>
              {dislikeCount}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center">
          <img
            src={`https://via.placeholder.com/40`}
            alt={video.uploader}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-medium">{video.uploader}</h3>
          </div>
        </div>
        <p className="mt-4 text-gray-800 whitespace-pre-line">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;