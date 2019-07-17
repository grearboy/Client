// 手动进行配置设置
// require('../../config/project.config').platform = 'app';
require('moment/locale/zh-cn');
require('moment').locale('zh_CN');
require('../shared/utils/common');

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import _get from 'lodash/get';
import projectConfig from '../../config/project.config';

// Sentry
import Config from 'config';
const dsn = _get(Config, 'sentry.dsn');
if (dsn && projectConfig.environment === 'production') {
  import('react-native-sentry')
    .then((module) => module.Sentry)
    .then((Sentry) => {
      Sentry.config(dsn).install();
    });
}

YellowBox.ignoreWarnings([
  'Require cycle:', // Metro warning, Specific for Sentry
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?', // for socket.io-client
]);

AppRegistry.registerComponent('trpg', () => App);