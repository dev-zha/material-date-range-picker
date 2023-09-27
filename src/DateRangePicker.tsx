import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  borderRadius: '50%',
  '&:hover': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.dark,
  },
  ...(dayIsBetween && {
    '&:focus': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...((isFirstDay || isLastDay) && {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function Day(
  props: PickersDayProps<Dayjs> & {
    startDay?: Dayjs | null;
    endDay?: Dayjs | null;
  }
) {
  const { day, startDay, endDay, ...other } = props;

  if (!startDay && !endDay) {
    return <PickersDay day={day} {...other} />;
  }

  const start = startDay || endDay;
  const end = endDay || startDay;

  const dayIsBetween = day.isBetween(start, end, null, '[]');
  const isFirstDay = day.isSame(start, 'day');
  const isSunday = day.day() === 0;
  const isSaturday = day.day() === 6;
  const isLastDay = day.isSame(end, 'day');

  return (
    <div
      style={{
        ...(dayIsBetween && {
          backgroundColor: '#eee',
        }),
        ...((isFirstDay || isSunday) && {
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
        }),
        ...((isLastDay || isSaturday) && {
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '50%',
        }),
      }}
    >
      <CustomPickersDay
        {...other}
        day={day}
        sx={dayIsBetween ? { px: 2.5, mx: 0 } : {}}
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    </div>
  );
}

function CustomTextField(
  props: any & {
    error?: string;
  }
) {
  const { error, startDay, endDay } = props;

  return (
    <TextField
      {...props}
      size="small"
      error={!!error}
      helperText={error && `* ${error}`}
      sx={{ minWidth: '280px' }}
      placeholder={'Start - End'}
      value={`${startDay ? startDay.format('D MMM YYYY') : 'Start'} - ${
        endDay ? endDay.format('D MMM YYYY') : 'End'
      }`}
    />
  );
}

interface DateRangePickerProps {
  value: (Dayjs | null)[];
  onChange: (value: (Dayjs | null)[]) => void;
  error?: string;
}

export default function DateRangePicker({
  value,
  onChange,
  error,
}: DateRangePickerProps) {
  const [startTurn, setStartTurn] = React.useState(true);
  const startDay = value[0];
  const endDay = value[1];

  const updateValue = (newVal: (Dayjs | null)[]) => {
    onChange(newVal);
  };

  const handleChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      return;
    }
    if (startTurn) {
      const isReverse = newValue?.isAfter(endDay);
      if (isReverse) {
        updateValue([newValue, null]);
      } else {
        updateValue([newValue, endDay]);
      }
      setStartTurn(false);
    } else {
      const isReverse = newValue?.isBefore(startDay);
      if (isReverse) {
        updateValue([newValue, endDay]);
        setStartTurn(false);
      } else {
        updateValue([startDay, newValue]);
        setStartTurn(true);
      }
    }
  };

  return (
    <DatePicker
      value={startTurn ? startDay : endDay}
      label={'Date Range'}
      onChange={handleChange}
      showDaysOutsideCurrentMonth
      disableHighlightToday
      closeOnSelect={false}
      autoFocus={false}
      slots={{ day: Day, textField: CustomTextField }}
      slotProps={{
        day: {
          startDay: startDay,
          endDay: endDay,
        } as any,
        textField: {
          error: error,
          startDay: startDay,
          endDay: endDay,
        } as any,
      }}
    />
  );
}
