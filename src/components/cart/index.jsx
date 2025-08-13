import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../store/ecommerceSlice";

const Cart = () => {
  const cart = useSelector((state) => state.ecommerce.cart);
  const dispatch = useDispatch();

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Grid container p={2}>
      <Grid size={12}>
        <Typography variant="h4" fontWeight={600}>
          Cart
        </Typography>
      </Grid>
      <Grid size={12}>
        {cart.length === 0 && (
          <p style={{ textAlign: "center" }}>Cart is empty</p>
        )}
      </Grid>
      <Grid size={12}>
        {cart.map((item, i) => (
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
            <Grid size={4} >
              <Box
                component="img"
                src={item.image}
                alt="image"
                sx={{ width: "30%", height: "100%"}}
              />
            </Grid>

            <Grid
              size={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems:"center"
                
              }}
            >
              <Box>
                <Typography variant="body1" gutterBottom>
                  {item.title}
                </Typography>
              </Box>

              <Box display="flex">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleDecrease(item)}
                  sx={{ height: "30px" }}
                >
                  -
                </Button>
                <Typography variant="body2" fontWeight={600} sx={{ margin: 1 }}>
                  {item.quantity}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleIncrease(item)}
                  sx={{ height: "30px" }}
                >
                  +
                </Button>
              </Box>
            </Grid>

            <Grid
              size={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                ${item.price}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid size={12}>
        <Typography variant="h6" fontWeight={600}>
          Total: ${totalCost.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Cart;
