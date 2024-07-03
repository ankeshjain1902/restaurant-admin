// restaurant-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
        // Handle error as needed
      }
    );
  }

  deleteRestaurant(id: number | undefined): void {
    if (id === undefined) {
      console.error('Restaurant ID is undefined.');
      return;
    }
  
    const confirmed = confirm('Are you sure you want to delete this restaurant?');
    if (!confirmed) {
      return; // Cancel deletion if user clicks Cancel in the dialog
    }
  
    this.restaurantService.deleteRestaurant(id).subscribe(
      () => {
        console.log('Deleted restaurant with ID:', id);
        this.fetchRestaurants(); // Refresh restaurant list after deletion
        this.router.navigate(['/']); // Navigate to restaurant list after adding
      },
      (error) => {
        console.error(`Error deleting restaurant with ID ${id}:`, error);
        // Handle error as needed
      }
    );
  }
  
}
