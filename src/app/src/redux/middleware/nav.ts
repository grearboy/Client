import { getGlobalNavigation } from '@app/navigate/global';
import _isNil from 'lodash/isNil';
import { NavigationActions, StackActions } from 'react-navigation';
import { TRPGMiddleware } from '@redux/types/__all__';
import constants from '@shared/redux/constants';
const {
  LOGIN_SUCCESS,
  LOGIN_TOKEN_SUCCESS,
  LOGOUT,
  CREATE_GROUP_SUCCESS,
} = constants;

/**
 * 一个自动导航器用于监听redux的变更
 */
export const appNavMiddleware: TRPGMiddleware = ({ dispatch, getState }) => (
  next
) => (action) => {
  const globalNavigation = getGlobalNavigation();

  if (!_isNil(globalNavigation)) {
    const rootState = globalNavigation.getRootState();
    switch (action.type) {
      case LOGIN_SUCCESS:
      case LOGIN_TOKEN_SUCCESS:
        if (rootState.index > 0 && rootState.routeNames[0] !== 'Main') {
          globalNavigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Main' })],
            })
          );
        }

        break;
      case LOGOUT:
        if (rootState.index > 0 && rootState.routeNames[0] !== 'Login') {
          globalNavigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Login' })],
            })
          );
        }
        break;
      case CREATE_GROUP_SUCCESS:
        if (globalNavigation.canGoBack()) {
          globalNavigation.dispatch(StackActions.popToTop({}));
        }
        break;
      default:
        break;
    }
  }

  next(action);
};
