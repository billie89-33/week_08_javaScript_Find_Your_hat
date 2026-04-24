const prompt = require('prompt-sync')({sigint: true});


const hat = "^"
const hole = "0"
const fieldCharacter = "📕"
const pathCharacter = "*"


class Field {
constructor(field) {
    this.field = field;
    this.currX = 0;
    this.currY = 0;

  this.field[0][0] = pathCharacter;
};
 
print(){

     process.stdout.write('\x1Bc'); 

    for(let row of this.field){
        console.log(row.join("  "))
    }
}

move(direction) {
    if (direction === 'u') this.currY -= 1;
    else if (direction === 'd') this.currY += 1;
    else if (direction === 'l') this.currX -= 1;
    else if (direction === 'r') this.currX += 1;
  }

};



// สร้างแมพจำลองขึ้นมาทดสอบก่อน
const myField = new Field([
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, fieldCharacter, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
]);

// สั่งให้แสดงผล
myField.print();

let playing = true;

while (playing){
    myField.print();
    const input = prompt('Which way?( u, d, l, r):').toLowerCase();
    myField.move(input);


    if (myField.currY < 0 || myField.currY >= myField.field.length || 
      myField.currX < 0 || myField.currX >= myField.field[0].length) {
            console.log('คุณตกแมพตายละ');
            playing = false;
            break;
        }
  

  
  const currentTile = myField.field[myField.currY][myField.currX];

  if (currentTile === hat) {
    console.log('Congrats! You found your hat! 🎓');
    playing = false;
  } else if (currentTile === hole) {
    console.log('Oops! You fell into a hole! 😻');
    playing = false;
  } else {
    myField.field[myField.currY][myField.currX] = pathCharacter;
  }


}



