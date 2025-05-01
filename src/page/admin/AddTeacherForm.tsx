import { Dialog, DialogTitle, IconButton, Box, DialogContent, TextField, DialogActions, Button, CircularProgress, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../../App";
import { FaChalkboardTeacher, FaEnvelope, FaKey, FaTimes, FaUserEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    open: boolean;
    onClose: () => void;
    addNewTeacher: (newUser: User) => void
}

const userSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

function AddTeacherForm({ open, onClose, addNewTeacher }: Props) {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data: FieldValues) => {
        const newUser: User = {
            id: uuidv4(),
            username: data.name,
            email: data.email,
            password: data.password,
            roles: ["TEACHER"],
        };
        addNewTeacher(newUser);
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
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
          overflow: 'visible'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        py: 2,
        px: 3,
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: -10,
          left: '5%',
          width: '90%',
          height: 10,
          bgcolor: 'primary.main',
          filter: 'blur(10px)',
          zIndex: -1
        }
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1
        }}>
          <FaChalkboardTeacher size={24} className="mr-2" />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Add New Teacher
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{
            p: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'rotate(90deg)',
              transition: 'transform 0.3s ease'
            }
          }}
        >
          <IoMdClose size={20} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ py: 4, px: 4 }}>
          <Box sx={{ mb: 3, position: 'relative' }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              error={!!errors.name}
              {...register('name', { required: 'Full name is required' })}
              InputProps={{
                startAdornment: (
                  <Box sx={{ 
                    color: 'text.secondary',
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FaUserEdit size={18} />
                  </Box>
                ),
                sx: {
                  borderRadius: 2,
                  '& fieldset': {
                    borderWidth: '1px !important',
                    borderColor: 'grey.300 !important'
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main !important'
                  }
                }
              }}
            />
            {errors.name && (
              <Typography variant="caption" color="error" sx={{ 
                position: 'absolute',
                bottom: -20,
                left: 0,
                display: 'flex',
                alignItems: 'center'
              }}>
                {errors.name.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3, position: 'relative' }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              type="email"
              error={!!errors.email}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              InputProps={{
                startAdornment: (
                  <Box sx={{ 
                    color: 'text.secondary',
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FaEnvelope size={18} />
                  </Box>
                ),
                sx: {
                  borderRadius: 2,
                  '& fieldset': {
                    borderWidth: '1px !important',
                    borderColor: 'grey.300 !important'
                  }
                }
              }}
            />
            {errors.email && (
              <Typography variant="caption" color="error" sx={{ 
                position: 'absolute',
                bottom: -20,
                left: 0,
                display: 'flex',
                alignItems: 'center'
              }}>
                {errors.email.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 1, position: 'relative' }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              error={!!errors.password}   
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              InputProps={{
                startAdornment: (
                  <Box sx={{ 
                    color: 'text.secondary',
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FaKey size={18} />
                  </Box>
                ),
                sx: {
                  borderRadius: 2,
                  '& fieldset': {
                    borderWidth: '1px !important',
                    borderColor: 'grey.300 !important'
                  }
                }
              }}
            />
            {errors.password && (
              <Typography variant="caption" color="error" sx={{ 
                position: 'absolute',
                bottom: -20,
                left: 0,
                display: 'flex',
                alignItems: 'center'
              }}>
                {errors.password.message}
              </Typography>
            )}
          </Box>

          <Box sx={{ 
            mt: 3,
            p: 2,
            bgcolor: 'primary.light',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
            <FaChalkboardTeacher size={18} className="mr-2" color="#1976d2" />
            <Typography variant="body2" color="primary.dark">
              This teacher will be automatically assigned the TEACHER role
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 4, py: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            startIcon={<FaTimes size={16} />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.400',
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 500,
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
            startIcon={isSubmitting ? undefined : <FaChalkboardTeacher size={16} />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              boxShadow: 'none',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                boxShadow: 'none',
                bgcolor: 'primary.dark'
              }
            }}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                Adding...
              </>
            ) : (
              'Add Teacher'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddTeacherForm