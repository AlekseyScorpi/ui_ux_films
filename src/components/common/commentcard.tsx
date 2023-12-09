import React from 'react';

interface CommentCardProps {
  name: string;
  text: string;
  rating: number;
  id: number;
  onDelete: (id: number) => void;
}

const CommentCard: React.FC<CommentCardProps> = (props: CommentCardProps) => {
    function getRatingColor(rating: number) {
        const normalizedRating = Math.min(Math.max(rating / 10, 0), 1);
      
        const hue = Math.floor(0 + normalizedRating * 120);
        const saturation = 100;
        const lightness = 50;
      
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      }

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <div className='items-center text-center border-2 mx-4 my-4 rounded-2xl line-clamp-4' style={{ borderColor: getRatingColor(Number(props.rating)) }}>
      <div className='flex justify-end'>
        <button onClick={handleDelete} className='text-red-500 hover:text-red-700 focus:outline-none'>
          &#10006;
        </button>
      </div>
      <div className='text-2xl my-2 font-bold'>{props.name}</div>
      <p className='text-md my-2'>{props.text}</p>
    </div>
  );
};

export default CommentCard;