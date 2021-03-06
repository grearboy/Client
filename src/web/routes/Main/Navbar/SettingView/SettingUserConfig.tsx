import React, { useCallback } from 'react';
import { TMemo } from '@shared/components/TMemo';
import { Select, Switch } from 'antd';
import {
  useTRPGDispatch,
  useTRPGSelector,
} from '@shared/hooks/useTRPGSelector';
import { FullModalField } from '@web/components/FullModalField';
import { useTranslation } from '@shared/i18n';
import { setUserSettings } from '@redux/actions/settings';
import { MsgStyleType } from '@shared/types/chat';
import { MessageItem } from '@shared/components/message/MessageItem';
import styled from 'styled-components';
import { MsgPayload } from '@redux/types/chat';
import { useCurrentUserUUID } from '@redux/hooks/user';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

const MsgPreviewViewContainer = styled.div`
  max-width: 360px;
  border-radius: ${({ theme }) => theme.radius.card};
  border: ${({ theme }) => theme.border.standard};
  padding: 10px;
`;

function buildMsgPayload(payload: Partial<MsgPayload>): MsgPayload {
  return {
    type: 'normal',
    uuid: '',
    sender_uuid: '',
    message: '',
    is_public: false,
    is_group: false,
    date: new Date().toISOString(),
    revoke: false,
    ...payload,
  };
}

const MsgPreviewView: React.FC = TMemo(() => {
  const sender_uuid = useCurrentUserUUID();
  const msgStyleCombine = useTRPGSelector(
    (state) => state.settings.user.msgStyleCombine ?? false
  );

  return (
    <MsgPreviewViewContainer>
      <MessageItem
        data={buildMsgPayload({
          sender_uuid: 'trpgbot',
          message: '欢迎使用',
          data: {
            name: '测试用户',
          },
        })}
        emphasizeTime={true}
      />
      <MessageItem
        data={buildMsgPayload({
          sender_uuid: 'trpgbot',
          message: 'TRPG Engine',
          data: {
            name: '测试用户',
          },
        })}
        emphasizeTime={false}
        omitSenderInfo={msgStyleCombine}
      />
      <MessageItem
        data={buildMsgPayload({
          sender_uuid,
          message: '专为跑团而生',
        })}
        emphasizeTime={false}
      />
    </MsgPreviewViewContainer>
  );
});
MsgPreviewView.displayName = 'MsgPreviewView';

/**
 * 个人设置
 */
export const SettingUserConfig: React.FC = TMemo(() => {
  const userSettings = useTRPGSelector((state) => state.settings.user);
  const { t } = useTranslation();
  const dispatch = useTRPGDispatch();

  const handleSetMsgType = useCallback((value: MsgStyleType) => {
    dispatch(setUserSettings({ msgStyleType: value }));
  }, []);

  const handleSetMsgCombine = useCallback((checked: boolean) => {
    dispatch(setUserSettings({ msgStyleCombine: checked }));
  }, []);

  return (
    <div>
      <FullModalField
        title={t('消息类型')}
        content={
          <Select value={userSettings.msgStyleType} onChange={handleSetMsgType}>
            <Select.Option value="bubble">{t('气泡模式')}</Select.Option>
            <Select.Option value="compact">{t('紧凑模式')}</Select.Option>
          </Select>
        }
      />
      <FullModalField
        title={t('合并消息')}
        content={
          <Switch
            checked={Boolean(userSettings.msgStyleCombine)}
            onChange={handleSetMsgCombine}
          />
        }
      />

      <MsgPreviewView />
    </div>
  );
});
SettingUserConfig.displayName = 'SettingUserConfig';
