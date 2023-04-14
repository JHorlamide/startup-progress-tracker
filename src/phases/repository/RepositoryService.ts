import { IPhaseDB, CompleteTask, IGetTask } from "../types/types";

class RepositoryService {
  // In-memory Database
  private phaseDB: { [phaseId: string]: IPhaseDB } = {};

  public createPhase(newPhase: IPhaseDB): IPhaseDB {
    const { phaseId } = newPhase;
    return this.phaseDB[phaseId] = newPhase;
  }

  public getAllPhases() {
    return this.phaseDB;
  }

  public getPhaseByPhaseId(phaseId: string) {
    return this.phaseDB[phaseId];
  }

  public getPhaseByName(name: string): boolean {
    return Object.values(this.phaseDB).some(phase => phase.name === name);
  }

  public getTaskIndex({ phaseId, taskId }: IGetTask) {
    return this.phaseDB[phaseId].tasks.findIndex((task) => task.taskId === taskId);
  }

  public markTaskComplete({ phaseId, taskIndex, completed }: CompleteTask) {
    this.phaseDB[phaseId].tasks[taskIndex].completed = completed;
  }

  public getPreviousPhaseId(phaseId: string): string | null {
    const phaseIds = Object.keys(this.phaseDB);
    const index = phaseIds.findIndex(id => id === phaseId);
    return index > 0 ? phaseIds[index - 1] : null;
  }

  public getNextPhaseId(phaseId: string): string | null {
    const phaseIds = Object.keys(this.phaseDB);
    const index = phaseIds.findIndex(id => id === phaseId);
    return index < phaseIds.length - 1 ? phaseIds[index + 1] : null;
  }

  //Not part of the requested assignment
  public getPhaseByTaskPriority() {
    const phases = Object.values(this.phaseDB);

    phases.forEach((phase) => {
      const incompleteTasks = phase.tasks.filter((task) => !task.completed);
      if (incompleteTasks.length > 0) {
        phase.priority = Math.max(...incompleteTasks.map(task => task.priority));
      } else {
        phase.priority = 0;
      }
    })

    return phases.sort((a, b) => a.priority - b.priority);
  }

  //Not part of the requested assignment
  public getPhaseByPriority() {
    return Object.values(this.phaseDB).sort((a, b) => a.priority - b.priority);
  }
}

export default new RepositoryService();
