import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'identity-bar',
    templateUrl: './identity-bar.component.html',
    styleUrls: ['./identity-bar.component.css']
})
export class IdentityBarComponent implements OnInit {    
    @Input() title: string;
    
    ngOnInit(): void {
    }
}