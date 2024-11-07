function ViewMoreBtn({children, onClick}) {
  return (
    <div className="view-more-btn">
      <button className="medium-btn medium-btn-text" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default ViewMoreBtn;
