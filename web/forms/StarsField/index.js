import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { withStateHandlers } from 'recompose';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  rating: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0.2rem',
    },
    paddingLeft: '0.8rem',
    paddingTop: '0.1rem',
    fontSize: '1.3rem'
  }
})

const StarsFieldForm = ({ classes, input: { onChange }, disabled, handleSelectedStar, rating }) => {

  const onStarClick = (currentValue, defaultValue) => {
    const ratingValue = defaultValue || rating;
    if(currentValue === ratingValue) {
      handleSelectedStar(currentValue - 1); 
      onChange(currentValue - 1);
    }
    else {
      handleSelectedStar(currentValue);
      onChange(currentValue);
    }
  }

  return (
    <StarRatingComponent
      name="name"
      className={classes.rating}
      starCount={5}
      value={rating === -1 ? 0 : rating}

      onStarClick={onStarClick}
      editing={!disabled}
    />
  );
};

StarsFieldForm.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  disabled: PropTypes.bool,
  handleSelectedStar: PropTypes.func,
  rating: PropTypes.number,
}

const withSelectedStar = withStateHandlers(({ defaultValue } = this.props) => ({ rating: defaultValue }), {
  handleSelectedStar: () => value => ({ rating: value }),
});

export const enhance = compose(
  withStyles(styles),
  withSelectedStar,
);

export default enhance(StarsFieldForm);
