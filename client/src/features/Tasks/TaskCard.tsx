import * as React from 'react';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListBlockMenu from './TaskCardMenu';
import CheckBox from '../../app/components/Checkbox';
import agent from '../../app/api/agent';
import { Card, CardHeader, CardActions, IconButton, Divider } from '@mui/material';




export default function ListBlock(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
    }

    async function handleCheckBoxClick(newStatus: boolean) {
        try {
            const response = await agent.Tasks.updateTask(props.task._id, {
                status: newStatus
            })
        } catch (err) {
            console.error("error sending new status to server" + err);
        }
    }

    function handleDelete() {
        props.onDelete(props.task._id);
    }

    function handleStartEdit() {
        props.onStartEdit(props.task);
    }

    return <>
        <Card sx={{ display: 'flex', justifyContent: 'space-between', boxShadow: 'none' }}>
            <CardHeader
                title={props.task.title}
                subheader={props.task.desc}
                titleTypographyProps={{
                    variant: 'subtitle1'
                }}
                subheaderTypographyProps={{
                    variant: 'body2'
                }}
            />
            <CardActions disableSpacing>
                <CheckBox color='secondary.main' defaultState={props.task.status} onClick={handleCheckBoxClick} />
                <IconButton aria-label="task menu" onClick={handleClick}>
                    <DragHandleIcon fontSize='medium' />
                </IconButton>
                <ListBlockMenu anchorEl={anchorEl} onClose={handleClose} onDelete={handleDelete} onEdit={handleStartEdit} />
            </CardActions>

        </Card>
        <Divider />

    </>
}

