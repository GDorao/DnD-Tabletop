var triangle_cone
var Barrera=[[-1,-1]]

function cono(x,y,r,angle){
    x+=0.5//ajuste a centro de tile
    y+=0.5
    if(angle == 180){angle=179.8}//angulo truco
    let centerx=x*TileSize
    let centery=y*TileSize
    let radius=r*TileSize/5
    r=r/5

    angleToMouse=atan2(mouseY-centery, mouseX-centerx) 
    //console.log(angleToMouse*180/PI)

    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,200,0,0.05)"
    ctx.moveTo(centerx,centery);
    let arcsector = Math.PI * (2 * 0.25 *angle/90);
/*     let m=tan(-angleToMouse)
    let m2=-tan(-angleToMouse-angle/2*PI/180)
    let m3=-tan(-angleToMouse+angle/2*PI/180) */
    let alpha2=angleToMouse-angle/2*PI/180
    let alpha3=angleToMouse+angle/2*PI/180
    //console.log("a2: "+ alpha2 +" a3: "+ alpha3)
    ctx.arc(centerx, centery, radius, -arcsector/2+angleToMouse, arcsector/2+angleToMouse, false);
    ctx.lineTo(centerx, centery);
    ctx.fill();
    ctx.closePath();

    
    triangle_cone = [ [ x, y ], [ x+r*1000*cos(alpha2),  y+r*1000*sin(alpha2) ], [ x+r*1000*cos(alpha3),  y+r*1000*sin(alpha3) ] ];
  
    /*
    //show coords to debug
    fill(0)
    circle((x+r*1.3*cos(alpha2))*TileSize, (y+r*1.3*sin(alpha2))*TileSize, 10)
    circle((x+r*1.3*cos(alpha3))*TileSize, (y+r*1.3*sin(alpha3))*TileSize, 10)
    stroke('red');
		strokeWeight(1);
    line(centerx-100, centery-100*m2, centerx+100, centery+100*m2);
    stroke('green');
    line(centerx-100, centery-100*m3, centerx+100, centery+100*m3); */

  //tiles
  for (let i=floor(x,0)-ceil(r,0);i<=ceil(x,0)+ceil(r,0);i++)
  {
      for (let j=floor(y,0)-ceil(r,0);j<=ceil(y,0)+ceil(r,0);j++)
      {
        //condicion contraria si angle>180 (no estar en el triangulo)
        if (
        
          enRango(x,y,i,j,r,0.05, false) &&
          (        ((inside([i+0.5,j+0.5], triangle_cone)) && angle<180) || (!(inside([i+0.5,j+0.5], triangle_cone)) && angle>180)               )
          
            ){//distancia y rectas
          TilesResaltadas.push(new Tile(floor(i,0),floor(j,0),[0,255,0,0.25]))
        }
        else if (
        
          enRango(x,y,i,j,r,0.05, true) &&
          (        ((checkInside(i,j)) && angle<180) || ((checkInside(i,j))<4 && angle>180)               )
          
            ){//distancia y rectas
          TilesResaltadas.push(new Tile(floor(i,0),floor(j,0),[255,255,0,0.25]))
        }
      }
  }


  }

function circulo(x,y,r,rgba){ //funciona con coordenadas de tiles en float, no con pixeles
  
  //render circle area
  let rango=r/5
  //console.log(x, y, r)
  fill('rgba('+rgba[0]+','+rgba[1]+','+rgba[2]+', '+rgba[3]+')');
  strokeWeight(0)
  circle(x*TileSize, y*TileSize, TileSize*2*rango)

  //borra tiles resaltadas antiguas y crea nuevas
  for (let i=floor(x,0)-ceil(rango,0);i<=ceil(x,0)+ceil(rango,0);i++)
  {
      for (let j=floor(y,0)-ceil(rango,0);j<=ceil(y,0)+ceil(rango,0);j++)
      {
          if (enRango(x,y,i,j,rango,+0.01, false)){//si centro de tile está a distancia
            TilesResaltadas.push(new Tile(floor(i,0),floor(j,0),[0,255,0,0.25]))
          }
          else if (enRango(x,y,i,j,rango,+0.01, true)){//si cuaquier vértice de tile está a distancia
              TilesResaltadas.push(new Tile(floor(i,0),floor(j,0),[255,255,0,0.25]))
          }
      }
  }
}

function distancia(x1,y1,x2,y2){

  let d=sqrt(pow(x1-x2,2)+pow(y1-y2,2))

  return d
}

function enRango(x,y,i,j,rango,tolerancia, ampliado){
  if(ampliado){
    a=distancia(x,y,i+0,j+0)<=rango+tolerancia ||
    distancia(x,y,i+0,j+1)<=rango+tolerancia ||
    distancia(x,y,i+1,j+0)<=rango+tolerancia ||
    distancia(x,y,i+1,j+1)<=rango+tolerancia
  }
  else{
    a=distancia(x,y,i+0.5,j+0.5)<=rango+tolerancia
  }
  
  
  
  return a
}

function inside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};


function checkInside(i,j){
  let a=0
  if(inside([i+0,j+0], triangle_cone)){a++}
  if(inside([i+0,j+1], triangle_cone)){a++}
  if(inside([i+1,j+0], triangle_cone)){a++}
  if(inside([i+1,j+1], triangle_cone)){a++}
  return a
}

function drawBarrera(){
  let offset=0
  stroke(0,0,0);
  strokeWeight(TileSize/5);
  for(let i=0;i<Barrera.length-1;i++){
    line((Barrera[i][0]+offset)*TileSize,(Barrera[i][1]+offset)*TileSize, (Barrera[i+1][0]+offset)*TileSize,(Barrera[i+1][1]+offset)*TileSize)
  }
  line((Barrera[Barrera.length-1][0]+offset)*TileSize,(Barrera[Barrera.length-1][1]+offset)*TileSize,(Barrera[0][0]+offset)*TileSize,(Barrera[0][1]+offset)*TileSize)
  strokeWeight(1);
}
