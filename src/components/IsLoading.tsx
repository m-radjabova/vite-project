import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const drip = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(15px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(30px);
    opacity: 0;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const IceCreamCone = styled('div')({
  width: '40px',
  height: '60px',
  background: 'linear-gradient(to bottom, #F4A460, #D2691E)',
  clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
  position: 'relative',
  margin: '0 auto',
});

const Scoop = styled('div')(({ color }: { color: string }) => ({
  width: '60px',
  height: '50px',
  borderRadius: '50% 50% 0 0',
  background: color,
  position: 'absolute',
  top: '-45px',
  left: '50%',
  transform: 'translateX(-50%)',
}));

const Drip = styled('div')(({ color, delay }: { color: string; delay: string }) => ({
  width: '10px',
  height: '15px',
  background: color,
  borderRadius: '0 0 5px 5px',
  position: 'absolute',
  top: '5px',
  left: '50%',
  transform: 'translateX(-50%)',
  animation: `${drip} 1.5s ease-in-out infinite`,
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
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFDEE8 100%)',
      }}
    >
      <Box sx={{ position: 'relative', mb: 4 }}>
        {/* Ice cream scoops */}
        <Scoop color="#FFB6C1" />
        <Scoop color="#98FB98" sx={{ top: '-85px', width: '50px', height: '40px' }} />
        <Scoop color="#FFD700" sx={{ top: '-115px', width: '40px', height: '30px' }} />
        
        {/* Drips */}
        <Drip color="#FFB6C1" delay="0s" />
        <Drip color="#98FB98" delay="0.2s" sx={{ left: 'calc(50% - 15px)' }} />
        <Drip color="#FFD700" delay="0.4s" sx={{ left: 'calc(50% + 15px)' }} />
        
        {/* Cone */}
        <IceCreamCone />
        
        {/* Spinning sprinkles */}
        <Box
          sx={{
            position: 'absolute',
            top: '-130px',
            left: '50%',
            width: '60px',
            height: '60px',
            transform: 'translateX(-50%)',
            animation: `${spin} 2s linear infinite`,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: ['#FF1493', '#00BFFF', '#FFD700', '#7CFC00'][i % 4],
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translate(25px) rotate(-${i * 45}deg)`,
              }}
            />
          ))}
        </Box>
      </Box>
      
      <Typography
        variant="h6"
        sx={{
          color: '#FF69B4',
          fontWeight: 600,
          mt: 2,
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #FF69B4, transparent)',
            position: 'absolute',
            bottom: '-5px',
            left: 0,
          },
        }}
      >
        Preparing your sweet treats...
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#FF69B4',
              opacity: 0.3,
              animation: `${keyframes`
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.3); }
              `} 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default IsLoading;