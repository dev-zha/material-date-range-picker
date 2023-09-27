import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import DateRangePicker from './DateRangePicker';

export default function App() {
  const [value, setValue] = React.useState<(Dayjs | null)[]>([]);

  const handleChange = (newValue: (Dayjs | null)[]) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker value={value} onChange={handleChange} error="" />
    </LocalizationProvider>
  );
}
