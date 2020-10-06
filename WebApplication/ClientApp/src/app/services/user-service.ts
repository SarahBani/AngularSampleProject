import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class UserService {
    users: { name: string, lastName: string, isActive }[] =
        [
            { name: 'Sarah', lastName: 'Bani', isActive: true },
            { name: 'Maryam', lastName: 'asda', isActive: true },
            { name: 'Peter', lastName: 'fghfgh', isActive: true }
        ];

    activeUsers: { name: string, lastName: string, isActive }[] =
        [
            { name: 'Sarah', lastName: 'Bani', isActive: true },
            { name: 'Maryam', lastName: 'asda', isActive: true },
            { name: 'Peter', lastName: 'fghfgh', isActive: true }
        ];

    inactiveUsers: { name: string, lastName: string, isActive }[] = [];

    //usersChanged = new EventEmitter<void>();

    constructor() { }

    activate(index: number): void {
        //this.users[index].isActive = true;
        var item = this.inactiveUsers.splice(index, 1)[0];
        this.activeUsers.push(item);
        //this.counterService.increase();
        //this.usersChanged.emit();
        //this.counterService.activate();
        //this.usersChanged.emit();
    }

    deactivate(index: number): void {
        //this.users[index].isActive = false;
        var item = this.activeUsers.splice(index, 1)[0];
        this.inactiveUsers.push(item);
        //this.counterService.increase();
        //this.usersChanged.emit();
       // this.counterService.deactivate();
        //this.usersChanged.emit();
    }

}
