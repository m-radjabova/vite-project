import { Box, Divider, IconButton, Modal, TextField, Typography } from "@mui/material"
import { Button } from "@mui/material"
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { FaTimes } from "react-icons/fa"

interface Service {
    id: number
    name: string
    description: string
    imgUrl: string
}

interface Props {
    open: boolean
    onClose: () => void
    addService: (data: Omit<Service, "id">) => void
    updateService: (data: Service) => void 
    selectedService: Service | null
}

function AdminServicesForm({ open, onClose, addService, updateService, selectedService }: Props) {
    const [serviceData, setServiceData] = useState<Omit<Service, "id">>({
        name: '',
        description: '',
        imgUrl: ''
    });

    useEffect(() => {
        if (selectedService ) {
            setServiceData({
                name: selectedService.name,
                description: selectedService.description,
                imgUrl: selectedService.imgUrl
            });
        } else {
            setServiceData({
                name: '',
                description: '',
                imgUrl: ''
            });
        }
    }, [selectedService]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedService && updateService) {
            updateService({ ...serviceData, id: selectedService.id });
        } else {
            addService(serviceData);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="service-modal-title"
            aria-describedby="service-modal-description"
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
                    transform: open ? 'scale(1)' : 'scale(0.95)',
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
                onSubmit={handleSubmit}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography 
                        id="service-modal-title" 
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
                        {selectedService ? 'Edit Service' : 'Add New Service'}
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
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={serviceData.name}
                        onChange={handleInputChange}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        variant="outlined"
                        name="description"
                        value={serviceData.description}
                        onChange={handleInputChange}
                        required
                    />
    
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Image URL"
                        variant="outlined"
                        name="imgUrl"
                        value={serviceData.imgUrl}
                        onChange={handleInputChange}
                        required
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
                        {selectedService ? 'Update Service' : 'Add Service'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AdminServicesForm;