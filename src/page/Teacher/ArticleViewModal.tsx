import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import { MdCalendarToday } from "react-icons/md";
import { styled } from "@mui/material/styles";
import { IoMdClose } from "react-icons/io";
import { Article } from "./Article";


interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedArticle: Article | null;
}

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[50],
  minHeight: 200,
  whiteSpace: "pre-wrap",
  lineHeight: 1.6
}));

const ArticleInfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary
}));

function ArticleViewModal({ showModal, setShowModal, selectedArticle }: Props) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (selectedArticle?.createdAt) {
      const date = new Date(selectedArticle.createdAt);
      setFormattedDate(date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }));
    }
  }, [selectedArticle]);

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: "60vh"
        }
      }}
    >
      <DialogTitle sx={{ 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        py: 2,
        px: 3
      }}>
        <Typography variant="h5" component="div">
          {selectedArticle?.title || "Article Details"}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setShowModal(false)}
          aria-label="close"
        >
          <IoMdClose />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3, px: 3 }}>
        <Box mb={3}>
          <ArticleInfoRow>
            <MdCalendarToday fontSize="small" />
            <Typography variant="body2">
              Created: {formattedDate || "N/A"}
            </Typography>
          </ArticleInfoRow>

        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Content
        </Typography>
        <ContentPaper elevation={0}>
          {selectedArticle?.text ? (
            <Typography variant="body1">
              {selectedArticle.text}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No content available
            </Typography>
          )}
        </ContentPaper>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowModal(false)}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ArticleViewModal;