import { useState } from 'react';
import { type ShowPasswordProps } from 'types/types';
import '../../styles/show-password.css';
import { handleInputChange } from '@/utilities/utilities';

const ShowPassword: React.FC<ShowPasswordProps> = ({ password, setID }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="password-flex">
      Password
      <div className={`password-container ${isPasswordVisible ? 'show' : ''}`}>
        <input
          type="password"
          name="password"
          className="password-field"
          onChange={(e) => handleInputChange(e, setID)}
          value={password}
          required
        />
        <input
          type="text"
          name="text"
          className="text-field"
          value={password}
          onChange={(e) => handleInputChange(e, setID)}
          required
          autoComplete="off"
        />
        <button
          type="button"
          className="btn"
          onClick={togglePasswordVisibility}
        >
          <svg viewBox="0 0 21 21">
            <circle className="eye" cx="10.5" cy="10.5" r="2.25" />
            <path
              className="top"
              d="M2 10.5C2 10.5 6.43686 5.5 10.5 5.5C14.5631 5.5 19 10.5 19 10.5"
            />
            <path
              className="bottom"
              d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"
            />
            <g className="lashes">
              <path d="M10.5 15.5V18" />
              <path d="M14.5 14.5L15.25 17" />
              <path d="M6.5 14.5L5.75 17" />
              <path d="M3.5 12.5L2 15" />
              <path d="M17.5 12.5L19 15" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ShowPassword;
