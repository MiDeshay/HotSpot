import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import HomeContainer from './home/home_container';
import ProfileContainer from './profile/profile_container';
import EditProfileFormContainer from './profile/edit_profile_form_container';
import GroupShowContainer from './group/group_show_container';
import CreateGroupFormContainer from './group/group_form/create_group_form_container';
import EditGroupFormContainer from './group/group_form/edit_group_form_container';

const App = () => (
  <div className="app">
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/register" component={SignupFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <ProtectedRoute exact path={`/profile/:userId`} component={ProfileContainer} />
      <ProtectedRoute exact path="/profile/:userId/edit" component={EditProfileFormContainer} />
      <ProtectedRoute exact path="/groups/create" component={CreateGroupFormContainer} />
      <ProtectedRoute exact path="/groups/:groupName" component={GroupShowContainer} />
      <ProtectedRoute exact path="/groups/:groupName/edit" component={EditGroupFormContainer} />
      <ProtectedRoute exact path="/" component={MainPage} />
      <ProtectedRoute exact path="/home" component={HomeContainer} />
    </Switch>
  </div>
);

export default App;