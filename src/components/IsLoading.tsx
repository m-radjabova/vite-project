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
  0% { transform: scale(0.5) translateX(0); opacity: 0; }
  50% { transform: scale(1) translateX(5px); opacity: 0.8; }
  100% { transform: scale(1.2) translateX(10px); opacity: 0; }
`;

const PerfumeBottle = styled('div')({
  position: 'relative',
  width: '80px',
  height: '160px',
  margin: '0 auto 40px',
  filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))',
});

const BottleBase = styled('div')({
  position: 'absolute',
  bottom: 0,
  width: '80px',
  height: '120px',
  background: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.9))',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '8px 8px 30px 30px',
  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
});

const BottleNeck = styled('div')({
  position: 'absolute',
  top: '90px',
  left: '35px',
  width: '10px',
  height: '40px',
  background: 'rgba(255,255,255,0.8)',
  border: '1px solid rgba(0,0,0,0.1)',
  borderBottom: 'none',
});

const BottleSprayer = styled('div')({
  position: 'absolute',
  top: '80px',
  left: '30px',
  width: '20px',
  height: '10px',
  background: 'rgba(255,255,255,0.6)',
  borderRadius: '10px',
  transform: 'rotate(-5deg)',
});

const PerfumeLiquid = styled('div')({
  position: 'absolute',
  bottom: '10px',
  left: '10px',
  right: '10px',
  height: '100px',
  background: 'linear-gradient(to top, #e1bee7, #ce93d8)',
  borderRadius: '0 0 20px 20px',
  animation: `${float} 3s ease-in-out infinite`,
  boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)',
});

const SprayParticle = styled('div')<{delay: string, left: string, size: string, color: string}>(({ delay, left, size, color }) => ({
  position: 'absolute',
  width: size,
  height: size,
  background: color,
  borderRadius: '50%',
  top: '50px',
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
        background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
      }}
    >
      <Box sx={{ position: 'relative', mb: 6 }}>
        <PerfumeBottle>
          <BottleBase />
          <BottleNeck />
          <BottleSprayer />
          <PerfumeLiquid />
          
          {/* Spray particles */}
          {[...Array(12)].map((_, i) => (
            <SprayParticle
              key={i}
              delay={`${i * 0.15}s`}
              left={`${Math.random() * 60 + 10}px`}
              size={`${Math.random() * 10 + 4}px`}
              color={`hsla(${Math.floor(Math.random() * 30 + 270)}, 70%, 60%, 0.7)`}
            />
          ))}
        </PerfumeBottle>
      </Box>
      
      <Typography
        variant="h6"
        sx={{
          color: '#7e57c2',
          fontWeight: 500,
          fontFamily: '"Montserrat", "Helvetica", sans-serif',
          letterSpacing: '2px',
          mt: 2,
          textTransform: 'uppercase',
          fontSize: '0.9rem',
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            width: '40%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #b39ddb, transparent)',
            position: 'absolute',
            bottom: '-12px',
            left: '30%',
          },
        }}
      >
        Curating Your Scent Journey
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 6 }}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#b39ddb',
              opacity: 0.6,
              animation: `${fadeInOut} 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
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
          letterSpacing: '1px',
          fontSize: '0.7rem',
          opacity: 0.8,
        }}
      >
        Crafting olfactory perfection...
      </Typography>
    </Box>
  );
}

export default IsLoading;