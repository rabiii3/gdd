import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { compose, prop, map } from 'ramda';
import { withStateHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import NavigationPrompt from 'react-router-navigation-prompt';
import { convertToRaw, EditorState, ContentState, convertFromHTML  } from 'draft-js';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { getSortedSkills, getSkills } from '../../selectors/skills';
import EditorConvertToHTML from '../../forms/EditorConvertToHtml';
import { getSkillsLabels } from '../../../lib/models/skills';
import { required, requiredSkills } from '../../forms/utils';
import MultipleSelect from '../../forms/MultiSelect';
import { ConfirmNavigation } from '../../widgets';
import { add, update } from '../../actions/jobs';
import TextField from '../../forms/TextField';
import messages from './messages';


const styles = {
  container: {
    margin: 'auto',
    width: '70vw',
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
  margin:{
    marginTop: '5vh',
  },
};

export const SaveJob = ({
  classes, 
  history, 
  job, 
  skills, 
  isEditMode, 
  setEditMode, 
  allSkills, 
  addJob, 
  updateJob, 
  isFormSubmitted, 
  handleIsSubmited }) => {

  const onSubmit = values => {
    if(prop('_id', job)) {
      return new Promise( resolve => {
        resolve(updateJob({
          title: prop('title', values),
          content: prop('content', values) && draftToHtml(convertToRaw(values.content.getCurrentContent())),
          skills: map(skill => prop('_id',skill) || skill , prop('skills', values)),
          _id: prop('_id', job),
        }));
        handleIsSubmited(true);
      }).then(() => setEditMode(false))
    }
    return new Promise( resolve => {
      resolve(
        addJob({
          title: values.title,
          content: values.content && draftToHtml(convertToRaw(values.content.getCurrentContent())),
          skills: map(skill => prop('_id',skill), prop('skills', values))
        })
      );
      handleIsSubmited(true); 
    }).then(() => history.goBack())
    
  };

  const skillsDefaultValue = getSkillsLabels(allSkills, job);

  return(
    <Form
      onSubmit={onSubmit}
      initialValues={{ 
        title: prop('title', job),
        skills: prop('skills', job),
        content: prop('_id', job) && convertFromHTML(job.content).contentBlocks != null
        ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(job.content)))
        : EditorState.createEmpty(),
      }}
      render={({ handleSubmit, pristine, form, invalid, values }) => (
        <form onSubmit={handleSubmit}>
          {!isFormSubmitted && (
            <NavigationPrompt when={!pristine}>
              {({ onConfirm, onCancel }) => <ConfirmNavigation onCancel={onCancel} onConfirm={onConfirm} />}
            </NavigationPrompt>
          )}
          <Grid container direction="row" justify="center" alignItems="center" className={classNames(classes.margin, classes.container)}>
            <Grid item sm={3}></Grid>
            <Grid item xs={12} md={6}>
              <Grid container direction="column" justify="center" spacing={8}>
              <Grid item>
                <Field
                  name="title"
                  label={<FormattedMessage {...messages.title} />}
                  type="text"
                  validate={required(<FormattedMessage {...messages.requiredValidation} />)}
                  disabled={!isEditMode}
                  component={TextField}
                  fullWidth
                  requiredField
                />
              </Grid>
              <Grid item>
                { isEditMode ?
                  <fieldset>
                  <legend>
                    <FormattedMessage {...messages.content} /> 
                  </legend>
                    <Field
                      name="content"
                      component={EditorConvertToHTML}
                    />
                  </fieldset>
                  :
                  <React.Fragment>
                    <label className={classes.labelNoEdit}> {<FormattedMessage {...messages.content} />}</label>
                    <Typography dangerouslySetInnerHTML={{ __html: prop('content', job) }} />
                  </React.Fragment>
                }
              </Grid>
              <Grid item>
              {values.skills && values.skills[0] && isEditMode &&<label className={classes.labelEdit}> {<FormattedMessage {...messages.skills} />}</label>}
              {values.skills && values.skills[0] && !isEditMode && <label className={classes.labelNoEdit}> {<FormattedMessage {...messages.skills} />}</label>}
                <Field
                  name="skills"
                  type="select"
                  isDisabled={!isEditMode}
                  component={MultipleSelect}
                  validate={requiredSkills(<FormattedMessage {...messages.requiredValidation} />)}
                  required
                  isMulti
                  defaultValue={skillsDefaultValue}
                  getOptionValue={option => option._id}
                  placeholder={<FormattedMessage {...messages.skills}/>}
                  suggestion={skills}
                  textFieldProps={{
                    InputLabelProps: {
                      label: <FormattedMessage {...messages.skills} />,
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item >
                {
                  isEditMode &&
                  <Grid container direction="row" justify="center" spacing={3}>
                    <Grid item>
                      <Button
                        onClick={form.reset}
                        disabled={pristine}
                        color="primary"
                        variant="contained">
                        <FormattedMessage {...messages.reset} />
                      </Button> 
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        disabled={pristine || invalid}
                        color="primary"
                        variant="contained">
                        <FormattedMessage {...messages.save} />
                      </Button>
                    </Grid>
                    {prop('_id', job) && (
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          onClick={() => setEditMode(false)}
                          variant="contained">
                          <FormattedMessage {...messages.cancel} />
                        </Button>
                      </Grid>
                    )}
                  </Grid> 
                }
              </Grid>
              </Grid>
            </Grid>
            <Grid item sm={3}></Grid>
          </Grid>
        </form>
      )}
    />
)};
 
SaveJob.propTypes = { 
  classes: PropTypes.object,
  job: PropTypes.object,
  skills: PropTypes.array,
  isEditMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  allSkills: PropTypes.object,
  addJob: PropTypes.func,
  history: PropTypes.object,
  updateJob: PropTypes.func,
  isFormSubmitted: PropTypes.bool,
  handleIsSubmited: PropTypes.func,
};

const withIsSubmitted = withStateHandlers(() => ({ isFormSubmitted: false }), {
  handleIsSubmited: () => value => ({ isFormSubmitted: value }),
});

const mapStateToProps = state => ({
  skills: getSortedSkills(state),
  allSkills: getSkills(state),
});

const mapDispatchToProps = dispatch => ({
  addJob: job => dispatch(add(job)),
  updateJob: job => dispatch(update(job)),
});

export const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withIsSubmitted,
  withRouter,
);

export default enhance(SaveJob);