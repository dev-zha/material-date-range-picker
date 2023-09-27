import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DateRangePicker from './DateRangePicker';

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker />
    </LocalizationProvider>
  );
}
