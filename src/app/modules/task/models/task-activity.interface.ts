import { StatusTask } from "../../../core/models/status-task.enum";

export interface TaskActivity {
    id?: string;
    idUser?: string;
    idTask: string;
    status: StatusTask;
    timestamp?: Date;
    message?: string;
}