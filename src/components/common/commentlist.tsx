import React from 'react';
import CommentCard from './commentcard';

interface CommentListProps {
  comments: { name: string; text: string; rating: number; id: number }[];
  onDeleteComment: (id: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onDeleteComment }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          name={comment.name}
          text={comment.text}
          rating={comment.rating}
          id={comment.id}
          onDelete={onDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;