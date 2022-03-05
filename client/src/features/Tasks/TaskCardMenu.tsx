import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Props {
    anchorEl: any | null;
    onClose: () => void;
    onDelete: () => void;
    onEdit: () => void;
}


export default function ListBlockMenu({ anchorEl, onClose, onDelete, onEdit }: Props) {

    function handleClose() {
        onClose();

    }

    function handleEdit() {//Close the menu & open the edit dialog
        onEdit();
        onClose();
    }
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={anchorEl !== null ? true : false}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={onDelete}>Delete</MenuItem>
        </Menu >
    );
}
