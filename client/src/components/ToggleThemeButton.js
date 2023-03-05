import { React, useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

//toggle theme button in all pages
const ToggleThemeButton = ({ lightState , changeState }) => {
  return (
    <Box
    sx={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'text.primary',
      borderRadius: 1,
      p: 3,
    }}
    >
    <IconButton sx={{ ml: 1 }} onClick={changeState} color="inherit">
      {lightState ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
    </Box>
  );
};

export default ToggleThemeButton;








