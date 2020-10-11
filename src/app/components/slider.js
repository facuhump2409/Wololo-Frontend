import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "auto",
    },
    margin: {
        height: theme.spacing(3),
    },
    alignItemsAndJustifyContent: {
        alignItems: 'center',
        justifyContent: 'center',
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
        <Box className={classes.root} m="auto">
            <Typography id="discrete-slider-always" m="auto" gutterBottom>
                Amount of towns
            </Typography>
            <Slider
                className={classes.alignItemsAndJustifyContent}
                defaultValue={2}
                getAriaValueText={valuetext}
                max={20}
                aria-labelledby="discrete-slider-always"
                step={2}
                marks={marks}
                valueLabelDisplay="auto"
                onChange={props.onChange}
            />
        </Box>
    );
}
