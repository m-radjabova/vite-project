import {FieldValues, useForm } from "react-hook-form";
import {DialogTitle, DialogContent, DialogActions, Box, Divider, IconButton, Dialog, TextField, Button, Typography} from '@mui/material';
import {AddCircleOutline, Cancel, Close, DescriptionOutlined} from '@mui/icons-material';
import { useEffect } from "react";

interface Props{
  open: boolean;
  onClose: () => void;
  editCategory?: FieldValues | null;
  addCategory: (data: FieldValues) => void;
  updateCategory: (id: string, data: FieldValues) => void;
}

function AddCategoryModal({ open, onClose, editCategory, addCategory, updateCategory }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editCategory) {
      reset(editCategory); 
    } else {
      reset({ title: "" });
    }
  }, [editCategory, reset]);

  const onSubmit = (data: FieldValues) => {
    if (editCategory && editCategory.id) {
      updateCategory(editCategory.id, data);
    } else {
      addCategory(data);
    }
    reset( { title: "" });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          background: 'linear-gradient(to bottom right, #faf5ff, #f3e5ff)',
          boxShadow: '0px 4px 20px rgba(149, 117, 205, 0.3)',
          minWidth: '400px'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: '#6a1b9a',
        padding: '20px 24px',
        background: 'linear-gradient(to right, #f3e5f5, #e1bee7)',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px'
      }}>
        <Box display="flex" alignItems="center" gap={1}>
          <AddCircleOutline fontSize="medium" sx={{ color: '#7b1fa2' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editCategory ? 'Edit Category' : 'Add New Category'}
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          sx={{ 
            color: '#9c27b0',
            '&:hover': {
              backgroundColor: 'rgba(156, 39, 176, 0.08)'
            }
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
              label="Title"
              variant="outlined"
              {...register("title", { required: true })}
              error={!!errors.title}
              helperText={errors.title && "Category name is required"}
              InputProps={{
                startAdornment: (
                  <DescriptionOutlined sx={{ color: '#9c27b0', mr: 1 }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ba68c8',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9c27b0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7b1fa2',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9c27b0',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#7b1fa2',
                }
              }}
            />
          </Box>
        </form>
      </DialogContent>
      
      <Divider sx={{ borderColor: '#e1bee7' }} />
      
      <DialogActions sx={{ 
        padding: '16px 24px',
        background: 'linear-gradient(to right, #f3e5f5, #e1bee7)',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px'
      }}>
        <Button
          startIcon={<Cancel />}
          onClick={onClose}
          sx={{
            color: '#7b1fa2',
            '&:hover': {
              backgroundColor: 'rgba(123, 31, 162, 0.08)'
            }
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
          {editCategory ? 'Update Category' : 'Add Category'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCategoryModal;