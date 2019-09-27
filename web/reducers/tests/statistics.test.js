import reducer from '../statistics';
import { 
  STATISTICS_SET_STATISTICS_DATES,
  STATISTICS_SET_RESUMES_BY_COLLAB_TABLE,
  STATISTICS_SET_STATISTICS_FROM_DATE,
  STATISTICS_SET_STATISTICS_TO_DATE,
  STATISTICS_SET_STATUS, 
} from '../../actions/statistics';
import { lastThreeMonthsBeginning, lastMonthEnd } from '../../pages/Statistics/StatistiqueFilter/index';

describe('web | reducers | statistics', () => {

  const state = { 
    initialDates:{
      from: lastThreeMonthsBeginning, to: lastMonthEnd
    },
    showResumesByCollabTable: false,
  };

  it('should return the initial state', () => {
    expect(reducer(state, {})).toEqual(state);
  });

  it('should return stats in a given range', () => {
    const range = {from:new Date("January 31 2019"), to:new Date("August 31 2019")};
    expect(reducer(state, {type:STATISTICS_SET_STATISTICS_DATES, range})).toEqual({
      initialDates: {from: new Date("January 31 2019"), to: new Date("August 31 2019")}, 
      showResumesByCollabTable: false}
    );
  });

  it('should show resumes by collaborator table', () => {
    const showResumesByCollabTable = true;
    expect(reducer(state, {type:STATISTICS_SET_RESUMES_BY_COLLAB_TABLE, showResumesByCollabTable})).toEqual({
      ...state, 
      showResumesByCollabTable: true}
    );
  });

  it('should return stats from a given start date', () => {
    const from = new Date("January 31 2019");
    expect(reducer(state, {type:STATISTICS_SET_STATISTICS_FROM_DATE, from})).toEqual({
      ...state, 
      initialDates: {
        from, to: state.initialDates.to
      }}
    );
  });
  
  it('should return stats from a given end date', () => {
    const to = new Date("August 31 2019");
    expect(reducer(state, {type:STATISTICS_SET_STATISTICS_TO_DATE, to})).toEqual({
      ...state, 
      initialDates: {
        from: state.initialDates.from, to
      }}
    );
  });

  it('should return stats for a selected status', () => {
    const status = 'confirmed';
    expect(reducer(state, {type:STATISTICS_SET_STATUS, status})).toEqual({
      ...state, 
      status
    }
    );
  });

});