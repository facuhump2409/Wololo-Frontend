import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
    },
    margin: {
        height: theme.spacing(3),
    },
}));

const marks = [
    {
        value: 4,
        label: '4',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 14,
        label: '14',
    },
    {
        value: 20,
        label: '20',
    },
];

export default function DiscreteSlider(props) {
    const classes = useStyles();
    function valuetext(value) {
        // props.setformValues(value)
        return `${value} towns`;
    }

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider-always" gutterBottom>
                Amount of towns
            </Typography>
            <Slider
                defaultValue={6}
                getAriaValueText={valuetext}
                max={20}
                aria-labelledby="discrete-slider-always"
                step={2}
                marks={marks}
                valueLabelDisplay="on"
            />
        </div>
    );
}
