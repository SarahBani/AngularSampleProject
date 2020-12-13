import { Directive, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRequired]'
})
export class RequiredDirective implements OnInit {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  public ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'red');
    this.renderer.setStyle(this.elementRef.nativeElement, 'border', '1px solid blue');
  }

}
