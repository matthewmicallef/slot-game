import "reflect-metadata";
import './main.css';

import { loader, Application } from 'pixi.js';
import { ApplicationLoader } from './src/loaders/application-loader';
import { SetupGame } from './src/setup-game';
import { GAME_CONFIG } from './src/game-config';

export class Main {
    constructor() {
        this.init();
    }

    init() {
        loader.add(GAME_CONFIG.pathToSymbolAssets).load(() => {
            new ApplicationLoader()
                .load()
                .then((application: Application) => {
                    new SetupGame(application);
                });
        });
    }
}

const main: Main = new Main();