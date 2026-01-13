

export type taskDetails = {
    //id: Guid;
    title: string;
    dueDate: Date | null;
    priority: number;
    currentStatus: {
        //id: ;
        name: string;
        code: number;
        createdDate: Date | null;
    }
}