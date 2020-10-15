/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {useDispatch} from "react-redux";
import {USER_STATS} from "../../../redux/actionTypes";
import {userStats} from "../../../services/admin";

const filter = createFilterOptions();

export default function SearchInput(props) {
    const [value, setValue] = React.useState(null);
    const users = props.users
    const dispatch = useDispatch()
    function onChangeUser(username) {
        dispatch({type: USER_STATS, payload: userStats(username)})
    }
    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
                onChangeUser(newValue)
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={users}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.username;
            }}
            renderOption={(option) => option.username}
            style={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Search User" variant="outlined" />
            )}
        />
    );
}