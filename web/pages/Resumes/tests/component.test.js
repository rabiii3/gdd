import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { Page } from '..';

const intlProvider = new IntlProvider({ locale: 'en', messages: {} }, {});
const { intl } = intlProvider.getChildContext();

describe('web | pages | ResumesPage | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const props = {
        setFile: () => {},
        setDropzone: () => {},
        resumesStatusFilter: () => {},
        addForm: () => {},
        handleSearchInResumes: () => {},
        sortResumes: () => {},
        resumesCandidateSort: () => {},
        resumesWorkerSort: () => {},
        resumesStatusSort: () => {},
        setShowFilter: () => {},
        setCloseFilter: () => {},
        setShowFilterStatus: () => {},
        setCloseFilterStatus: () => {},
        setShowFilterSkills: () => {},
        setCloseFilterSkills: () => {},
        classes: {},
        isDropzoneOpen: false,
        intl: { formatMessage: jest.fn() },
        file: [],
        resumes: [],
        people: {},
        dateSort: {},
        statusSort: '',
        candidateSort: '',
        workerSort: '',
        showFilterMenu: false,
        filter: {},
        resumesStatus: [],
        resumesSkills: [],
        statusFilter: '',
        allResumes: [],
        sorts: {},
        sortMode: {},
        actions: {},
        term: '',
        filterStatus: {},
        filterSkills: {},
        allSkills: {},
        location: {},
        showTableView:true,
      };
      const wrapper = shallow(<Page {...props} intl={intl} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
