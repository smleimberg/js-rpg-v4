import React, { Component } from 'react'
import { connect } from 'react-redux'
import ControlsLink from '../containers/ControlsLink.js'
import Map from './Map.js'
import Controls from './Controls.js'
import Menu from './Menu.js'
import { keyCodes, keyDown, controlButtons  } from '../actions'
import '../styles/App.css'

class App extends Component {
  constructor(){
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress(event) {
    if(keyCodes.hasOwnProperty(event.keyCode)){
      this.props.keyDown(event);
    }
  }
  componentDidMount() {
     document.addEventListener('keydown', this.handleKeyPress);
  }
  render() {
    var appClasses = this.props.game.current.menuOpen ? 'menu-open ' : 'menu-closed ';
    appClasses += this.props.game.settings.input.value==='CONTROLS_KEYBOARD'? 'hide-controls ': '';
    var MenuToggleButton = this.props.game.current.gameStart ? (<ControlsLink buttonId={controlButtons.MENU_TOGGLE} className={controlButtons.MENU_TOGGLE}><span id="hamburger"><span></span></span></ControlsLink>) : '';
    var screenSettings = this.props.game.settings.screen;
    if(screenSettings.value==="WINDOW_SIZE_FS"){
      var docElm = document.documentElement;
      if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
      } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
      } else if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
      }
    }else{
      if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      } else if (document.exitFullscreen) {
          document.exitFullscreen();
      }
    }
    return (
      <div id="app" className={appClasses}>
        <Map game={this.props.game}/>
        <Controls />
        <Menu game={this.props.game} />
        {MenuToggleButton}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {keyDown})(App)
