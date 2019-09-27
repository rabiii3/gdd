import React from 'react';
import PropTypes from 'prop-types';

const spacerMarginLeft = size => ({ LARGE: '20px', MEDIUM: '10px', SMALL: '3px' }[size]);
const spacerMarginRight = size => ({ LARGE: '20px', MEDIUM: '10px', SMALL: '3px' }[size]);
export const SMALL = 'SMALL';
export const MEDIUM = 'MEDIUM';
export const LARGE = 'LARGE';




export const Spacer = ({ size = 'LARGE' }) => {

  const style = ({

    marginLeft: spacerMarginLeft(size),
    marginRight: spacerMarginRight(size),

  });
  const props = { style }
  return <div {...props} />
};

Spacer.propTypes = {
  size: PropTypes.string,
};
export default Spacer;
