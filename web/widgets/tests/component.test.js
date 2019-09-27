import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line
import Container from '../Container';
import Content from '../Content';
import ArrowBack from '../ArrowBack';
import GridWidget from '../Grid';
import Menu from '../Menu';
import MenuList from '../MenuList';
import UserName from '../Name';
import ResumeIcon from '../ResumeIcon';
import Spacer from '../Spacer';
import ChipStatus from '../ChipStatus';
import ResumeStatus from '../ResumeStatus';
import RegisterTermsDialog from '../RegisterTermsDialog';
import RoleChip from '../RoleChip';
import { SkillsChip, FilterMenu } from '..';
import LoadResume from '../LoadResume';

describe('<Container />', () => {
  const props = {
    children: <div />,
    classes: {},
  };
  test('should render a <Container />', () => {
    const tree = shallow(<Container {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
describe('<Content />', () => {
  const props = {
    children: <div />,
    classes: {},
  };
  test('should render a <Content />', () => {
    const tree = shallow(<Content {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<ArrowBack />', () => {
  const props = {
    history: {},
  };
  test('should render an <ArrowBack />', () => {
    const tree = shallow(<ArrowBack {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<Grid />', () => {
  const props = {
    children: <div />,
  };
  test('should render a <Grid />', () => {
    const tree = shallow(<GridWidget {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<Menu ><MenuList/></Menu>', () => {
  const props = {
    Menu: {
      children: <div />,
      openUserMenu: jest.fn(),
      closeUserMenu: jest.fn(),
      userMenuAnchor: {},
    },
    MenuList: {
      classes: {},
    },
  };
  test('should render a <Menu /> and <MenuList/>', () => {
    const tree = shallow(
      <Menu {...props.Menu}>
        <MenuList {...props.MenuList} />
      </Menu>,
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('<UserName />', () => {
  const props = {
    user: {},
    classes: {},
  };
  test('should render a <UserName />', () => {
    const tree = shallow(<UserName {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<ResumeIcon />', () => {
  test('should render a <ResumeIcon />', () => {
    const wrapper = shallow(<ResumeIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Spacer />', () => {
  const props = {
    size: 'SMALL',
  };
  test('should render a <Spacer />', () => {
    const tree = shallow(<Spacer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<ChipStatus />', () => {
  const props = {
    size: 'SMALL',
    person: {},
  };
  test('should render a <ChipStatus />', () => {
    const tree = shallow(<ChipStatus {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<ResumeStatus />', () => {
  const props = {
    size: 'SMALL',
    resume: {},
    action: jest.fn(),
    location: {},
  };
  test('should render a <ResumeStatus />', () => {
    const tree = shallow(<ResumeStatus {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<RegisterTermsDialog />', () => {
  const props = {
    openTermsDialog: jest.fn(),
    closeTermsDialog: jest.fn(),
    isDialogOpened: false,
    classes: {},
  };
  test('should render a <RegisterTermsDialog />', () => {
    const tree = shallow(<RegisterTermsDialog {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<RoleChip />', () => {
  const props = {
    data: [],
    size: 'SMALL',
  };
  test('should render a <RoleChip />', () => {
    const tree = shallow(<RoleChip {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<SkillsChip />', () => {
  const props = {
    data: [],
    size: 'SMALL',
    action: jest.fn(),
    location: {},
  };
  test('should render a <SkillsChip />', () => {
    const tree = shallow(<SkillsChip {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<LoadResume />', () => {
  const props = {
    classes: {},
    open: true,
    close: jest.fn(),
    getDocumentLoad: jest.fn(),
    numPages: {},
    token: "",
    resume: {},
    download: jest.fn(),
    fullScreen: true,
  };
  test('should render a <LoadResume />', () => {
    const tree = shallow(<LoadResume {...props} />);
    expect(tree).toMatchSnapshot();
  });
});

describe('<FilterMenu />', () => {
  const props = {
    classes: {},
    closeMenu: jest.fn(),
    isOpen: {},
    data: [],
    action: jest.fn(),
    statusFilter: '',
    allResumes: 10,
  };
  test('should render a <FilterMenu />', () => {
    const tree = shallow(<FilterMenu {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
