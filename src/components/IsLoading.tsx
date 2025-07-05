import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const fadeInOut = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const spray = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.2); opacity: 0; }
`;

const PerfumeBottle = styled('div')({
  position: 'relative',
  width: '60px',
  height: '120px',
  margin: '0 auto 40px',
});

const BottleBase = styled('div')({
  position: 'absolute',
  bottom: 0,
  width: '60px',
  height: '80px',
  background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.3))',
  border: '1px solid rgba(255,255,255,0.5)',
  borderRadius: '5px 5px 20px 20px',
  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
});

const BottleNeck = styled('div')({
  position: 'absolute',
  top: '60px',
  left: '25px',
  width: '10px',
  height: '30px',
  background: 'rgba(255,255,255,0.3)',
  border: '1px solid rgba(255,255,255,0.5)',
  borderBottom: 'none',
});

const BottleSprayer = styled('div')({
  position: 'absolute',
  top: '50px',
  left: '20px',
  width: '20px',
  height: '10px',
  background: 'rgba(255,255,255,0.4)',
  borderRadius: '10px',
});

const PerfumeLiquid = styled('div')({
  position: 'absolute',
  bottom: '5px',
  left: '5px',
  right: '5px',
  height: '70px',
  background: 'linear-gradient(to top, #e6c8f8, #d8a7f1)',
  borderRadius: '0 0 15px 15px',
  animation: `${float} 3s ease-in-out infinite`,
});

const SprayParticle = styled('div')(({ delay, left, size, color }: { delay: string, left: string, size: string, color: string }) => ({
  position: 'absolute',
  width: size,
  height: size,
  background: color,
  borderRadius: '50%',
  top: '30px',
  left: left,
  filter: 'blur(1px)',
  opacity: 0,
  animation: `${spray} 2s ease-out infinite`,
  animationDelay: delay,
}));

function IsLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f8f4ff 0%, #f0e6ff 100%)',
      }}
    >
      <Box sx={{ position: 'relative', mb: 4 }}>
        <PerfumeBottle>
          <BottleBase />
          <BottleNeck />
          <BottleSprayer />
          <PerfumeLiquid />
          
          {/* Spray particles */}
          {[...Array(8)].map((_, i) => (
            <SprayParticle
              key={i}
              delay={`${i * 0.2}s`}
              left={`${Math.random() * 40 + 10}px`}
              size={`${Math.random() * 8 + 4}px`}
              color={`rgba(${Math.floor(Math.random() * 100 + 155)}, 
                      ${Math.floor(Math.random() * 100 + 155)}, 
                      ${Math.floor(Math.random() * 100 + 255)}, 
                      0.7)`}
            />
          ))}
        </PerfumeBottle>
      </Box>
      
      <Typography
        variant="h6"
        sx={{
          color: '#7e57c2',
          fontWeight: 500,
          fontFamily: '"Playfair Display", serif',
          letterSpacing: '1px',
          mt: 2,
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            width: '60%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #b39ddb, transparent)',
            position: 'absolute',
            bottom: '-8px',
            left: '20%',
          },
        }}
      >
        Crafting your fragrance experience...
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1.5, mt: 4 }}>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#b39ddb',
              opacity: 0.6,
              animation: `${fadeInOut} 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </Box>
      
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          color: '#9575cd',
          mt: 4,
          fontStyle: 'italic',
          letterSpacing: '0.5px',
        }}
      >
        Luxury takes time to perfect
      </Typography>
    </Box>
  );
}

export default IsLoading;