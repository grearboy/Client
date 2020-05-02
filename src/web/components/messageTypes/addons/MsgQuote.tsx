import React from 'react';
import { ReplyMsgType } from '@shared/utils/msg-helper';
import { useUserName } from '@redux/hooks/useUser';
import { TMemo } from '@shared/components/TMemo';
import styled from 'styled-components';

const Container = styled.div`
  color: ${(props) => props.theme.color['dove-gray']};
  border-left: 3px solid ${(props) => props.theme.color['dusty-gray']};
  padding: 2px 4px;
  margin: 3px 0;
  font-size: 10px;
`;

/**
 * 用于显示消息回复的消息的内容
 */

interface Props {
  replyMsg: ReplyMsgType;
}
export const MsgQuote: React.FC<Props> = TMemo((props) => {
  const { replyMsg } = props;
  const { uuid, message, sender_uuid } = replyMsg;
  const senderUserName = useUserName(sender_uuid);

  return (
    <Container>
      <div>{senderUserName}:</div>
      <div>{message}</div>
    </Container>
  );
});
MsgQuote.displayName = 'MsgQuote';