import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from "react-redux";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function ActionResult(props) {
    const classes = useStyles();
    const open = props.show//React.useState(false);
    const { deltaAction } = useSelector(state => state.games)
    console.log("DELTA: ",deltaAction)
    const deltaTowns = deltaAction.deltaTowns
    // const deltaGauchos = deltaTowns[1].deltaGauchos
    const deltaSpecialization = deltaTowns[0].deltaSpecialization

    const handleClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        props.onClose()
        // setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="success">
                    {deltaSpecialization ? "Succesfully changed specialization to: " + deltaSpecialization :
                        deltaTowns[0].deltaGauchos + ' gauchos have been succesfullly moved from: ' + deltaTowns[0].townName + ' to: ' + deltaTowns[1].townName}
                    {/*deltaGauchos + 'have been succesfullly moved from: ' + deltaTowns[0].townName + ' to: ' + deltaTowns[1].townName*/}
                </Alert>
                {/*props.show && deltaAction.deltaTowns.length === 2*/}
            </Snackbar>
        </div>
    );
}