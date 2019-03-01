'use strict';


// function extendTo(obj, superClass) {
//     obj.prototype = Object.create(superClass.prototype);
//     obj.prototype.constructor = obj;
// }

// function Shape(color) {
//     this.color = color;
// }

// extendTo(Circle, Shape);
// extendTo(Square, Shape);
// Shape.prototype.draw = function (){
//     console.log('use strict';


// function extendTo(obj, superClass) {
//     obj.prototype = Object.create(superClass.prototype);
//     obj.prototype.constructor = obj;
// }

// function Shape(color) {
//     this.color = color;
// }

// extendTo(Circle, Shape);
// extendTo(Square, Shape);
// Shape.prototype.draw = function (){
//     console.log('Draw');
// }

// Shape.prototype.duplicate = function (){
//     console.log('Duplicate');
   
// }

// function Circle(radius, color) {
//     Shape.call(this, color);
//     this.radius = radius;
// }
// Circle.prototype.duplicate = function (){
//     console.log('Circle duplicate')
// }
// function Square(size) {
//     this.size = size;
// }

// Square.prototype.duplicate = function (){
//     console.log('Square duplicate')
// }

// let circle = new Circle(3, 'red');
// // console.log(circle);
// // console.log(circle.radius);
// // circle.duplicate();

// const shapes = [
//     new Circle(),
//     new Square()
// ];

// for(let shape of shapes){
//      shape.duplicate()
//      console.log(shape)
// }'Draw');
// }

// let canEat = {
//     eat: function () {
//         this.hunger--;
//         console.log('Eating');
//     },

//     hunger: 65
// }

// let canWalk = {
//     walk () {
//         console.log('Walking...');
//     }
// }

// function Person(){

// }
// Object.assign(Person.prototype, canEat, canWalk);

// let p = new Person();
// p.eat()
























function HtmlElement() {
    this.click = function() {
        console.log('Clicked..');
    }
}

HtmlElement.prototype.focus = function () {
    console.log('Focsued');
}

function HtmlSelectElement (...items) {
    this.items = items;

    this.addItem = function (item){
        return this.items.push(item);
    }

    this.removeItem = function(item){
        let itemIndex = this.items.indexOf(item);
            this.items.splice(itemIndex, 1);
    }
    this.render = function (...items) {
        let options = '';
        items.forEach(option => {
            options += `
            <option value="${option}"> ${option}</option>
            `;
        
        });
        return `
                <select>${options}</select>
            `;
    }
}

HtmlSelectElement.prototype = new HtmlElement();


let htsmt = new HtmlSelectElement(1,2,3,4,5,6,7,8,9,0);

htsmt.removeItem(4);
console.log(htsmt.render(2,4,6,7))