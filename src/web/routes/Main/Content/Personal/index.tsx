import React from 'react';
import { TMemo } from '@shared/components/TMemo';
import styled from 'styled-components';
import { useConverses } from '@redux/hooks/chat';
import { SidebarItem } from '../SidebarItem';
import { UserOutlined } from '@ant-design/icons';
import { Switch, Route, Redirect } from 'react-router-dom';
import { FriendPanel } from './FriendPanel';
import { SectionHeader } from '@web/components/SectionHeader';
import { UserConversePanel } from './UserConversePanel';
import {
  ContentContainer,
  Sidebar,
  ContentDetail,
  SidebarHeaderText,
  SidebarItemsContainer,
} from '../style';

export const Personal: React.FC = TMemo((props) => {
  const converses = useConverses(['user']);

  return (
    <ContentContainer>
      <Sidebar>
        <SectionHeader />
        <SidebarItemsContainer>
          <SidebarItem
            icon={<UserOutlined style={{ color: 'white', fontSize: 24 }} />}
            name="好友"
            to="/main/personal/friends"
          />
          <SidebarHeaderText>私信</SidebarHeaderText>
          <div>
            {converses.map((converse) => {
              return (
                <SidebarItem
                  key={converse.uuid}
                  icon={converse.icon}
                  name={converse.name}
                  to={`/main/personal/${converse.uuid}`}
                />
              );
            })}
          </div>
        </SidebarItemsContainer>
      </Sidebar>
      <ContentDetail>
        <Switch>
          <Route path="/main/personal/friends" component={FriendPanel} />
          <Route
            path="/main/personal/:converseUUID"
            component={UserConversePanel}
          />
          <Redirect to="/main/personal/friends" />
        </Switch>
      </ContentDetail>
    </ContentContainer>
  );
});
Personal.displayName = 'Personal';
