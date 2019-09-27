import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { compose, propOr, pathOr, map, path, propEq, prop, isEmpty, isNil } from 'ramda';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FormattedMessage } from 'react-intl';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import messages from './messages';
import EditorConvertToHTML from '../../forms/EditorConvertToHtml';
import { UserAvatar } from '../../widgets/Avatar';
import withRoutes from '../../hoc/routes';
import { MEDIUM } from '../../widgets/ResumeStatus';
import Todo from '../Todo/index';
import { isTodoNone } from '../../../lib/models/todo';
import WhenFieldChanges from './WhenFieldChanges';

const style = theme => ({
  container: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  avatar: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
  },
  text: {
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: theme.spacing.unit * 2,
    height: 94,
  },
  toolbar: {
    borderColor: 'black',
  },
  width: {
    width: '96%'
  },
  divider: {
    marginBottom: '20px',
    width: '97%',
    marginLeft: '10px',
    marginTop: '-20px',
  },
  widthTodo: {
    width: 250,
  }
});

export const CommentsEditor = ({ classes, actions, comment, setEdit, user, routes }) => {
  const onSubmit = values => {
    if(comment._id){
      actions.updateComment({
        _id: prop('_id', values), 
        entityId: prop('entityId', values),
        entityType: prop('entityType', values),
        what: isTodoNone(values) ? null : prop('what', values),
        when: prop('when', values) ? prop('when', values) : null,
        who: isEmpty(prop('who',values)) ? [] : map(who => pathOr(who,['label', '_id'], who) , propOr([], 'who', values)),
        content: values.editorState && draftToHtml(convertToRaw(values.editorState.getCurrentContent())),
      });
      setEdit()
    }
    else {actions.addComment({
      entityId: prop('entityId', values),
      entityType: prop('entityType', values),
      what: isTodoNone(values) ? undefined : prop('what', values),
      when: prop('when', values),
      who: values.who ? map(path(['label', '_id']), prop('who', values)) : undefined,
      content: values.editorState && draftToHtml(convertToRaw(values.editorState.getCurrentContent())),
    })};
  };
  const validate = values => {
    const errors = {}; 
    if (!(values.editorState && (convertToRaw(values.editorState.getCurrentContent()).blocks[0].text).length) && !values.what) {
      errors.form = true;
    }
    if((propEq('what', 'forward', values) && (isNil(prop('who', values)) || isEmpty(prop('who', values))))) {
      errors.forward = true;
    }
    if(propEq('what', 'none', values) && (!(values.editorState && (convertToRaw(values.editorState.getCurrentContent()).blocks[0].text).length) )) {
      errors.none = true;
    }
    return errors;
   
  };
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        ...comment,
        editorState: comment._id && convertFromHTML(comment.content).contentBlocks != null
          ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(comment.content)))
          : EditorState.createEmpty(),

      }}
      render={({ handleSubmit, pristine, form, values, invalid }) => (
        <form
          onSubmit={event => {
            handleSubmit(event);
            form.change('editorState', EditorState.push(values.editorState, ContentState.createFromText('')));
          }}
        >
          <WhenFieldChanges 
            field="what"
            becomes="none"
            set="when"
            to={undefined}
          />
          <WhenFieldChanges 
            field="what"
            becomes="none"
            set="who"
            to={undefined}
          />

          <Grid container>
            <Grid item>
              <UserAvatar user={user} size={MEDIUM}
                to={user && routes.getPathByName('person', user._id)}
              />
            </Grid>
            <fieldset className={classes.width} >
              <legend> <FormattedMessage {...messages.commentaire} /> </legend>
              <Grid item xs>
                <Field
                  name="editorState"
                  component={EditorConvertToHTML}
                  wrapperClassName={classes.container}
                  editorClassName={classes.text}
                  toolbarClassName={classes.toolbar}
                  placeholder={<FormattedMessage {...messages.addComment} />}
                />
              </Grid>
              <Divider className={classes.divider} />
              <Todo width={classes.widthTodo} fullWidth={false} values={values} comment={comment} />
            </fieldset >
          </Grid>
          <Grid container justify="flex-end">
            {comment._id ? (
              <Button onClick={() => setEdit()} color="primary">
                <FormattedMessage {...messages.cancel} />
              </Button>
            ) : (
                <Button
                  onClick={() =>
                    form.change('editorState', EditorState.push(values.editorState, ContentState.createFromText('')))
                  }
                  disabled={pristine || invalid}
                  color="primary"
                >
                  <FormattedMessage {...messages.discard} />
                </Button>
              )}
            {comment.entityId && (
              <Button type="submit" disabled={pristine || invalid} color="primary">
                {comment._id ? <FormattedMessage {...messages.edit} /> : <FormattedMessage {...messages.comment} />}
              </Button>
            )}
          </Grid>
        </form>
      )}
    />
  );
};

CommentsEditor.propTypes = {
  classes: PropTypes.object,
  actions: PropTypes.object,
  comment: PropTypes.object,
  content: PropTypes.string,
  user: PropTypes.object,
  setEdit: PropTypes.func,
  routes: PropTypes.object,
};

export const enhance = compose(
  withStyles(style),
  withRoutes,
);
export default enhance(CommentsEditor);
