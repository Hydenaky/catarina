import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { Button as CButton } from '../../button/button';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'cat-accordion',
  imports: [CButton, NgClass, NgIf],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class Accordion {
  @Input() accordionId?: string;
  @Input() status: boolean = false;//false = unactive
  @Input() label: string = 'Accordion Name';

  @Input() disabled = false;
  @Input() customClass = '';

  //Button Properties
  @Input() buttonVariant: 'primary' | 'secondary' | 'contrast' | 'outline' | 'ghost' = 'secondary';
  @Input() buttonSize: 'sm' | 'md' | 'lg' = 'md';
  @Input() iconLeft: boolean = false;
  @Input() iconCenter: boolean = false;
  @Input() iconRight: boolean = true;

  //Panel Properties
  @Input() scrolleable: boolean = false;
  @Input() variant: 'surface' | 'outlined' | 'elevated' = 'surface';

  @Output() updateAccordionGroupStatusOutput = new EventEmitter<string>();

  @ViewChild('buttonRef', { static: false }) buttonRef!: ElementRef;
  buttonWidth: number = 0;

  ngAfterViewInit() {
    // Obtener el ancho del botón después de renderizar
    setTimeout(() => {
      if (this.buttonRef) {
        const button = this.buttonRef.nativeElement.querySelector('button');
        if (button) {
          this.buttonWidth = button.offsetWidth;
        }
      }
    });
  }

  // Actualizar cuando cambie el label o otros inputs que afecten tamaño
  ngOnChanges() {
    if (this.buttonRef) {
      const button = this.buttonRef.nativeElement.querySelector('button');
      if (button) {
        this.buttonWidth = button.offsetWidth;
      }
    }
  }
  updateAccordionGroupStatus() {
    this.status = !this.status;
    this.updateAccordionGroupStatusOutput.emit(this.accordionId!);
  }

  forceStatus(newStatus: boolean): void {
    this.status = newStatus;
  };

  @HostBinding('attr.data-accordion-class') get dataCustomClass() {
    return this.customClass;
  }

  get panelClasses(): string {
    return `${this.variant} ${this.customClass} ${this.scrolleable ? 'scrolleable' : undefined}`;
  }
}
