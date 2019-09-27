import StarRatingComponent from 'react-star-rating-component';
import React from 'react'
import PropTypes from 'prop-types';


export const StarRating = ({value}) => (
  <StarRatingComponent
    name="rate1"
    starCount={value}
    value={value}
    editing={false}
    />
)

StarRating.propTypes = {
  value: PropTypes.number,
}
