export const STATISTICS_SET_STATISTICS_DATES = 'statistics/STATISTICS_SET_STATISTICS_DATES';
export const STATISTICS_SET_STATISTICS_FROM_DATE = 'statistics/STATISTICS_SET_STATISTICS_FROM_DATE';
export const STATISTICS_SET_STATISTICS_TO_DATE = 'statistics/STATISTICS_SET_STATISTICS_TO_DATE';
export const STATISTICS_SET_RESUMES_BY_COLLAB_TABLE = 'statistics/STATISTICS_SET_RESUMES_BY_COLLAB_TABLE';
export const STATISTICS_SET_STATUS = 'statistics/STATISTICS_SET_STATUS';


export const handleStatisticsDates = range => ({ type: STATISTICS_SET_STATISTICS_DATES, range });
export const setShowResumesByCollabTable = showResumesByCollabTable => ({ type: STATISTICS_SET_RESUMES_BY_COLLAB_TABLE, showResumesByCollabTable });
export const handleStatistiqueFromDate = from => ({ type: STATISTICS_SET_STATISTICS_FROM_DATE, from });
export const handleStatistiqueToDate = to => ({ type: STATISTICS_SET_STATISTICS_TO_DATE, to });
export const handleStatistiqueStatus = status => ({ type: STATISTICS_SET_STATUS, status });
