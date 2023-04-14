export interface IPhase {
  name: string;
  description: string;
}

export interface ICreateTask {
  name: string;
  description: string;
  phaseId: string;

  //Not part of the requested assignment
  priority: number;
}

export interface ICompleteTask {
  phaseId: string;
  taskId: string;
  completed: boolean
}

export interface ITask {
  taskId: string;
  name: string;
  description: string;
  completed: boolean;


  //Not part of the requested assignment
  priority: number;
}

export interface IPhaseDB {
  phaseId: string;
  name: string;
  description: string;
  tasks: Array<ITask>;
  done: boolean;


  //Not part of the requested assignment
  priority: number;
}

export interface CompleteTask {
  phaseId: string,
  taskIndex: number,
  completed: boolean
}

export interface IGetTask {
  phaseId: string,
  taskId: string
}



//Not part of the requested assignment
export interface IPrioritizeTask {
  phaseId: string;
  taskId: string;
  priority: number;
}