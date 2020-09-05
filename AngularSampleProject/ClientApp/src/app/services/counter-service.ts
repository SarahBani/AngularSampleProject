import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
    //counter: number = 0;
    //increateCounter = new EventEmitter<number>();

    activateCounter: number = 0;
    deactivateCounter: number = 0;
    increateActivate = new EventEmitter<number>();
    increateDeactivate = new EventEmitter<number>();

    constructor() {

    }

    //increase() {
    //    this.counter++;
    //    this.increateCounter.emit(this.counter);
    //}

    activate() {
        this.activateCounter++;
        this.increateActivate.emit(this.activateCounter);
    }

    deactivate() {
        this.deactivateCounter++;
        this.increateDeactivate.emit(this.deactivateCounter);
    }


}
