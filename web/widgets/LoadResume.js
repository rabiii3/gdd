import React from 'react';
import PropTypes from 'prop-types';
import { withStateHandlers} from 'recompose';
import { Page, Document } from 'react-pdf';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { SizeMe } from 'react-sizeme';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import messages from '../components/SaveResume/messages';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
    dialogSize: {
        [theme.breakpoints.up('sm')]: {
            minWidth: '42rem',
            height: '60rem',
            overflowX: 'hidden',
        },
        overflowX: 'auto',
    },
});

const LoadResume = ({ classes, file, open, close, numPages, onDocumentLoaded, download, fullScreen }) => (
    <Dialog
        open={open}
        onClose={close}
        fullScreen={fullScreen}
    >
        <DialogContent className={classes.dialogSize}>
            <Document
                loading={
                    <Grid container justify="center" alignItems="center">
                        <Grid item>
                            <CircularProgress className={classes.progress} />
                        </Grid>
                    </Grid>
                }
                onLoadSuccess={onDocumentLoaded}
                file={file}
            >
                <Hidden xsDown>
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (<Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                        ))}
                </Hidden>
                <Hidden smUp>
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <SizeMe key={`page_${index + 1}`}>
                                {() => <Page
                                    pageNumber={index + 1}
                                    width={350}
                                />}
                            </SizeMe>
                        ))}
                </Hidden>
            </Document>
        </DialogContent>
        <DialogActions>
            <Button onClick={download} color="primary" disabled={!numPages}>
                <FormattedMessage {...messages.downloadFile} />
            </Button>
            <Button onClick={close} color="primary">
                <FormattedMessage {...messages.close} />
            </Button>
        </DialogActions>
    </Dialog >
);

LoadResume.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    close: PropTypes.func,
    getDocumentLoad: PropTypes.func,
    numPages: PropTypes.number,
    file: PropTypes.object,
    download: PropTypes.func,
    fullScreen: PropTypes.bool.isRequired,
    onDocumentLoaded: PropTypes.func,
};

const withPageHandlers = withStateHandlers(
  { numPages: 0 },
  {
    onDocumentLoaded: () => ({ numPages }) => ({ numPages }),
  }
);


export const enhance = compose(
  withPageHandlers,
  withStyles(styles), 
  withMobileDialog()
);

export default enhance(LoadResume);
