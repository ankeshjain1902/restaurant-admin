// edit-restaurant.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant.model';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurant!: Restaurant;
  menuItems!: FormArray;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService
  ) {
    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      menuItems: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchRestaurant(id);
  }

  fetchRestaurant(id: number): void {
    this.restaurantService.getRestaurantById(id).subscribe(
      (restaurant) => {
        this.restaurant = restaurant;
        this.restaurantForm.patchValue({
          name: restaurant.name,
          description: restaurant.description,
          location: restaurant.location
        });
        this.setMenuItems(restaurant.menuItems || []); // Handle case where menuItems might be null or undefined
      },
      (error) => {
        console.error(`Error fetching restaurant with ID ${id}:`, error);
        // Handle error as needed
      }
    );
  }

  setMenuItems(menuItems: any[]): void {
    const menuItemsFormGroups = menuItems.map(item => this.createMenuItem(item));
    this.menuItems = this.formBuilder.array(menuItemsFormGroups);
    this.restaurantForm.setControl('menuItems', this.menuItems);
  }

  createMenuItem(item?: any): FormGroup {
    return this.formBuilder.group({
      name: item ? item.name : '',
      price: item ? item.price : '',
      description: item ? item.description : ''
    });
  }

  addMenuItem(): void {
    this.menuItems.push(this.createMenuItem());
  }

  removeMenuItem(index: number): void {
    this.menuItems.removeAt(index);
  }

  updateRestaurant(): void {
    if (this.restaurantForm.valid) {
      const updatedRestaurant: Restaurant = {
        id: this.restaurant.id,
        ...this.restaurantForm.value
      };
      this.restaurantService.updateRestaurant(updatedRestaurant).subscribe(
        () => {
          console.log('Updated restaurant:', updatedRestaurant);
          this.router.navigate(['/']); // Navigate back to restaurant list
        },
        (error) => {
          console.error(`Error updating restaurant with ID ${updatedRestaurant.id}:`, error);
          // Handle error as needed
        }
      );
    } else {
      // Mark all form fields as touched to trigger validation messages
      this.markFormGroupTouched(this.restaurantForm);
    }
  }

  // Helper method to mark all fields as touched to trigger validation
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
