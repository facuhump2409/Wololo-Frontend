import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Emoji from "./emoji";

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 650,
    },
}));

export default function GameModeSelect(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div align={props.align}>
            <FormControl className={classes.formControl} align="center">
                <InputLabel id="demo-controlled-open-select-label">Game Mode</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    onChange={props.onChange}
                    align="center"
                >
                    <MenuItem value={'Easy'}>{<Emoji symbol="🙈"/>} Easy</MenuItem>
                    <MenuItem value={'Normal'}>{<Emoji symbol="🙂"/>} Normal</MenuItem>
                    <MenuItem value={"Hard"}>{<Emoji symbol="💪"/>} Hard</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}