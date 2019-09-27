import React from 'react';
import PropTypes from 'prop-types';
import { parsePhoneNumber } from 'libphonenumber-js';
import Button from '@material-ui/core/Button/Button';
import Container from './Container';
import ArrowBack from './ArrowBack';
import Menu from './Menu';
import MenuUserList from './MenuList';
import UserName from './Name';
import Spacer from './Spacer';
import Content from './Content';
import GridWidget from './Grid';
import ResumeIcon from './ResumeIcon';
import ChipStatus from './ChipStatus';
import ResumeStatus from './ResumeStatus';
import EditIconButton from './EditIcon';
import ConfirmNavigation from './ConfirmNavigation';
import RegisterTermsDialog from './RegisterTermsDialog';
import ConfirmDeleting from './ConfirmDeleting';
import ConfirmCreateEditSkill from './ConfirmCreateEditSkill';
import ConfirmDeletingSkill from './ConfirmDeletingSkill';
import LoadResume from './LoadResume';
import RoleChip from './RoleChip';
import SkillsChip from './SkillsChip';
import FilterMenu from './FilterMenu';
import FlagIcon from '../components/FlagIcon';

export {
  LoadResume,
  Container,
  ArrowBack,
  Menu,
  MenuUserList,
  UserName,
  Spacer,
  Content,
  GridWidget,
  ResumeIcon,
  ChipStatus,
  ResumeStatus,
  EditIconButton,
  ConfirmNavigation,
  ConfirmDeleting,
  ConfirmDeletingSkill,
  ConfirmCreateEditSkill,
  RegisterTermsDialog,
  RoleChip,
  SkillsChip,
  FilterMenu,
};


export const MailTo = ({ person }) => {
  if (!person) return null;
  return <a href={`mailto:${person.email}`}>{person.email}</a>;
};

MailTo.propTypes = {
  person: PropTypes.object,
};

const DEFAULT_COUNTRY = 'FR';
export const TelTo = ({ person, action }) => {
  const style = {
    minWidth: 30,
    minHeight: 20,
    padding: 0
  };
  const props = { style };
  if (!person || !person.phoneNumber) return null;
  const phoneNumber = parsePhoneNumber(person.phoneNumber, DEFAULT_COUNTRY);
  return (
    <React.Fragment>
      <Button
        {...props}
        onClick={() => {
          action(phoneNumber.country);
        }}>
        <FlagIcon code={phoneNumber.country.toLowerCase()}
        />

      </Button>
      {` ${phoneNumber.format('NATIONAL')}`}
    </React.Fragment>
  );
};

TelTo.propTypes = {
  person: PropTypes.object,
  action: PropTypes.func,
};
