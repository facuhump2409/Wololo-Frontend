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

export default function DiscreteSlider(props) {
    const classes = useStyles();
    function valuetext(value) {
        // props.setformValues(value)
        return `${value} towns`;
    }
    function getMarks(maxTowns) {
        const elements = 4;
        const spaceBetween = Math.round(maxTowns / elements)
        const arr = [...Array(elements).keys()].map(x => ++x)
        return arr.map(function(elem,index) {
            return {
                value: (index * spaceBetween),
                label: (index * spaceBetween).toString()
            }
        })
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
                max={props.maxTowns}
                aria-labelledby="discrete-slider-always"
                step={2}
                marks={getMarks(props.maxTowns)}
                valueLabelDisplay="auto"
                onChange={props.onChange}
            />
        </Box>
    );
}
