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
          p: { xs: 2, sm: 3, md: 4 },
          minWidth: { xs: "90vw", sm: 340, md: 600 },
          width: { xs: "98vw", sm: "auto" },
          maxWidth: "98vw",
          outline: "none",
          border: '1px solid rgba(0,0,0,0.1)',
          '&:focus-visible': { outline: 'none' },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleViewClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
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

        <Typography id="product-modal-title" variant="h5" fontWeight={700} mb={2} sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } }}>
          {selectedProduct?.name}
        </Typography>

        <Box
          display="flex"
          gap={{ xs: 2, sm: 3 }}
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-start" }}
        >
          <Box sx={{ position: "relative", width: "220px", height: "220px", minWidth: "220px" }}>
            <img
              src={selectedProduct?.imageUrl}
              alt={selectedProduct?.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "16px",
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                maxWidth: "90vw",
                maxHeight: "90vh"
              }}
            />
            <IconButton
              aria-label="close"
              onClick={handleViewClose}
              sx={{
                position: "absolute",
                top: 10,
                right: -50,
                color: "text.danger",
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.15)',
                  color: "text.primary"
                },
                zIndex: 2,
                boxShadow: 1
              }}
              size="small"
              >
              <MdClose size={24} />
            </IconButton>
          </Box>
          <Box flex={1} width="100%">
            <Typography
              variant="body1"
              mb={1}
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                fontSize: { xs: "0.95rem", sm: "1rem" }
              }}
            >
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
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Button
            variant="contained"
            startIcon={<FaCartPlus size={20} />}
            color="warning"
            sx={{
              borderRadius: "12px",
              py: 1.5,
              px: 4,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(255, 112, 32, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(255, 112, 32, 0.4)'
              },
              transition: 'all 0.3s ease',
              width: { xs: "100%", sm: "auto" }
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
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "center", sm: "flex-start" }
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

          <Box
            ml={{ xs: 0, sm: "auto" }}
            display="flex"
            alignItems="center"
            gap={1}
            width={{ xs: "100%", sm: "auto" }}
            justifyContent={{ xs: "center", sm: "flex-end" }}
            mt={{ xs: 2, sm: 0 }}
          >
            <GiMoneyStack size={28} color="#FF7020" />
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ fontSize: { xs: "1.3rem", sm: "2rem" } }}>
              {selectedProduct ? selectedProduct.price * count : 0}₽
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ViewModalProduct