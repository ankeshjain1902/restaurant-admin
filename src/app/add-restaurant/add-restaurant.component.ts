// add-restaurant.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  restaurantForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      menuItems: this.formBuilder.array([ this.createMenuItem() ])
    });
  }

  // Helper method to create a new menu item FormGroup
  createMenuItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      price: '',
      description: ''
    });
  }

  // Getter for accessing controls of menuItems as a FormArray
  getMenuItemsControls(): FormArray {
    return this.restaurantForm.get('menuItems') as FormArray;
  }

  // Method to add a new menu item to the form array
  addMenuItem(): void {
    const menuItems = this.restaurantForm.get('menuItems') as FormArray;
    menuItems.push(this.createMenuItem());
  }

  // Method to remove a menu item from the form array
  removeMenuItem(index: number): void {
    const menuItems = this.restaurantForm.get('menuItems') as FormArray;
    menuItems.removeAt(index);
  }

  addRestaurant(): void {
    if (this.restaurantForm.valid) {
      const newRestaurant = this.restaurantForm.value;
      this.restaurantService.addRestaurant(newRestaurant).subscribe(
        (restaurant) => {
          console.log('Added new restaurant:', restaurant);
          this.router.navigate(['/']); // Navigate to restaurant list after adding
        },
        (error) => {
          console.error('Error adding restaurant:', error);
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
