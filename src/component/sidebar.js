import React from "react";
import { slide as Menu } from "react-burger-menu";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/Icon';
import { SearchOutlined } from '@mui/icons-material';
function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      <Typography gutterBottom>A</Typography>
      <Slider
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={20}
      />
      <Typography gutterBottom>B</Typography>
      <Slider
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={20}
      />
    </Menu>
  );
};
