const prompt = require('prompt-sync')({sigint: true});


const hat = "🎓"
const hole = "😻"
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

};

let playing = true;

// สร้างแมพจำลองขึ้นมาทดสอบก่อน
const myField = new Field([
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, fieldCharacter, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
]);

// สั่งให้แสดงผล
myField.print();



