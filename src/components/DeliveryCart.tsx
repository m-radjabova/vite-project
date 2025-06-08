import { Modal, Button, Box, Typography, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Delivery from '../assets/pic (1).svg'

interface Props{
  open: boolean,
  handleClose: () => void
  deliveryType: 'pickup' | 'delivery'
  setDeliveryType: React.Dispatch<React.SetStateAction<'pickup' | 'delivery'>>
}
function DeliveryCart({open, handleClose, deliveryType, setDeliveryType}: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          backgroundColor: '#fff',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          width: { xs: '98vw', sm: 684 },
          minWidth: { xs: '90vw', sm: 360 },
          maxWidth: '98vw',
          minHeight: { xs: 'auto', sm: 432 },
          overflow: 'hidden',
          p: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#FFAB08',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, sm: 4 },
            minHeight: { xs: 180, sm: 'auto' },
          }}
        >
          <img
            src={Delivery}
            alt="Delivery"
            style={{
              maxWidth: '90%',
              maxHeight: '180px',
              borderRadius: '16px',
              margin: '0 auto',
              display: 'block',
            }}
          />
        </Box>

        {/* O'ng forma */}
        <Box
          component="form"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1,
            p: { xs: 2, sm: 4 },
            backgroundColor: '#fff',
            position: 'relative',
            minWidth: { xs: 'auto', sm: 300 },
          }}
        >
          {/* Modalni yopish tugmasi */}
          <Button
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              borderRadius: '50%',
              color: '#b1b1b1',
              fontSize: 28,
              background: 'transparent',
              minWidth: 0,
              width: 36,
              height: 36,
              '&:hover': { background: '#f2f2f3', color: '#222' },
              zIndex: 2,
            }}
          >
            ×
          </Button>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{
              color: '#222',
              fontWeight: 700,
              mb: 2,
              letterSpacing: 0.5,
              textAlign: 'center',
            }}
          >
            Доставка
          </Typography>
          <TextField
            label="Ваше имя"
            variant="outlined"
            fullWidth
            sx={{
              background: '#fafafa',
              borderRadius: '12px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': { borderColor: '#ffd8b2' },
                '&:hover fieldset': { borderColor: '#e67a00' },
              },
            }}
          />
          <TextField
            label="Телефон"
            variant="outlined"
            fullWidth
            sx={{
              background: '#fafafa',
              borderRadius: '12px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': { borderColor: '#ffd8b2' },
                '&:hover fieldset': { borderColor: '#e67a00' },
              },
            }}
          />
          <FormControl component="fieldset" sx={{ mb: 1 }}>
            <RadioGroup
              row
              aria-label="delivery"
              name="delivery-method"
              value={deliveryType}
              onChange={e => setDeliveryType(e.target.value as 'pickup' | 'delivery')}
            >
              <FormControlLabel
                value="pickup"
                control={<Radio sx={{ color: '#e67a00', '&.Mui-checked': { color: '#e67a00' } }} />}
                label="Самовывоз"
              />
              <FormControlLabel
                value="delivery"
                control={<Radio sx={{ color: '#e67a00', '&.Mui-checked': { color: '#e67a00' } }} />}
                label="Доставка"
              />
            </RadioGroup>
          </FormControl>
          {deliveryType === 'delivery' && (
            <>
              <TextField
                label="Улица, дом, квартира"
                variant="outlined"
                fullWidth
                sx={{
                  background: '#fafafa',
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': { borderColor: '#ffd8b2' },
                    '&:hover fieldset': { borderColor: '#e67a00' },
                  },
                }}
              />
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  label="Этаж"
                  variant="outlined"
                  sx={{
                    flex: 1,
                    background: '#fafafa',
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '& fieldset': { borderColor: '#ffd8b2' },
                      '&:hover fieldset': { borderColor: '#e67a00' },
                    },
                  }}
                />
                <TextField
                  label="Домофон"
                  variant="outlined"
                  sx={{
                    flex: 1,
                    background: '#fafafa',
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '& fieldset': { borderColor: '#ffd8b2' },
                      '&:hover fieldset': { borderColor: '#e67a00' },
                    },
                  }}
                />
              </Box>
            </>
          )}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#FF7020',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '20px',
              py: 1.5,
              mt: 2,
              boxShadow: '0 4px 12px rgba(255, 112, 32, 0.18)',
              '&:hover': { backgroundColor: '#e67a00' },
            }}
          >
            Оформить
          </Button>
        </Box>
      </Box>
    </Modal>
  )

}

export default DeliveryCart