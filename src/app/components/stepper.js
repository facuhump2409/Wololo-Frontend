import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Select Province', 'Select Amount of towns',"Select game mode", 'Select Rivals'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 1:
            return 'Select a province from Argentina to play in';
        case 2:
            return 'Select the amount of towns for the game';
        case 3:
            return 'Select game mode';
        case 4:
            return 'Select the users you want to play with';
        default:
            return 'Select Province';
    }
}

export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const steps = getSteps();
    const activeStep = props.step - 1
    console.log("Los steps:",activeStep)
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
