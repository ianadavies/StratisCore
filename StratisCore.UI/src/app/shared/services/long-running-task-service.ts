import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum TaskStatus {
  Running = 'Running',
  Complete = 'Complete',
  Failed = 'Failed'
}

export interface TaskResult {
  boolean
}

export interface LongRunningTask {
  id: string;
  description: string;
  status: TaskStatus;
  startTime: number;
  endTime: number;
  statusDescription: string;
  delegate: Promise<TaskResult>
  onCompleteCallback: (taskResult: TaskResult) => void;
}

@Injectable({
  providedIn: 'root'
})
export class LongRunningTaskService {
  private tasks = new BehaviorSubject<LongRunningTask[]>([]);

  public runningTasks(): Observable<LongRunningTask[]> {
    return this.getTasks(TaskStatus.Running);
  }

  public completeTasks(): Observable<LongRunningTask[]> {
    return this.getTasks(TaskStatus.Complete);
  }

  public getTasks(taskStatus: TaskStatus): Observable<LongRunningTask[]> {
    return this.tasks.pipe(map(tasks =>
      tasks.filter(task => task.status === taskStatus)));
  }

  public getTask(taskId: string): LongRunningTask {
    return this.tasks.value.find(task => task.id === taskId);
  }

  public startTask(taskToStart: LongRunningTask): Promise<TaskResult> {
    const taskList = this.tasks.value;
    this.tasks.next([...[taskToStart], ...taskList]);

    taskToStart.startTime = Date.now();

    return taskToStart.delegate.then(taskResult => {
      taskToStart.endTime = Date.now();
      taskToStart.onCompleteCallback(taskResult);
      return taskResult;
    })
  }
}
