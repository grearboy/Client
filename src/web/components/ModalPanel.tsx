import React from 'react';
import styled, { css } from 'styled-components';

import './ModalPanel.scss';

const ModalPanelContainer = styled.div<{ maximize?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  max-width: 80vw;
  max-height: 80vh;

  ${(props) =>
    props.maximize &&
    css`
      width: 100vw;
      height: 100vh;
      max-width: 100vw;
      max-height: 100vh;
    `}
`;

const ModalPanelActionGroup = styled.div`
  position: absolute;
  top: 10px;
  right: 40px;
  line-height: 21px;
  height: auto;
  z-index: 1;

  .iconfont {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.2);
    font-size: 21px;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

/**
 * 基础模态框容器
 */
interface Props {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  actions?: React.ReactNode;
  children: React.ReactNode;
  allowMaximize?: boolean;
  padding?: number;
}
class ModalPanel extends React.PureComponent<Props> {
  state = {
    maximize: false,
  };

  /**
   * 最大化窗口
   */
  handleSwitchMaximize = () => {
    this.setState({ maximize: !this.state.maximize });
  };

  render() {
    const {
      className,
      title,
      style,
      children,
      actions,
      allowMaximize,
      padding,
    } = this.props;
    const { maximize } = this.state;

    return (
      <ModalPanelContainer
        className={'modal-panel ' + (className || '')}
        maximize={maximize}
        style={style}
      >
        {allowMaximize && (
          <ModalPanelActionGroup>
            <div onClick={this.handleSwitchMaximize}>
              {maximize ? (
                <i className="iconfont" title="最小化">
                  &#xe618;
                </i>
              ) : (
                <i className="iconfont" title="最大化">
                  &#xe60c;
                </i>
              )}
            </div>
          </ModalPanelActionGroup>
        )}

        <div className="head">
          <span>{title}</span>
        </div>
        <div className="body" style={{ padding }}>
          {children}
        </div>
        {actions ? <div className="foot">{actions}</div> : null}
      </ModalPanelContainer>
    );
  }
}

export default ModalPanel;
