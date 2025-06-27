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
  avatar: string | File;
};

function ProfileForm({ open, onClose, handleEdit }: Props) {
  const { state: { user }} = useContextPro();
  const {register,handleSubmit,reset,formState: { errors, isSubmitting },} = useForm<FormData>();

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
          borderRadius: 4,
          boxShadow: '0 8px 40px 0 rgba(251, 111, 146, 0.15)',
          overflow: 'hidden',
          border: '1.5px solid #ffd6de',
          background: 'linear-gradient(135deg, #fff5fa 0%, #ffe0ec 100%)',
          backdropFilter: 'blur(2px)'
        }
      }}
    >
      <DialogTitle sx={{
        bgcolor: 'linear-gradient(90deg, #ffb6c1 0%, #fb6f92 100%)',
        color: '#fb6f92',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2.5,
        px: 4,
        fontWeight: 700,
        fontSize: '1.35rem',
        letterSpacing: '0.5px',
        borderBottom: '1.5px solid #ffd6de',
        boxShadow: '0 2px 12px 0 rgba(251, 111, 146, 0.07)'
      }}>
        Edit Profile
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            background: 'rgba(255,255,255,0.18)',
            color: '#fb6f92',
            ml: 1,
            '&:hover': {
              backgroundColor: '#fb6f92',
              color: '#fff',
              transform: 'scale(1.1)',
              transition: 'all 0.2s ease'
            }
          }}
        >
          <RiCloseLargeFill />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{
          py: 4,
          px: 4,
          bgcolor: 'transparent'
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
                  borderRadius: 3,
                  bgcolor: '#fff',
                  fontWeight: 500,
                  fontSize: '1.08rem',
                  color: '#fb6f92',
                  boxShadow: '0 2px 12px 0 rgba(251, 111, 146, 0.05)',
                  '& fieldset': {
                    borderColor: '#ffd6de'
                  },
                  '&:hover fieldset': {
                    borderColor: '#fb6f92'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fb6f92 !important'
                  }
                }
              }}
              InputLabelProps={{
                sx: {
                  color: '#fb6f92',
                  fontWeight: 600,
                  '&.Mui-focused': {
                    color: '#fb6f92'
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
                  borderRadius: 3,
                  bgcolor: '#fff',
                  fontWeight: 500,
                  fontSize: '1.08rem',
                  color: '#fb6f92',
                  boxShadow: '0 2px 12px 0 rgba(251, 111, 146, 0.05)',
                  '& fieldset': {
                    borderColor: '#ffd6de'
                  },
                  '&:hover fieldset': {
                    borderColor: '#fb6f92'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fb6f92 !important'
                  }
                }
              }}
              InputLabelProps={{
                sx: {
                  color: '#fb6f92',
                  fontWeight: 600,
                  '&.Mui-focused': {
                    color: '#fb6f92'
                  }
                }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{
          px: 4,
          py: 2.5,
          bgcolor: 'transparent',
          borderTop: '1.5px solid #ffd6de'
        }}>
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 3,
              border: '1.5px solid #fb6f92',
              color: '#fb6f92',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              bgcolor: 'rgba(251, 111, 146, 0.08)',
              '&:hover': {
                bgcolor: '#ffd6de',
                borderColor: '#fb6f92'
              },
              transition: 'all 0.2s ease'
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
              borderRadius: 3,
              bgcolor: '#fb6f92',
              color: '#fff',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 2px 12px 0 rgba(251, 111, 146, 0.10)',
              '&:hover': {
                bgcolor: '#d23c67',
                boxShadow: '0 2px 12px 0 rgba(251, 111, 146, 0.18)'
              },
              '&:disabled': {
                bgcolor: '#ffd6de',
                color: '#fff'
              },
              transition: 'all 0.2s ease'
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