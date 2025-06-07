import useContextPro from '../../hooks/useContextPro';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, CircularProgress, Box } from '@mui/material';
import { RiCloseLargeFill } from "react-icons/ri";

interface Props {
  open: boolean;
  onClose: () => void;
  handleEdit: (data: FormData) => Promise<boolean>;
}

type FormData = {
  name: string;
  email: string;
};

function ProfileForm({ open, onClose, handleEdit }: Props) {
  const { state: { user }} = useContextPro();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.username || '',
        email: user.email || ''
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await handleEdit(data);
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
    }
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
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: '#ffb347', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        px: 3,
        fontWeight: 600,
        fontSize: '1.25rem'
      }}>
        Edit Profile
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        >
          <RiCloseLargeFill />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ 
          py: 3, 
          px: 3,
          bgcolor: '#fff8f0' 
        }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', { required: 'Name is required' })}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  bgcolor: 'white',
                  '& fieldset': {
                    borderColor: '#ffd8b2' 
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffb347' 
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  bgcolor: 'white',
                  '& fieldset': {
                    borderColor: '#ffd8b2'
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffb347'
                  }
                }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          px: 3, 
          py: 2,
          bgcolor: '#fff8f0',
          borderTop: '1px solid #ffd8b2'
        }}>
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              border: '1px solid',
              borderColor: '#ffb347',
              color: '#e67a00',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'rgba(255, 179, 71, 0.1)'
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
              bgcolor: '#ffb347',
              color: 'white',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#e67a00',
                boxShadow: 'none'
              },
              '&:disabled': {
                bgcolor: '#ffd8b2'
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
  );
}

export default ProfileForm;