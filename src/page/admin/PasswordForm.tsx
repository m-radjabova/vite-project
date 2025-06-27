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
  const {register,handleSubmit,reset,watch,formState: { errors, isSubmitting },} = useForm();
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
        color: ' #fb6f92',
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
        Change Password
        <IconButton
          edge="end"
          color="inherit"
          onClick={handlePasswordClose}
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
            onClick={() => {
              reset();
              handlePasswordClose();
            }}
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

export default PasswordForm;