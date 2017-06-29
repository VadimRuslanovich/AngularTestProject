import { Component }   from '@angular/core';

@Component({
    selector: 'main',
    template: `<h1>{{message}}</h1>`,
    styles: [`
        h1{
            text-align: center;
            padding-top: 5%;
        }
    `]
})

export class HomeComponent{
    message: string = "Welcome to Test Angular Project";
}