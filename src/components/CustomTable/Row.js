import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Row extends PureComponent {
  static propTypes = {
    rowComponent: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
      PropTypes.object,
    ]).isRequired,
  };

  render() {
    const { ...props } = this.props;
    const C = this.props.rowComponent;

    return <C {...props} />;
  }
}

export default Row;
