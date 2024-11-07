import classes from 'utils/classes';
import parseImg from 'utils/images';

const arrowLeft = parseImg('ic_pagination_arrow_left.svg');
const arrowRight = parseImg('ic_pagination_arrow_right.svg');

function Pagination({name, title, device, cursor, currentPage, totalPages, onPageChange, fetchMoreData, children}) {
  const canGoNext = cursor || currentPage + 1 < totalPages;
  const canGoPrev = currentPage > 0;

  const handleNextPage = () => {
    if (currentPage + 1 >= totalPages) fetchMoreData();
    onPageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };
  return (
    <div className={classes('pagination-container', name)}>
      {device === 'desktop' && canGoPrev && (
        <button type="button" className="pagination-icon prev" onClick={handlePreviousPage}>
          <img src={arrowLeft} alt="arrow-prev" />
        </button>
      )}
      <h2 className="content-title">{title}</h2>
      {children}
      {device === 'desktop' && canGoNext && (
        <button type="button" className="pagination-icon next" onClick={handleNextPage}>
          <img src={arrowRight} alt="arrow-next" />
        </button>
      )}
    </div>
  );
}

export default Pagination;
