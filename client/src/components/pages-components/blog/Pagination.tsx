import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router';
import { MAX_PUBLICATIONS_PER_PAGE } from '@/constants/global';
import {
  type LastPublicationResponse,
  type PaginationProps,
} from 'types/types';
import { useEffect, useState } from 'react';
import { getLastPublication } from '@/services/render-data';

export const PaginationReactBoostrap: React.FC<PaginationProps> = ({
  page,
  cardsBlog,
}) => {
  const [lastPage, setLastPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  const changePage = (go: string) => {
    if (go === 'left' && currentPage > 1) navigate(`/blog/${currentPage - 1}`);
    else if (
      go === 'rigth' &&
      currentPage < 10 &&
      cardsBlog.length === MAX_PUBLICATIONS_PER_PAGE
    )
      navigate(`/blog/${currentPage + 1}`);
  };

  useEffect(() => {
    getLastPublication()
      .then((data) => {
        if (
          data &&
          typeof (data as LastPublicationResponse).currentPage === 'number'
        )
          setLastPage((data as LastPublicationResponse).currentPage);
        setCurrentPage(page ? parseInt(page) : 1);
      })
      .catch((error) => {
        console.error('Error al obtener la última publicación', error);
      });
  }, [page]);

  return (
    <div className="change-page">
      <Pagination className="custom-pagination">
        <Pagination.First onClick={() => changePage('left')} />
        {[...Array(5)].map((_, index) => {
          const pageNumber = currentPage + index;
          return (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              disabled={pageNumber > lastPage}
              onClick={() => navigate(`/blog/${pageNumber}`)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
        {currentPage + 5 < lastPage && <Pagination.Ellipsis />}
        <Pagination.Last onClick={() => changePage('rigth')} />
      </Pagination>
    </div>
  );
};

export default PaginationReactBoostrap;
