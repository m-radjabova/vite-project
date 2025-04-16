import { useEffect, useState } from "react";
import PhotosList from "../component/PhotosList";
import apiClient from "../apiClient/ApiClient";
import { toast } from "react-toastify";
import { TbPhotoHeart } from "react-icons/tb";
import { FaArrowDown, FaInfoCircle } from "react-icons/fa";
import chroma from 'chroma-js';
import Select, { MultiValue, StylesConfig } from 'react-select';
import PageAndLimitPhoto from "../component/PageAndLimitPhoto";
import { Button, Typography } from "@mui/material";
import Loading from "../component/Loading";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface AlbumOption {
  value: number;
  label: string;
  color: string;
}

const colourStyles: StylesConfig<AlbumOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPhotos();
    getAlbums();
  }, [page, limit]);

  const getPhotos = () => {
    setIsLoading(true)
    apiClient.get(`/photos?_page=${page}&_limit=${limit}`)
      .then(res => {
        setPhotos(res.data);
        setPageSize(Math.floor(res.headers["x-total-count"] / limit));
      }).catch((err) => {
        console.log(err);
        toast.error("Error fetching photos");
      }).finally(() => {
        setIsLoading(false)
      })
  };

  const getAlbums = () => {
    apiClient.get('/albums')
      .then(res => setAlbums(res.data))
      .catch(err => {
        console.log(err);
        toast.error("Error fetching albums")
      });
  };

  const albumOptions: AlbumOption[] = albums.map(album => ({
    value: album.id,
    label: album.title.trim().split(/\s+/)[0],
    color: chroma.random().hex(),
  }));

  const handleAlbumChange = (selectedOptions: MultiValue<AlbumOption>) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      getPhotos();
      return;
    }
  
    const albumIds = selectedOptions.map(option => option.value);
    
    apiClient.get(`/photos?${albumIds.map(id => `albumId=${id}`).join('&')}`)
      .then(res => setPhotos(res.data))
      .catch(err => {
        console.log(err);
        toast.error("Error fetching filtered photos");
      })
  };
  
  return (
    <div className="container" style={{padding: '0 20px' }}>
      {isLoading && <Loading />}
      <div className="photos-container">
        <div className="photos-header d-flex justify-content-between align-items-center mt-3 mb-4">
          <div className="photos-title">
            <Typography variant="h3" component="h1" gutterBottom sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#e65100', 
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              fontFamily: '"Poppins", sans-serif'
            }}>
              <TbPhotoHeart size={50} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))' }} />
              Photo Gallery
            </Typography>
            <span className="photos-count" style={{
              fontSize: '1rem',
              color: '#777',
              fontStyle: 'italic',
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#fff8f0',
              borderRadius: '20px',
              marginTop: '-10px'
            }}>
              {photos.length} {photos.length === 1 ? 'treasured memory' : 'precious memories'}
            </span>
          </div>
          
          <div style={{ minWidth: '300px', maxWidth: '400px' }}>
            <Select<AlbumOption, true> 
              closeMenuOnSelect={false}
              options={albumOptions}
              styles={{
                ...colourStyles,
                control: (base) => ({
                  ...base,
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #ffe0b2',
                  '&:hover': {
                    borderColor: '#ffb74d'
                  }
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                })
              }}
              isMulti
              placeholder="Filter by albums..."
              onChange={handleAlbumChange}
            />
          </div>
        </div>

        <PageAndLimitPhoto 
          limit={limit}
          setLimit={setLimit}
          setPage={setPage}
          pageSize={pageSize}
        />
        
        <div style={{
          backgroundColor: '#fffaf5',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          margin: '20px 0'
        }}>
          {!isLoading && <PhotosList photos={photos} />}
        </div>
      </div>
      
      <div className="text-center mt-4 mb-5" style={{ position: 'relative' }}>
        <Button
          onClick={() => setLimit(limit + 10)}
          variant="contained"
          endIcon={<FaArrowDown style={{ transition: 'transform 0.3s ease' }} />}
          color="warning"
          sx={{   
            borderRadius: '12px',
            padding: '12px 32px',
            fontSize: '1rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)',
            boxShadow: '0 4px 8px rgba(230, 81, 0, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(230, 81, 0, 0.4)',
              background: 'linear-gradient(135deg, #e65100 0%, #fb8c00 100%)',
              '& .MuiButton-endIcon': {
                transform: 'translateY(2px)'
              }
            }
          }}
        >
          Load More Photos
        </Button>
      
        <Typography variant="body2" 
          sx={{
            color: '#e65100',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            backgroundColor: '#fff3e0',
            padding: '8px 16px',
            borderRadius: '20px',
            width: 'fit-content',
            margin: '16px auto 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
          <FaInfoCircle style={{ flexShrink: 0 }} />
          Showing {Math.min(limit, photos.length)} of {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
        </Typography>
        
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #ffcc80, transparent)'
        }}></div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '24px'
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ffb74d',
              opacity: 0.4 + (i * 0.2)
            }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Photos;