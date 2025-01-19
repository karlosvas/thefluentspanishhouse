import { useContext } from 'react';
import { UserContext } from '@/App';
import { type EditType } from 'types/types';
import EditSVG from '@/assets/svg/edit.svg';
import CheckSVG from '@/assets/svg/check.svg';

const Edit: React.FC<EditType> = ({ event, index, state }) => {
  const user = useContext(UserContext);

  return (
    <>
      <span
        onClick={() => {
          event(index);
        }}
      >
        {state && user ? <CheckSVG /> : <EditSVG />}
      </span>
    </>
  );
};

export default Edit;
