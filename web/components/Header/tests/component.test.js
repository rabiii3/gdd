import React from 'react';
import { shallow } from 'enzyme';
import { StyledHeaderLeft, StyledHeaderRight, StyledHeader } from '..';

describe('<HeaderLeft />', () => {
  const props = {
    children: <div />,
    classes: {},
  };
  test('should render a <StyledHeaderLeft />', () => {
    const tree = shallow(<StyledHeaderLeft {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<HeaderRight />', () => {
  const props = {
    children: <div />,
    classes: {},
  };
  test('should render a <StyledHeaderRight />', () => {
    const tree = shallow(<StyledHeaderRight {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<Header />', () => {
  const props = {
    children: <div />,
    classes: {},
  };
  test('should render a <StyledHeaderRight />', () => {
    const tree = shallow(
      <StyledHeader {...props}>
        <StyledHeaderLeft {...props} />
        <StyledHeaderRight {...props} />
      </StyledHeader>,
    );
    expect(tree).toMatchSnapshot();
  });
});
