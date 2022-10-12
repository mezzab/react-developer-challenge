import React, { useState } from 'react'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface MenuButtonProps {
  options: string[]
  selected: string | JSX.Element
  onSelect?: (selected: string) => void
}

export default function MenuButton({
  options,
  onSelect,
  selected,
}: MenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (o: string) => {
    setAnchorEl(null)
    typeof o === 'string' && options.includes(o) && onSelect && onSelect(o)
  }

  return (
    <div>
      <Button
        id="customized-button"
        aria-controls={isOpen ? 'customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        <>
          {selected}
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </>
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
      >
        {options.map((o) => (
          <MenuItem key={o} onClick={() => handleClose(o)} disableRipple>
            {o}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
