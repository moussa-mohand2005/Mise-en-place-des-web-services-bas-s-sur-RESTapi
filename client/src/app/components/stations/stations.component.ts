import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StationService } from '../../services/station.service';
import { Station } from '../../models/station.model';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.css'
})
export class StationsComponent implements OnInit {
  stations: Station[] = [];
  stationForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;

  constructor(
    private stationService: StationService,
    private fb: FormBuilder
  ) {
    this.stationForm = this.fb.group({
      nom: ['', Validators.required],
      ville: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations(): void {
    this.stationService.getAllStations().subscribe({
      next: (data) => this.stations = data,
      error: (err) => console.error('Error loading stations:', err)
    });
  }

  onSubmit(): void {
    if (this.stationForm.valid) {
      const station = this.stationForm.value;
      if (this.isEditing && this.editingId) {
        this.stationService.updateStation(this.editingId, station).subscribe({
          next: () => {
            this.loadStations();
            this.resetForm();
          },
          error: (err) => console.error('Error updating station:', err)
        });
      } else {
        this.stationService.createStation(station).subscribe({
          next: () => {
            this.loadStations();
            this.resetForm();
          },
          error: (err) => console.error('Error creating station:', err)
        });
      }
    }
  }

  editStation(station: Station): void {
    this.isEditing = true;
    this.editingId = station.id!;
    this.stationForm.patchValue({
      nom: station.nom,
      ville: station.ville,
      adresse: station.adresse
    });
  }

  deleteStation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette station ?')) {
      this.stationService.deleteStation(id).subscribe({
        next: () => this.loadStations(),
        error: (err) => console.error('Error deleting station:', err)
      });
    }
  }

  resetForm(): void {
    this.stationForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }
}
