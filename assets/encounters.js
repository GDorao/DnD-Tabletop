let encounter1=[
  {
    "tile": 50,
    "background": 'bosque.jpg',
    "encounterName": 'Elfos Cojos',
  },
  {
    "src": "angry.jpg",
    "name": "enemigo1",
    "x": 0,
    "y": 0,
    "mov": 30,
    "health": 69,
    "init": 12
  },
  {
    "src": "angry.jpg",
    "name": "elfo cojisimo",
    "x": 3,
    "y": 3,
    "mov": 10,
    "health": "vidita",
    "init": 23
  }
]

let encounter2=[
  {
    "tile": 40,
    "background": 'bosque.jpg',
    "encounterName": 'La Pepe-fiesta',
  },
  {
    "src": "angry.jpg",
    "name": "el pepe",
    "x": 0,
    "y": 0,
    "mov": 30,
    "health": "ocho",
    "init": 21,
  },
  {
    "src": "angry.jpg",
    "name": "pepe",
    "x": 3,
    "y": 3,
    "mov": 10,
    "health": "we",
    "init": 32,
  }
]

var encounterArray=[encounter1, encounter2]
//var backgroundArray=["bosque", "lagoD","lagoN"]




async function getFileName() {
  let fileHandle

  const pickerOpt = {
    types: [
      {
        description: 'Images',
        /* accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        } */
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };

  // open file picker, destructure the one element returned array
  [fileHandle] = await window.showOpenFilePicker(pickerOpt);

  return fileHandle.name
}

/* 
json=loadJSON('assets/encounters_copy.json')

 */
/* 



const file = await fileHandle.getFile();
const contents = await file.text(); 




*/