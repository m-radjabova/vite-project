import {Modal,Box,Button,IconButton,Typography,List,ListItem,ListItemText} from "@mui/material";
import { MdClose } from 'react-icons/md';
import { RiStarSmileLine } from 'react-icons/ri';
import { FaCartPlus } from 'react-icons/fa';
import { FiPlus, FiMinus} from 'react-icons/fi';
import { GiMoneyStack } from 'react-icons/gi';
import { ProductType } from "../types/Types";

interface Props{
    selectedProduct: ProductType | null
    handleViewClose:()=>void
    count:number
    setCount: React.Dispatch<React.SetStateAction<number>>
    handleAdd : () => void
}

function ViewModalProduct({selectedProduct, handleViewClose, count, setCount, handleAdd }: Props) {
  return (
    <Modal
                  open={Boolean(selectedProduct)}
                  onClose={handleViewClose}
                  aria-labelledby="product-modal-title"
                  aria-describedby="product-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      borderRadius: "24px",
                      boxShadow: 24,
                      p: 4,
                      minWidth: 600,
                      maxWidth: "90vw",
                      outline: "none",
                      border: '1px solid rgba(0,0,0,0.1)',
                      '&:focus-visible': {
                        outline: 'none'
                      }
                    }}
                  >
                    <IconButton
                      aria-label="close"
                      onClick={handleViewClose}
                      sx={{
                        position: "absolute",
                        right: 16,
                        top: 16,
                        color: "text.secondary",
                        bgcolor: 'rgba(0,0,0,0.04)',
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.08)',
                          color: "text.primary"
                        },
                        transition: 'all 0.2s ease',
                        zIndex: 1
                      }}
                    >
                      <MdClose size={28} />
                    </IconButton>
        
                    <Typography id="product-modal-title" variant="h4" fontWeight={700} mb={2}>
                      {selectedProduct?.name}
                    </Typography>
        
                    <Box display="flex" gap={3}>
                      <img
                        src={selectedProduct?.imageUrl}
                        alt={selectedProduct?.name}
                        style={{
                          width: "220px",
                          height: "220px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Box flex={1}>
                        <Typography variant="body1" mb={1}  color="text.secondary">
                          {selectedProduct?.description}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={500} mb={0.5} mt={2}>
                          Состав:
                        </Typography>
                        <List dense sx={{ py: 0, mb: 1 }}>
                          {selectedProduct?.compound.split(",").map((item, idx) => (
                            <ListItem disableGutters key={idx} sx={{ py: 0.5, px: 2 }}>
                              <RiStarSmileLine style={{ 
                                color: "#FF7020", 
                                marginRight: "8px", 
                                flexShrink: 0,
                                fontSize: "1.2rem"
                              }} />
                              <ListItemText primary={item.trim()} />
                            </ListItem>
                          ))}
                        </List>
                        <Typography color="text.secondary" variant="body2">
                          {selectedProduct?.weight}г
                        </Typography>
                      </Box>
                    </Box>
        
                    <Box
                      display="flex"
                      alignItems="center"
                      mt={3}
                      gap={2}
                    >
                      <Button
                        variant="contained"
                        startIcon={<FaCartPlus size={20} />}
                        color="warning"
                        sx={{
                          borderRadius: "12px",
                          py: 1.75,
                          px: 5,
                          fontSize: "1.25rem",
                          fontWeight: 500,
                          boxShadow: '0 4px 12px rgba(255, 112, 32, 0.3)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 16px rgba(255, 112, 32, 0.4)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                        onClick={handleAdd}
                      >
                        Добавить
                      </Button>
        
                      <Box
                        display="flex"
                        alignItems="center"
                        bgcolor="grey.100"
                        borderRadius="12px"
                        px={2}
                        py={1}
                        gap={2}
                        sx={{
                          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}
                      >
                        <IconButton
                          onClick={() => setCount(prev => Math.max(1, prev - 1))}
                          size="large"
                          sx={{
                            color: "text.primary",
                            bgcolor: 'rgba(0,0,0,0.05)',
                            '&:hover': {
                              bgcolor: 'rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <FiMinus size={20} />
                        </IconButton>
                        <Typography variant="h6" fontWeight={500}>
                          {count}
                        </Typography>
                        <IconButton
                          onClick={() => setCount(prev => prev + 1)}
                          size="large"
                          sx={{
                            color: "text.primary",
                            bgcolor: 'rgba(0,0,0,0.05)',
                            '&:hover': {
                              bgcolor: 'rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <FiPlus size={20} />
                        </IconButton>
                      </Box>
        
                      <Box ml="auto" display="flex" alignItems="center" gap={1}>
                        <GiMoneyStack size={28} color="#FF7020" />
                        <Typography variant="h4" fontWeight={700} color="text.primary">
                          {selectedProduct ? selectedProduct.price * count : 0}₽
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
  )
}

export default ViewModalProduct