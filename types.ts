
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum DashboardMetricType {
  CLIENTS = 'CLIENTS',
  BILLING = 'BILLING',
  PRODUCTIVITY = 'PRODUCTIVITY',
  SOP_COUNT = 'SOP_COUNT'
}

export interface MetricData {
  label: string;
  value: number | string;
  change: number;
  type: DashboardMetricType;
}

export interface SOP {
  id: string;
  title: string;
  category: 'Clinical' | 'Admin' | 'Billing' | 'IT';
  lastUpdated: string;
}
