export class CreateTask {
    title: string;
    dueDate: string;
    priority: number;

    constructor(title:string, dueDate:string, priority:number){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}