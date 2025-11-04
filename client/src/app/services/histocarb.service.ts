import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoCarb } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class HistoCarbService {
  private apiUrl = 'http://localhost:8080/api/histocarb';

  constructor(private http: HttpClient) { }

  getAllHistoCarb(): Observable<HistoCarb[]> {
    return this.http.get<HistoCarb[]>(this.apiUrl);
  }

  getHistoCarbById(id: number): Observable<HistoCarb> {
    return this.http.get<HistoCarb>(`${this.apiUrl}/${id}`);
  }

  getHistoCarbByStation(stationId: number): Observable<HistoCarb[]> {
    return this.http.get<HistoCarb[]>(`${this.apiUrl}/station/${stationId}`);
  }

  getHistoCarbByCarburant(carburantId: number): Observable<HistoCarb[]> {
    return this.http.get<HistoCarb[]>(`${this.apiUrl}/carburant/${carburantId}`);
  }

  getHistoCarbByStationAndCarburant(stationId: number, carburantId: number): Observable<HistoCarb[]> {
    return this.http.get<HistoCarb[]>(`${this.apiUrl}/station/${stationId}/carburant/${carburantId}`);
  }

  createHistoCarb(histoCarb: HistoCarb): Observable<HistoCarb> {
    return this.http.post<HistoCarb>(this.apiUrl, histoCarb);
  }

  updateHistoCarb(id: number, histoCarb: HistoCarb): Observable<HistoCarb> {
    return this.http.put<HistoCarb>(`${this.apiUrl}/${id}`, histoCarb);
  }

  deleteHistoCarb(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

