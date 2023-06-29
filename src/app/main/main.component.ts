import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public title = '';

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    titleService: Title
  ) {
    router.events
      // Sempre que a navegação (rota) for finalizada...
      .pipe(filter((event) => event instanceof NavigationEnd))

      // ...retornamos o activatedRoute...
      .pipe(map(() => activatedRoute))

      // ...e buscamos na árvore de rotas
      // a rota que está ativa.
      //
      // Lembre-se: quando trabalhamos com rotas
      // filhas (children) podemos ter várias
      // rotas ativas ao mesmo tempo. O map
      // abaixo trata este cenário.
      .pipe(
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )

      // Pega o "data" da rota, que está lá
      // no arquivo app-routing.module...
      .pipe(switchMap((route) => route.data))

      // Finalmente define o título

      .subscribe((event) => {
        this.title = event['title']
        titleService.setTitle(this.title);
        }
      );
  }

  ngOnInit(): void { }
}
