import { Tabs } from 'antd';
import styled from 'styled-components';

/**
 * 分端式的Tab
 */
export const SectionTabs = styled(Tabs).attrs({
  type: 'card',
})`
  &.ant-tabs.ant-tabs-card .ant-tabs-nav {
    padding: 6px 10px;

    &::before {
      border: 0;
    }

    .ant-tabs-tab {
      background-color: transparent;
      border: 0;
      margin: 2px;
      color: ${(props) => props.theme.color.interactiveNormal};

      &.ant-tabs-tab-active,
      &:hover,
      &:active {
        border-radius: ${(props) => props.theme.radius.standard};
        background-color: ${(props) => props.theme.color.transparent90};

        .ant-tabs-tab-btn {
          color: ${(props) => props.theme.color.interactiveActive};
        }
      }
    }
  }
`;