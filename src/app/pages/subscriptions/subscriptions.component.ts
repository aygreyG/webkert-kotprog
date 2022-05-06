import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from '../../shared/models/Subscription';
import { SubscriptionService } from '../../shared/services/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Subscription[] | any;
  displayedColumns: string[] = ["lastname", "firstname", "planName", "subscribedAt", "delete"];
  constructor(private subService: SubscriptionService, private authService: AuthService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.subService.getAll(this.authService.loggedInId() as string).subscribe({
      next: (subs) => {
        this.subscriptions = subs;
      }
    });
  }

  delete(id: string) {
    this.snackbar.open('Biztosan?', 'Igen', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000
    }).onAction().subscribe({
      next: () => {
        this.subService.delete(id).then(() => {
          this.snackbar.open('Sikeresen lemondva', undefined, {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 1500
          });
        });
      }
    });
  }

}
