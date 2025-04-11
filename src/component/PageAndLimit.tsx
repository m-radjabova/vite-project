import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { ChangeEvent } from "react";

interface Props{
    limit: number,
    pageSize : number,
    setLimit: React.Dispatch<React.SetStateAction<number>>,
    setPage: React.Dispatch<React.SetStateAction<number>>
}
function PageAndLimit( {limit, setLimit, setPage, pageSize}: Props) {

  const changePage = (event: ChangeEvent<unknown>, value : number) => {
    console.log(event)
      setPage(value)
  }

  return (
    <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3,
                padding: 2,
                borderRadius: "12px",
                border: "1px solid rgb(125, 166, 243)"
              }}>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="rows-per-page-label" sx={{ color: "#8B5D5D" }}>
                    Page Limit
                  </InputLabel>
                  <Select
                    value={limit}
                    onChange={(e) =>{setLimit(Number(e.target.value)); setPage(1) }}
                    labelId="rows-per-page-label"
                    label="limit"
                    sx={{
                      "& .MuiSelect-select": {
                        color: "#5A3A3A",
                      },
                    }}
    
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
                
                <Pagination
                  count={pageSize}
                  onChange={changePage}
                  color="primary"
                  shape="rounded"
                />
              </Box>
  )
}

export default PageAndLimit