import { keyCodes, menuButtons, menuNames, controlButtons, firstGameObject } from '../actions'

const game = (state = [], action) => {

  var savesKeys = false;

  if("HANDLE_KEY_PRESS" === action.type  || "HANDLE_CONTROLS_CLICK" === action.type){

    var actionButton = '';
    var currentMap = state.current.maps[state.current.character.location.map];
    var character = state.current.character;
    var current_tile = 'r'+character.location.row+'_c'+character.location.col;
    var new_row = parseInt(character.location.row,10);
    var new_col = parseInt(character.location.col,10);
    var new_tile = 'r'+new_row+'_c'+new_col;
    var tileObject = false;
    var canStep = true;

    if("HANDLE_KEY_PRESS"===action.type){
      if(keyCodes.hasOwnProperty(action.key.keyCode)){
        actionButton = keyCodes[action.key.keyCode];
      }else{
        return state;
      }
    }

    else if("HANDLE_CONTROLS_CLICK"===action.type){
      actionButton = action.buttonId;
    }

    if(controlButtons.MENU_TOGGLE===actionButton){
      if(state.current.gameStart !== false){
        return Object.assign({},state, {
          ...state,
          'current':{
            ...state.current,
            'menuOpen':!state.current.menuOpen,
            'currentMenu':menuNames.MAIN_MENU
          }
        });
      }
    }

    else if(controlButtons.A===actionButton||controlButtons.B===actionButton){
      switch (state.current.character.location.facing) {
        case controlButtons.N: new_row = new_row-1; break;
        case controlButtons.E: new_col = new_col+1; break;
        case controlButtons.S: new_row = new_row+1; break;
        case controlButtons.W: new_col = new_col-1; break;
        default: break;
      }
      new_tile = 'r'+new_row+'_c'+new_col;

      if( currentMap.tiles.hasOwnProperty(new_tile) && currentMap.tiles[new_tile].hasOwnProperty('object') ){
        tileObject = currentMap.tiles[new_tile].object;
        if(controlButtons.A===actionButton){
          if( tileObject.type==='chest' || tileObject.type==='door' ){
            tileObject.isOpen = !tileObject.isOpen;
            var newState = false;
            if( tileObject.isOpen && tileObject.type==='chest' ){
              newState = Object.assign({},state, {
                ...state,
                'current':{
                  ...state.current,
                  'currentMenu':menuNames.PICKUP_ITEMS_MENU,
                  'menuOpen':true,
                  'pickupItemsTile':new_tile,
                  'maps':{
                    ...state.current.maps,
                    [state.current.character.location.map]:{
                      ...state.current.maps[state.current.character.location.map],
                      'tiles':{
                        ...state.current.maps[state.current.character.location.map].tiles,
                        [new_tile]:{
                          ...state.current.maps[state.current.character.location.map].tiles[new_tile],
                          'object':{
                            ...tileObject
                          }
                        }
                      }
                    }
                  }
                }
              });

            }else{
              newState = Object.assign({},state, {
                ...state,
                'current':{
                  ...state.current,
                  'maps':{
                    ...state.current.maps,
                    [state.current.character.location.map]:{
                      ...state.current.maps[state.current.character.location.map],
                      'tiles':{
                        ...state.current.maps[state.current.character.location.map].tiles,
                        [new_tile]:{
                          ...state.current.maps[state.current.character.location.map].tiles[new_tile],
                          'object':{
                            ...tileObject
                          }
                        }
                      }
                    }
                  }
                }
              });
            }
            return newState;
          }
        }
      }

    }

    else if(controlButtons.N===actionButton||controlButtons.E===actionButton||controlButtons.S===actionButton||controlButtons.W===actionButton){

      switch (actionButton) {
        case controlButtons.N: new_row = new_row-1; break;
        case controlButtons.E: new_col = new_col+1; break;
        case controlButtons.S: new_row = new_row+1; break;
        case controlButtons.W: new_col = new_col-1; break;
        default: break;
      }
      new_tile = 'r'+new_row+'_c'+new_col;

      if( currentMap.tiles.hasOwnProperty(current_tile) && currentMap.tiles[current_tile].hasOwnProperty('object') ){
        tileObject = currentMap.tiles[current_tile].object;
        if( tileObject.type==='portal' && tileObject.direction===actionButton){
          return Object.assign({},state, {
            ...state,
            'current':{
              ...state.current,
              'character':{
                ...state.current.character,
                'location':{
                  ...state.current.character.location,
                  'facing':"_S",
                  'map':tileObject.map,
                  'row':tileObject.row,
                  'col':tileObject.col
                }
              }
            }
          });
        }
      }

      if( currentMap.tiles.hasOwnProperty(new_tile) && currentMap.tiles[new_tile].hasOwnProperty('object') ){

        tileObject = currentMap.tiles[new_tile].object;
        if( tileObject.type==='portal' && tileObject.direction==='_C'){
          return Object.assign({},state, {
            ...state,
            'current':{
              ...state.current,
              'character':{
                ...state.current.character,
                'location':{
                  ...state.current.character.location,
                  'facing':"_S",
                  'map':tileObject.map,
                  'row':tileObject.row,
                  'col':tileObject.col
                }
              }
            }
          });
        }

        else if( tileObject.type==='chest' ){
          canStep = false;
        }

        else if( tileObject.type==='door' ){
          if(!tileObject.isOpen){
            canStep = false;
          }
        }

      }

      if( currentMap.tiles.hasOwnProperty(new_tile) && currentMap.tiles[new_tile].hasOwnProperty('scenery') ){
          canStep = false;
      }

      if( canStep && new_row>=0 && new_row<currentMap.height && new_col>=0 && new_col<currentMap.width ){
        return Object.assign({},state, {
          ...state,
          'current':{
            ...state.current,
            'character':{
              ...state.current.character,
              'location':{
                ...state.current.character.location,
                'facing':actionButton,
                'row':new_row,
                'col':new_col
              }
            }
          }
        });
      }else{
        return Object.assign({},state, {
          ...state,
          'current':{
            ...state.current,
            'character':{
              ...state.current.character,
              'location':{
                ...state.current.character.location,
                'facing':actionButton
              }
            }
          }
        });
      }


    }
  }

  else if("HANDLE_MENU_CLICK"===action.type){

    switch (action.buttonId) {

      case menuButtons.SAVE_THE_GAME:
        var gameData = Object.assign({},state, {
          'current':{
            ...state.current
          },
          'saves':{
            ...state.saves,
            [state.current.gameID]:{
              'date':Date.now(),
              'gameObject':state.current
            }
          }
        });
        localStorage.setItem('jsrpg', JSON.stringify(gameData));
        return gameData;

      case menuButtons.PLAY_FIRST_GAME:
        return Object.assign({},state, {
          ...state,
          'current':{
            ...state.current,
            'gameStart': true,
            'menuOpen':false,
            'currentMenu': menuNames.MAIN_MENU
          }
        });

      case menuButtons.PLAY_NEW_GAME:
        savesKeys = Object.keys(state.saves);
        var gameSaveID = 0;
        if(savesKeys.length>0){
          gameSaveID = savesKeys[savesKeys.length-1];
          gameSaveID++;
        }
        return Object.assign({},state, {
          ...state,
          'current':{
            ...firstGameObject,
            'gameID':gameSaveID,
            'gameStart':true,
            'menuOpen':false,
            'currentMenu':menuNames.MAIN_MENU
          }
        });

      case menuButtons.CLOSE_MAIN_MENU:
        return Object.assign({},state, {
          ...state,
          'current':{
            ...state.current,
            'currentMenu': menuNames.MAIN_MENU,
            'menuOpen':false
          }
        });

      default: break;
    }

  }

  else if("HANDLE_OPEN_MENU"===action.type){
    return Object.assign({},state, {
      ...state,
      'current':{
        ...state.current,
        'currentMenu': action.menuId
      }
    });
  }

  else if("HANDLE_LOAD_SAVE"===action.type){
    var gameObject = state.saves[action.gameId].gameObject;
    gameObject.menuOpen = false;
    return Object.assign({},state, {
      ...state,
      'current':gameObject
    });
  }

  else if("HANDLE_DELETE_SAVE"===action.type){
    delete state.saves[action.gameId];
    savesKeys = Object.keys(state.saves);
    if(savesKeys.length>0){
      localStorage.setItem('jsrpg', JSON.stringify(state));
    }else{
      localStorage.removeItem('jsrpg');
      window.location.reload();
    }
    return Object.assign({},state);
  }

  else if("HANDLE_CHANGE_SETTING"===action.type){
    switch (action.option) {
      case 'WINDOW_SIZE_NORMAL':
      case 'WINDOW_SIZE_FS':
        return Object.assign({},state,{
          ...state,
          'settings':{
            ...state.settings,
            'screen':{
              ...state.settings.screen,
              'value':action.option
            }
          }
        });
      case 'CONTROLS_ON_SCREEN':
      case 'CONTROLS_KEYBOARD':
      return Object.assign({},state,{
        ...state,
        'settings':{
          ...state.settings,
          'input':{
            ...state.settings.input,
            'value':action.option
          }
        }
      });
      default: break;
    }
  }

  return state;
};

export default game;
