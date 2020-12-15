import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit {

  constructor(private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public ngOnInit(): void {
  }

  private onClose(): void {
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  //private commentComponent: ComponentRef<any>;

  //constructor(private modalService: ModalService,
  //  private el: ElementRef = null,
  //  private viewContainerRef: ViewContainerRef,
  //  private componentFactoryResolver: ComponentFactoryResolver) {
  //}

  //public createComponent(componentType: Type<any>) {
  //  const commentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
  //  this.commentComponent = this.viewContainerRef.createComponent(commentFactory);
  //}

  //public ngOnDestroy(): void {
  //  this.commentComponent.destroy();
  //}

}
