import {FieldValues, useForm } from "react-hook-form";
import {DialogTitle,DialogContent,DialogActions,Box,Divider,IconButton} from '@mui/material';
import {AddCircleOutline,Close,DescriptionOutlined,ImageOutlined} from '@mui/icons-material';
import { useEffect } from "react";
import { CancelButton, PinkDialog, PinkTextField, SubmitButton } from "../Products/AddProductModal";

interface Props{
  open: boolean;
  onClose: () => void;
  editImage?: FieldValues | null; 
  addImage: (data: FieldValues) => void;
  updateImage : (id: string, data: FieldValues) => void;
}

function AddImageModal({ open, onClose, editImage, addImage, updateImage }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editImage) {
      reset(editImage); 
    } else {
      reset({ image: "", title: "" });
    }
  }, [editImage, reset]);


  const onSubmit = (data: FieldValues) => {
    if (editImage && editImage.id) {
      updateImage(editImage.id, data);
    } else {
      addImage(data);
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
            editImage ? 'Edit Image' : 'Add New Image'
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
              label="Carousel Image URL"
              variant="outlined"
              {...register("image", { required: true })}
              error={!!errors.image}
              helperText={errors.image && "Carousel image URL is required"}
              InputProps={{
                startAdornment: (
                  <ImageOutlined sx={{ color: '#ff8fab', mr: 1 }} />
                ),
              }}
            />
          </Box>
          <Box mb={3}>
            <PinkTextField
              fullWidth
              label="Image Title"
              variant="outlined"
              {...register("title", { required: true })}
              error={!!errors.title}
              helperText={errors.title && "Carousel image title is required"}
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
          {editImage ? 'Edit Image' : 'Add Image'}
        </SubmitButton>
      </DialogActions>
    </PinkDialog>
  );
}

export default AddImageModal;