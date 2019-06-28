'use strict';
const mock = require("../src/Ball");
const startMock = require('../src/main');

const testBall = new mock.ball(mock.width/2, mock.height/2, 10, startMock.ball_start_x_vel, startMock.ball_start_y_vel);

test('ball collision with top border', () => {
  testBall.y = 5;
  testBall.yvel = -5;
  for(let i = 0; i < 10; i++) {
    testBall.move();
    testBall.checkBoundaryCollisions();
  }
  expect(testBall.y).toBeGreaterThanOrEqual(0);
});

test('ball collision with bottom border', () => {
  testBall.y = mock.height - 5;
  testBall.yvel = 5;
  for(let i = 0; i < 10; i++) {
    testBall.move();
    testBall.checkBoundaryCollisions();
  }
  expect(testBall.y).toBeLessThanOrEqual(mock.height);
});


//test('ball collides with paddle');
console.log(startMock.magnitude_velocity);
console.log(startMock.ball_start_x_vel);

test('Ball Starting Velocity', () => {
  //using pythagorean theorem to check that velocity components are correct given a specific magnitude a^2 + b^2 = magnitude^2
  let squaredVelocities = Math.round((Math.pow(startMock.ball_start_x_vel,2) + Math.pow(startMock.ball_start_y_vel, 2)));
  let magnitudeSquared = Math.pow(startMock.magnitude_velocity,2);

  expect(squaredVelocities).toBe(magnitudeSquared);
});
