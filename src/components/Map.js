import React, { Component } from 'react'
import Token from './map-tiles/Token.js';
import Chest from './map-tiles/Chest.js';
import Door from './map-tiles/Door.js';
import '../styles/Map.css';
import '../styles/Tiles.css';

class Map extends Component {
  resize = () => this.forceUpdate()
  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }
  render(){
    var character = this.props.game.current.character;
    var currentMap = this.props.game.current.maps[this.props.game.current.character.location.map];
    var mapTiles = [];
    var char_row_col = 'r'+character.location.row+'_c'+character.location.col;
    var min_tile_diameter = 11; // 16+1
    var max_tile_diameter = 99; // (16*3)+1
    var map_font_size = 50;
    var min_font_size = 24;
    var px_height = window.innerHeight-map_font_size;
    var px_width = window.innerWidth-map_font_size;

    var max_tile_rows = Math.floor(px_height/map_font_size);
    max_tile_rows = (max_tile_rows%2===0) ? max_tile_rows-1 : max_tile_rows;
    var max_tile_cols = Math.floor(px_width/map_font_size);
    max_tile_cols = (max_tile_cols%2===0) ? max_tile_cols-1 : max_tile_cols;
    if( max_tile_rows < min_tile_diameter || max_tile_cols < min_tile_diameter ){
      if( max_tile_rows < min_tile_diameter && max_tile_cols < min_tile_diameter){
        if(px_width===px_height){
          map_font_size = Math.floor(px_width/min_tile_diameter);
        }else if(px_width<px_height){
          map_font_size = Math.floor(px_width/min_tile_diameter);
        }else{
          map_font_size = Math.floor(px_height/min_tile_diameter);
        }
      }
      else if( max_tile_rows < min_tile_diameter ){
        map_font_size = Math.floor(px_height/min_tile_diameter);
      }
      else if( max_tile_cols < min_tile_diameter ){
        map_font_size = Math.floor(px_width/min_tile_diameter);
      }
      map_font_size = map_font_size<min_font_size ? min_font_size : map_font_size;
      max_tile_rows = Math.floor(px_height/map_font_size);
      max_tile_rows = (max_tile_rows%2===0) ? max_tile_rows-1 : max_tile_rows;
      max_tile_cols = Math.floor(px_width/map_font_size);
      max_tile_cols = (max_tile_cols%2===0) ? max_tile_cols-1 : max_tile_cols;
    }
    max_tile_rows = (max_tile_rows > max_tile_diameter)?max_tile_diameter:max_tile_rows;
    max_tile_cols = (max_tile_cols > max_tile_diameter)?max_tile_diameter:max_tile_cols;
    var rmin = (parseInt(character.location.row,10)-Math.floor(max_tile_rows/2));
    var rmax = (parseInt(character.location.row,10)+Math.floor(max_tile_rows/2));
    var cmin = (parseInt(character.location.col,10)-Math.floor(max_tile_cols/2));
    var cmax = (parseInt(character.location.col,10)+Math.floor(max_tile_cols/2));

    for(var r=rmin;r<=rmax;r++){
      var columns = [];
      for(var c=cmin;c<=cmax;c++){
        var key = 'r'+r+'_c'+c;
        var colKey = 'col_'+c;
        var tileClasses = '';

        var tileObjects = [];
        if(currentMap.tiles.hasOwnProperty(key)) {
          if(currentMap.tiles[key].hasOwnProperty('scenery')){
            var sceneryClasses = 'scenery '+currentMap.tiles[key].scenery.class;
            var sceneryKey = 'scn_r'+r+'_c'+c;
            tileObjects.push(<span className={sceneryClasses} key={sceneryKey} ><span></span></span>);
          }
          if(currentMap.tiles[key].hasOwnProperty('object')){
            var tileObject = currentMap.tiles[key].object;
            if(tileObject.hasOwnProperty('type') && tileObject.type==='chest'){
              tileObjects.push( <Chest key={tileObject.id} {...tileObject} /> );
            }else if(tileObject.hasOwnProperty('type') && tileObject.type==='door'){
              tileObjects.push( <Door key={tileObject.id} {...tileObject} /> );
            }else{
              var objectClasses = 'object '+currentMap.tiles[key].object.class;
              var objectKey = 'obj_r'+r+'_c'+c;
              tileObjects.push(<span className={objectClasses} key={objectKey} />);
            }
          }else if(currentMap.tiles[key].hasOwnProperty('items')){
            var itemKey = '';
            for(var i=0;i<currentMap.tiles[key].items.length;i++){
              var itemName = currentMap.tiles[key].items[i];
              if(itemName.indexOf('money_')===0){
                itemKey = 'money_r'+r+'_c'+c;
                tileObjects.push(<span className="money" key={itemKey} />);
              }else{
                itemKey = 'item_'+itemName;
                tileObjects.push(<span id={itemName} className="item" key={itemKey} />);
              }
            }
          }
        }

        if(key===char_row_col){
          tileObjects.push( <Token key="player" facing={character.location.facing} foot={character.location.foot} /> );
        }

        if(r<0||r>=currentMap.width||c<0||c>=currentMap.height){
          columns.push(<li className="column blank" key={colKey}>{tileObjects}</li>);
        }else if(currentMap.tiles.hasOwnProperty(key) && currentMap.tiles[key].hasOwnProperty('class')){
          tileClasses = "column tile "+currentMap.tiles[key].class;
          columns.push(<li className={tileClasses} key={colKey}>{tileObjects}</li>);
        }else{
          tileClasses = "column tile "+currentMap.defaultTile;
          columns.push(<li className={tileClasses} key={colKey}>{tileObjects}</li>);
        }

      }
      var rowKey = 'row_'+r;
      mapTiles.push(<ul className="row" key={rowKey}>{columns}</ul>)
    }

    return(
      <div id="map" className="map table"
        style={{
          fontSize: map_font_size+"px"
        }} >
        <div className="table-cell">
          <div className="tile-wrap">
            {mapTiles}
          </div>
        </div>
      </div>
    )
  }
}

export default Map
