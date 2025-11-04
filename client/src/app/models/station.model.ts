export interface Station {
  id?: number;
  nom: string;
  ville: string;
  adresse: string;
  carburants?: Carburant[];
}

export interface Carburant {
  id?: number;
  nom: string;
  description: string;
  stations?: Station[];
}

export interface HistoCarb {
  id?: number;
  date: string;
  prix: number;
  station: Station;
  carburant: Carburant;
}

