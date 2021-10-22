var TileSize=40
var TilesResaltadas=[]




class Tile {
    constructor(x, y, rgba) {
        this.x=x
        this.y=y
        this.rgba=rgba
    }
    resaltarTile(){
        fill('rgba('+this.rgba[0]+','+this.rgba[1]+','+this.rgba[2]+', '+this.rgba[3]+')');
        rect(this.x*TileSize, this.y*TileSize, TileSize, TileSize);
    }
}


function drawGrid(){
    for (var x = 0; x < width; x += TileSize) {
		for (var y = 0; y < height; y += TileSize) {
			stroke(0);
			strokeWeight(TileSize/2000);
			line(x, 0, x, height);
			line(0, y, width, y);
    }
  }
}