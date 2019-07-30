
## PONG
This game is a remake of the original 1972 [classic](https://en.wikipedia.org/wiki/Pong). Being a browser based game, it should be playable on nearly any browser, on either Windows or Mac OS.

## How to play?

`[W],[S]` or `[I],[K]` to **MOVE**.

`[B]` to **START**

`[ESCAPE]` to **PAUSE**. *Note: If the game is paused, and you click [R], you will have to unpause for the restart to be successful.*

`[R]` to **RESTART**.

[PLAY](https://nabillearns.github.io/PONG/) the game!

## Features
This is a fast-paced game with.. Sound! Shrinking paddles! An accelerating ball!

*New additions in PONG v2:*
- game event controls => with the added abilities to pause or restart the game, you can take a break, or grab a snack without have to worry about losing your advantage!
- scoring system => game is played to 11 points, and score is kept track of
- 8 bit sound effects in the style of the original pong game
- revamped collision system: paddle is segmented into 8 parts, and rebound angle of ball changes depending on where it hits a paddle
- player's paddle is now limited within the bounds of the window screen (making it harder to exploit the new collision system)
- have different sized monitors at home? you want to change the window size during a game? never fear! this new feature is here! PONG automatically readjusts to changes in window size, and the game will automatically pause for you.

## Tech/Frameworks Used
- Node.js => package management
- Jest.js => automated unit testing

## Running Unit Tests
Prerequisite: Ensure that you have (preferably the latest version of) node.js installed.
1. Clone the repository so that you have all the files downloaded locally into a folder called PONG.
2. In the CMD application (Windows) or from the Terminal (Mac) change your current directory to the PONG folder. Use cd 'filepath' on either system.
3. In the CMD application (Windows) or in the Terminal (Mac) type in the command: npm-install --save-dev jest
4. In the same terminal, type the following command to run the unit tests: npm test
