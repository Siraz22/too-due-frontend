import { GENERIC_STATUS } from "./GenericTaskComponent";

const temp = [
    {
        id: '1',
        task: "Finish to do app",
        priority: "High",
        status: GENERIC_STATUS.UNDERWAY
    },
    {
        id: '2',
        task: "Deploy basic Front-end",
        priority: "Low",
        status: GENERIC_STATUS.UNDERWAY
    },
    {
        id: '3',
        task: "Integrate backend",
        priority: "Moderate",
        status: GENERIC_STATUS.NOT_STARTED
    },
    {
        id: '4',
        task: "Deploy testing",
        priority: "Moderate",
        status: GENERIC_STATUS.NOT_STARTED
    }
]

export default temp;