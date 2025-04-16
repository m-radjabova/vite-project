import { FormControl, InputLabel, MenuItem, Pagination, Select} from "@mui/material";
import Stack from '@mui/material/Stack';
import { ChangeEvent } from "react";

interface Props {
    limit: number,
    pageSize : number,
    setLimit: React.Dispatch<React.SetStateAction<number>>,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}
function PageAndLimitPhoto({limit, setLimit, setPage, pageSize}: Props) {

     const changePage = (event: ChangeEvent<unknown>, value : number) => {
            console.log(event)
            setPage(value)
    }
  return (
    <div className="pageAndLimit">
                    <FormControl sx={{ minWidth: 150 }} size="small">
                        <InputLabel id="rows-per-page-label" sx={{ color: "#5a8f7b" }}>
                            Items per page
                        </InputLabel>
                            <Select
                                value={limit}
                                onChange={(e) => {setLimit(Number(e.target.value)); setPage(1); }}
                                labelId="rows-per-page-label"
                                label="Items per page"
                                className="photo-select-items"
                            >
                                {[10,20, 30, 40, 50, 60, 70,80,90,100].map(num => (
                                    <MenuItem
                                        key={num}
                                        value={num}
                                        sx={{ color: "#f1a221" }}
                                    >
                                        Show {num}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack spacing={2}>
                            <Pagination
                                count={pageSize}
                                onChange={changePage}
                                color="secondary"
                                className="photo-pagination"
                            />
                        </Stack>
                </div>
  )
}

export default PageAndLimitPhoto