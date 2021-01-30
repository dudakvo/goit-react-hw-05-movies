import { useState, useEffect } from 'react';
import Pagination from 'react-pagination-library';

import { getReviews } from '../../services/movie-api';

export default function Reviews({ movieID }) {
  const [currentPage, setCurrentPage] = useState('1');
  const [totalPages, setTotalPages] = useState('1');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReviews(movieID)
      .then(reviwsObj => {
        setTotalPages(reviwsObj.totalPages);
        setReviews(reviwsObj.reviews);
      })
      .catch(error => setError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getReviews(movieID, currentPage)
      .then(reviwsObj => {
        setReviews(reviwsObj.reviews);
      })
      .catch(error => setError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (error) {
    return <h1>error.messagee</h1>;
  }

  return (
    <div>
      <ul>
        {reviews.length > 1 &&
          reviews.map(review => {
            const { id, author, url, update, content } = review;
            return (
              <li key={id}>
                <p>author: {author}</p>
                {update && (
                  <p>
                    update at: <span>{update}</span>
                  </p>
                )}
                <a href={url}>{url}</a>
                <p> {content}</p>
              </li>
            );
          })}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changeCurrentPage={setCurrentPage}
        theme="bottom-border"
      />
    </div>
  );
}
