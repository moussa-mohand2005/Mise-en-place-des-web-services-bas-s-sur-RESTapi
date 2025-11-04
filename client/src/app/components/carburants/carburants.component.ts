import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarburantService } from '../../services/carburant.service';
import { Carburant } from '../../models/station.model';

@Component({
  selector: 'app-carburants',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './carburants.component.html',
  styleUrl: './carburants.component.css'
})
export class CarburantsComponent implements OnInit {
  carburants: Carburant[] = [];
  carburantForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;

  constructor(
    private carburantService: CarburantService,
    private fb: FormBuilder
  ) {
    this.carburantForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCarburants();
  }

  loadCarburants(): void {
    this.carburantService.getAllCarburants().subscribe({
      next: (data) => this.carburants = data,
      error: (err) => console.error('Error loading carburants:', err)
    });
  }

  onSubmit(): void {
    if (this.carburantForm.valid) {
      const carburant = this.carburantForm.value;
      if (this.isEditing && this.editingId) {
        this.carburantService.updateCarburant(this.editingId, carburant).subscribe({
          next: () => {
            this.loadCarburants();
            this.resetForm();
          },
          error: (err) => console.error('Error updating carburant:', err)
        });
      } else {
        this.carburantService.createCarburant(carburant).subscribe({
          next: () => {
            this.loadCarburants();
            this.resetForm();
          },
          error: (err) => console.error('Error creating carburant:', err)
        });
      }
    }
  }

  editCarburant(carburant: Carburant): void {
    this.isEditing = true;
    this.editingId = carburant.id!;
    this.carburantForm.patchValue({
      nom: carburant.nom,
      description: carburant.description
    });
  }

  deleteCarburant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce carburant ?')) {
      this.carburantService.deleteCarburant(id).subscribe({
        next: () => this.loadCarburants(),
        error: (err) => console.error('Error deleting carburant:', err)
      });
    }
  }

  resetForm(): void {
    this.carburantForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }
}
