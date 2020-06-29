import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _iconService: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    const url: SafeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl('../assets/lev.svg');
    this._iconService.addSvgIcon('lev', url);
    // this._router.navigate(['auth']);
  }
}
