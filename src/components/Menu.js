import React, { Component } from 'react'
import MenuButtonLink from '../containers/MenuButtonLink'
import OpenSubmenuLink from '../containers/OpenSubmenuLink'
import LoadSaveLink from '../containers/LoadSaveLink'
import DeleteSaveLink from '../containers/DeleteSaveLink'
import ChangeSettingLink from '../containers/ChangeSettingLink'
import { menuNames, menuButtons } from '../actions'
import '../styles/Menu.css';

class Menu extends Component {

  render(){
    var menu = false;

    if(menuNames.NEW_GAME===this.props.game.current.currentMenu && this.props.game.current.gameStart===false){
      menu = (
        <div id="main-menu">
          <div className="title">
            <h1>New Game</h1>
          </div>
          <div className="text">
            <p>The JavaScript Role Playing Game (JSRPG).</p>
          </div>
          <div className="submit">
            <MenuButtonLink buttonId={menuButtons.PLAY_FIRST_GAME}>Play</MenuButtonLink>
          </div>
        </div>
      )
    }

    else if(menuNames.MAIN_MENU === this.props.game.current.currentMenu){
      menu = (
        <div id="main-menu">
          <div className="title">
            <h1>JSRPG</h1>
          </div>
          <div className="text">
            <p>Main Menu.</p>
          </div>
          <div className="options">
            <OpenSubmenuLink buttonId={menuNames.SAVES_MENU}>Saves</OpenSubmenuLink>
            <OpenSubmenuLink buttonId={menuNames.SETTINGS_MENU}>Settings</OpenSubmenuLink>
            <MenuButtonLink buttonId={menuButtons.CLOSE_MAIN_MENU}>&lt; Back</MenuButtonLink>
          </div>
        </div>
      )
    }

    else if(menuNames.SAVES_MENU === this.props.game.current.currentMenu ){
      var gameSaves = this.props.game.saves;
      var gameSavesHTML = [];
      var saveDate = false;
      var dateText = false;
      var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      for(var gameSaveID in gameSaves){
        var gameSave = gameSaves[gameSaveID];
        saveDate = new Date(gameSave.date);
        dateText = saveDate.toLocaleDateString("en-US", dateOptions);
        gameSavesHTML.push(
          <div className="save" key={gameSave.gameObject.gameID}>
            <div className="small-1 medium-2">
              <h2>Game {gameSave.gameObject.gameID}</h2>
              <p>{dateText}</p>
            </div>
            <div className="small-1 medium-2">
              <div className="save-btn-wrap small-2 medium-1">
                <LoadSaveLink buttonId={gameSave.gameObject.gameID.toString()}>Load</LoadSaveLink>
              </div>
              <div className="save-btn-wrap small-2 medium-1">
                <DeleteSaveLink buttonId={gameSave.gameObject.gameID.toString()}>Delete</DeleteSaveLink>
              </div>
            </div>
          </div>
        )
      }
      menu = (
        <div id="main-menu">
          <div className="title">
            <h1>JSRPG Game Saves</h1>
          </div>
          <div className="text">
            <p>Manage your games saves.</p>
          </div>
          <div className="save-button">
            <MenuButtonLink buttonId={menuButtons.SAVE_THE_GAME}>Save Game {this.props.game.current.gameID}</MenuButtonLink>
          </div>
          <div className="game-saves">
            {gameSavesHTML}
          </div>
          <div className="back-button-wrap">
            <MenuButtonLink buttonId={menuButtons.PLAY_NEW_GAME}>New Game</MenuButtonLink>
            <OpenSubmenuLink buttonId={menuNames.MAIN_MENU}>&lt; Back</OpenSubmenuLink>
          </div>
        </div>
      )
    }

    else if(menuNames.SETTINGS_MENU === this.props.game.current.currentMenu ){
      var gameSettings = this.props.game.settings;
      var gameSettingsHTML = [];
      var i;
      for(var gameSettingsID in gameSettings){
        var gameSetting = gameSettings[gameSettingsID];
        var gameSettingOptionsHTML = [];
        for(i=0;i<gameSetting.options.length;i++){
          var option = gameSetting.options[i];
          var settingKey = gameSetting.name+'_'+option.value;
          var optionIsSelected = gameSetting.value===option.value ? 'selected-option' : '';
          gameSettingOptionsHTML.push(
            <div key={settingKey} className="setting-btn-wrap small-1 medium-2">
              <ChangeSettingLink buttonId={option.value} className={optionIsSelected}>{option.text}</ChangeSettingLink>
            </div>
          );
        }
        gameSettingsHTML.push(
          <div className="setting" key={gameSetting.name}>
            <h2>{gameSetting.text}</h2>
            {gameSettingOptionsHTML}
          </div>
        )
      }
      menu = (
        <div id="main-menu">
          <div className="title">
            <h1>JSRPG Game Settings</h1>
          </div>
          <div className="text">
            <p>Changing how you play the game.</p>
          </div>
          <div className="game-settings">
            {gameSettingsHTML}
          </div>
          <div className="back-button-wrap">
            <OpenSubmenuLink buttonId={menuNames.MAIN_MENU}>&lt; Back</OpenSubmenuLink>
          </div>
        </div>
      )
    }

    else if(menuNames.PICKUP_ITEMS_MENU === this.props.game.current.currentMenu ){
      var itemListHTML =[];
      menu = (
        <div id="main-menu">
          <div className="title">
            <h1>New Items!</h1>
          </div>
          <div className="text">
            <p>Grab what you need, leave the rest.</p>
          </div>
          <div className="game-settings">
            {itemListHTML}
          </div>
          <div className="back-button-wrap">
            <MenuButtonLink buttonId={menuButtons.CLOSE_MAIN_MENU}>&lt; Back</MenuButtonLink>
          </div>
        </div>
      )
    }

    return(
      <div id="menu">
        <div id="screen-wrap">
          <div id="screen">
            {menu}
          </div>
        </div>
      </div>
    )
  }
}

export default Menu
