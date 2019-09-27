import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Divider from '@material-ui/core/Divider/Divider';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { parsePhoneNumber } from 'libphonenumber-js';
import PropTypes from 'prop-types';
import { compose, map, prop, propOr, path } from 'ramda';
import React from 'react';
import Dropzone from 'react-dropzone';
import { Field, Form } from 'react-final-form';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Document, Page } from 'react-pdf';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavigationPrompt from 'react-router-navigation-prompt';
import { SizeMe } from 'react-sizeme';
import { withStateHandlers, withState, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { isConfirmed, statusKeyValue, STATUS } from '../../../lib/models/resumes';
import EditorConvertToHTML from '../../forms/EditorConvertToHtml';
import PhoneNumber from '../../forms/PhoneNumber';
import StarsFieldForm from '../../forms/StarsField'
import Select from '../../forms/Select';
import TextField from '../../forms/TextField';
import { composeValidators, emailFormat, required, isPhoneNumber, requiredSkills } from '../../forms/utils';
import { getCountry } from '../../selectors/config';
import { ConfirmNavigation, ResumeStatus } from '../../widgets';
import { getColor } from '../../../lib/utils';
import messages from './messages';
import MultipleSelect from '../../forms/MultiSelect';
import { getSortedSkills, getSkills } from '../../selectors/skills';
import { getSkillsLabels } from '../../../lib/models/skills';
import { isHeadHunter, isAdmin } from '../../../lib/models/people';
import withRoutes from '../../hoc/routes';
import { Spacer } from '../../widgets/Spacer';
import LoadResume from '../../widgets/LoadResume'
import Todo from '../Todo/index';

const style = theme => ({
  margin: {
    margin: '2%',
  },
  pdf: {
    padding: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
  },
  textfield: {
    width: '100%',
    paddingRight: theme.spacing.unit,
  },
  dropzone: {
    borderStyle: 'dashed',
    borderWidth: 2,
    width: 305,
    height: 430,
  },
  menuItem: {
    textTransform: 'capitalize',
  },
  onDrag: {
    opacity: 0.5,
  },
  container: {
    paddingLeft: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  text: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: theme.spacing.unit * 2,
    height: 94,
  },
  toolbar: {
    borderColor: 'black',
  },
  labelEdit: {
    color: '#0000008a',
    fontSize: '12px',
    fontFamily: 'Roboto',
  },
  labelNoEdit: {
    color: '#00000061',
    fontSize: '12px',
    fontFamily: 'Roboto',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  phonenumber: {
  },
  width: {
    width: '40vw',
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
  paddingTop: {
    paddingTop: '2%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '3%',
    },
  },
  multiSelect: {
    marginBottom: '4%',
    marginTop: '3.5%',
    marginLeft: '2%',
  },
  sizeLabel: {
    fontSize: 'initial',
  },
  divider: {
    marginBottom: '20px',
    width: '97%',
    marginLeft: '15px',
    marginTop: '-10px',
  },
  widthComment: {
    width: '96%'
  },
  starsLabel: {
    paddingLeft: '0.8rem',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0.4rem',
    }
  },
  marginRating: {
    [theme.breakpoints.up('sm')]: {
      margin: '0.5%',
    },
    margin: '0%',
  }
});

class MyDocument extends React.Component {
  shouldComponentUpdate(nextProp) {
    if (nextProp.file && nextProp.file.url) return nextProp.file.url;
    return nextProp.file;
  }

  render() {
    const { classes, file } = this.props;
    return (
      <Document
        loading={
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress className={classes.progress} />
            </Grid>
          </Grid>
        }
        file={file}
      >
        <SizeMe>{({ size }) => <Page pageNumber={1} width={size.width} />}</SizeMe>
      </Document>
    );
  }
}

MyDocument.propTypes = {
  classes: PropTypes.object,
  file: PropTypes.object,
}

export const SaveResumeForm = ({
  classes,
  isEditable,
  resume,
  setEditable,
  actions,
  fileUrl,
  intl,
  country,
  history,
  handleIsSubmited,
  isFormSubmitted,
  IsStatusDisabled,
  skills,
  allSkills,
  routes,
  user,
  closeResumeDialog,
  openResumeDialog,
  isDialogOpened,
}) => {
  const onSubmit = values => {
    const phoneNumber = values.phoneNumber ? parsePhoneNumber(values.phoneNumber, country).format('INTERNATIONAL') : null;
    if (values._id) {
      actions.updateResume({
        ...values,
        phoneNumber,
        award: values.award ? Number(values.award) : null,
        skills: map(value => value._id || value, propOr([], 'skills', values)),
      });

      setEditable(false);
    } else {
      return new Promise(resolve => {
        actions.addResume({
          ...values,
          color: getColor(),
          skills: map(prop('_id'), propOr([], 'skills', values)),
          status: values.status,
          phoneNumber: phoneNumber || undefined,
          award: values.award ? Number(values.award) : undefined,
          comment:
            values.comment ?
            (convertToRaw(values.comment.getCurrentContent()).blocks[0].text &&
            draftToHtml(convertToRaw(values.comment.getCurrentContent()))) : 
            draftToHtml(),
          who: map(path(['label', '_id']), propOr([], 'who', values)),

        });

        handleIsSubmited(true);
        resolve();
      }).then(() => history.push(routes.getPathByName('resumes')));
    }
  };
  const skillsDefaultValue = getSkillsLabels(allSkills, resume);

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        initialValues={(isHeadHunter(user) || isAdmin(user)) ? { ...resume } : { ...resume, status: STATUS.pending }}
        render={({ handleSubmit, pristine, form, invalid, values }) => (
          <form onSubmit={handleSubmit}>
            {!isFormSubmitted && (
              <NavigationPrompt when={!pristine || values.file}>
                {({ onConfirm, onCancel }) => <ConfirmNavigation onCancel={onCancel} onConfirm={onConfirm} />}
              </NavigationPrompt>
            )}
            <Grid container justify="center" direction="row">
              <Grid item className={classes.pdf}>
                <Field name="file">
                  {() => (
                    <Dropzone
                      className={classes.dropzone}
                      accept="application/pdf"
                      maxSize={5000000}
                      onDropAccepted={file => {
                        form.change('file', file[0]);
                        setEditable(true);
                      }}
                      onDropRejected={() => alert('Wrong Format/Size')}
                      activeClassName={classes.onDrag}
                    >
                      <MyDocument
                        file={values.file ? values.file : fileUrl}
                        classes={classes}
                      />
                    </Dropzone>
                  )}
                </Field>
                {!values.file && (
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <Grid container direction="row"
                        justify="center"
                        alignItems="flex-end">
                        <Button onClick={openResumeDialog}>
                          <RemoveRedEye /> <Spacer size="SMALL" />
                          <FormattedMessage {...messages.viewFile} />
                        </Button>
                        <Button onClick={() => actions.loadFile(resume)}>
                          <CloudDownload /> <Spacer size="SMALL" />
                          <FormattedMessage {...messages.downloadFile} />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <LoadResume
                  open={isDialogOpened}
                  close={closeResumeDialog}
                  file={fileUrl}
                  download={() => actions.loadFile(resume)}
                />

              </Grid>
              <Grid item xs={12} sm={5}>
                <Field
                  validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                  requiredField
                  component={TextField}
                  name="firstname"
                  type="text"
                  label={<FormattedMessage {...messages.firstName} />}
                  disabled={!isEditable}
                  className={classNames(classes.margin, classes.textfield)}
                  margin="normal"
                />
                <Field
                  requiredField
                  validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                  component={TextField}
                  name="lastname"
                  type="text"
                  label={<FormattedMessage {...messages.lastName} />}
                  disabled={!isEditable}
                  className={classNames(classes.margin, classes.textfield)}
                />
                <Field
                  requiredField
                  validate={composeValidators(
                    required(<FormattedMessage {...messages.requiredValidation} />),
                    emailFormat(<FormattedMessage {...messages.emailValidation} />),
                  )}
                  component={TextField}
                  name="email"
                  type="email"
                  label={<FormattedMessage {...messages.email} />}
                  disabled={!isEditable}
                  className={classNames(classes.margin, classes.textfield)}
                />
                <Field
                  validate={isPhoneNumber(<FormattedMessage {...messages.phoneValidation} />, country)}
                  component={PhoneNumber}
                  country={country.toUpperCase()}
                  name="phoneNumber"
                  type="text"
                  label={<FormattedMessage {...messages.phoneNumber} />}
                  disabled={!isEditable}
                  className={classNames(classes.margin, classes.textfield)}
                  flagSize="lg"
                />
                <br />
                {isEditable ? <label className={classNames(classes.labelEdit, classes.starsLabel, classes.marginRating)}> {<FormattedMessage {...messages.stars} />}</label>
                  : <label className={classNames(classes.labelNoEdit, classes.starsLabel, classes.marginRating)}> {<FormattedMessage {...messages.stars} />}</label>}
                <br />
                <Field
                  component={StarsFieldForm}
                  name="rating"
                  disabled={!isEditable}
                  defaultValue={resume && resume.rating}
                />

                <Grid container className={classes.multiSelect} >
                  {values.skills && values.skills[0] && isEditable && <label className={classes.labelEdit}> {<FormattedMessage {...messages.skills} />}</label>}
                  {values.skills && values.skills[0] && !isEditable && <label className={classes.labelNoEdit}> {<FormattedMessage {...messages.skills} />}</label>}
                  <Field
                    required
                    validate={requiredSkills(<FormattedMessage {...messages.requiredValidation} />)}
                    className={classes.width}
                    component={MultipleSelect}
                    name="skills"
                    type="select"
                    isMulti
                    defaultValue={skillsDefaultValue}
                    placeholder={intl.formatMessage(messages.skills)}
                    getOptionValue={option => option._id}
                    suggestion={skills}
                    isDisabled={!isEditable}
                    textFieldProps={{
                      InputLabelProps: {
                        label: <FormattedMessage {...messages.skills} />,
                        shrink: true,
                      },
                    }}
                  />
                </Grid>
                <Grid container className={classes.margin}>
                  {(isHeadHunter(user) || isAdmin(user)) ?
                    <Field
                      className={classes.width}
                      name="status"
                      label={isEditable ? <label className={classNames(classes.sizeLabel, classes.labelEdit)}> {<FormattedMessage {...messages.status} />}</label>
                        : <label className={classNames(classes.sizeLabel, classes.labelNoEdit)}> {<FormattedMessage {...messages.status} />}</label>}
                      component={Select}
                      disabled={IsStatusDisabled}
                      renderValue={() => <ResumeStatus resume={values} />}
                    >
                      {map(status => (
                        <MenuItem key={status.key} value={status.key}>
                          {status.value}
                        </MenuItem>
                      ))(statusKeyValue)}
                    </Field>
                    :
                    <Field
                      className={classes.width}
                      name="status"
                      label={isEditable ? <label className={classNames(classes.sizeLabel, classes.labelEdit)}> {<FormattedMessage {...messages.status} />}</label>
                        : <label className={classNames(classes.sizeLabel, classes.labelNoEdit)}> {<FormattedMessage {...messages.status} />}</label>}
                      component={Select}
                      disabled
                      renderValue={() => <ResumeStatus resume={values} />}
                    />
                  }
                </Grid>
                {(isHeadHunter(user) || isAdmin(user)) && <Field
                  component={TextField}
                  name="award"
                  type="number"
                  label={<FormattedMessage {...messages.award} />}
                  disabled={!isEditable || !isConfirmed(values)}
                  className={classNames(classes.margin, classes.textfield)}
                  margin="normal"
                />}
                <Grid container className={classes.margin}>
                  {!resume._id && (
                    <Grid item>
                      <Field
                        name="comment"
                        component={EditorConvertToHTML}
                        placeholder={<FormattedMessage {...messages.leaveComment} />}
                        wrapperClassName={classes.container}
                        toolbarClassName={classes.toolbar}
                      />
                      <Divider className={classes.divider} />
                      <Todo width={classes.width} fullWidth values={values} pristine={pristine} invalid={invalid} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              {isEditable && (
                <Grid container justify="center" className={classes.margin}>
                  {resume._id && (
                    <Button
                      onClick={() => {
                        setEditable(false);
                        form.reset();
                      }}
                      color="primary"
                      variant="contained"
                      className={classes.margin}
                    >
                      <FormattedMessage {...messages.cancel} />
                    </Button>
                  )}
                  <Button
                    onClick={form.reset}
                    disabled={pristine}
                    color="primary"
                    variant="contained"
                    className={classes.margin}
                  >
                    <FormattedMessage {...messages.reset} />
                  </Button>
                  <Button
                    type="submit"
                    disabled={pristine || invalid}
                    color="primary"
                    variant="contained"
                    className={classes.margin}
                  >
                    <FormattedMessage {...messages.save} />
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        )}
      />
    </React.Fragment>
  );
};

SaveResumeForm.propTypes = {
  classes: PropTypes.object,
  isEditable: PropTypes.bool,
  resume: PropTypes.object,
  setEditable: PropTypes.func,
  actions: PropTypes.object,
  country: PropTypes.string,
  intl: intlShape.isRequired,
  history: PropTypes.object,
  handleIsSubmited: PropTypes.func,
  isFormSubmitted: PropTypes.bool,
  IsStatusDisabled: PropTypes.bool,
  skills: PropTypes.array,
  allSkills: PropTypes.object,
  routes: PropTypes.object,
  user: PropTypes.object,
  openResumeDialog: PropTypes.func,
  closeResumeDialog: PropTypes.func,
  isDialogOpened: PropTypes.bool,
  numPages: PropTypes.object,
  fileUrl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  country: getCountry,
  skills: getSortedSkills,
  allSkills: getSkills,
});
const withIsSubmitted = withStateHandlers(() => ({ isFormSubmitted: false }), {
  handleIsSubmited: () => value => ({ isFormSubmitted: value }),
});

const withDialog = withState('isDialogOpened', 'toggleDialog', false);
const withDialogHandlers = withHandlers({
  openResumeDialog: ({ toggleDialog }) => () => toggleDialog(true),
  closeResumeDialog: ({ toggleDialog }) => () => toggleDialog(false),
});

export const enhance = compose(
  withStyles(style),
  connect(mapStateToProps),
  withDialog,
  withDialogHandlers,
  withIsSubmitted,
  injectIntl,
  withRouter,
  withRoutes,
);

export default enhance(SaveResumeForm);
