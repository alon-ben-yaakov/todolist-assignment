import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Grid } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import AppTextInput from '../../app/components/AppTextInput';
import { validationScehma } from './taskValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Task } from '../../app/Models/Task';
import agent from '../../app/api/agent';

export interface Props {
    open: boolean;
    onClose: () => void;
    onEdit: (task: Task) => void;
    task: Task;
}

export default function EditTaskDialog(props: Props) {
    const { control, reset, handleSubmit, formState: { isDirty } } = useForm({
        resolver: yupResolver(validationScehma)
    });
    const { open, onClose, onEdit, task, ...other } = props;


    useEffect(() => {
        if (task && !isDirty) {
            reset(task)
        }
    }, [task, isDirty])

    const handleCancel = () => {
        reset();
        onClose();
    };


    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Task;
            response = await agent.Tasks.updateTask(props.task._id, data);
            handleCancel();//Reseting the values and closing the dialog
            onEdit(task);//Refreshing the UI
        } catch (err) {
            console.log("error trying to update  task to server side" + err);
        }
    }

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: 320 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <DialogTitle>Edit A Task</DialogTitle>
                <DialogContent dividers sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <AppTextInput control={control} name='title' label='Task Title ' maxLength={18} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <AppTextInput control={control} name='desc' label='Task Description' maxLength={20} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type='submit'>EDIT</Button>
                </DialogActions>
            </form>
        </Dialog >
    );
}

