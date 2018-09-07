export const controlButtons = {
  A: '_A',
  B: '_B',
  N: '_N',
  E: '_E',
  S: '_S',
  W: '_W',
  MENU_TOGGLE: 'MENU_TOGGLE'
}
export const keyCodes = {
  87:controlButtons.N,
  68:controlButtons.E,
  83:controlButtons.S,
  65:controlButtons.W,
  74:controlButtons.A,
  75:controlButtons.B,
  32:controlButtons.MENU_TOGGLE
}
export const menuButtons = {
  PLAY_FIRST_GAME: 'PLAY_FIRST_GAME',
  PLAY_NEW_GAME: 'PLAY_NEW_GAME',
  SAVE_THE_GAME: 'SAVE_THE_GAME',
  OPEN_MAIN_MENU: 'OPEN_MAIN_MENU',
  OPEN_SAVES_MENU: 'OPEN_SAVES_MENU',
  OPEN_SETTINGS_MENU: 'OPEN_SETTINGS_MENU',
  CLOSE_MAIN_MENU: 'CLOSE_MAIN_MENU',
}
export const menuNames = {
  NEW_GAME: 'NEW_GAME',
  MAIN_MENU: 'MAIN_MENU',
  SAVES_MENU: 'SAVES_MENU',
  SETTINGS_MENU:'SETTINGS_MENU',
  PICKUP_ITEMS_MENU : 'PICKUP_ITEMS_MENU'
}
export const firstGameObject = {
  'gameID':0,
  'gameStart':false,
  'menuOpen':true,
  'pickupItemsTile':false,
  'currentMenu':menuNames.NEW_GAME,
  'character':require('../json/character.json'),
  'maps':{
    'map1':require('../json/maps/map1.json'),
    'map2':require('../json/maps/map2.json')
  }
}


export const menuClick = buttonId => ({
  type: 'HANDLE_MENU_CLICK',
  buttonId
})
export const openSubmenu = menuId => ({
  type: 'HANDLE_OPEN_MENU',
  menuId
})
export const keyDown = key => ({
  type: 'HANDLE_KEY_PRESS',
  key
})
export const controlsClick = buttonId => ({
  type: 'HANDLE_CONTROLS_CLICK',
  buttonId
})
export const loadSaveClick = gameId => ({
  type: 'HANDLE_LOAD_SAVE',
  gameId
})
export const deleteSaveClick = gameId => ({
  type: 'HANDLE_DELETE_SAVE',
  gameId
})
export const changeSetting = option => ({
  type: 'HANDLE_CHANGE_SETTING',
  option
})
