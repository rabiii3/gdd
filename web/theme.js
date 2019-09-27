// import deepOrange from '@material-ui/core/colors/deepOrange';

export default {
  // palette: {
  //   primary: {
  //     main: '#5c6bc0',
  //   },
  //   secondary: deepOrange,
  // },
  // typography: {
  //   useNextVariants: true,
  // },
  overrides: {
    MuiInputBase: {
      input: {
        '&$disabled': {
          color: 'black',
        },
      },
      disabled: {},
    },
    // MuiList: {
    //   padding: {
    //     paddingTop: '0px',
    //     paddingBottom: '0px',
    //   },
    // },
    // MuiPaper: {
    //   rounded: {
    //     borderRadius: 'unset',
    //   },
    // },
    // MuiDialog: {
    //   paperWidthSm: {
    //     maxWidth: '700px',
    //   }
    // }
  },
}
