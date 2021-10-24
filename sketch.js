//solo añado un comentario para probar como funciona GitHub :)

let width=1200-325
let widthInit=1200-325
let widthPlus=325
let height=710
var bg
let seleccionado=-1 //No one selected at the beginning
var PCseleccionado
var offsetUI=60
var offsetWidthUI=325
var offsetHeightUI=45

function preload(){//Cargar todas las fotos que están en el momento inicial en el servidor
//todas van a los array para que luego en el selector se vean de la misma manera las nativas y las importadas del PC
  

  let allTokens=[
    "angry.jpg","Axe.png", "Bow.png", "Cave Bear.png", "donut.jpg", "elf.jpg", "Hand.png","happy.jpg","Sword.png"
  
  
  ]
  for (let e of allTokens){
    savedTokens.push({
      name: e,
      image: loadImage('assets/'+e)
      })
  }
  
  let allBG=["bosque.jpg", "lagoD.jpg", "lagoN.jpg"]
  for (let e of allBG){
    savedBG.push({
      name: e,
      image: loadImage('assets/'+e)
      })
  }

  sortSavedImgArray(savedBG)
  sortSavedImgArray(savedTokens)

}



function setup() {
  //Configurar pantalla
  //var canvas = createCanvas(widthInit+widthPlus, height)
  var canvas = createCanvas(windowWidth, windowHeight-offsetHeightUI)
  width=windowWidth-offsetWidthUI
  //widthInit=1200-325
  //widthPlus=325
  height=windowHeight-offsetHeightUI
  
  frameRate(60);
  bgColor = 220 //loadImage('assets/'+'bosque'+'.jpg')
  bg=220 //imagen de fondo, por defecto no se leera porque es un numero y solo lee si isNaN

  //Crear botones
  crearBotones()
}



function draw() {
  
  background(bgColor);
  if(isNaN(bg)){image(bg, 0, 0, width,height)} //si bg no es un numero, es decir, si hay imagen
  
  

  //resaltar raton
  resaltarRaton()




  //grid
  if(GridCheck.checked()){drawGrid()}
  

  //barrera
  drawBarrera()

  //Mostrar todas las tiles resaltadas
  for (let e of TilesResaltadas){
    e.resaltarTile()
  }
  TilesResaltadas=[]


  //Mostrar todos los PC
  for (let e of PCarray){
    e.show()
  }
  //Mostrar todos los enemigos
  for (let e of Enemyarray){
    e.show()
  }
  //Mostrar los nombres de todos los enemigos. Se hace despues para que los nombres estén arriba
  for (let e of Enemyarray){
    e.showUI()
  }
  //Mostrar los nombres de todos los PC. Se hace despues para que los nombres estén arriba
  for (let e of PCarray){
    e.showUI()
  }

  //////////////////
  //Mostrar UI de combate
  let borde=2
  fill(50, 94, 171)
  rect(width-borde, -borde, widthPlus+borde*2, height+borde*2)
  fill(230)
  rect(width, 0, widthPlus, height)
  fill(81, 219, 118)

  for (let i=0;i<CombatArray.length;i++){//encontrar al seleccionado. Cuando se introducen enemigos y no hay nadie seleccionado el indice no cambia, ya que no entra en el "if". PCseleccionado es más fiable
    if(CombatArray[i].selected){PCseleccionado=CombatArray[i]}
    
  }
  for (let i=0;i<CombatArray.length;i++){//encontrar el índice del último seleccionado siempre, para actualizar en cada frame
    if(CombatArray[i]==PCseleccionado){
      if(PCseleccionado.selected){seleccionado=i}//ultimo seleccionado esta seleccionado ahora?
      else{seleccionado=-1}//poner fuera de la vista
      //seleccionado=i
    }
  }
  rect(width, sizeUI*seleccionado, widthPlus, sizeUI)//seleccionado en verde
  CombatArray.sort(//ordenar segun Inits
    (a,b) => {
      if(a.init < b.init){return 1}
      else if(a.init > b.init){return -1}
      else return a.name.localeCompare(b.name)})
  for (let i=0;i<CombatArray.length;i++){//mostrar
    CombatArray[i].showCombatUI(i)
  }
  inputInit.position(width+sizeUI+100, (seleccionado+(1/4))*sizeUI)//recalcular posicion y tamaño de input init
  inputInit.size(20,sizeUI/3)
  inputHealth.position(width+sizeUI+130, (seleccionado+(1/4))*sizeUI)//recalcular posicion y tamaño de input init
  inputHealth.size(40,sizeUI/3)
  inputMov.position(width+sizeUI+200, (seleccionado+(1/4))*sizeUI)//recalcular posicion y tamaño de input init
  inputMov.size(20,sizeUI/3)

  //////////
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight-offsetHeightUI)
  width=windowWidth-offsetWidthUI
  height=windowHeight-offsetHeightUI
  //Move Buttons to new height

  botonZoomUp.position(this.x, height)
  botonZoomDown.position(this.x, height)
  botonCirc.position(this.x, height)
  botonCono.position(this.x, height)
  botonBarrera.position(this.x, height)
  clearEnemies.position(this.x, height)
  fullScreenBut.position(this.x, height)
  newEnemyBut.position(this.x, height)
  newPCBut.position(this.x, height+22)
  deletePCBut.position(this.x, height)
  BgBut.position(this.x, height)
  BgBut2.position(this.x, height)
  TokenBut.position(this.x, height)
  TokenBut2.position(this.x, height)
  EncounterBut.position(this.x, height)
  EncounterBut2.position(this.x, height)
  addPCbut.position(this.x, height+22)
  addPCbut2.position(this.x, height+22)

  input.position(this.x, height)
  input2.position(this.x, height)
  inputInit.position(this.x, height)
  inputHealth.position(this.x, height)
  inputMov.position(this.x, height)

  selToken.position(this.x, height+22)
  selBG.position(this.x, height+22)
}

