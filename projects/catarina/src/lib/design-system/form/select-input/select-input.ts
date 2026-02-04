import { NgClass } from '@angular/common';
import { Component, ElementRef, forwardRef, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CatInput } from "../cat-input/cat-input";
import { Button } from '../../button/button';

@Component({
  selector: 'cat-select-input',
  imports: [
    CatInput,
    NgClass,
    Button
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectInput),
    multi: true
  }],
  templateUrl: './select-input.html',
  styleUrl: './select-input.css',
})
export class SelectInput implements ControlValueAccessor {
  @ViewChild('input') inputEl!: ElementRef<HTMLElement>;
  @ViewChild('optionsContainer', { static: false }) optionsContainer!: ElementRef<HTMLElement>;

  @Input() transform?: string; //This option basicly allow to the consumer put the options at the side where he wants
  @Input() options?: string[];
  @Input() placeholder: string = '';
  @Input() type: 'string' | 'number' = 'string';

  value: string | number = '';
  active = false;
  isInsideMenu = false;

  @Input() variant: 'surface' | 'elevated' | 'outlined' = 'surface';
  @Input() scrolleable: boolean = false;
  @Input() customClass: string = '';

  //@Output() selected = new EventEmitter<string>();

  //Accesibility
  @HostListener('document:click', ['$event'])
  outerClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.active = false;
    }
  };

  toggleActive() {
    this.active = !this.active;
  }

  constructor(
    private el: ElementRef,
  ) { }

  onChange = (value: any) => { };
  onTouched = () => { };

  //Here starts the events from ControlValueAccesor
  writeValue(value: any): void {
    this.value = value;
  };
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  //Here ends The events from ControlValueAccesor

  choseValue(option: any) {
    this.value = option;
    this.onChange(option);
    this.onTouched();
    this.active = false;
    //this.selected.emit(option);
  };

  @HostBinding('attr.data-select-input-class') get dataCustomClass() {
    return this.customClass;
  }

  get selectInputClass(): string {
    return `${this.variant} ${this.scrolleable ? 'scrolleable' : ''}`;
  }
}
