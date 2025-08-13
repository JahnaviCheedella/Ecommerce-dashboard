import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromWishlist } from "../../store/ecommerceSlice";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.ecommerce.wishlist);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <Grid container p={2}>
      <Grid size={12}>
        <Typography variant="h5" fontWeight={600}>
          Wishlist
        </Typography>
        <Grid size={12}>
          {wishlist.length === 0 && (
            <p style={{ textAlign: "center" }}> Wishlist is empty </p>
          )}
        </Grid>
        <Grid container size={12}>
          {wishlist.map((item, i) => (
            <Grid
              key={i}
              size={12}
              sx={{
                border: "1px solid black",
                p: 2,
                mt: 2,
                display: "flex",
                //justifyContent: "space-between",
              }}
            >
              <Grid size={4}>
                <Box
                  component="img"
                  src={item.image}
                  alt="image"
                  sx={{ width: "30%", height: "100%" }}
                />
              </Grid>

              <Grid
                size={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ${item.price}
                </Typography>
              </Grid>

              <Grid
                size={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to cart
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Wishlist;
