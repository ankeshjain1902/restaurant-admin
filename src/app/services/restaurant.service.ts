// src/app/services/restaurant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Get all restaurants
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`)
      .pipe(
        catchError(error => {
          console.error('Error fetching restaurants:', error);
          return throwError(error);
        })
      );
  }

  // Get a single restaurant by ID
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/restaurants/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching restaurant with ID ${id}:`, error);
          return throwError(error);
        })
      );
  }

  // Add a new restaurant
  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}/restaurants`, restaurant)
      .pipe(
        catchError(error => {
          console.error('Error adding restaurant:', error);
          return throwError(error);
        })
      );
  }

  // Update an existing restaurant
  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/restaurants/${restaurant.id}`, restaurant)
      .pipe(
        catchError(error => {
          console.error(`Error updating restaurant with ID ${restaurant.id}:`, error);
          return throwError(error);
        })
      );
  }

  // Delete a restaurant
  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/restaurants/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting restaurant with ID ${id}:`, error);
          return throwError(error);
        })
      );
  }
}
