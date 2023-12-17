import React from "react";
import { FormControlStyle } from "../../../Assets/CSS/Style/style.const";
import { MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { colorAliceBlue } from "../../../Assets/CSS/Style/theme";

const SelectCustom = () => {
  const [dataSelect, setDataSelect] = React.useState("Twenty");

  const handleChange = (event) => {
    setDataSelect(event.target.value);
  };
  return (
    <FormControlStyle fullWidth>
      <Select
        style={{
          borderRadius: "30px",
          overflow: "hidden",
          paddingLeft: "20px",
          fontSize: "14px",
          background: `${colorAliceBlue}`,
          border: "none",
          width: "150px",
        }}
        labelId="demo-simple-select-label"
        defaultValue={dataSelect}
        id="demo-simple-select"
        value={dataSelect || 20}
        onChange={handleChange}
        IconComponent={(props) => {
          return <KeyboardArrowDownIcon {...props} />;
        }}>
        <MenuItem value={"Ten"}>Ten</MenuItem>
        <MenuItem value={"Twenty"}>Twenty</MenuItem>
        <MenuItem value={"Thirty"}>Thirty</MenuItem>
      </Select>
    </FormControlStyle>
  );
};

export default SelectCustom;
