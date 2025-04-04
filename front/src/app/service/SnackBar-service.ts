import { inject, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackBarService{
  private _snackBar = inject(MatSnackBar)
  public durationInSeconds = 5

  public openInfoSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackBar-info']
    })
  }

  public openErrorSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackBar-error']
    })
  }
}
