export interface CreateTask {
    title: string;
    dueDate: Date | null;
    priority: number;
    parentTaskId: string | null;
}