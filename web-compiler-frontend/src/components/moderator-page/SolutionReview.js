import React, { useState } from 'react';
import styles from '../css/moderator-page/SolutionReview.module.css';

function SolutionReview({ solutions, onBack, onGrade }) {
  const [reviews, setReviews] = useState(
    solutions.map((solution) => ({
      id: solution.id,
      username: solution.username || '',
      email: solution.userEmail || '',
      score: solution.grade || 0,
      comment: solution.comments || '',
    }))
  );
  const [viewCode, setViewCode] = useState(null);
  const [viewOutput, setViewOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleReviewChange = (id, field, value) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, [field]: value } : review
      )
    );
  };

  const handleStarClick = (id, value) => {
    handleReviewChange(id, 'score', value);
  };

  const handleSubmit = () => {
    setErrorMessage('');
    reviews.forEach((review) => {
      onGrade(review.id, review.score, review.comment);
    });
  };

  return (
    <div className={styles.container}>
      <h2>Review Solutions</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Code</th>
              <th>Output</th>
              <th>Grade</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((solution) => (
              <tr key={solution.id}>
                <td>{solution.id}</td>
                <td>{solution.username}</td>
                <td>{solution.userEmail}</td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => setViewCode(solution.code)}
                  >
                    View Code
                  </button>
                </td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => setViewOutput(solution.output)}
                  >
                    View Output
                  </button>
                </td>
                <td>
                  <div className={styles.stars}>
                    {[...Array(10)].map((_, index) => (
                      <span
                        key={index + 1}
                        className={`${styles.star} ${
                          reviews.find((review) => review.id === solution.id)
                            ?.score >= index + 1
                            ? styles.filled
                            : ''
                        }`}
                        onClick={() => handleStarClick(solution.id, index + 1)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <textarea
                    value={
                      reviews.find((review) => review.id === solution.id)
                        ?.comment
                    }
                    onChange={(e) =>
                      handleReviewChange(solution.id, 'comment', e.target.value)
                    }
                    className={styles.commentsTextarea}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewCode && (
        <div className={styles.modal}>
          <pre>{viewCode}</pre>
          <button onClick={() => setViewCode(null)} className={styles.closeButton}>
            ×
          </button>
        </div>
      )}

      {viewOutput && (
        <div className={styles.modal}>
          <pre>{viewOutput}</pre>
          <button
            onClick={() => setViewOutput(null)}
            className={styles.closeButton}
          >
            ×
          </button>
        </div>
      )}

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <div className={styles.buttonsContainer}>
        <button onClick={onBack} className={styles.backButton}>
          Back
        </button>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default SolutionReview;
