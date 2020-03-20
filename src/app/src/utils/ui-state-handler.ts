/**
 * 这是一个全局UI管理处理器
 * 用于生成将redux的状态转化为UI
 */

import TAlert from '../components/TApi/TAlert';
import { hideAlert, hideModal } from '@src/shared/redux/actions/ui';
import { Toast, Portal } from '@ant-design/react-native';
import TModal from '../components/TApi/TModal';
import { TRPGDispatch } from '@src/shared/redux/types/__all__';
import _last from 'lodash/last';

type UIMap = { [name: string]: any };
interface FactoryOptions {
  onEnabled?: (currentUIState: UIMap, dispatch: TRPGDispatch) => void;
  onDisabled?: (currentUIState: UIMap, dispatch: TRPGDispatch) => void;
}

/**
 * 生成监听state ui状态变化的函数
 * @param variable 监听的变量
 * @param option 配置
 */
export const uiStateSwitchFactory = (
  variable: string,
  option: FactoryOptions
) => {
  return (prevUI: UIMap, currentUI: UIMap, dispatch: TRPGDispatch) => {
    if (prevUI[variable] === false && currentUI[variable] === true) {
      // UI打开
      option.onEnabled && option.onEnabled(currentUI, dispatch);
    }

    if (prevUI[variable] === true && currentUI[variable] === false) {
      // UI关闭
      option.onDisabled && option.onDisabled(currentUI, dispatch);
    }
  };
};

/**
 * Alert处理
 */
export const alertHandler = uiStateSwitchFactory('showAlert', {
  onEnabled: (currentUI, dispatch) => {
    TAlert.show(currentUI.showAlertInfo, {
      onRequestClose: () => dispatch(hideAlert()),
    });
  },
  onDisabled: () => {
    TAlert.hide();
  },
});

/**
 * Toast 处理
 */
let currentToastKey: number = 0;
export const toastHandler = uiStateSwitchFactory('showToast', {
  onEnabled: (currentUI) => {
    if (currentToastKey > 0) {
      // 如果已存在Toast, 先把之前的移除
      Portal.remove(currentToastKey);
    }
    currentToastKey = Toast.show(currentUI.showToastText, 0);
  },
  onDisabled: () => {
    Portal.remove(currentToastKey);
    currentToastKey = 0;
  },
});

/**
 * Modal 处理
 */
export const modalHandler = (
  prevUI: UIMap,
  currentUI: UIMap,
  dispatch: TRPGDispatch
) => {
  if (currentUI['modalStack'].length > prevUI['modalStack'].length) {
    // 增加了modalStack
    const body = _last(currentUI.modalStack);
    if (body) {
      TModal.show(body, { onRequestClose: () => dispatch(hideModal()) });
    }
  } else if (currentUI['modalStack'].length < prevUI['modalStack'].length) {
    // 减少了modalStack
    TModal.hide();
  }
};

export const uiHandlerCollection = [alertHandler, toastHandler, modalHandler];
