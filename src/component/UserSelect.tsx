import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User } from '../App';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  users: User[];
  selectedUsers: number[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<number[]>>;
}


function UserSelect({ users, selectedUsers, setSelectedUsers }: Props) {
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const newSelectedUsers = typeof value === 'string' ? value.split(',').map(Number) : value;
  
    if (newSelectedUsers.includes(-1) || newSelectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(newSelectedUsers);
    }
  };

  return (
    <div>
      <FormControl fullWidth className='mb-5'>
        <InputLabel id="demo-multiple-name-label">Users</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedUsers}
          onChange={handleChange}
          input={<OutlinedInput label="Users" />}
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default UserSelect