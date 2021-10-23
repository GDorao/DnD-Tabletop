var savedTokens=[]//name, image
var savedBG=[]//name, image
//var savedEncounters=[]//name, object array //esto casi que se puede hacer solo desde pc local y ya, no habrá nativos predefinidos3

var ViewCircle = 0
let rCircle=30

var ViewCone = 0
let angCono=60
let rCone=30
let xCono=0
let yCono=0

var haciendoBarrera=0

//all buttons, inputs and selects
var botonZoomUp
var botonZoomDown
var botonCirc
var botonCono
var botonBarrera
var clearEnemies
var fullScreenBut
var newEnemyBut
var deletePCBut
var BgBut
var BgBut2
var TokenBut
var TokenBut2
var EncounterBut
var EncounterBut2

var input
var input2
var inputInit
var inputHealth
var inputMov

var selToken
var selBG



var GridCheck



function viewCircle(){
  ViewCircle = 2
  if(! isNaN(parseInt(input.value()))){
    rCircle=abs(parseInt(input.value()))
  }
  else{
    rCircle=30
  } 
}

function viewCone(){
  ViewCone = 3
  if(! isNaN(parseInt(input.value()))){
    rCone=abs(parseInt(input.value()))
  }
  else{
    rCone=30
  }
  if(! isNaN(parseInt(input2.value()))){
    angCono=abs(parseInt(input2.value()))
  }
  else{
    angCono=60
  } 
}


