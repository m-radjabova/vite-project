import { Box, Divider, IconButton, Modal, TextField, Typography, Button } from "@mui/material"
import { FaTimes } from "react-icons/fa"
import { FieldValues, useForm } from "react-hook-form";
import { CommentType } from "../page/Comments";

interface Props {
    open: boolean;
    onClose: () => void;
    addComments: (newComment: Omit<CommentType, "id" | "postId" | "userId" >) => void;
}


const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: '#cce4ff',
      },
      '&:hover fieldset': {
        borderColor: '#90caf9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#42a5f5',
        boxShadow: `0 0 0 2px rgba(66, 165, 245, 0.2)`
      },
    },
    '& .MuiInputLabel-root': {
      color: '#5f7eaa',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#1e88e5',
    },
    '& .MuiInputBase-input': {
      color: '#0d2b4a',
    }
};

function AddCommentForm({ open, onClose, addComments }: Props ) {

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            email: '',
            body: '',
        }
    })


    const submit = (data: FieldValues) => {
        const newComment: Omit<CommentType, "id" | "postId" | "userId"> = {
            name: data.name,
            email: data.email,
            body: data.body
        };
        console.log(newComment)
        addComments(newComment);
        reset();
        onClose();
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="user-modal-title"
            aria-describedby="user-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(240, 248, 255, 0.4)',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '90%', sm: '80%', md: '600px' },
                    bgcolor: '#f0f7ff',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(66, 133, 244, 0.2)',
                    p: 4,
                    outline: 'none',
                    transform: open? 'scale(1)' : 'scale(0.95)',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid #d0e2ff',
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '80px',
                        height: '80px',
                        background: 'radial-gradient(circle, #e0f0ff 0%, transparent 70%)',
                        transform: 'translate(-30%, -30%)',
                        borderRadius: '50%',
                    }
                }}
                component="form"
                onSubmit={handleSubmit(submit)}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        id="user-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: '#0d2b4a',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            pl: 1
                        }}
                    >
                        Add Comment
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="close"
                        sx={{
                            color: '#5f7eaa',
                            '&:hover': {
                                backgroundColor: '#e3f2fd',
                                transform: 'rotate(90deg)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <FaTimes style={{ fontSize: '1.2rem' }} />
                    </IconButton>
                </Box>
        
                <Divider sx={{
                    my: 3,
                    borderColor: '#d0e2ff',
                    borderWidth: '1px'
                }} />
        
                <Box sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    '& .MuiTextField-root': {
                        mb: 0
                    }
                }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="name"
                        variant="outlined"
                        type="text"
                        sx={textFieldStyles}
                        {...register('name', { required: true })}
                    />


                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        type="email"
                        sx={textFieldStyles}
                        {...register('email', {required: true})}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Body"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...register('body', {required: true})}
                        sx={{
                            ...textFieldStyles,
                            gridColumn: '1 / -1'
                        }}
                    />
                </Box>
        
                <Divider sx={{
                    my: 3,
                    borderColor: '#d0e2ff',
                    borderWidth: '1px'
                }} />
        
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        startIcon={<FaTimes />}
                        sx={{
                            color: '#1e88e5',
                            borderColor: '#90caf9',
                            borderRadius: '12px',
                            px: 3,
                            '&:hover': {
                                backgroundColor: '#e3f2fd',
                                borderColor: '#42a5f5',
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            background: `linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)`,
                            borderRadius: '12px',
                            px: 3,
                            color: '#fff',
                            boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: '0 6px 16px rgba(66, 133, 244, 0.4)',
                            },
                            transition: 'all 0.2s ease',
                            '&:disabled': {
                                background: '#e0e0e0',
                                color: '#a0a0a0'
                            }
                        }}
                    >
                        Add new comment
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddCommentForm;