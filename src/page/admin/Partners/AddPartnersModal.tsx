import {FieldValues, useForm } from "react-hook-form";
import {DialogTitle, DialogContent, DialogActions, Box, Divider, IconButton, Dialog, TextField, Button, Typography} from '@mui/material';
import {AddCircleOutline, Cancel, Close} from '@mui/icons-material';
import { useEffect } from "react";
import { IoMdFlower } from "react-icons/io";

interface Props{
  open: boolean;
  onClose: () => void;
  editPartner?: FieldValues | null;
  addPartner: (data: FieldValues) => void;
  updatePartner: (id: string, data: FieldValues) => void;
}

function AddPartnersModal({ open, onClose, editPartner, addPartner, updatePartner }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editPartner) {
      reset(editPartner);
    } else {
      reset({ title: "", date: "", text: "",});
    }
  }, [editPartner, reset]);

  const onSubmit = (data: FieldValues) => {
    if (editPartner && editPartner.id) {
      updatePartner(editPartner.id, data);
    } else {
      addPartner(data);
    }
    
    reset({ title: "", date: "", text: "", });
    onClose();
  };

  const dialogStyles = {
    borderRadius: '12px',
    background: 'linear-gradient(to bottom right, #faf5ff, #f3e5ff)',
    boxShadow: '0px 4px 20px rgba(149, 117, 205, 0.3)',
    minWidth: '400px'
  };

  const headerFooterStyles = {
    background: 'linear-gradient(to right, #f3e5f5, #e1bee7)',
    color: '#6a1b9a'
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#ba68c8' },
      '&:hover fieldset': { borderColor: '#9c27b0' },
      '&.Mui-focused fieldset': { borderColor: '#7b1fa2' }
    },
    '& .MuiInputLabel-root': { color: '#9c27b0' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#7b1fa2' }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{ sx: dialogStyles }}
    >
      <DialogTitle sx={{ 
        ...headerFooterStyles,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '20px 24px',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px'
      }}>
        <Box display="flex" alignItems="center" gap={1}>
          <AddCircleOutline fontSize="medium" sx={{ color: '#7b1fa2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editPartner ? 'Edit Partner' : 'Add Partner'}
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          sx={{ 
            color: '#9c27b0',
            '&:hover': { backgroundColor: 'rgba(156, 39, 176, 0.08)' }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <Divider sx={{ borderColor: '#e1bee7' }} />
      
      <DialogContent sx={{ padding: '24px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
           <Box mb={3}>
              <TextField
                fullWidth
                label={"Image Logo" }
                variant="outlined"
                type={"text"}
                {...register("imageLogo", { required: true })}
                error={!!errors.imageLogo}
                helperText={errors.imageLogo && `Image Logo is required`}
                multiline={false}
                InputProps={{
                  startAdornment: (
                    <IoMdFlower size={24} color="#9c27b0" />
                  ),
                }}
                sx={textFieldStyles}
              />
            </Box>
        </form>
      </DialogContent>
      
      <Divider sx={{ borderColor: '#e1bee7' }} />
      
      <DialogActions sx={{ 
        ...headerFooterStyles,
        padding: '16px 24px',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px'
      }}>
        <Button
          startIcon={<Cancel />}
          onClick={onClose}
          sx={{
            color: '#7b1fa2',
            '&:hover': { backgroundColor: 'rgba(123, 31, 162, 0.08)' }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          sx={{
            backgroundColor: '#9c27b0',
            color: 'white',
            '&:hover': {
              backgroundColor: '#7b1fa2',
              boxShadow: '0px 2px 10px rgba(156, 39, 176, 0.4)'
            },
            padding: '8px 20px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          {editPartner ? 'Update Partner' : 'Add Partner'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPartnersModal;