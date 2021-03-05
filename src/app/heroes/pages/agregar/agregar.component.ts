import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../intefaces/heroes.inteface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {
  titulo: string = "Guardar";
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },

  ]
  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };
  constructor(private heroesService: HeroesService,
    private activateroute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.titulo = "Modificar";
      this.activateroute.params
        .pipe(
          switchMap(({ id }) => this.heroesService.getHeroeById(id))
        )
        .subscribe(heroe => {
          this.heroe = heroe;
        })
    }
  }
  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      //Actualizar
      this.heroesService.modificaHeroe(this.heroe).subscribe(res => {
        this.mostrarSnack('Heroe modificado correctamente');
      })
      this.router.navigate([`/heroes`]);
    } else {
      //guardar
      this.heroesService.agregarHeroe(this.heroe).subscribe(res => {
        this.mostrarSnack('Heroe guardado correctamente');
      })
      this.router.navigate([`/heroes`]);
    }
  }
  borrar() {
    const dialog = this.dialog.open(ConfirmDialogComponent,
      {
        width: '250px',
        data: this.heroe
      });
    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.borrarHeroe(this.heroe.id).subscribe(res => {
            this.router.navigate([`/heroes`]);
          });
        }
        this.mostrarSnack('Heroe borrado correctamente');

      }
    )

  }
  mostrarSnack(mensaje: string) {
    this.snackbar.open(mensaje, 'ok!', {
      duration: 2000
    })
  }
}
