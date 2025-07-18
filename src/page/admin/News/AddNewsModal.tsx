import {FieldValues, useForm } from "react-hook-form";
import {DialogTitle, DialogContent, DialogActions, Box, Divider, IconButton, Dialog, TextField, Button, Typography} from '@mui/material';
import {AddCircleOutline, Cancel, Close} from '@mui/icons-material';
import { useEffect } from "react";
import { IoMdFlower } from "react-icons/io";
import { formatDateTime } from "../../types/utils";

interface Props{
  open: boolean;
  onClose: () => void;
  editNews?: FieldValues | null;
  addNews: (data: FieldValues) => void;
  updateNews: (id: string, data: FieldValues) => void;
}

function AddNewsModal({ open, onClose, editNews, addNews, updateNews }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editNews) {
      reset(editNews); 
    } else {
      reset({ title: "", date: "", text: "",});
    }
  }, [editNews, reset]);

  const onSubmit = (data: FieldValues) => {
    const newsData = {
      ...data,
      createdAt: formatDateTime(new Date())
    }

    if (editNews && editNews.id) {
      updateNews(editNews.id, newsData);
    } else {
      addNews(newsData);
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
            {editNews ? 'Edit News' : 'Add News'}
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
          {['title', 'date', 'text'].map((field) => (
            <Box key={field} mb={3}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                variant="outlined"
                type={field === 'date' ? 'date' : 'text'}
                InputLabelProps={field === 'date' ? { shrink: true } : {}}
                {...register(field, { required: true })}
                error={!!errors[field]}
                helperText={errors[field] && `${field} is required`}
                multiline={field === 'text'}
                rows={field === 'text' ? 4 : 1}
                InputProps={{
                  startAdornment: (
                    <IoMdFlower size={24} color="#9c27b0" />
                  ),
                }}
                sx={textFieldStyles}
              />
            </Box>
          ))}
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
          {editNews ? 'Update News' : 'Add News'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNewsModal;