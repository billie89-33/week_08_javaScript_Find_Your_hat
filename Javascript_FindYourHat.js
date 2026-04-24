const prompt = require('prompt-sync')({ sigint: true });


const hat = "^"
const hole = "0"
const fieldCharacter = "📕"
const pathCharacter = "*"


class Field {
  constructor(field) {
    this.field = field;
    this.currX = 0;
    this.currY = 0;

    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x] === pathCharacter) {
          this.currX = x;
          this.currY = y;
        }
      }
    }
  };

  print() {

    process.stdout.write('\x1Bc');

    for (let row of this.field) {
      console.log(row.join("  "))
    }


  }

  move(direction) {
    if (direction === 'u') this.currY -= 1;
    else if (direction === 'd') this.currY += 1;
    else if (direction === 'l') this.currX -= 1;
    else if (direction === 'r') this.currX += 1;
  }

  static generateField(height, width, percentage = 0.1) {
    const field = [];
    for (let y = 0; y < height; y++) {
      field.push([]);
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }

    const startX = Math.floor(Math.random() * width);
    const startY = Math.floor(Math.random() * height);
    field[startY][startX] = pathCharacter;




    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    while (hatX === 0 && hatY === 0) {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    }
    field[hatY][hatX] = hat;

    return field;
  }

};

const randomMapData = Field.generateField(10, 10, 0.2);
const myField = new Field(randomMapData);

// // สร้างแมพจำลองขึ้นมาทดสอบก่อน
// const myField = new Field([
//   [pathCharacter, fieldCharacter, hole],
//   [fieldCharacter, fieldCharacter, fieldCharacter],
//   [fieldCharacter, hat, fieldCharacter],
// ]);




myField.print();

let playing = true;

while (playing) {
  myField.print();
  const input = prompt('Which way?( u, d, l, r):').toLowerCase();

  myField.field[myField.currY][myField.currX] = fieldCharacter

  myField.move(input);


  if (myField.currY < 0 || myField.currY >= myField.field.length ||
    myField.currX < 0 || myField.currX >= myField.field[0].length) {
    console.log('คุณตกแมพตายละ');
    playing = false;
    break;
  }



  const currentTile = myField.field[myField.currY][myField.currX];

  if (currentTile === hat) {
    console.log('เย้!! กินไก่');
    playing = false;
  } else if (currentTile === hole) {
    console.log('โดนหลุดดูด');
    playing = false;
  } else {
    myField.field[myField.currY][myField.currX] = pathCharacter;
  }


}



