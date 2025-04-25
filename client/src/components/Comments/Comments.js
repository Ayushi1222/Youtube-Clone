import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getComments, addComment, updateComment, deleteComment } from '../../services/api';

const Comments = ({ videoId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(videoId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const comment = await addComment(videoId, newComment);
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      const updatedComment = await updateComment(editingComment.commentId, editText);
      setComments(comments.map(c => c.commentId === editingComment.commentId ? updatedComment : c));
      setEditingComment(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.commentId !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const startEdit = (comment) => {
    setEditingComment(comment);
    setEditText(comment.text);
  };

  if (loading) {
    return <div className="text-center py-8">Loading comments...</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">{comments.length} Comments</h3>
      
      {user && (
        <form onSubmit={handleAddComment} className="mb-8">
          <div className="flex items-start">
            <img
              src={user.avatar || `https://via.placeholder.com/40`}
              alt={user.username}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex-grow">
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={!newComment.trim()}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.commentId} className="flex">
            <img
              src={`https://via.placeholder.com/40`}
              alt={comment.username}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex-grow">
              <div className="flex items-center">
                <h4 className="font-medium">{comment.username}</h4>
                <span className="ml-2 text-sm text-gray-500">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              
              {editingComment?.commentId === comment.commentId ? (
                <form onSubmit={handleEditComment} className="mt-2">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingComment(null)}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      disabled={!editText.trim()}
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="mt-1">{comment.text}</p>
                  {user && user.userId === comment.userId && (
                    <div className="mt-2 flex space-x-4">
                      <button
                        onClick={() => startEdit(comment)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;