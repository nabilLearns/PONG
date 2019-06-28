//test paddle movement OUT of BOUNDS
'use strict';
const stuff = require("../src/Player");

const testPlayer = new stuff.player(100, 0, 15, 100);

test('Out of Top Boundary', () => {
  for(let i = 0; i < 5; i++){testPlayer.move(true, false);} //moves up
  expect(testPlayer.y).toBe(0);

});

test('Out of Bottom Boundary', () => {
  testPlayer.y = stuff.height - testPlayer.pHeight;
  for(let i = 0; i < 5; i++){testPlayer.move(false, true);} //moves down
  expect(testPlayer.y).toBe(stuff.height - testPlayer.pHeight);
});

test('Position', () => {
  testPlayer.y = 50;
  testPlayer.move(true, true);
  expect(testPlayer.x).toBe(100);
  expect(testPlayer.y).toBe(50);
})
