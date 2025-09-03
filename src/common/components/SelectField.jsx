import { useEffect, useState } from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, Autocomplete, TextField, Box,
} from '@mui/material';
import { useEffectAsync } from '../../reactHelper';
import fetchOrThrow from '../util/fetchOrThrow';

const SelectField = ({
  label,
  fullWidth,
  multiple,
  value = null,
  emptyValue = null,
  emptyTitle = '',
  onChange,
  endpoint,
  data,
  keyGetter = (item) => item.id,
  titleGetter = (item) => item.name,
  iconGetter = null,
}) => {
  const [items, setItems] = useState();

  const getOptionLabel = (option) => {
    if (typeof option !== 'object') {
      option = items.find((obj) => keyGetter(obj) === option);
    }
    return option ? titleGetter(option) : emptyTitle;
  };

  useEffect(() => setItems(data), [data]);

  useEffectAsync(async () => {
    if (endpoint) {
      const response = await fetchOrThrow(endpoint);
      setItems(await response.json());
    }
  }, []);

  if (items) {
    return (
      <FormControl fullWidth={fullWidth}>
        {multiple ? (
          <>
            <InputLabel>{label}</InputLabel>
            <Select
              label={label}
              multiple
              value={value}
              onChange={onChange}
            >
              {items.map((item) => (
                <MenuItem key={keyGetter(item)} value={keyGetter(item)}>{titleGetter(item)}</MenuItem>
              ))}
            </Select>
          </>
        ) : (
          <Autocomplete
            size="small"
            options={items}
            getOptionLabel={getOptionLabel}
            renderOption={(props, option) => {
              const IconComponent = iconGetter ? iconGetter(option) : null;
              return (
                <MenuItem {...props} key={keyGetter(option)} value={keyGetter(option)}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {IconComponent && <IconComponent fontSize="small" />}
                    {titleGetter(option)}
                  </Box>
                </MenuItem>
              );
            }}
            isOptionEqualToValue={(option, value) => keyGetter(option) === value}
            value={value}
            onChange={(_, value) => onChange({ target: { value: value ? keyGetter(value) : emptyValue } })}
            renderInput={(params) => {
              const selectedOption = items.find(item => keyGetter(item) === value);
              const IconComponent = iconGetter && selectedOption ? iconGetter(selectedOption) : null;
              return (
                <TextField 
                  {...params} 
                  label={label}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: IconComponent ? (
                      <Box display="flex" alignItems="center" sx={{ mr: 1 }}>
                        <IconComponent fontSize="small" />
                      </Box>
                    ) : params.InputProps.startAdornment,
                  }}
                />
              );
            }}
          />
        )}
      </FormControl>
    );
  }
  return null;
};

export default SelectField;
