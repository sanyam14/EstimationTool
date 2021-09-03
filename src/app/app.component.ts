import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  public svgFile:string = 'assets/images/svg/svg-sprite.svg';
  public svgVersion:any = "1.00";
  constructor(
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    //this.svgSprite();
  }

  svgSprite(){
    console.log("SVG Sprite version : " + this.svgVersion);
    let that = this;
    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
          return true;

      var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
          request,
          data,
          insertIT = function () {
              document.body.insertAdjacentHTML('afterbegin', data);
          },
          insert = function () {
              if (document.body) insertIT();
              else document.addEventListener('DOMContentLoaded', insertIT);
          };

      if (isLocalStorage && (localStorage.getItem('inlineSVGrev') == that.svgVersion)) {
          data = localStorage.getItem('inlineSVGdata');
          if (data) {
              insert();
              return true;
          }
      }

      try {
          request = new XMLHttpRequest();
          request.open('GET', that.svgFile, true);
          request.onload = function () {
              if (request.status >= 200 && request.status < 400) {
                  data = request.responseText;
                  insert();
                  if (isLocalStorage) {
                      localStorage.setItem('inlineSVGdata', data);
                      localStorage.setItem('inlineSVGrev', that.svgVersion);
                  }
              }
          }
          request.send();
      }
      catch (e) { }
    }
}