function crearBotones(){
    
  //Crear botones
  //botones Zoom
  botonZoomUp = createButton('+')
  botonZoomUp.position(335, height)
  
  botonZoomUp.mousePressed(()=>{
    if(PCseleccionado.selected){PCseleccionado.tokenSize+=1}
    else{TileSize+=2}
  })
  
  botonZoomDown = createButton('- ')
  botonZoomDown.position(358, height);
  botonZoomDown.mousePressed(()=>{
    if(PCseleccionado.selected){
      if(PCseleccionado.tokenSize>1){PCseleccionado.tokenSize-=1}}
    else{
      if(TileSize>10){TileSize-=2}}
  })
  

  //boton circulo
  botonCirc = createButton('Círculo');
  botonCirc.position(170, height);
  botonCirc.mousePressed(viewCircle);

  //boton cono
  botonCono = createButton('Cono');
  botonCono.position(227, height);
  botonCono.mousePressed(viewCone);

  //boton barrera
  botonBarrera = createButton('Barrera');
  botonBarrera.position(275, height);
  botonBarrera.mousePressed(a => {haciendoBarrera=3;Barrera=[[0,0]];});

  //boton clearEnemies
  clearEnemies = createButton('Limpiar');
  clearEnemies.position(454, height);
  clearEnemies.mousePressed(()=>{deleteAllEnemies();})

  //boton fullScreen
  fullScreenBut = createButton('#');
  fullScreenBut.position(1000, height);
  fullScreenBut.mousePressed(()=>{document.documentElement.requestFullscreen()})

  

  //boton newEnemy
  newEnemyBut = createButton('Enemigo');
  newEnemyBut.position(633, height);
  newEnemyBut.mousePressed(a => {
    let name
    let mov
    if(typeof input2.value() === 'string'){
      name=input2.value()
    }
    else{name=""}
    if(! isNaN(parseInt(input.value()))){
      mov=abs(parseInt(input.value()))
    }
    newEnemy(name,undefined,mov)
  })

  //boton deletePC
  deletePCBut = createButton('Borrar');
  deletePCBut.position(701, height);
  deletePCBut.mousePressed(a => {
    for (let e of CombatArray){
      if (e.selected){
        deletePC(e)
      }
    }
    })


  //boton Fondo. Inutil. Sensacion de boton para el verdadero input
  BgBut = createButton('+');
  BgBut.position(602, height);
 
  //boton Fondo real
  BgBut2 = createFileInput((file)=>{
      //img=loadImage(file.data)
      //bg=img
      savedBG.push({
        name: file.name,
        image: loadImage(file.data)
        })
      selBG.option(file.name)
    },true)
    BgBut2.position(602, height);
    BgBut2.elt.style["opacity"]=0
    BgBut2.elt.style["width"]="23px"//valdria con 51 probablemente, pero por seguridad
    BgBut2.elt.accept='.png, .gif, .jpeg, .jpg'//pequeños bugs con los gif



  //boton Token. Inutil. Sensacion de boton para el verdadero input
  TokenBut = createButton('+');
  TokenBut.position(881, height);
    
  //boton Token real
  TokenBut2 = createFileInput((file)=>{
    savedTokens.push({
      name: file.name,
      image: loadImage(file.data)
      })
    selToken.option(file.name)
  },true)
  TokenBut2.position(881, height);
  TokenBut2.elt.style["opacity"]=0
  TokenBut2.elt.style["width"]="23px"//valdria con 51 probablemente, pero por seguridad
  TokenBut2.elt.accept='.png, .gif, .jpeg, .jpg'//pequeños bugs con los gif

  





  //boton Encounter
  EncounterBut = createButton('Encounter');
  EncounterBut.position(378, height);
  /* EncounterBut.mousePressed(async () => {
    let name= await getFileName()
    json=loadJSON('assets/'+name)
    
    //await virtual
    while(json[0]==undefined){await sleep(1);console.log(".")} //mientras no se haya cargado el json
    loadEncounter(json)
    }) */

  //boton Encounter v2
  EncounterBut2 = createFileInput((file)=>{
    //json=loadJSON(file.data)
    //console.log(file.data)
    //await virtual
    //while(json[0]==undefined){await sleep(1);console.log(".")} //mientras no se haya cargado el json
    loadEncounter(file.data)
  })
  EncounterBut2.position(378, height);
  EncounterBut2.elt.style["opacity"]=0
  EncounterBut2.elt.style["width"]="76px"
  EncounterBut2.elt.accept='.json'



  /////////////////
  //Crear inputs

  //input1
  input = createInput();
  input.position(20, height);
  input.size(60)

  //input2
  input2 = createInput();
  input2.position(95, height);
  input2.size(60)


  //inputInit
  inputInit = createInput();
  inputInit.position(width+sizeUI+100, (0+0.3)*sizeUI)
  inputInit.size(20,sizeUI/3)
  inputInit.value(0)
  inputInit.changed(a=>{
    PCseleccionado.init=parseInt(inputInit.value())
    PCseleccionado.selected=false
  })

  //inputHealth
  inputHealth = createInput();
  inputHealth.position(width+sizeUI+100, (0+0.3)*sizeUI)
  inputHealth.size(40,sizeUI/3)
  inputHealth.value(0)
  inputHealth.changed(a=>{
    PCseleccionado.health=inputHealth.value()//no lo paso a int para que se puedan poner cosas como 20+4(temp)
    PCseleccionado.selected=false
  })

  //inputMov
  inputMov = createInput();
  inputMov.position(width+sizeUI+100, (0+0.3)*sizeUI)
  inputMov.size(40,sizeUI/3)
  inputMov.value(0)
  inputMov.changed(a=>{
    PCseleccionado.mov=parseInt(inputMov.value())
    PCseleccionado.selected=false
  })






  //select token
  selToken = createSelect();
  selToken.position(778, height+22);
  selToken.option("Token")
  //opciones de forma dinamica leyendo el nombre de cada elemento del array encounterArray
  for(let i=0; i<savedTokens.length;i++){
    selToken.option(savedTokens[i].name)
  }
  //load background
  selToken.changed(a=>{
    if(selToken.value()!="Token"){//Si no se ha seleccionado el por defecto
      if(PCseleccionado.selected){PCseleccionado.img=getImage(selToken.value(),"token")}
    }
    selToken.value("Token")
})




  //select background
  selBG = createSelect();
  selBG.position(513, height+22);
  selBG.option("Fondo")
  //opciones de forma dinamica leyendo el nombre de cada elemento del array backgroundArray
  for(let i=0; i<savedBG.length;i++){
    selBG.option(savedBG[i].name)
  }
  //load background
  selBG.changed(a=>{
    if(selBG.value()!="Fondo"){//Si no se ha seleccionado el por defecto
      bg=getImage(selBG.value(),"bg")
    }
    else{bg = 220}
    //selBG.value("Fondo")
})


GridCheck = createCheckbox('Grid', true)

}




