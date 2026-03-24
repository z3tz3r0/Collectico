import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { routePaths } from "@/shared/config/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { apiPaths } from "../../service/api";
import { useCart } from "../../src/contexts/CartContext"
import Address from "./Address";
import ButtonSubmit from "./ButtonSubmit";
import PaymentMethod from "./PaymentMethod";
import Radio from "./radio";

const steps = ["Shipping Method", "Shipping Address", "Payment Method"];

function getCartProductId(item) {
  return item?.productId?._id ?? item?.productId;
}

export default function HorizontalLinearStepper({ setShipcost, cartItems, totalPrices, shipCost, tax }) {
  const { cartId, clearCart } = useCart();
  const productIdToPost = cartItems.map((item) => getCartProductId(item));

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [addressInput, setAddressInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const { addressLineOne, addressLineTwo, ...addressRest } = addressInput;
  const addressForShipping = { ...addressRest, address: `${addressLineOne} ${addressLineTwo}` };

  const [error, setError] = useState({
    firstName: 0,
    lastName: 0,
    email: 0,
    phone: 0,
    addressLineOne: 0,
    addressLineTwo: 0,
    city: 0,
    state: 0,
    zip: 0,
    country: 0,
  });

  const [shipping, setShippig] = useState("Standard");
  const inputToDB = { ...addressForShipping, productId: productIdToPost, totalPrice: [totalPrices, shipCost, tax], shipping: shipping, method: "Cash on Delivery" };

  useEffect(() => {
    let shippingCost;
    switch (shipping) {
      case "Standard": shippingCost = 150
        break;
      case "Premium": shippingCost = 350
        break;
      case "Expedited": shippingCost = 500
        break;
      default: break;
    }

    setShipcost(shippingCost);

  }, [shipping, setShipcost])

  const navigate = useNavigate()


  const handleSubmit = () => {
    let checkError = false;

    Object.entries(addressInput).forEach(([name, value]) => {
      const isOptional = name === "addressLineTwo" || name === "city";

      if (!value) {
        setError((prevValue) => ({
          ...prevValue,
          [name]: isOptional ? 0 : 1,
        }));
        if (!isOptional) checkError = true;
      } else if (
        name === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        setError((prevValue) => ({
          ...prevValue,
          [name]: 2,
        }));
        checkError = true;
      } else if (
        name === "phone" &&
        !(
          /^0\d{9}$/.test(value) ||
          /^0\d{2}-\d{3}-\d{4}$/.test(value) ||
          /^\+\d{1,3}\s\d{2,3}-\d{3}-\d{4}$/.test(value) ||
          /^\+\d{1,3}\s\d{9,10}$/.test(value)
        )
      ) {
        setError((prevValue) => ({
          ...prevValue,
          [name]: 2,
        }));
        checkError = true;
      } else {
        setError((prevValue) => ({
          ...prevValue,
          [name]: 0,
        }));
      }
    });

    return checkError;
  };

  const step = [
    <Radio key="shipping" setShippig={setShippig} />,
    <Address
      key="address"
      addressInput={addressInput}
      setAddressInput={setAddressInput}
      error={error}
      handleSubmit={handleSubmit}
    />,
    <PaymentMethod key="payment" />,
  ];



  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      const hasErrors = handleSubmit();
      if (hasErrors) {
        return;
      }
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      await addOrdertoDB(inputToDB);
      await deleteCartAfertOrder();
      alert("Your purchase was successful. Thank you for choosing Collectico!");
      navigate(routePaths.myOrder);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const nextLabel = activeStep === steps.length - 1 ? "Purchase" : "Next";

  // Mate want to talk with DB. Can He?

  const addOrdertoDB = async (inputToDB) => {
    try {
      const newOrder = {
        shipping: inputToDB.shipping,
        totalPrice: inputToDB.totalPrice,
        firstName: inputToDB.firstName,
        lastName: inputToDB.lastName,
        email: inputToDB.email,
        phone: inputToDB.phone,
        address: inputToDB.address,
        city: inputToDB.city,
        state: inputToDB.state,
        zip: inputToDB.zip,
        country: inputToDB.country,
        paymentMethod: inputToDB.method,
        productId: inputToDB.productId,
      };
      await api.post(apiPaths.orders.create, newOrder);
    } catch (err) {
      console.error("Add to order failed:", err.response?.data || err.message);
    }
  };

  const deleteCartAfertOrder = async () => {
    if (!cartId) {
      return;
    }

    try {
      await api.delete(apiPaths.cart.clearAfterOrder(cartId));
      clearCart();
    } catch (err) {
      console.error("Delete order failed:", err.response?.data || err.message);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography
                  sx={{
                    width: "full",
                    color: "primary.main",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* ---------------------------------------------------------------------- Change Step ------ */}
          <div className="pt-[32px]">{step[activeStep]}</div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <ButtonSubmit
              onClick={handleBack}
              mate={activeStep === 0}
              label="Back"
            />
            <Box sx={{ flex: "1 1 auto" }} />
            {/* {activeStep < steps.length - 1 && (
              <ButtonSubmit onClick={handleSkip} label="Skip" />
            )} */}
            <ButtonSubmit onClick={handleNext} ml="16px" label={nextLabel} />
          </Box>
          {/* <ButtonSubmit onClick={() => {addOrdertoDB(inputToDB);}} ml="16px" mt="24px" label="Post" /> */}
        </React.Fragment>
      )}
    </Box>
  );
}
