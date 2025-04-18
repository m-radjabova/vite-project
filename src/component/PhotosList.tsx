import { Photo } from "../page/Photos"
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Tooltip } from "@mui/material"
import { FaHeart, FaShareAlt, FaEllipsisV } from "react-icons/fa"

interface Props {
    photos: Photo[]
}

function PhotosList({ photos }: Props) {
  return (
    <Box sx={{ 
      backgroundColor: '#fff9f2', 
      padding: { xs: 2, md: 4 },
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(#ffe0b2 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }}>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center',
        padding: '16px 0'
      }}>
        {photos.map((photo) => (
          <Box key={photo.id} sx={{ 
            width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.333% - 24px)', lg: 'calc(25% - 24px)' },
            maxWidth: '320px',
            perspective: '1000px'
          }}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 6px 16px -8px rgba(0,0,0,0.1)',
              border: '1px solid #ffebd3',
              borderRadius: '12px',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '0 12px 24px -6px rgba(230, 81, 0, 0.2)',
                '& .photo-overlay': {
                  opacity: 1
                }
              }
            }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={`https://picsum.photos/id/${photo.id}/300/200`}
                  alt={photo.title}
                  sx={{ 
                    height: 220,
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
                <Box className="photo-overlay" sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(230,81,0,0.7) 0%, transparent 50%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '16px'
                }}>
                  <Typography variant="body2" sx={{
                    color: 'white',
                    fontWeight: 500,
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                  }}>
                    Click to view full size
                  </Typography>
                </Box>
              </Box>
    
              <CardContent sx={{ 
                flexGrow: 1,
                padding: '16px',
                backgroundColor: 'white'
              }}>
                <Typography gutterBottom variant="h6" component="h3" sx={{ 
                  color: '#e65100',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  minHeight: '44px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {photo.title}
                </Typography>
                <Chip
                  label={`Album #${photo.albumId}`} 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#ffe0b2',
                    color: '#e65100',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }} 
                />
              </CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: '#fff3e0',
                borderTop: '1px solid #ffebd3'
              }}>
                <Box sx={{ display: 'flex', gap: '4px' }}>
                  <Tooltip title="Add to favorites" arrow>
                    <IconButton 
                      aria-label="add to favorites" 
                      sx={{ 
                        color: '#e65100',
                        '&:hover': {
                          backgroundColor: 'rgba(230, 81, 0, 0.1)'
                        }
                      }}
                    >
                      <FaHeart size={16} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share" arrow>
                    <IconButton 
                      aria-label="share" 
                      sx={{ 
                        color: '#e65100',
                        '&:hover': {
                          backgroundColor: 'rgba(230, 81, 0, 0.1)'
                        }
                      }}
                    >
                      <FaShareAlt size={16} />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Tooltip title="More options" arrow>
                  <IconButton 
                    aria-label="more info" 
                    sx={{ 
                      color: '#e65100',
                      '&:hover': {
                        backgroundColor: 'rgba(230, 81, 0, 0.1)'
                      }
                    }}
                  >
                    <FaEllipsisV size={16} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default PhotosList