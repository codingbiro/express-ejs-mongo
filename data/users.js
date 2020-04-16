// Test data
const users = [{name:'geddy', price: '10$', desc: 'hellllo', img: "http://placekitten.com/200/200", email: "wasd@oo.local", id: 0 }, {name:'neil', price: '9$', desc: 'cheapest in town', img: "http://placekitten.com/400/400", email: "trio@oo.local", id: 1 }, {name:'alex', price: '20$', desc: 'lev tolsztoj', img: "http://placekitten.com/100/100", email: "lollal@oo.local", id: 2 }];

module.exports = function (objectrepository) {
    return users;
};