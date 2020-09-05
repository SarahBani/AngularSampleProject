import { EventEmitter } from "@angular/core";

export class AuthService {

    private isLoggedIn: boolean = false;

    authenticateChanged = new EventEmitter<void>();

    login() {
        this.isLoggedIn = true;
        this.authenticateChanged.emit();
    }

    logout() {
        this.isLoggedIn = false;
        this.authenticateChanged.emit();
    }

    isAuthenticated(): Promise<boolean> {
        const promise: Promise<boolean> = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.isLoggedIn);
            }, 2000);
        });
        return promise;
    }

}
