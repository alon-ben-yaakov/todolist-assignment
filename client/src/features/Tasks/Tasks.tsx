import { Switch, Card, CardHeader, CardContent, CardActions, IconButton, Divider, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TaskListBlock from './TaskCard';
import CreateTaskDialog from './CreateTaskDialog';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { Task } from '../../app/Models/Task';
import EditTaskDialog from './EditTaskDialog';

interface Props {
    onDarkModeChange: () => void;
    darkMode: boolean;
}


export default function Tasks({ onDarkModeChange, darkMode }: Props) {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFetching, setIsFetching] = useState(true); //Initialize the fetching from the server & indicates the state of the fetching
    const [editTask, setEditTask] = useState(false); //Controlling the view mode of the edit menu
    const [openCreateDialog, setOpenCreateDialog] = useState(false);//Controlling the view mode of the create task dialog
    const [selectedTask, setSelectedTask] = useState<Task>({ //Saving the task the user is currently editng
        _id: "",
        title: "",
        desc: "",
        status: false
    });
    useEffect(() => {
        if (isFetching) {
            try {
                agent.Tasks.list('test')
                    .then(data => {
                        setTasks(data)
                    })
                    .catch(err => console.error(err))
                    .finally(() => {
                        setIsFetching(false);
                    })
            } catch (err) {
                console.error(err);
            }
        }
    }, [isFetching])

    function handleOpenDialogClick() {
        setOpenCreateDialog(true);
    }
    function handleCloseDialog() {
        setOpenCreateDialog(false);
    }

    function handleOpenEditDialog(task: Task) {
        setSelectedTask(task);
        setEditTask(true);
    }
    function handleCloseEditDialog() {
        setEditTask(false);
    }




    function handleTaskCreated(task: Task) { //Update the local tasks
        setTasks((prevTasks) => {
            return [...prevTasks, task];
        });
    }

    async function handleTaskDeleted(taskId: string) {

        try {
            let response: Task;
            response = await agent.Tasks.deleteTask(taskId);
            setTasks((prevTasks) => {
                return prevTasks.filter((task) => {
                    return task._id !== taskId;
                })
            });
        } catch (err) {
            console.log("error trying to delete  task to server side" + err);
        }


    }

    function handleTaskEdited(updatedTask: Task) {
        setIsFetching(true);
    }
    return <>
        <Card sx={{ width: 345 }}>
            <CardHeader
                title="Todo List"
            />
            <Divider />

            <CardContent>

                {/* Generate the tasks list */}
                {tasks.map((task) => (
                    <Box key={task._id}>
                        <TaskListBlock task={task} onDelete={handleTaskDeleted} onStartEdit={handleOpenEditDialog} onFinishEdit={handleCloseEditDialog} />
                    </Box>
                ))}

            </CardContent>

            <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                <IconButton aria-label="Add new task" onClick={handleOpenDialogClick}>
                    <AddIcon fontSize='large' sx={{ color: 'secondary.main' }} />
                </IconButton>

                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Switch checked={darkMode} onChange={onDarkModeChange} />
                </Box>
            </CardActions>

            {/* Task Dialogs */}
            <CreateTaskDialog open={openCreateDialog} onClose={handleCloseDialog} handleTaskCreated={handleTaskCreated} />
            <EditTaskDialog open={editTask} task={selectedTask} onClose={handleCloseEditDialog} onEdit={handleTaskEdited} />

        </Card></>
}
