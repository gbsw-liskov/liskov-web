export interface AnalyzeDetail {
  original: string;
  analysisText: string;
}

export interface AnalyzeResponse {
  totalRisk: number;
  details: AnalyzeDetail[];
  comment: string;
}

export interface PropertyForAnalyze {
  propertyId: number;
  name: string;
  address: string;
  propertyType: string;
  floor: number;
  area: number;
  builtYear: number;
  marketPrice: number;
  leaseType: string;
  deposit: number;
  monthlyRent: number | null;
  memo: string;
  image?: string;
  createdAt?: string;
}


