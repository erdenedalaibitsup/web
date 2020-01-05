import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  travels: any = [];
  orderStatus: any = [];
  priceStatus: any = [];
  loading: boolean = true;

  constructor(private db:AngularFireDatabase, private authService: AuthService){}

  ngOnInit() {
    this.db.list('/priseStatus').valueChanges().subscribe(priceStatuses => {
        this.priceStatus = priceStatuses;

        this.db.list('/orderStatus').valueChanges().subscribe(orderStatuses => {
            this.orderStatus = orderStatuses;

            this.db.list('/travels').valueChanges().subscribe(travels => {
              this.travels = travels.map(item => {
                var trav: any = {};
                trav = item; 
                trav.orderStatusName = this.orderStatus.find((item1, index) => {
                  if((index + 1) == 1)
                    trav.orderStatusColor = "warning";
                  if((index + 1) == 2)
                    trav.orderStatusColor = "danger"
                  if((index + 1) == 3)
                    trav.orderSatatusColor = "info"
                  if((index + 1) == 4)
                    trav.orderStatusColor = "success"

                  return (index + 1) == trav.orderStatus
                });
                trav.amountStatusName = this.priceStatus.find((item1, index) => {
                  if((index + 1) == 1)
                    trav.amountStatusColor = "danger";
                  if((index + 1) == 2)
                    trav.amountStatusColor = "warning";
                  if((index + 1) == 3)
                    trav.amountStatusColor = "success";
                  return (index + 1) == trav.amountStatus
                });
                return trav;
              })
              this.loading = false;
            })
        })
    })
  }

  logout() {
    this.authService.logout();
  }
  numberFormat(number) {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2, minimumSignificantDigits: 2 }).format(number);
  }

}
