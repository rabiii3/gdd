import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { compose, map, propOr, propEq } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames';
import connect from 'react-redux/lib/connect/connect';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Call from '@material-ui/icons/Call';
import Forward from '@material-ui/icons/Forward';
import Face from '@material-ui/icons/Face';
import Block from '@material-ui/icons/Block';
import Grid from '@material-ui/core/Grid';
import messages from './messages';
import DateTimePickerForm from '../../forms/DateTimePicker';
import withRoutes from '../../hoc/routes';
import { SMALL } from '../../widgets/ResumeStatus';
import Select from '../../forms/Select';
import MultiSelectUsers from '../../forms/MultiSelectUsers';
import { getAdminsAndHeadHunters, getPeople } from '../../selectors/people';
import { Spacer } from '../../widgets/Spacer';

const style = theme => ({
  marginDatePicker: {
    marginTop: '1%'
  },
  marginWho: {
    marginTop: '2%'
  },
  marginTop: {
    [theme.breakpoints.up('lg')]: {
      marginTop: '5%'
    },
    marginTop: '8%'
  },

  marginTopWhen: {
    marginTop: '3%'
  },
  noMarginTop: {
    [theme.breakpoints.up('lg')]: {
      marginTop: '-5%'
    },
    marginTop: '-8%'
  },
  noMarginTopWhen: {
    marginTop: '1%'
  },
  labelEdit: {
    color: '#0000008a',
    fontSize: '12px',
    fontFamily: 'Roboto',

  },
});

export const Todo = ({ classes, people, comment, adminsOrHeadHunters, width, fullWidth, values }) => {

  const reasons = [
    { id: 'none', icon: <Block />, label: 'None', value: 'none' },
    { id: 'call', icon: <Call />, label: 'Call', value: 'call' },
    { id: 'forward', icon: <Forward />, label: 'Forward', value: 'forward' },
    { id: 'meet', icon: <Face />, label: 'Meet', value: 'meet' },
  ];

  const whoDefaultValue = comment =>
    compose(
      map(element => ({ value: element, label: people[element] })),
      propOr([], 'who')
    )(comment);

  const sendtoWhom = whoDefaultValue(comment);
  return (

    <Grid container direction="row" justify="space-between" alignitem="center">
      <Grid item xs={12} lg={fullWidth ? 12 : 4}>
        <Field
          className={width}
          name="what"
          label={<label > <FormattedMessage {...messages.what} /> </label >}
          component={Select}
        >
          {map(reason => (
            <MenuItem key={reason.id} value={reason.value}>
              <Grid container direction="row" justify="flex-start" alignitem="center">
                {reason.icon}
                <Spacer size={SMALL} />
                {reason.label}
              </Grid>
            </MenuItem>
          ))(reasons)}
        </Field>
      </Grid>
      
      <Grid item xs={12} lg={fullWidth ? 12 : 4}>
        { !propEq('what', 'forward', values) &&(
        <Grid container direction="column" justify="flex-end" alignItems="flex-start" className={!values.when ? classes.marginTopWhen : classes.noMarginTopWhen}>
          <Field
            component={DateTimePickerForm}
            name="when"
            className={classNames(width, fullWidth && classes.marginDatePicker)}
            label={values.when && <FormattedMessage {...messages.when} />}
          />
        </Grid>)}
      </Grid>
      
      <Grid item xs={12} lg={fullWidth ? 12 : 4}  >
        <Grid container direction="column" justify="flex-end" alignItems="flex-start" className={(!values.who || values.who && values.who[0] === undefined) ? classes.marginTop : classes.npMarginTop}>
          <Grid item>
            {values.who && values.who[0] && <label className={classes.labelEdit}> <FormattedMessage {...messages.who} /></label>}
          </Grid>
          <Grid item >
            <Field
              className={classNames(width, fullWidth && classes.marginWho)}
              component={MultiSelectUsers}
              name="who"
              type="select"
              placeholder={<FormattedMessage {...messages.who} />}
              isMulti
              defaultValue={propEq('what', 'none', values) ? [] : sendtoWhom}
              suggestion={adminsOrHeadHunters}
              textFieldProps={{
                InputLabelProps: {
                  shrink: true,
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
};

Todo.propTypes = {
  classes: PropTypes.object,
  adminsOrHeadHunters: PropTypes.array,
  width: PropTypes.string,
  fullWidth: PropTypes.bool,
  values: PropTypes.object,
  people: PropTypes.object,
  comment: PropTypes.object,
};

const mapStateToProps = () =>
  createStructuredSelector({
    adminsOrHeadHunters: getAdminsAndHeadHunters,
    people: getPeople,
  });

export const enhance = compose(
  withStyles(style),
  connect(
    mapStateToProps,
    null,
  ),
  withRoutes,
);
export default enhance(Todo);
