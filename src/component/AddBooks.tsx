import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "../App";
import { useEffect } from "react";

const bookSchema = z.object({
  name: z.string().min(1, "Name is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  imgUrl: z.string().url("Invalid URL format"),
});

interface Props {
  books: Book[];
  saveBook: (book: Book) => void;
  selectedBook: Book | undefined;
  setSelectedBook: (book: Book | undefined) => void; 
}

type BookFormData = z.infer<typeof bookSchema>;

function AddBooks({ saveBook, selectedBook, setSelectedBook }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  useEffect(() => {
    if (selectedBook) {
      reset(selectedBook);
    } else {
      reset({
        name: "",
        author: "",
        description: "",
        price: 1, 
        imgUrl: "",
      });
    }
  }, [selectedBook, reset]);

  const onSubmit: SubmitHandler<BookFormData> = (data: BookFormData) => {
    if (selectedBook) {
      saveBook({ ...selectedBook, ...data });  
    } else {
      saveBook({ ...data, id: 0, isLiked: false }); 
    }
    setSelectedBook(undefined);
    reset();
  };

  return (
    <div className="add">
      <div className="card shadow-lg mt-5 p-4 border-0">
        <h1 className="card-header text-center rounded-pill display-5">
          {selectedBook ? "Edit Book" : "Add Book"}
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label fw-bold">Name</label>
              <input
                {...register("name")}
                type="text"
                className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""}`}
                id="name"
                placeholder="Enter book name"
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="author" className="form-label fw-bold">Author</label>
              <input
                {...register("author")}
                type="text"
                className={`form-control form-control-lg ${errors.author ? "is-invalid" : ""}`}
                id="author"
                placeholder="Enter author name"
              />
              {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="form-label fw-bold">Description</label>
              <textarea
                {...register("description")}
                className={`form-control form-control-lg ${errors.description ? "is-invalid" : ""}`}
                id="description"
                rows={4}
                placeholder="Enter book description"
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="form-label fw-bold">Price</label>
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                className={`form-control form-control-lg ${errors.price ? "is-invalid" : ""}`}
                id="price"
                placeholder="Enter book price"
              />
              {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="imgUrl" className="form-label fw-bold">Image URL</label>
              <input
                {...register("imgUrl")}
                type="text"
                className={`form-control form-control-lg ${errors.imgUrl ? "is-invalid" : ""}`}
                id="imgUrl"
                placeholder="Enter image URL"
              />
              {errors.imgUrl && <div className="invalid-feedback">{errors.imgUrl.message}</div>}
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-lg text-white px-5">
                {selectedBook ? "Update Book" : "Add Book"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBooks;
