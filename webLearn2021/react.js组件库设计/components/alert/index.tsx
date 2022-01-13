import React, { FC } from 'react';
import t from 'prop-types';

const kinds = {
  info: '#5352ED',
  positive: '#2ED573',
  negative: '#FF4757',
  warning: '#FFA502',
};

interface Props {
  /**
   * 提示类型
   */
  kind: 'info' | 'positive' | 'negative' | 'warning';
}

const Alert: FC<Props> = ({ children, kind, ...rest }) => (
  <div
    style={{
      padding: 20,
      borderRadius: 3,
      color: 'white',
      background: kinds[kind],
    }}
    {...rest}
  >
    {children}
  </div>
);

Alert.propTypes = {
  /**
   * The kind prop is used to set the alert's background color
   */
  kind: t.oneOf(['info', 'positive', 'negative', 'warning']),
};

Alert.defaultProps = {
  kind: 'info',
};

export default Alert;
