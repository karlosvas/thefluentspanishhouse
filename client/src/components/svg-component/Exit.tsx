import { useNavigate, Link } from 'react-router-dom';
import { handleScroll } from '@/utils/modal';
import { type ChildrenType, type OptionalClass } from 'types/types';
import ExitSVG from '@/assets/svg/exit.svg';

const Exit: React.FC<ChildrenType & OptionalClass> = ({
  children,
  optionalClass,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    handleScroll(false);
    navigate(-1);
  };

  return (
    <Link to="#" id="exit" onClick={goBack}>
      <div className={`menu-section ${optionalClass}`}>
        <ExitSVG />
        {children}
      </div>
    </Link>
  );
};

export default Exit;
