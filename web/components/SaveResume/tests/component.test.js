import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { SaveResumeForm } from '..';

describe('web | components | SaveResume | component', () => {
  const intlProvider = new IntlProvider({ locale: 'en', messages: {} }, {});
  const { intl } = intlProvider.getChildContext();
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        resume: {},
        actions: {},
        classes: {},
        isEditable: false,
        setEditable: jest.fn(() => {}),
        handleIsSubmited: jest.fn(() => {}),
        isFormSubmitted: false,
        IsStatusDisabled: true,
        skills: [],
        allSkills: {},
        user:{},
      };
      const wrapper = shallow(<SaveResumeForm {...props} intl={intl} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
