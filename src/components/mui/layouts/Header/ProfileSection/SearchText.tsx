import { useState } from "react"

import Icon from "@mui/material/Icon/Icon"
import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput"

import { borderRadius } from "./"

const SearchText = () => {
  const [value, setValue] = useState("")
  return (
    <>
      <OutlinedInput
        sx={{
          width: "100%",
          pr: 1,
          pl: 2,
          my: 2,
          borderRadius: `${borderRadius}px`,
        }}
        id="input-search-profile"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari pengaturan"
        startAdornment={
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
      />
    </>
  )
}

export default SearchText
