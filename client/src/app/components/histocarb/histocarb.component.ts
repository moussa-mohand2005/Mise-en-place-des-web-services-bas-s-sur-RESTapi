import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoCarbService } from '../../services/histocarb.service';
import { StationService } from '../../services/station.service';
import { CarburantService } from '../../services/carburant.service';
import { HistoCarb, Station, Carburant } from '../../models/station.model';

@Component({
  selector: 'app-histocarb',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './histocarb.component.html',
  styleUrl: './histocarb.component.css'
})
export class HistocarbComponent implements OnInit {
  histoCarbList: HistoCarb[] = [];
  stations: Station[] = [];
  carburants: Carburant[] = [];
  histoCarbForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  selectedStationId: number | null = null;

  constructor(
    private histoCarbService: HistoCarbService,
    private stationService: StationService,
    private carburantService: CarburantService,
    private fb: FormBuilder
  ) {
    this.histoCarbForm = this.fb.group({
      stationId: ['', Validators.required],
      carburantId: ['', Validators.required],
      date: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadStations();
    this.loadCarburants();
    this.loadHistoCarb();
  }

  loadStations(): void {
    this.stationService.getAllStations().subscribe({
      next: (data) => this.stations = data,
      error: (err) => console.error('Error loading stations:', err)
    });
  }

  loadCarburants(): void {
    this.carburantService.getAllCarburants().subscribe({
      next: (data) => this.carburants = data,
      error: (err) => console.error('Error loading carburants:', err)
    });
  }

  loadHistoCarb(): void {
    this.histoCarbService.getAllHistoCarb().subscribe({
      next: (data) => this.histoCarbList = data,
      error: (err) => console.error('Error loading histoCarb:', err)
    });
  }

  onStationChange(): void {
    const stationId = this.histoCarbForm.get('stationId')?.value;
    if (stationId) {
      this.selectedStationId = stationId;
      this.histoCarbService.getHistoCarbByStation(stationId).subscribe({
        next: (data) => this.histoCarbList = data,
        error: (err) => console.error('Error loading histoCarb by station:', err)
      });
    } else {
      this.selectedStationId = null;
      this.loadHistoCarb();
    }
  }

  onFilterChange(event: any): void {
    const stationId = event.target.value;
    if (stationId) {
      this.selectedStationId = parseInt(stationId);
      this.histoCarbService.getHistoCarbByStation(parseInt(stationId)).subscribe({
        next: (data) => this.histoCarbList = data,
        error: (err) => console.error('Error loading histoCarb by station:', err)
      });
    } else {
      this.selectedStationId = null;
      this.loadHistoCarb();
    }
  }

  onSubmit(): void {
    if (this.histoCarbForm.valid) {
      const formValue = this.histoCarbForm.value;
      const histoCarb: HistoCarb = {
        date: formValue.date,
        prix: formValue.prix,
        station: { id: formValue.stationId } as Station,
        carburant: { id: formValue.carburantId } as Carburant
      };

      if (this.isEditing && this.editingId) {
        this.histoCarbService.updateHistoCarb(this.editingId, histoCarb).subscribe({
          next: () => {
            this.loadHistoCarb();
            this.resetForm();
          },
          error: (err) => console.error('Error updating histoCarb:', err)
        });
      } else {
        this.histoCarbService.createHistoCarb(histoCarb).subscribe({
          next: () => {
            this.loadHistoCarb();
            this.resetForm();
          },
          error: (err) => console.error('Error creating histoCarb:', err)
        });
      }
    }
  }

  editHistoCarb(histoCarb: HistoCarb): void {
    this.isEditing = true;
    this.editingId = histoCarb.id!;
    this.histoCarbForm.patchValue({
      stationId: histoCarb.station.id,
      carburantId: histoCarb.carburant.id,
      date: histoCarb.date,
      prix: histoCarb.prix
    });
  }

  deleteHistoCarb(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet historique ?')) {
      this.histoCarbService.deleteHistoCarb(id).subscribe({
        next: () => this.loadHistoCarb(),
        error: (err) => console.error('Error deleting histoCarb:', err)
      });
    }
  }

  resetForm(): void {
    this.histoCarbForm.reset();
    this.isEditing = false;
    this.editingId = null;
    this.selectedStationId = null;
  }

  getStationName(stationId: number): string {
    const station = this.stations.find(s => s.id === stationId);
    return station ? station.nom : 'N/A';
  }

  getCarburantName(carburantId: number): string {
    const carburant = this.carburants.find(c => c.id === carburantId);
    return carburant ? carburant.nom : 'N/A';
  }
}
