import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material"
import { FieldValues, useForm } from "react-hook-form";
import { RiCloseLargeFill } from "react-icons/ri"
import { toast } from "react-toastify";
import apiClient from "../../apiClient/ApiClient";
import useContextPro from "../../hooks/useContextPro";

interface Props {
  passwordOpen: boolean;
  handlePasswordClose: () => void;
}

function PasswordForm({ passwordOpen, handlePasswordClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { state: { user }, dispatch } = useContextPro();

  const onSubmit = async (data: FieldValues) => {
    try {
      await apiClient.patch(`/users/${user?.id}`, {
        password: data.password
      });
      
      dispatch({ type: "CHANGE_PASSWORD", payload: data.password });
      
      toast.success("Password updated successfully!");
      handlePasswordClose();
      reset();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    }
  }
  
  const password = watch("password");

  return (
    <Dialog
      open={passwordOpen}
      onClose={handlePasswordClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          border: '1px solid #ffd8b2'
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
        Change Password
        <IconButton
          edge="end"
          color="inherit"
          onClick={handlePasswordClose}
          disabled={isSubmitting}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
          py: 3, 
          px: 3,
          bgcolor: '#fff8f0'
        }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              variant="outlined"
              margin="normal"
              error={!!errors.password}
              helperText={
                errors.password?.type === "required" ? "Password is required" :
                errors.password?.type === "minLength" ? "Minimum 6 characters" :
                ""
              }
              {...register("password", {
                required: true,
                minLength: 6
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
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e67a00 !important'
                  }
                }
              }}
              InputLabelProps={{
                sx: {
                  color: '#e67a00',
                  '&.Mui-focused': {
                    color: '#e67a00'
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 1 }}>
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword?.type === "required"
                  ? "Confirm your password"
                  : errors.confirmPassword?.type === "validate"
                  ? "Passwords do not match"
                  : ""
              }
              {...register("confirmPassword", {
                required: true,
                validate: value => value === password || "Passwords do not match"
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
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e67a00 !important'
                  }
                }
              }}
              InputLabelProps={{
                sx: {
                  color: '#e67a00',
                  '&.Mui-focused': {
                    color: '#e67a00'
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
            onClick={() => {
              reset();
              handlePasswordClose();
            }}
            disabled={isSubmitting}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              border: '1px solid',
              borderColor: '#ffb347',
              color: '#e67a00',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: 'rgba(255, 179, 71, 0.1)',
                borderColor: '#e67a00'
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
              borderRadius: 2,
              bgcolor: '#ffb347',
              color: 'white',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#e67a00',
                boxShadow: 'none'
              },
              '&:disabled': {
                bgcolor: '#ffd8b2',
                color: 'white'
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

export default PasswordForm;