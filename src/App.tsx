import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import DateRangePicker from './DateRangePicker';
import './App.css';

export default function App() {
  const [value, setValue] = React.useState<(Dayjs | null)[]>([]);

  const handleChange = (newValue: (Dayjs | null)[]) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h1>Date Range Picker</h1>
      <p>Build with Normal Material Date Picker</p>
      <br />
      <p>
        {'Selected Date Range : '}
        <span className="date-text">
          {value[0]?.format('YYYY-MM-DD') || '-'}
        </span>
        {' to '}
        <span className="date-text">
          {value[1]?.format('YYYY-MM-DD') || '-'}
        </span>
      </p>
      <br />
      <DateRangePicker value={value} onChange={handleChange} error="" />
    </LocalizationProvider>
  );
}
