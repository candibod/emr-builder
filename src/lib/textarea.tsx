import * as React from "react";
import { TextareaAutosize as BaseTextareaAutoSize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

interface TextAreaProps {
  placeholder: string;
  maxRows: number;
  minRows: number;
  error: boolean;
  onChange: Function;
  value: string;
}

export default function CustomTextArea({ placeholder, maxRows, minRows, error, onChange, value }: TextAreaProps) {
  const [text, setText] = React.useState<string>(value);

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutoSize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 2px ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setText(value);
    onChange(value);
  };

  return (
    <Textarea
      autoFocus
      maxRows={maxRows}
      minRows={minRows}
      placeholder={placeholder}
      sx={{ border: error ? "1px solid #f04438" : "1px solid #B0B8C4" }}
      onChange={handleChange}
      value={text}
      onFocus={function (e) {
        var val = e.target.value;
        e.target.value = "";
        e.target.value = val;
      }}
    />
  );
}
