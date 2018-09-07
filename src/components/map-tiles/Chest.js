import React, { Component } from 'react';

class Chest extends Component {
  render() {
    var chestClasses = "chest";
    chestClasses += this.props.isOpen ? ' is-open' : '';
    chestClasses += this.props.facing ? ' facing'+this.props.facing : '';
    return (
      <span id={this.props.id} className={chestClasses}>
        <span className="body">
          <span className="hole"></span>
          <span className="face"></span>
        </span>
        <span className="lid">
          <span className="top"></span>
          <span className="face"></span>
          <span className="hole"></span>
          <span className="lock"></span>
        </span>
      </span>
    );
  }
}

export default Chest;
