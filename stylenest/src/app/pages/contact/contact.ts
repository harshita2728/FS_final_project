import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts';
import { UserAuthService } from '../../services/user-auth';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  form = {
    fullName: '',
    email: '',
    phone: '',
    message: ''
  };

  message = '';
  sending = false;

  constructor(
    private contacts: ContactsService,
    private auth: UserAuthService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser() as any;
    if (user) {
      this.form.fullName = user.fullName || '';
      this.form.email = user.email || '';
      this.form.phone = user.phone || '';
    }
  }

  submit(): void {
    this.message = '';

    if (!this.form.fullName || !this.form.email || !this.form.message) {
      this.message = 'Please fill in name, email, and message.';
      return;
    }

    const user = this.auth.getUser() as any;
    const payload = {
      fullName: this.form.fullName,
      email: this.form.email,
      phone: this.form.phone,
      message: this.form.message,
      userId: user?.id
    };

    this.sending = true;
    this.contacts.sendContact(payload).subscribe({
      next: () => {
        this.sending = false;
        this.message = 'Message sent! We will get back to you soon.';
        this.form.message = '';
      },
      error: (err) => {
        this.sending = false;
        this.message = err.error?.message || 'Failed to send message.';
      }
    });
  }
}
