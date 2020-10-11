import {Form, Formik, FormikConfig, FormikValues} from "formik";
import React, {useState} from "react";
import {Button} from "rsuite";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    }
}));
export function StepButton(props) {
    const {step} = props;
    const classes = useStyles()
    return (
        <div>
            {step > 1 ? <Button onClick={() => props.goBack()}> Back </Button> : null }
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                // onClick={props.setStep(step + 1)}
            >
                {props.isLastStep() ? 'Create New Game' : 'Next'}
            </Button>
        </div>
    )
}