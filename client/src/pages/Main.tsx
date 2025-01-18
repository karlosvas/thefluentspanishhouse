import Carrousel from '@/components/pages-components/main/Carrousel';
import Prices from '@/components/pages-components/main/Prices';
import { Helmet } from 'react-helmet-async';
import '@/styles/main.css';
import Profile from '../components/pages-components/main/Profile';

const Main = () => {
  return (
    <>
      <Helmet>
        <title>The Fluent Spanish House</title>
        <meta
          name="description"
          content="Private teacher, The Fluent Spanish House. Discover Spanish with fluency and precision alongside Marta Gutiérrez Fonseca. Our goal is to help you consolidate essential grammatical structures, ensuring you speak with confidence and impeccable pronunciation. From beginner to advanced levels, each class is designed to help you master the language dynamically and effectively"
        ></meta>
      </Helmet>
      <main className="main-index">
        <Profile />
        <Prices />
        <div className="main-reviews">
          <h2>What my students say about me</h2>
          <Carrousel />
        </div>
      </main>
    </>
  );
};

export default Main;
