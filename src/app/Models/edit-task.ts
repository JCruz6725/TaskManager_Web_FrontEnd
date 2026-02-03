export interface EditTask {
    id: string;
    title: string;
    dueDate: Date | null;
    priority: number;
    parentTaskId: string | null;
    notes: any; //fix
    currentStatus: Status;
    statusHistories: any //fix
    createdDate: Date;
    createdUserId: string;
    parentId: string | null;
}

export interface Status {
    id: string;
    name: string;
    code: number;
    createdDate: Date;
}


/* {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "dueDate": "2026-02-03T05:05:55.212Z",
    "priority": 0,
    "parentTaskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "notes": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "taskItemId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "note": "string",
        "createdDate": "2026-02-03T05:05:55.212Z",
        "createdUser": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ],
    "currentStatus": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "code": 0,
      "createdDate": "2026-02-03T05:05:55.212Z"
    },
    "statusHistories": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "code": 0,
        "createdDate": "2026-02-03T05:05:55.212Z"
      }
    ],
    "createdDate": "2026-02-03T05:05:55.212Z",
    "createdUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  } */