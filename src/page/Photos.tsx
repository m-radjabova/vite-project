import { useEffect, useState } from "react";
import PhotosList from "../component/PhotosList";
import { TbPhotoHeart } from "react-icons/tb";
import Select, { MultiValue } from 'react-select';
import PageAndLimitPhoto from "../component/PageAndLimitPhoto";
import {Typography } from "@mui/material";
import Loading from "../component/LoadingForUsers";
import { AlbumOption } from "../data";
import usePhoto from "../hooks/usePhoto";

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

function Photos() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [param, setParam] = useState("");
  const { data: photos, loading, pageSize } = usePhoto<Photo>(`/photos?_page=${page}&_limit=${limit}&${param}`);
  const { data: albums } = usePhoto<Album>('/albums');
  const [albumOptions, setAlbumOptions] = useState<AlbumOption[]>([]);
  const totalPages = Math.floor(pageSize / limit)

  useEffect(() => {
      setAlbumOptions(albums.map(album => ({ 
        value: album.id,
        label: album.title.trim().split(/\s+/)[0],
        color: '#e65100' 
      })));
  }, [albums]);

  const filterByAlbum = (data: MultiValue<AlbumOption>) => {
    setParam(data.map(item => 'albumId=' + item.value).join("&"));
  }

  return (
    <div className="container container-bf" style={{ 
      padding: '0 20px',
      maxWidth: '1400px', 
      margin: '0 auto',
      position: 'relative',
      backgroundImage: 'radial-gradient(rgba(230, 81, 0, 0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }}>
      {loading && <Loading />}
      <div className="photos-container">
        <div className="photos-header d-flex justify-content-between align-items-center mt-3 mb-4" style={{
          padding: '16px 24px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 12px rgba(230, 81, 0, 0.08)',
          border: '1px solid rgba(230, 81, 0, 0.1)'
        }}>
          <div className="photos-title">
            <Typography variant="h3" component="h1" gutterBottom sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'linear-gradient(45deg, #e65100, #ff9800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
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
              marginTop: '-10px',
              transition: 'all 0.3s ease',
            }}>
              {photos?.length || 0} {photos?.length === 1 ? 'treasured memory' : 'precious memories'}
            </span>
          </div>
    
          <div style={{ 
            minWidth: '300px', 
            maxWidth: '400px',
            zIndex: 1000
          }}>
            <Select<AlbumOption, true>
              closeMenuOnSelect={false}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null
              }}
              options={albumOptions}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #ffe0b2',
                  minHeight: '50px',
                  '&:hover': {
                    borderColor: '#ffb74d'
                  }
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 9999
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#fff3e0',
                  borderRadius: '8px'
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: '#e65100',
                  fontWeight: '500'
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  '&:hover': {
                    backgroundColor: '#ffccbc',
                    color: '#d84315'
                  }
                })
              }}
              isMulti
              placeholder="Filter by albums..."
              onChange={filterByAlbum}
              menuPortalTarget={document.body} 
              menuPosition="fixed"
            />
          </div>
        </div>
    
        <PageAndLimitPhoto
          limit={limit}
          setLimit={setLimit}
          setPage={setPage}
          pageSize={totalPages}
        />
    
        <div className="nimadir" style={{
          backgroundColor: '#fffaf5',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 6px 20px rgba(230, 81, 0, 0.08)',
          margin: '20px 0',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}>
          {!loading && <PhotosList photos={photos || []} />}
        </div>
    
        <div className="text-center mt-4 mb-5" style={{ position: 'relative' }}>
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
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div className="nuqtacha" key={i} style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#ffb74d',
                opacity: 0.4 + (i * 0.2),
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photos;