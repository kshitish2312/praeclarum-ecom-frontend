import { useParams } from "react-router-dom";
import { useGetProductById } from "../../services/productAuth";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";


const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useGetProductById(Number(id));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError || !product) return <Typography>Error loading product</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
     
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="product-swiper"
      >
        {product.images.map((img:any, index:any) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Product ${index + 1}`}
              style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Product Details */}
      <Card sx={{ mt: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <Typography sx={{ my: 2 }}>{product.description}</Typography>
          <Typography variant="body2">Stock: {product.stock > 0 ? product.stock : "Out of Stock"}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} disabled={product.stock === 0}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
