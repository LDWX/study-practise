import React from 'react';

import './index.scss';

interface Props {
  /**
   * 返回上一页面点击事件
   */
  onNavigateBack?: () => void;
  /**
   * 导航栏标题
   */
  title?: string;
  /**
   * (default: 20px) 状态栏高度
   */
  statusBarHeight?: number;
  /**
   * (default: iOS 44px, Android 48px) 导航栏高度
   */
  height?: number;
  /**
   * (default: #fff) 导航栏背景颜色，如 #000000
   */
  backgroundColor?: string;
  /**
   * (default: black) 导航栏标题颜色
   */
  textColor?: string;
  /**
   * (default: 17px) 导航栏标题字体大小
   */
  fontSize?: number;
  /**
   * (default: bold) 导航栏标题字重
   */
  fontWeight?: number | 'normal' | 'bold' | 'bolder' | 'lighter';
  /**
   * (default: #000000) 前景颜色值，包括按钮、状态栏的颜色，仅支持 #ffffff 和 #000000
   */
  navigationBarTextStyle?: '#ffffff' | '#000000';
}

let isAndroid = false;
if (typeof navigator !== 'undefined') {
  isAndroid = navigator.userAgent.indexOf('Android') > -1;
}
const statusBarHeight = isAndroid ? 25 : 20;
const navHeight = isAndroid ? 48 : 44;

export default class NavBar extends React.PureComponent<Props> {
  static defaultProps: Props = {
    onNavigateBack: () => {},
    title: '',
    statusBarHeight: statusBarHeight,
    height: navHeight,
    backgroundColor: '#fff',
    textColor: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    navigationBarTextStyle: '#000000',
  };

  constructor(props: Props | Readonly<Props>) {
    super(props);
  }

  handleNavigateBack = () => {
    const { onNavigateBack } = this.props;

    onNavigateBack && onNavigateBack();
  };

  render() {
    const {
      title,
      statusBarHeight,
      height,
      backgroundColor,
      textColor,
      fontSize,
      fontWeight,
      navigationBarTextStyle,
    } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <div
          className="navigation"
          style={{
            backgroundColor,
            paddingTop: statusBarHeight,
          }}
        >
          <div
            className="navigation__bar"
            style={{
              height,
              lineHeight: height + 'px',
            }}
          >
            <div
              className="navigation__bar__left"
              style={{ height }}
              onClick={this.handleNavigateBack}
            >
              <div
                className="navigation__bar__left__back-btn__iocn"
                style={{
                  backgroundColor: navigationBarTextStyle,
                }}
              />
            </div>
            <div className="navigation__bar__center">
              <span
                className="navigation__bar__center__title"
                style={{
                  color: textColor,
                  fontSize,
                  fontWeight,
                }}
              >
                {title}
              </span>
            </div>
            <div className="navigation__bar__right" style={{ height }} />
          </div>
        </div>
        {/* 占位 */}
        <div
          style={{
            height,
            paddingTop: statusBarHeight,
          }}
        />
      </div>
    );
  }
}
