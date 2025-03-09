import { useState } from "react";
import { useCreateProduct, useUpdateProduct } from "../../../services/productAuth";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const AdminProductForm = ({ product, onClose, refetch }: { product?: any; onClose: () => void; refetch: () => void }) => {
  const isEdit = Boolean(product);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    stock: product?.stock || 0,
    description: product?.description || "",
    images: product?.images ? [...product.images] : [], // Unified image array
  });

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle new image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles], // Append new images to the same array
      }));
    }
  };

  // Remove an image (either existing or new)
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    
    const formDataToSend:any = new FormData();


    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock.toString());
    formDataToSend.append("description", formData.description);

    formData.images.forEach((image) => {
        formDataToSend.append("images", image); 

    });

    const onSuccess = () => {
      refetch()
      onClose(); 
    };

    if (isEdit) {
      updateProductMutation.mutate({ id: product.id, product: formDataToSend }, { onSuccess });
    } else {
      createProductMutation.mutate(formDataToSend, { onSuccess });
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Price" name="price" value={formData.price} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Stock" name="stock" value={formData.stock} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="dense" />

        {/* Show images (both existing & new) */}
        {formData.images.length > 0 && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            {formData.images.map((img, index) => (
              <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                <img 
                  src={typeof img === "string" ? img : URL.createObjectURL(img)} 
                  alt="Product" width={80} height={80} style={{ borderRadius: 4 }} 
                />
                <IconButton
                  sx={{ position: "absolute", top: -5, right: -5, background: "rgba(0,0,0,0.6)", color: "white" }}
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* Upload new images */}
        <Box mt={2}>
          <Button variant="contained" component="label">
            Upload Images
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">{isEdit ? "Update" : "Create"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminProductForm;
