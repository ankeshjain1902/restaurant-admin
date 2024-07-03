// restaurant-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant!: Restaurant;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchRestaurantDetails(id);
  }

  fetchRestaurantDetails(id: number): void {
    this.restaurantService.getRestaurantById(id).subscribe(
      (restaurant) => {
        this.restaurant = restaurant;
      },
      (error) => {
        console.error(`Error fetching restaurant with ID ${id}:`, error);
        // Handle error as needed
      }
    );
  }
}
