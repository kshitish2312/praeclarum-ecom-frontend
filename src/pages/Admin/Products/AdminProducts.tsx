import { useState } from "react";
import { useGetProducts, useDeleteProduct } from "../../../services/productAuth";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
import AdminProductForm from "./AdminProductForm";

const AdminProducts = () => {
  const { data: products, isLoading, isError } = useGetProducts();
  const deleteProductMutation = useDeleteProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error fetching products</p>;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => { setSelectedProduct(null); setIsEditing(true); }}>
        Add New Product
      </Button>

      {isEditing && <AdminProductForm product={selectedProduct} onClose={() => setIsEditing(false)} />}

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product:any) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.images[0]} alt={product.name} style={{ width: 50, height: 50, objectFit: "cover" }} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button size="small" color="primary" onClick={() => { setSelectedProduct(product); setIsEditing(true); }}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => deleteProductMutation.mutate(product.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminProducts;
