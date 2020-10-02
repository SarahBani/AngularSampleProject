import { Directive, OnInit, HostBinding, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
//	@HostBinding('style.backgroundColor') backgroundColor: string;

	constructor(private templateRef : TemplateRef<any>,
			private vcr:ViewContainerRef) { 
	}
	
	@Input() set appTooltip(condition: boolean){
		if (!condition){
			
		}
		else{
			
		}
	}

    ngOnInit(): void {
        //this.backgroundColor = 'yellow';
    }

}