function mouseClicked() {
  
  //
  let x=floor(mouseX/TileSize,0)
  let y=floor(mouseY/TileSize,0)
  let seleccionado = false //he seleccionado a un PC con este click?

  
  if(haciendoBarrera==1){//recalcular barrera
    if(x==Barrera[0][0] && y==Barrera[0][1]){  //fin barrera al seleccionar primer punto
      haciendoBarrera=0
    }
    else{
      Barrera.push([x,y])//añadir puntos a la barrera a partir del tercer punto
    }
  }
  if(haciendoBarrera==2){//segundo click reinicializa el primer punto de la barrera
    Barrera[0]=[x,y]
    haciendoBarrera--
  }
  if(haciendoBarrera==3){//ignorar primer click
    haciendoBarrera--
  }



  //seleccionar PC o Enemy si no hay figura seleccionada
  if(ViewCircle==0 && ViewCone==0 && haciendoBarrera==0 && mouseX<width &&mouseY<height){// no selecciones si se está haciendo otra funcion mientras
    
    
    for (let e of CombatArray){//seleccionar un combatiente (solo uno seleccionado a la vez)
      if(e.pos.x==x && e.pos.y==y){
        if(e.selected){e.selected=false}else{
          for(let e2 of CombatArray){e2.selected=false}//deselecciona al resto
          e.selected=true//selecciona este
          inputInit.value(e.init)//actualizar los inputs al seleccionar PC
          inputHealth.value(e.health)
          inputMov.value(e.mov)
        }
        seleccionado=true
        break; //si hay dos en un mismo tile selecciona solo uno. Esto ocurre cuando se generan enemigos en (0,0)
      }
    }
    
    for (let e of CombatArray){//Mover los combatientes seleccionados (deberia ser solo uno)
      if(e.selected && !seleccionado){ //Solo muevete si no ha sido un movimiento de selección
        e.pos.x=x
        e.pos.y=y
        e.selected = !e.selected
        break;//solo se mueve uno cada vez (en realidad no debería haber nunca más de uno, pero lo dejo por si los bugs)
      }
    }
    
    seleccionado=false
  }
  
  //quitar areas vistas
  if(ViewCircle>0){ViewCircle--}
  if(ViewCone>0){ViewCone--}
  if(ViewCone==1){xCono=mouseX/TileSize-0.5;yCono=mouseY/TileSize-0.5}//fijar coords de inicio de cono

  console.log("Mouse: {x: "+x+", y: ",+y+"}")


  ///Seleccion en la UI
  if(mouseX>width && mouseY<(CombatArray.length)*sizeUI){//seleccion en la CombatUI
   
    UISelected=floor(mouseY/sizeUI)

    //deseleccionar todos y seleccionar (o deseleccionar) solo uno
      let seleccionadoAnterior=CombatArray[UISelected].selected
      for(let e of CombatArray){e.selected=false}
      CombatArray[UISelected].selected=!seleccionadoAnterior || (mouseX>width+sizeUI)//cambia solo si pinchas en la cara, si no se queda en true

    //poner en el input el valor del siguiente seleccionado
    inputInit.value(CombatArray[UISelected].init)
    inputHealth.value(CombatArray[UISelected].health)
    inputMov.value(CombatArray[UISelected].mov)
    
  }
}

function resaltarRaton(){
  //mostrar círculo
  if(ViewCircle){
    circulo(mouseX/TileSize, mouseY/TileSize, rCircle, [0,255,0,0.1])
  }
  //mostrar círculo
  if(ViewCone==1){
    cono(xCono,yCono,rCone,angCono)
  }
}


		
function sleep(millisecondsDuration)
  {
    return new Promise((resolve) => {
      setTimeout(resolve, millisecondsDuration);
    })
  }


function sortSavedImgArray(Array){
  Array.sort((a, b) => 
  {
    if(a.name.toLowerCase()>b.name.toLowerCase()){return 1}
    else if(a.name.toLowerCase()<b.name.toLowerCase()){return -1}
    else {
      if(a.name>b.name){return 1}
      else if(a.name<b.name){return -1}
    }
  })

}


