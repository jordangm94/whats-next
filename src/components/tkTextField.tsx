import { TextFieldProps, TextField } from "@mui/material";

export type TkTextFieldProps = TextFieldProps & {
  sx?: any;
  label?: string;
  variant?: string;
  placeholder: string;
  multiline: boolean;
  maxRows?: number;
  maxLength?: number;
};

export const TkTextField = ({
  sx,
  label,
  variant,
  placeholder,
  multiline,
  maxRows,
  maxLength,
  ...props
}: TkTextFieldProps) => {
  return (
    <TextField
      label={label}
      variant={variant}
      placeholder={placeholder}
      multiline={multiline}
      maxRows={maxRows}
      slotProps={{ htmlInput: { maxLength: maxLength ? maxLength : 50 } }}
      sx={{
        "& .MuiInput-underline:before": {
          borderBottom: "1px solid white",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: "1px solid white",
        },
        "& .MuiInput-underline:after": {
          borderBottom: "1px solid white",
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white",
        },
        "& .MuiInputBase-input": {
          color: "white",
        },
        ...sx,
      }}
      {...props}
      fullWidth
    />
  );
};
