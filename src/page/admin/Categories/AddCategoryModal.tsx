import {FieldValues, useForm } from "react-hook-form";
import {DialogTitle,DialogContent,DialogActions,Box,Divider,IconButton} from '@mui/material';
import {AddCircleOutline,Close,DescriptionOutlined} from '@mui/icons-material';
import { useEffect } from "react";
import { CancelButton, PinkDialog, PinkTextField, SubmitButton } from "../Products/AddProductModal";

interface Props{
  open: boolean;
  onClose: () => void;
  editCategory?: FieldValues | null
  addCategory: (data: FieldValues) => void;
  updateCategory: (id: string, data: FieldValues) => void;
}

function AddCategoryModal({ open, onClose, editCategory, addCategory, updateCategory }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editCategory) {
      reset(editCategory); 
    } else {
      reset({ categoryName: "" });
    }
  }, [editCategory, reset]);


  const onSubmit = (data: FieldValues) => {
    if (editCategory && editCategory.id) {
      updateCategory(editCategory.id, data);
    } else {
      addCategory(data);
    }
    reset();
    onClose();
  };

  return (
    <PinkDialog open={open} onClose={onClose}>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: '#d32f2f',
        padding: '16px 24px'
      }}>
        <Box display="flex" alignItems="center" gap={1}>
          <AddCircleOutline fontSize="medium" />
          {
            editCategory ? 'Edit Category' : 'Add New Category'
          }
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#ff8fab' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <Divider sx={{ borderColor: '#ffd6de' }} />
      
      <DialogContent sx={{ padding: '24px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <Box mb={3}>
            <PinkTextField
              fullWidth
              label="Category Name"
              variant="outlined"
              {...register("categoryName", { required: true })}
              error={!!errors.categoryName}
              helperText={errors.categoryName && "Category name is required"}
              InputProps={{
                startAdornment: (
                  <DescriptionOutlined sx={{ color: '#ff8fab', mr: 1 }} />
                ),
              }}
            />
          </Box>
          
        </form>
      </DialogContent>
      
      <Divider sx={{ borderColor: '#ffd6de' }} />
      
      <DialogActions sx={{ padding: '16px 24px' }}>
        <CancelButton onClick={onClose}>
          Cancel
        </CancelButton>
        <SubmitButton onClick={handleSubmit(onSubmit)}>
          {editCategory ? 'Edit Category' : 'Add Category'}
        </SubmitButton>
      </DialogActions>
    </PinkDialog>
  );
}

export default AddCategoryModal;