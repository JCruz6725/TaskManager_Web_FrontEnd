export interface CreateTask {
    title: string;
    dueDate: Date | null;
    priority: number;
    parentId: string;
}