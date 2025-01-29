import React from 'react';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb"> {/* Tarih formatı DD/MM/YYYY */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        <DatePicker
          label="Start Date"
          value={startDate ? moment(startDate, 'YYYY-MM-DD') : null} 
          onChange={(newValue: Moment | null) => {
            if (newValue?.isValid()) {
              onStartDateChange(newValue.format('YYYY-MM-DD')); 
            } else {
              onStartDateChange(''); 
            }
          }}
          slotProps={{
            textField: {
              sx: { width: '25%' },
              inputProps: { placeholder: 'DD/MM/YYYY' }, 
            },
          }}
          format="DD/MM/YYYY" // Görüntü formatı
        />
        <DatePicker
          label="End Date"
          value={endDate ? moment(endDate, 'YYYY-MM-DD') : null}
          onChange={(newValue: Moment | null) => {
            if (newValue?.isValid()) {
              onEndDateChange(newValue.format('YYYY-MM-DD'));
            } else {
              onEndDateChange('');
            }
          }}
          slotProps={{
            textField: {
              sx: { width: '25%' },
              inputProps: { placeholder: 'DD/MM/YYYY' },
            },
          }}
          format="DD/MM/YYYY"
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateFilter;
