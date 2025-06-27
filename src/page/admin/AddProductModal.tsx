import { Controller, FieldValues, useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Select,MenuItem,InputLabel,FormControl,
Button,Box,Divider,IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import {AddCircleOutline,Close,ImageOutlined,CategoryOutlined,DescriptionOutlined,AttachMoneyOutlined,MoneyOffOutlined
} from '@mui/icons-material';
import useProducts from "../../hooks/useProduct";
import { useEffect } from "react";

export const PinkDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    backgroundColor: '#fff9fa',
    boxShadow: '0px 4px 20px rgba(255, 182, 193, 0.3)',
    width: '500px',
    maxWidth: '90vw',
  },
}));

export const PinkTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffb6c1',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ff8fab',
      borderWidth: '1px',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ff8fab',
  },
}));

const PinkSelect = styled(Select)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  backgroundColor: '#ffffff',
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffb6c1',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ff8fab',
  },
}));

const PinkButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: '10px 24px',
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  margin: '8px',
}));

export const SubmitButton = styled(PinkButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0px 2px 10px rgba(255, 182, 193, 0.5)',
  },
}));

export const CancelButton = styled(PinkButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: '0px 2px 10px rgba(255, 182, 193, 0.5)',
  },
}));

interface Props{
  open: boolean;
  onClose: () => void;
  editProduct?: FieldValues | null; 
}

function AddProductModal({ open, onClose, editProduct }: Props) {
  const {addProducts, updateProduct} = useProducts();
  const { categories } = useCategories();
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

  useEffect(() => {
    if (editProduct) {
      reset(editProduct); 
    } else {
      reset();
    }
  }, [editProduct, reset]);


  const onSubmit = (data: FieldValues) => {
    if (editProduct && editProduct.id) {
      updateProduct(editProduct.id, data);
    } else {
      addProducts(data);
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
            editProduct ? 'Edit Product' : 'Add New Product'
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
              label="Product Name"
              variant="outlined"
              {...register("name", { required: true })}
              error={!!errors.name}
              helperText={errors.name && "Product name is required"}
              InputProps={{
                startAdornment: (
                  <DescriptionOutlined sx={{ color: '#ff8fab', mr: 1 }} />
                ),
              }}
            />
          </Box>
          
          <Box mb={3}>
            <PinkTextField
              fullWidth
              label="Product Description"
              variant="outlined"
              multiline
              rows={4}
              {...register("description", { required: true })}
              error={!!errors.description}
              helperText={errors.description && "Product description is required"}
            />
          </Box>
          <Box mb={3}>
            <PinkTextField
              fullWidth
              label="Product Price"
              variant="outlined"
              type="number"
              {...register("price", { required: true, valueAsNumber: true })}
              error={!!errors.price}
              helperText={errors.price && "Product price is required"}
              InputProps={{
                startAdornment: (
                  <AttachMoneyOutlined sx={{ color: '#ff8fab', mr: 1 }} />
                ),
              }}
            />
          </Box>

          <Box mb={3}>
            <PinkTextField
              fullWidth
              label="Product Old Price (optional)"
              variant="outlined"
              type="number"
              {...register("oldPrice", { valueAsNumber: true })}
              InputProps={{
                startAdornment: (
                  <MoneyOffOutlined sx={{ color: '#ff8fab', mr: 1 }} />
                ),
              }}
            />
          </Box>
          
          <Box mb={3}>
            <PinkTextField
              fullWidth
              label="Product Image URL"
              variant="outlined"
              {...register("image", { required: true })}
              error={!!errors.image}
              helperText={errors.image && "Product image URL is required"}
              InputProps={{
                startAdornment: (
                  <ImageOutlined sx={{ color: '#ff8fab', mr: 1 }} />
                ),
              }}
            />
          </Box>
          
          <Box mb={3}>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.categoryId}>
                  <InputLabel id="category-label">Product Category</InputLabel>
                  <PinkSelect
                    labelId="category-label"
                    label="Product Category"
                    {...field}
                    value={field.value || ""}
                    startAdornment={
                      <CategoryOutlined sx={{ color: '#ff8fab', mr: 1 }} />
                    }
                  >
                    <MenuItem value="">
                      <em>Select a category</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </PinkSelect>
                  {errors.categoryId && (
                    <Box sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: 1 }}>
                      Product category is required
                    </Box>
                  )}
                </FormControl>
              )}
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
          {editProduct ? 'Edit Product' : 'Add Product'}
        </SubmitButton>
      </DialogActions>
    </PinkDialog>
  );
}

export default AddProductModal;