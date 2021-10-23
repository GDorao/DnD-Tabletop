
var PCarray=[]
var Enemyarray=[]
var CombatArray=[]
var circleMask
var sizeUI=60
var UISelected=0

class PC {
    constructor(img_name="Sword.png", name="Token", x=0, y=0, mov=30, health="0", init=0, tokenSize=1) {
        this.selected=false
        this.name=name

        this.tokenSize=tokenSize

        this.init=init

        this.health=health

        this.mov=mov
        
        this.pos={x:x, y:y}
        

        //crear imagen con mascara
        this.img = getImage(img_name, "token");
        let sizeC=128*2
        circleMask = createGraphics(sizeC, sizeC);
        circleMask.fill('rgba(0, 0, 0, 1)');
        circleMask.circle(sizeC/2, sizeC/2, sizeC);
        
    }

    show() {
        //Create PC Token

        this.img.mask(circleMask);
        


        if(this.selected){
            //render circle area
            circulo(this.pos.x+this.tokenSize/2-0.001, this.pos.y+this.tokenSize/2-0.001, this.mov, [0,255,0,0.05])//ajuste para token par
        }
        
        
        //render PC
        image(this.img, this.pos.x*TileSize, this.pos.y*TileSize, TileSize*this.tokenSize,TileSize*this.tokenSize);
        //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
    }

    showUI(){
        //Rectángulo para resaltar
        strokeWeight(0)
        fill('rgba(255,255,255,0.6)')
        rectMode(CENTER)
        rect((this.pos.x+this.tokenSize/2)*TileSize, (this.pos.y-0.25)*TileSize , measureText(this.name)*TileSize/40*1.5, TileSize/3)
        rectMode(CORNER)

        //Show name
        textSize(TileSize/3);
        fill(0, 0, 0);
        textAlign(CENTER, CENTER);
        text(this.name, (this.pos.x+this.tokenSize/2)*TileSize, (this.pos.y-0.2)*TileSize)
    }
    showCombatUI(order){
        //Show Combat UI
        sizeUI=min(height/(CombatArray.length),60)
        image(this.img, width, order*sizeUI, sizeUI,sizeUI)
        textAlign(LEFT,CENTER);
        fill(0)
        textSize(15);
        text(this.name, width+sizeUI+10, (order+0.5)*sizeUI)
        text(this.init, width+sizeUI+100, (order+0.5)*sizeUI)
        text(this.health+"hp", width+sizeUI+130, (order+0.5)*sizeUI)
        text(this.mov+"ft.", width+sizeUI+200, (order+0.5)*sizeUI)

        
    }

    move(x,y){
        this.pos.x+=x
        this.pos.y+=y
    }

}

function newEnemy(name,image="Sword.png",movE,x=0,y=0, health, init, tokenSize=1){
    if (!name){
        name="Enemigo " + (Enemyarray.length+1)
    }

    if (!movE){
        if(! isNaN(parseInt(input.value()))){
            movE=abs(parseInt(input.value()))
          }
        else{movE=30}
    }

    enemy=new PC(image,name,x,y, movE, health, init, tokenSize)
    Enemyarray.push(enemy)
    CombatArray=PCarray.concat(Enemyarray)
}

function loadEncounter(encounter){
    //poner background y tilesize
    bgImg=encounter[0].background
    bg=loadImage("assets/"+bgImg)
    TileSize=encounter[0].tile
    //console.log(encounter[0].tile)

    //poner enemigos //Object.keys(myObject).length
    for(let i=1;i<encounter.length;i++){
        //console.log("nuevo enemigo")
        newEnemy(encounter[i].name,encounter[i].src,encounter[i].mov, encounter[i].x, encounter[i].y, encounter[i].health, encounter[i].init, encounter[i].tokenSize)
    }
}

function deletePC(PC){
    let name=PC.name

    if(PCarray.indexOf(PC) != -1){//PC esta en PCarray
        console.log("ah")
        for (let i=0; i<PCarray.length;i++){
            if(PCarray[i].name==name){
                PCarray.splice(i,1)
                break;//no hay repetidos
            }
        }
        CombatArray=PCarray.concat(Enemyarray)    
    }
    else{
        for (let i=0; i<Enemyarray.length;i++){
            if(Enemyarray[i].name==name){
                Enemyarray.splice(i,1)
                break;//no hay repetidos
            }
        }
        CombatArray=PCarray.concat(Enemyarray)     
    
    }


    
}


function deleteAllEnemies(){
    Enemyarray=[]
    CombatArray=PCarray
}


function measureText(str, fontSize = 10) {
    const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
    const avg = 0.5279276315789471
    return str
      .split('')
      .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
      .reduce((cur, acc) => acc + cur) * fontSize
  }

function getImage(imgName, array){
    let img
    if(array == "token"){
        for (let e of savedTokens){
            if (e.name==imgName){img=e.image}
        }
    }
    if(array == "bg"){
        for (let e of savedBG){
            if (e.name==imgName){img=e.image}
        }
    }
    return img
}

/* var savedTokens=[]//name, image
var savedBG=[]//name, image */