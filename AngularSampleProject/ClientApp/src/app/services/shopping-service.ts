//import { Ingredient } from "../shared/ingredient.model";
//import { EventEmitter, Injectable } from "@angular/core";
//import { Subject } from "rxjs";

//@Injectable({
//    providedIn: 'root'
//})
//export class ShoppingService {

//    private ingredients: Ingredient[] = [
//        new Ingredient('Apple', 10),
//        new Ingredient('Cherry', 50)
//    ];

//    //ingredientSelected = new EventEmitter<Ingredient>();
//    //ingredientsUpdated = new EventEmitter<Ingredient[]>();
//    ingredientSelected = new Subject<Ingredient>();
//    ingredientsUpdated = new Subject<Ingredient[]>();

//    private selectedIndex: number = -1;

//    constructor() {

//    }

//    getIngredients() {
//        return this.ingredients.slice();
//    }

//    saveIngredient(name: string, amount: number): void {
//        if (this.selectedIndex == -1) {
//            this.ingredients.push(new Ingredient(name, amount));
//            this.ingredientsUpdated.next(this.ingredients);
//        }
//        else {
//            this.ingredients[this.selectedIndex].name = name;
//            this.ingredients[this.selectedIndex].amount = amount;
//            this.clearSelection();
//        }
//    }

//    addIngredients(ingredients: Ingredient[]) {
//        this.ingredients.push(...ingredients);
//    }

//    deleteIngredient(): void {
//        if (this.selectedIndex == -1) {
//            return;
//        }
//        this.ingredients.splice(this.selectedIndex, 1);
//        this.clearSelection();
//        this.ingredientsUpdated.next(this.getIngredients());
//    }

//    selectIngredient(index: number): void {
//        this.selectedIndex = index;
//        this.ingredientSelected.next(this.ingredients[index]);
//    }

//    clearSelection() {
//        this.selectedIndex = -1;
//    }

//}
