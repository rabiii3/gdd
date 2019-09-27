import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

const Captcha = ({ input: { onChange, name }, sitekey }) => (
  <div>
    <ReCAPTCHA sitekey={sitekey} onChange={onChange} name={name} />
  </div>
);

Captcha.propTypes = {
  input: PropTypes.object.isRequired,
  sitekey: PropTypes.string.isRequired,
};

export default Captcha;
