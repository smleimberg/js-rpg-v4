import React from 'react'
import ControlsLink from '../containers/ControlsLink'
import { controlButtons } from '../actions'
import '../styles/Controls.css';

const Controls = () => (
  <div id="controls" className="controls">
    <div id="dpad">
      <ControlsLink buttonId={controlButtons.N} className={controlButtons.N}>w</ControlsLink>
      <ControlsLink buttonId={controlButtons.E} className={controlButtons.E}>d</ControlsLink>
      <ControlsLink buttonId={controlButtons.S} className={controlButtons.S}>s</ControlsLink>
      <ControlsLink buttonId={controlButtons.W} className={controlButtons.W}>a</ControlsLink>
    </div>
    <div id="buttons">
      <ControlsLink buttonId={controlButtons.A} className={controlButtons.A}>j</ControlsLink>
      <ControlsLink buttonId={controlButtons.B} className={controlButtons.B}>k</ControlsLink>
    </div>
  </div>
)

export default Controls
