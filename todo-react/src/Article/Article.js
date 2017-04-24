import React, { Component } from 'react';
import review from '../Store/Review';
import './Article.css';

class Article extends Component {
  movieEditReview(movie) {
    console.log(movie);
  }
  render() {
    return (
      <article>
        <h1>All Reviews</h1>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Review</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            review.getState().map((movie) =>
              <tr key={movie.name}>
                <td>{movie.name}</td>
                <td>{movie.review}</td>
                <td>
                  <button onClick={this.movieEditReview.bind(this, movie)}>Edit</button>
                </td>
              </tr>)
          }
          </tbody>
        </table>
        <button>Add New Review</button>
      </article>);
  }

}

export default Article;