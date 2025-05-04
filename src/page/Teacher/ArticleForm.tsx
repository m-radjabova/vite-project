import { FieldValues, useForm } from "react-hook-form";
import { FaArrowLeft, FaCheckCircle, FaCloudUploadAlt, FaFileAlt, FaLink, FaSave } from "react-icons/fa";
import {Container,Box,Typography,TextField,Button,Card,CardHeader,CardContent,Stack, InputAdornment, Avatar, CircularProgress, Chip} from "@mui/material";
import useContextPro from "../../hooks/useContextPro";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { grey, blue,green } from "@mui/material/colors";
import { ChangeEvent, useState } from "react";


function ArticleForm() {
  const { state: { user } } = useContextPro();
  const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const onSubmit = (data: FieldValues) => {
    if (selectedFile) {
      data.file = selectedFile; 
    }

    const formData = {
      ...data,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(), 
      teacherId: user?.id,
    }
    apiClient.post("/articles", formData)
      .then(response => {
        console.log(response.data);
        toast.success("Article submitted successfully",);
        navigate(-1);
        reset();
      })
      .catch(error => {
        toast.error("Failed to submit article", error);
      });
  };

  return (
    <Container sx={{ 
      py: 6,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'end', 
        alignItems: 'center',
        mb: 4
      }}>
        <Button
          onClick={() => navigate(-1)}
          variant="text"
          startIcon={<FaArrowLeft />}
          sx={{ 
            textTransform: 'none',
            color: grey[600],
            '&:hover': {
              backgroundColor: 'transparent',
              color: blue[500]
            }
          }}
        >
          Back to Articles
        </Button>
      </Box>

      <Card elevation={0} sx={{ 
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        overflow: 'hidden'
      }}>
        <CardHeader
          title={
            <Typography variant="h4" component="h1" fontWeight={600}>
              Create New Article
            </Typography>
          }
          subheader="Share your knowledge with the community"
          sx={{
            background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
            color: 'white',
            py: 4,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          avatar={
            <Avatar sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)',
              width: 56, 
              height: 56 
            }}>
              <FaFileAlt size={28} />
            </Avatar>
          }
        />
        
        <CardContent sx={{ p: 0 }}>
          <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmit)}
            sx={{ p: 4 }}
          >
            <Stack spacing={4}>
              <TextField
                {...register("title", { required: 'Title is required' })}
                label="Article Title"
                id="title"
                placeholder="Enter a compelling title"
                fullWidth
                variant="outlined"
                error={!!errors.title}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    backgroundColor: grey[50],
                    '& fieldset': {
                      borderColor: grey[300]
                    }
                  }
                }}
              />

              <TextField
                {...register("link")}
                label="Reference Link"
                id="link"
                placeholder="https://example.com"
                fullWidth
                variant="outlined"
                error={!!errors.link}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLink color={grey[500]} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    backgroundColor: grey[50],
                    '& fieldset': {
                      borderColor: grey[300]
                    }
                  }
                }}
              />

            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ 
                  py: 3,
                  borderRadius: 2,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: selectedFile ? green[500] : grey[300],
                  backgroundColor: grey[50],
                  '&:hover': {
                    borderColor: selectedFile ? green[600] : blue[500],
                    backgroundColor: 'rgba(58, 123, 213, 0.04)'
                  },
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Stack alignItems="center" spacing={1}>
                  {selectedFile ? (
                    <>
                      <FaCheckCircle size={32} color={green[500]} />
                      <Typography variant="body1" color={grey[800]}>
                        File Selected
                      </Typography>
                      <Chip
                        label={fileName}
                        size="small"
                        sx={{ 
                          maxWidth: 200,
                          backgroundColor: green[50],
                          color: green[800]
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <FaCloudUploadAlt size={32} color={grey[500]} />
                      <Typography variant="body1" color={grey[600]}>
                        Upload Supporting File
                      </Typography>
                      <Typography variant="caption" color={grey[500]}>
                        PDF, DOCX, or Image (Max 10MB)
                      </Typography>
                    </>
                  )}
                </Stack>
                <input
                  {...register("file")}
                  id="file"
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  mt: 1
                }}>
                  <Button 
                    size="small" 
                    color="error"
                    onClick={() => {
                      setSelectedFile(null);
                      setFileName("");
                    }}
                  >
                    Remove File
                  </Button>
                </Box>
              )}
            </Box>

              <TextField
                {...register("text", { 
                  required: 'Article content is required',
                  minLength: {
                    value: 100,
                    message: 'Content should be at least 100 characters'
                  }
                })}
                label="Article Content"
                multiline
                rows={11}
                placeholder="Write your article here... Markdown is supported"
                fullWidth
                variant="outlined"
                error={!!errors.text}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    backgroundColor: grey[50],
                    '& fieldset': {
                      borderColor: grey[300]
                    },
                    minHeight: 200,
                    alignItems: 'flex-start'
                  }
                }}
              />

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                pt: 2
              }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <FaSave />}
                  sx={{ 
                    py: 1.5,
                    px: 6,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                    boxShadow: '0 4px 12px rgba(58, 123, 213, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(58, 123, 213, 0.4)'
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Article'}
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ArticleForm;