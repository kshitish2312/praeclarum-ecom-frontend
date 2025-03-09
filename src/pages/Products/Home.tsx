import { Link } from "react-router-dom";
import { useGetProducts } from "../../services/productAuth";
import { Grid, Card, CardContent, Typography, Button,Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductList = () => {
  const { data: products, isLoading, isError } = useGetProducts();

  if (isLoading) return <Typography>Loading products...</Typography>;
  if (isError) return <Typography>Error fetching products</Typography>;

  return (
  <>
   <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Available Products
      </Typography>

    <Grid container spacing={3} sx={{ mt: 4 }}>
      {products?.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="product-card-swiper"
            >
              {product.images.map((img:any, index:any) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Product ${index + 1}`}
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Product Info */}
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography color="primary">${product.price}</Typography>
              <Button
                component={Link}
                to={`/product/${product.id}`}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Container>
    </>
  );
};

export default ProductList;
