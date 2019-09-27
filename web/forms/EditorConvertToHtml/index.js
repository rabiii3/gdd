import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorForm = ({ input: { value, onChange, ...restInput }, ...rest }) => (
    <Editor
      {...rest}
      editorState={value}
      onEditorStateChange={onChange}
      toolbar={{
        options: ['inline', 'blockType', 'list', 'emoji'],
        inline: {
          options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
        },
        list: {
          options: ['unordered', 'ordered', 'indent', 'outdent'],
        },
      }}
      inputProps={restInput}
    />
  )

EditorForm.propTypes = {
  input: PropTypes.object,
};

export default EditorForm;
