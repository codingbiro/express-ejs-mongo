const um = require('../models/user');

// Test data
const users = [{name:'geddy', price: '10$', desc: 'hellllo', img: "http://placekitten.com/200/200", email: "wasd@oo.local", id: 0 }, {name:'neil', price: '9$', desc: 'cheapest in town', img: "http://placekitten.com/400/400", email: "trio@oo.local", id: 1 }, {name:'alex', price: '20$', desc: 'lev tolsztoj', img: "http://placekitten.com/100/100", email: "lollal@oo.local", id: 2 }];

var array = [];
var array1 = [];
var array2 = [];
const text = "Maecenas bibendum sodales ante sagittis. Morbi eget consectetur erat, sit amet feugiat felis. Praesent massa quam, bibendum interdum diam ac, elementum efficitur nunc. Mauris egestas pharetra augue, sed luctus ipsum placerat quis. Praesent mattis massa sed molestie lacinia. Fusce bibendum tortor elit, sit amet pharetra lacus interdum vitae. Curabitur vel mi condimentum, ullamcorper eros vitae, rhoncus tortor. Vivamus eleifend quis lorem quis lacinia. Suspendisse a rhoncus justo, quis elementum ex. Nunc id porta ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce dapibus ullamcorper ligula, in commodo nisi lobortis at. Aenean tempus libero eu diam vestibulum fermentum.";
const text2 = "ligula accumsan Quisque ultrices congue";
array = text.split(' ');
array1 = text2.split(' ');
array2 = text.split('.');

for(var i = 0; i < 5; i++) {
    let newUser = new um();
    newUser.name = array[i] + " " + array1[i];
    newUser.email = array[i] + "@gmail.com";
    newUser.password = 'asd';
    newUser.img = `https://i.picsum.photos/id/${i}/200/200.jpg`;
    newUser.price = 10+Math.floor(Math.random() * 10);
    newUser.desc = array2[i];
    newUser.role = 'teacher';
    newUser.save(err => console.log(err));
}
