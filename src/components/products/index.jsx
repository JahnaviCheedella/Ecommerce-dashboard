import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishlist,
  fetchCategories,
  fetchProducts,
  removeFromWishlist,
  setCategory,
} from "../../store/ecommerceSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Products = () => {
  const { products, categories, selectedCategory, wishlist, status, error } =
    useSelector((state) => state.ecommerce);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
    dispatch(fetchCategories());
  }, [status, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = (product) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <Grid container p={2}>
      <Grid size={12} display="flex" justifyContent="space-between">
        <Typography variant="h4" fontWeight={600}>
          Products
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="demo-simple-select-autowidth-label">
            category
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedCategory}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            autoWidth
            label="category"
          >
            {categories.map((cat) => (
              <MenuItem value={cat} key={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && (
          <Grid container spacing={2}>
            {filteredProducts.map((product, i) => (
              <Grid
                key={i}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt="image"
                  sx={{ width: "50%", height: "50%" }}
                />
                <Typography variant="h5" fontWeight={600} textAlign={"center"}>
                  {product.title}
                </Typography>
                <Typography variant="body2">${product.price}</Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mt="auto"
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <FavoriteIcon
                      sx={{
                        color: isInWishlist(product.id) ? "red" : "inherit",
                      }}
                    />
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Products;
