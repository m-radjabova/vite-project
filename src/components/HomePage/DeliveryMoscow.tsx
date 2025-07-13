import { Select, MenuItem, FormControl, InputBase } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from "@mui/material/styles";

export const CustomSelect = styled(Select)({
  background: "transparent",
  border: "none",
  fontFamily: "'Rubik', Arial, sans-serif",
  fontSize: "1.13rem",
  color: "#7a837b",
  paddingLeft: 24,
  paddingRight: 38,
  height: 56,
  display: "flex",
  alignItems: "center",
  '& .MuiSelect-select': {
    padding: 0,
    display: "flex",
    alignItems: "center",
    height: 56,
  },
  '& fieldset': {
    border: 'none',
  },
  '&:focus': {
    background: "#f1f8e9",
  },
});

export const CustomFormControl = styled(FormControl)({
  flex: 1,
  borderRight: "1px solid #e6efdf",
  '&:last-of-type': {
    borderRight: "none"
  },
  background: "transparent",
  minWidth: 0,
});

function DeliveryMoskow() {
  return (
    <div className="deliveryMoskow">
      <div className="container">
        <div className="title">
          <h1>Доставка цветов в Москве</h1>
        </div>
        <div className="delivery-filters" style={{
          display: "flex",
          marginTop: 20,
          background: "#f8fbf4",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #f0f4ec"
        }}>
          <CustomFormControl>
            <CustomSelect
              defaultValue=""
              IconComponent={KeyboardArrowDownIcon}
              input={<InputBase />}
              disableUnderline
              displayEmpty
            >
              <MenuItem value="">Цена ...</MenuItem>
              <MenuItem value={10}>до 1000₽</MenuItem>
              <MenuItem value={20}>1000₽ - 3000₽</MenuItem>
              <MenuItem value={30}>от 3000₽</MenuItem>
            </CustomSelect>
          </CustomFormControl>
          <CustomFormControl>
            <CustomSelect
              defaultValue=""
              IconComponent={KeyboardArrowDownIcon}
              input={<InputBase />}
              disableUnderline
              displayEmpty
            >
              <MenuItem value="">Цветы ...</MenuItem>
              <MenuItem value={10}>Розы</MenuItem>
              <MenuItem value={20}>Тюльпаны</MenuItem>
              <MenuItem value={30}>Пионы</MenuItem>
            </CustomSelect>
          </CustomFormControl>
          <CustomFormControl>
            <CustomSelect
              defaultValue=""
              IconComponent={KeyboardArrowDownIcon}
              input={<InputBase />}
              disableUnderline
              displayEmpty
            >
              <MenuItem value="">Кому ...</MenuItem>
              <MenuItem value={10}>Маме</MenuItem>
              <MenuItem value={20}>Девушке</MenuItem>
              <MenuItem value={30}>Коллеге</MenuItem>
            </CustomSelect>
          </CustomFormControl>
          <CustomFormControl>
            <CustomSelect
              defaultValue=""
              IconComponent={KeyboardArrowDownIcon}
              input={<InputBase />}
              disableUnderline
              displayEmpty
            >
              <MenuItem value="">Повод ...</MenuItem>
              <MenuItem value={10}>День рождения</MenuItem>
              <MenuItem value={20}>Свадьба</MenuItem>
              <MenuItem value={30}>Юбилей</MenuItem>
            </CustomSelect>
          </CustomFormControl>
          <CustomFormControl>
            <CustomSelect
              defaultValue=""
              IconComponent={KeyboardArrowDownIcon}
              input={<InputBase />}
              disableUnderline
              displayEmpty
            >
              <MenuItem value="">Стиль ...</MenuItem>
              <MenuItem value={10}>Классика</MenuItem>
              <MenuItem value={20}>Микс</MenuItem>
              <MenuItem value={30}>Авторский</MenuItem>
            </CustomSelect>
          </CustomFormControl>
        </div>
      </div>
    </div>
  );
}

export default DeliveryMoskow;