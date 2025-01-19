import toast from 'react-hot-toast';
import CommentSVG from '@/assets/svg/comment.svg';
import { type CommentOptionsProps } from 'types/types';

const ReplyToComment: React.FC<CommentOptionsProps> = ({
  user,
  isResponse,
  setIsResponse,
}) => {
  const handleResponse = () => {
    if (user) setIsResponse(!isResponse);
    else toast.error('Do you need login to comment');
  };

  return (
    <>
      <div id="response" onClick={handleResponse}>
        <CommentSVG />
      </div>
    </>
  );
};

export default ReplyToComment;
