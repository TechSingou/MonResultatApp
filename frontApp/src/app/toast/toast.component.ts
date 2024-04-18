import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() message!: string;

  hideToast() {
    const toast = document.querySelector('.toast');
    if (toast) {
      const dismissButton = toast.querySelector('[data-bs-dismiss="toast"]');
      if (dismissButton) {
        dismissButton.dispatchEvent(new Event('click'));
      }
    }
  }
}
