import {FieldValues, useForm } from "react-hook-form";
import {DialogTitle, DialogContent, DialogActions, Box, Divider, IconButton, Dialog, TextField, Button, Typography} from '@mui/material';
import {AddCircleOutline, Cancel, Close, DescriptionOutlined} from '@mui/icons-material';
import { useEffect } from "react";

interface Props{
  open: boolean;
  onClose: () => void;
  editArticle?: FieldValues | null;
  addArticle: (data: FieldValues) => void;
  updateArticle: (id: string, data: FieldValues) => void;
}

function AddArticleModal({ open, onClose, editArticle, addArticle, updateArticle }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (editArticle) {
      reset(editArticle); 
    } else {
      reset({ title: "", date: "", description: "", image: "" });
    }
  }, [editArticle, reset]);

    const formatDateTime = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const onSubmit = (data: FieldValues) => {
        const articleData = {
            ...data,
            createdAt: formatDateTime(new Date())
        };

        if (editArticle && editArticle.id) {
            updateArticle(editArticle.id, articleData);
        } else {
            addArticle(articleData);
        }
        
        reset({ title: "", date: "", description: "", image: "" });
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
            {editArticle ? 'Edit Article' : 'Add New Article'}
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
          <Box mb={3}>
            <TextField
                fullWidth
                label="Date"
                type="date"  
                variant="outlined"
                InputLabelProps={{
                shrink: true,  
                }}
                {...register("date", { required: true })}
                error={!!errors.date}
                helperText={errors.date && "Date is required"}
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
          <Box mb={3}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              {...register("description", { required: true })}
              error={!!errors.description}
              helperText={errors.description && "description is required"}
              multiline
              rows={4}
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
          <Box mb={3}>
            <TextField
              fullWidth
              label="Image"
              variant="outlined"
              {...register("image", { required: true })}
              error={!!errors.image}
              helperText={errors.image && "image is required"}
              multiline
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
          {editArticle ? 'Update Article' : 'Add Article'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddArticleModal;