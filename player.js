class Player {
  constructor() {
    this.r = 60; // how big is the player diameter not radius
    this.x = w / 2; //(x position)
    this.y = h - this.r;
    this.speed = 2;
    this.direction = 'still';
  }

  display() {
    image(playerImg, this.x, this.y, this.r, this.r);
    // rect(this.x, this.y, this.r, this.r);
  }



/// I WAS TRYING TO USE THIS CODE FOR THE WALLS, USE THIS WHILE WHILE MAKING CHANGES LARK.
/// I PUT SOME CODES IN RIGHT BOTTOM BUT DID NOT WORK





//
//
//       case 'right':
//         // increasing x position
//         if (this.x > 330 && this.x
//           < 319 && this.y > 485 && this.y < 499){
//
//           this.x = this.x  - this.speed;
//         //   //this.speed = this.speed*-1;
//       //}//else {
//         //
//         // this.x = this.x*1;
//         //   //this.speed = 2;
//         // }
//
//           // this.x = this.x + this.speed;
//         }else if(this.x< w - this.r){
//         //
//          this.x = this.x + this.speed;
//       }
//         break;
//       case 'left':
//         // decreasing x position
//         if(this.x > 100){
//         this.x = this.x - this.speed;
//         break;
//       }
//
//       default:
//       break;
//
//     }
//   }
// }







//// I kept this code so that i doesn't move up, down , left meaning doesn't go beyond the walls.
//  Lark you use the code above .

  move() {

    switch (this.direction) {
      case 'still':
        // dont move anything
        break;
      case 'up':
        // decrease y position
      //  if (this.y - this.r/2  > 100){//this.r is diamter not radius
        if (this.y > 100){//this.r is diamter not radius
        this.y = this.y - this.speed;
      }
        break;
      case 'down':
        // increase y position
        //if(this.y < 500 - this.r/2){
        if(this.y < 500 - this.r){
        this.y = this.y + this.speed;
      }
        break;
      case 'right':
        // increasing x position
        //if (this.x < w -this.r/2){
        if (this.x < w -this.r){
        this.x = this.x + this.speed;
      }
        break;
      case 'left':
        // decreasing x position
        //if(this.x - this.r/2 > 100){
        if(this.x > 100){
        this.x = this.x - this.speed;
        break;
      }

      default:
      break;

    }
  }
}
