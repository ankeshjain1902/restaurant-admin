// src/app/models/restaurant.model.ts
export interface Restaurant {
  id?: number; // Optional ID in case it's set by the backend
  name: string;
  description: string;
  location: string;
  menuItems?: MenuItem[];
    // Add other fields as needed (e.g., cuisine, rating, etc.)
  }
  
  export interface MenuItem {
    name: string;
    price: number;
    description: string;
  }