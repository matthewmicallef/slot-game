# Monkey Island Wheel

A special take on Play'n GO's Money Wheel, themed using (The Secret of ) Monkey Island graphics. A splash screen requiring the user to enter the required balance/coins, and a game scene that allows the user to bet on various bet areas and spin the wheel to try out his luck.

## Getting Started

### Prerequisites

- Prior installation of Node (for NPM)

Note: Project was run on npm version 6.4.1 and Node version 11.2.0

### Installing & Running

1. Go to root folder (`cd slot-game`)
2. `npm install`
3. `npm start`
4. Default browser tab should load automatically, however project should be running at [http://localhost:8080/](http://localhost:8080/)

## Gameplay Instructions
1. Enter required balance
2. Press Load
3. Click on any of the bet areas for required bets
4. Click the spin button to try your luck!
5. The clear button will clear any already registered bets

## Potential Improvements
- Improve responsiveness (particularly on mobile devices)
- Add testing (unit, end-to-end, visual regression, 
etc...)
- Include Dependency Injection (may be better off with inclusion of UI framework e.g. React)
- Update proper CONFIG usage (standardise approach and use more `.model.ts` files)

## Notes

1. All requested functionality has been implemented
2. Additionally implemented sound effects (including mute/unmute)
3. Update to GSAP 3.0 for better animation management