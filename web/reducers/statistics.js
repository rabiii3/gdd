import {
  STATISTICS_SET_STATISTICS_DATES,
  STATISTICS_SET_RESUMES_BY_COLLAB_TABLE,
  STATISTICS_SET_STATISTICS_FROM_DATE,
  STATISTICS_SET_STATISTICS_TO_DATE,
  STATISTICS_SET_STATUS,
} from '../actions/statistics';
import { lastThreeMonthsBeginning, lastMonthEnd } from '../pages/Statistics/StatistiqueFilter/index';


export default (
  state = {
    initialDates: {
      from: lastThreeMonthsBeginning, to: lastMonthEnd
    },
    showResumesByCollabTable: false,
  },
  action,
) => {
  switch (action.type) {
    case STATISTICS_SET_STATISTICS_DATES:
      return {
        ...state,
        initialDates: action.range,
      };
    case STATISTICS_SET_RESUMES_BY_COLLAB_TABLE:
      return {
        ...state,
        showResumesByCollabTable: action.showResumesByCollabTable,
      };
    case STATISTICS_SET_STATISTICS_FROM_DATE:
      return {
        ...state,
        initialDates: {
          from: action.from, to: state.initialDates && state.initialDates.to
        },
      };
    case STATISTICS_SET_STATISTICS_TO_DATE:
      return {
        ...state,
        initialDates: {
          from: state.initialDates && state.initialDates.from, to: action.to,
        },
      };
    case STATISTICS_SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};
