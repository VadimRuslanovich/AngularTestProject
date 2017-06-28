import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" routeLink="/">{{title}}</a>
        </div>
        <ul class="nav navbar-nav">
          <li routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><a routerLink="">Home</a></li>
          <li routerLinkActive="active"><a routerLink="books">Books</a></li>
        </ul>
      </div>
    </nav>
    <router-outlet></router-outlet>`,
  styleUrls: ['./app/styles/css/app.component.css'],
})

export class AppComponent {
  title = 'Library';
}