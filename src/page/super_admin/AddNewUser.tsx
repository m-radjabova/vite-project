import { Dialog, DialogTitle, IconButton, Box, DialogContent, TextField, DialogActions, Button, CircularProgress } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { RiCloseLargeFill } from "react-icons/ri";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../../App";

interface Props {
    open: boolean;
    onClose: () => void;
    addNewUsers: (newUser: User) => void
}

const userSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "Confirm Password is required"})
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"
})

function AddNewUser({ open, onClose, addNewUsers }: Props) {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data: FieldValues) => {
        const newUser: User = {
            id: Math.random().toString(15).substring(2, 15),
            name: data.name,
            email: data.email,
            password: data.password,
            roles: ["USER"]
        };
        addNewUsers(newUser);
        onClose();
        reset();
    };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        px: 3
      }}>
        <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
          Add New User
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <RiCloseLargeFill />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ py: 3, px: 3 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              error={!!errors.name}
              {...register('name')}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  '& fieldset': {
                    borderWidth: '1px !important'
                  }
                }
              }}
            />
             {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
          </Box>

          <Box sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              type="email"
              error={!!errors.email}
              {...register('email')}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  '& fieldset': {
                    borderWidth: '1px !important'
                  }
                }
              }}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          </Box>
          <Box>
            <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                error={!!errors.password}   
                {...register('password')}
                InputProps={{
                    sx: {
                    borderRadius: 2,
                    '& fieldset': {
                        borderWidth: '1px !important'
                    }
                    }
                }}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </Box>
          <Box>
            <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                type="password"
                error={!!errors.password}   
                {...register('confirmPassword')}
                InputProps={{
                    sx: {
                    borderRadius: 2,
                    '& fieldset': {
                        borderWidth: '1px !important'
                    }
                    }
                }}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.400',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                bgcolor: 'primary.dark'
              }
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddNewUser