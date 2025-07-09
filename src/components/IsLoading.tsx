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

const petalsFall = keyframes`
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
`;

const FlowerPot = styled('div')({
  position: 'relative',
  width: '120px',
  height: '140px',
  margin: '0 auto 40px',
});

const PotBase = styled('div')({
  position: 'absolute',
  bottom: 0,
  width: '120px',
  height: '80px',
  background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '0 0 50px 50px',
  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
});

const PotNeck = styled('div')({
  position: 'absolute',
  top: '40px',
  left: '40px',
  width: '40px',
  height: '60px',
  background: 'linear-gradient(to bottom, #81d4fa, #4fc3f7)',
  border: '1px solid rgba(0,0,0,0.1)',
  borderBottom: 'none',
  borderRadius: '20px 20px 0 0',
});

const FlowerStem = styled('div')({
  position: 'absolute',
  top: '20px',
  left: '59px',
  width: '2px',
  height: '80px',
  background: '#81c784',
  transformOrigin: 'bottom center',
});

const FlowerHead = styled('div')({
  position: 'absolute',
  top: '0',
  left: '50px',
  width: '20px',
  height: '20px',
  background: '#ffeb3b',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(255,235,59,0.5)',
  animation: `${float} 3s ease-in-out infinite`,
});

const Petal = styled('div')<{angle: string, color: string}>(({ angle, color }) => ({
  position: 'absolute',
  width: '15px',
  height: '25px',
  background: color,
  borderRadius: '50% 50% 0 50%',
  top: '5px',
  left: '5px',
  transform: `rotate(${angle}deg) translateX(15px)`,
  transformOrigin: 'bottom center',
}));

const FallingPetal = styled('div')<{delay: string, left: string, size: string, color: string, duration: string}>(({ delay, left, size, color, duration }) => ({
  position: 'absolute',
  width: size,
  height: size,
  background: color,
  borderRadius: '50% 50% 0 50%',
  top: '0',
  left: left,
  filter: 'blur(0.5px)',
  opacity: 0,
  animation: `${petalsFall} ${duration} linear infinite`,
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
        background: 'linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', mb: 6 }}>
        <FlowerPot>
          <PotBase />
          <PotNeck />
          <FlowerStem />
          <FlowerHead>
            <Petal angle="0" color="#f8bbd0" />
            <Petal angle="72" color="#e1bee7" />
            <Petal angle="144" color="#d1c4e9" />
            <Petal angle="216" color="#c5cae9" />
            <Petal angle="288" color="#b3e5fc" />
          </FlowerHead>
          
          {/* Falling petals */}
          {[...Array(15)].map((_, i) => (
            <FallingPetal
              key={i}
              delay={`${i * 0.5}s`}
              left={`${Math.random() * 100}%`}
              size={`${Math.random() * 15 + 10}px`}
              color={`hsl(${Math.floor(Math.random() * 60 + 300)}, 70%, 80%)`}
              duration={`${Math.random() * 3 + 5}s`}
            />
          ))}
        </FlowerPot>
      </Box>
      
      <Typography
        variant="h6"
        sx={{
          color: '#2e7d32',
          fontWeight: 500,
          fontFamily: '"Playfair Display", serif',
          letterSpacing: '2px',
          mt: 2,
          fontSize: '1.1rem',
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            width: '40%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #81c784, transparent)',
            position: 'absolute',
            bottom: '-12px',
            left: '30%',
          },
        }}
      >
        Цветочная композиция
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 6 }}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#81c784',
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
          color: '#689f38',
          mt: 4,
          fontStyle: 'italic',
          letterSpacing: '1px',
          fontSize: '0.8rem',
          opacity: 0.8,
          fontFamily: '"Montserrat", sans-serif',
        }}
      >
        Собираем ваш идеальный букет...
      </Typography>
    </Box>
  );
}

export default IsLoading;