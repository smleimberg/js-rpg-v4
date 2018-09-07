import React, { Component } from 'react';

class Door extends Component {
  render() {
    var doorClasses = "door";
    doorClasses += this.props.isOpen ? ' is-open' : '';
    doorClasses += this.props.facing ? ' facing'+this.props.facing : '';
    return (
      <span id={this.props.id} className={doorClasses}>
        <span className="handle"></span>
      </span>
    );
  }
}

export default Door;
