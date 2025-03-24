export interface Task {
  id: number;
  title: string;
  status : Status
}

export enum Status {
  todo = 'todo',
  inProgress = 'inProgress',
  completed = 'completed',
}