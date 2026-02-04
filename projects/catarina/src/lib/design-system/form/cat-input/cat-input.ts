import { Directive, ElementRef, Renderer2, OnInit, inject, Optional, Self, PLATFORM_ID } from '@angular/core';
import { NgControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[catInput]',
  standalone: true,
  host: {
    '[class.cat-input]': 'true',
    '[class.md]': 'true',
    '[class.invalid]': 'isInvalid'
  }
})
export class CatInput implements OnInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  @Optional() @Self() public control: NgControl | null = inject(NgControl, { optional: true, self: true });

  private static stylesInjected = false;

  ngOnInit(): void {
    if (this.el.nativeElement.tagName.toLowerCase() !== 'input') {
      console.warn('catInput directive can only be used on <input> elements');
      return;
    }

    // Inyectar estilos solo una vez
    if (!CatInput.stylesInjected && isPlatformBrowser(this.platformId)) {
      this.injectStyles();
      CatInput.stylesInjected = true;
    }
  }

  private injectStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .cat-input {
        border: 1px solid var(--neutral-color-3);
        background-color: var(--neutral-color-0);
        color: var(--neutral-color-9);
        border-radius: 18px;
        outline: none;
        transition: all 0.2s;
        max-width: 100%;
        box-sizing: border-box;
      }

      .cat-input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .cat-input::placeholder {
        color: var(--neutral-color-6);
        transition: font-size 0.2s;
      }

      .cat-input:focus::placeholder {
        font-size: 0.7em;
      }

      .cat-input:focus {
        border: 1px solid var(--neutral-color-9);
        color: var(--neutral-color-9);
        -webkit-text-fill-color: var(--neutral-color-9);
      }

      .cat-input.invalid,
      .cat-input.ng-invalid.ng-touched {
        border: 1px solid red;
      }

      .cat-input.ng-valid.ng-touched {
        border: 1px solid green;
      }

      .cat-input:-webkit-autofill,
      .cat-input:-webkit-autofill:hover,
      .cat-input:-webkit-autofill:focus,
      .cat-input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 1000px var(--neutral-color-1) inset;
        box-shadow: 0 0 0 1000px var(--neutral-color-1) inset;
        -webkit-text-fill-color: var(--neutral-color-9);
      }


      .cat-input.md {
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }

      .cat-input.sm {
        padding: 0.25rem 0.75rem;
        font-size: 0.875rem;
      }

      .cat-input.lg {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      }
    `;
    document.head.appendChild(style);
  }

  get isInvalid(): boolean {
    return !!(this.control && this.control.invalid && this.control.touched);
  }
}