import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contacts';

@Component({
  standalone: true,
  selector: 'app-manage-contacts',
  imports: [CommonModule],
  templateUrl: './manage-contacts.html'
})
export class ManageContactsComponent implements OnInit {
  loading = true;
  contacts: any[] = [];

  constructor(
    private contactsService: ContactsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getAllContacts().subscribe({
      next: (res) => {
        this.contacts = res || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  contactDate(contact: any): string {
    return contact.createdAt ? new Date(contact.createdAt).toLocaleString() : '-';
  }
}
