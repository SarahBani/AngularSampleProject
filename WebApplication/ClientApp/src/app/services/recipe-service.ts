//import { Recipe } from "../recipe/recipe.model";
//import { Inject, EventEmitter, Injectable, OnInit } from "@angular/core";
//import { HttpClient } from '@angular/common/http';
//import { ShoppingService } from "./shopping-service";
//import { Ingredient } from "../shared/ingredient.model";
//import { Subject } from "rxjs";

//@Injectable()
//export class RecipeService {

//    private recipes: Recipe[] = [];

//    //selectedChanged = new EventEmitter<Recipe>();
//    //listUpdated = new EventEmitter<Recipe[]>();
//    selectedChanged = new Subject<Recipe>();
//    listUpdated = new Subject<Recipe[]>();

//    constructor(http: HttpClient,
//        @Inject('BASE_URL') baseUrl: string,
//        private shoppingService: ShoppingService) {
//        //http.get<Recipe[]>(baseUrl + 'Recipe/List').subscribe(result => {
//        //    this.recipes = result;
//        //    this.count = result.length;
//        //}, error => console.error(error));
//        this.fillRecipes();
//    }

//    private fillRecipes() {
//        this.recipes = [
//            new Recipe('aaaaaaaa', 'aaaaaaaaa', 'images/1.jpg', []),
//            new Recipe('bbbbbb', 'bbbbbbbbbb', 'images/2.jpg',
//                [
//                    new Ingredient('Bun', 1),
//                    new Ingredient('Meat', 2)
//                ]),
//            new Recipe('vvvvvvv', 'vvvvvvvvvv', 'images/3.jpg',
//                [
//                    new Ingredient('Lettuce', 1),
//                    new Ingredient('Meat', 2)
//                ])
//        ];
//    }

//    getRecipes() {
//        return this.recipes.slice();
//    }

//    getRecipe(index: number) {
//        return this.recipes[index];
//    }

//    //select(index: number) {
//    //    this.selectedIndex = index;
//    //    this.selectedChanged.emit(this.getRecipes()[index]);
//    //}
//    select(recipe: Recipe) {
//        this.selectedChanged.next(recipe);
//    }

//    save(index: number, name: string, desc: string, imageUrl: string, ingredients: Ingredient[] = []) {
//        const recipe = new Recipe(name, desc, imageUrl, ingredients);
//        if (index === -1) {
//            this.recipes.push(recipe);
//        }
//        else {
//            this.recipes[index] = recipe;
//        }
//        this.listUpdated.next(this.getRecipes());
//    }

//    delete(index: number): void {
//        this.recipes.splice(index, 1);
//        this.listUpdated.next(this.getRecipes());
//    }

//    //unselect() {
//    //    this.selectedIndex = -1;
//    //    this.selectedChanged.next(null);
//    //}

//    addIngredientsToShoppingList(ingredients: Ingredient[]) {
//        this.shoppingService.addIngredients(ingredients);
//    }

//}
