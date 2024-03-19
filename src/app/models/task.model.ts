export interface Task {  
  id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  notes: string;
  teamId: string;
}
