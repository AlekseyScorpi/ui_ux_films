import React, { useState } from 'react';
import { BiMoviePlay } from 'react-icons/bi';

interface CommentFormProps {
  onCommentSubmit: (comment: { id: number; name: string; text: string; rating: number }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onCommentSubmit }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueId = Date.now();
    onCommentSubmit({ id: uniqueId, name, text: comment, rating });
    setName('');
    setComment('');
    setRating(5);
  };

  return (
    <div className='m-4'>
      <div className='flex justify-center'>
        <div className='m-2 text-3xl'>Leave a comment!</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center items-center'>
          <label className='m-2'>Your name:</label>
          <input
            className='m-2 text-slate-700'
            placeholder='Write your name...'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <label className='m-2'>Your score:</label>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${star <= rating ? 'text-orange-400' : 'text-gray-300'}`}
              onClick={() => handleStarClick(star)}
            >
              {<BiMoviePlay/>}
            </span>
          ))}
        </div>
        <div className='flex justify-center items-center'>
          <label className='m-2'>Your comment:</label>
          <textarea
            className='m-2 w-96 text-slate-700'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            maxLength={300}
            required
          />
          <button
            className='m-2 text-lg border-solid border-4 border-orange-400 rounded-xl px-8 py-1'
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;