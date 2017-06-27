import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/books" routerLinkActive="active">Books</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app/app.component.css'],
})
export class AppComponent {
  title = 'Library';
}
