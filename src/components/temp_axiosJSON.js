import { GENERIC_STATUS } from "./GenericTaskComponent";

const temp = [
    {
        id: '1',
        task: "Finish to do app",
        priority: "High",
        status: GENERIC_STATUS.UNDERWAY,
        progress: 10
    },
    {
        id: '2',
        task: "Integrate backend",
        priority: "Moderate",
        status: GENERIC_STATUS.UNDERWAY,
        progress: 0
    },
    {
        id: '3',
        task: "Deploy testing",
        priority: "Moderate",
        status: GENERIC_STATUS.NOT_STARTED,
        progress: 0
    }
]

export default temp;