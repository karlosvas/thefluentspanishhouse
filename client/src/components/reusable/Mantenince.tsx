
import '@/styles/maintenance.css';
import PlaceholderImg from './PlaceholderImg';

const Mantenince = () => {
  return (
    <div className="maintenance">
    <h1>We are currently under maintenance...</h1>
     <PlaceholderImg 
      src='img/mantenince.webp' 
      className="img-mantenance" 
      alt="Current maintenance image on this page" 
      aria-label="Maintenance image"/>
  </div>
  );
};

export default Mantenince;
