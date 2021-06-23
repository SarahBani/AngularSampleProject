"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
require("jest");
var banks_component_1 = require("./banks.component");
describe('BanksComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.waitForAsync(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [banks_component_1.BanksComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(banks_component_1.BanksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=banks.component.spec.js.map