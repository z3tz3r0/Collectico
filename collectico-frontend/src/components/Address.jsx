import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

function Address({addressInput, setAddressInput, error, handleSubmit}) {


  const handleInput = e => {
    const { id, value } = e.target;
  setAddressInput((prevalue) => ({
    ...prevalue, [id]:value,
  }))

};

  // console.log( "This is 1st name", addressInput)

  return (
    <Paper elevation={3}
    sx={{ p: 3, mb: 4, bgcolor: "#f9f7f3", color: "#62483a" }}>
    <Box className="flex items-center mb-[24px]">
              <Box className="flex items-center justify-center w-8 h-8 mr-2 bg-[#62483a] text-white rounded-full">
                <Typography variant="subtitle1" className="font-bold">
                  2
                </Typography>
              </Box>
              <Typography variant="h5" className="font-bold text-[#62483a]">
                Shipping Address
              </Typography>
    </Box>
    <form onSubmit={handleSubmit} noValidate>
    <div id="overAll" className='flex flex-col'>
    <div className='flex gap-[24px]'>
    <TextField
        required
        fullWidth
        id="firstName"
        label="First Name"
        value={addressInput.firstName}
        error={error.firstName > 0 }
        onChange={handleInput}
        helperText={
          (error.firstName === 1) ? "Please enter your first name" : (error.firstName === 2) ? "Invalid format" : ""
        }
        variant="outlined"
        placeholder="First Name"
        type="text"
        margin="normal"/>
        {/* {console.log(`This is 1st name ${addressInput.firstName}`)} */}
        <TextField
        required
        fullWidth
        id="lastName"
        label="Last Name"
        value={addressInput.lastName}
        error={error.lastName > 0 }
        onChange={handleInput}
        helperText={
          (error.lastName === 1) ? "Please enter your last name" : (error.lastName === 2) ? "Invalid format" : ""
        }
        variant="outlined"
        placeholder="Last Name"
        type="text"
        margin="normal"/>
    </div>
    <div className='flex gap-[24px]'>
    <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        value={addressInput.email}
        error={error.email > 0 }
        onChange={handleInput}
        helperText={
          (error.email === 1) ? "Please enter your email" : (error.email === 2) ? "Invalid email format" : ""
        }
        type="email"
        variant="outlined"
        placeholder="example@email.com"
        margin="normal"/>
        <TextField
        required
        fullWidth
        id="phone"
        label="Phone Number"
        value={addressInput.phone}
        error={error.phone > 0 }
        onChange={handleInput}
        helperText={
          (error.phone === 1) ? "Please enter your phone number" : (error.phone === 2) ? "Invalid phone number format" : ""
        }
        variant="outlined"
        placeholder="+66 123-456-7890"
        type="tel"
        margin="normal"/>
    </div>
    <TextField
        required
        fullWidth
        id="addressLineOne"
        label="Address Line 1"
        value={addressInput.addressLineOne}
        error={error.addressLineOne > 0 }
        onChange={handleInput}
        helperText={
          (error.addressLineOne === 1) ? "Please enter your address" : (error.addressLineOne === 2) ? "Invalid format" : ""
        }
        variant="outlined"
        placeholder="Address Line 1"
        type="text"
        margin="normal"/>
        <TextField
        // required
        fullWidth
        id="addressLineTwo"
        label="Address Line 2"
        value={addressInput.addressLineTwo}
        error={error.addressLineTwo > 0 }
        onChange={handleInput}
        helperText={
          (error.addressLineOne === 2) ? "Invalid format" : ""
        }
        variant="outlined"
        placeholder="Address Line 2"
        type="text"
        margin="normal"/>
        {/* {console.log(` line2: ${error.addressLineTwo}`)} */}
    <div className='flex gap-[24px]'>
    <TextField
        fullWidth
        id="city"
        label="City"
        value={addressInput.city}
        error={error.city > 0 }
        onChange={handleInput}
        helperText={
        (error.city === 2) ? "Invalid format" : ""
        }
        variant="outlined"
        placeholder="City"
        type="text"
        margin="normal"/>
        <TextField
        required
        fullWidth
        id="state"
        label="State/Province"
        value={addressInput.state}
        error={error.state > 0 }
        onChange={handleInput}
        helperText={
          (error.state=== 1) ? "Please enter your State/Province" : (error.state === 2) ? "Invalid format" : ""
        }
        variant="outlined"
        placeholder="State/Province"
        type="text"
        margin="normal"/>
    </div>
    <div className='flex gap-[24px]'>
    <TextField
        required
        fullWidth
        id="zip"
        label="ZIP/Postal Code"
        value={addressInput.zip}
        error={error.zip > 0 }
        onChange={handleInput}
        helperText={
          (error.zip === 1) ? "Please enter your ZIP" : (error.zip === 2) ? "Invalid format" : ""
        }
        variant="outlined"
        placeholder="10900 or A1A 1A1"
        margin="normal"
        type="text"
        />
        <TextField
        required
        fullWidth
        id="country"
        label="Country"
        value={addressInput.country}
        error={error.country> 0 }
        onChange={handleInput}
        helperText={
          (error.country === 1) ? "Please enter your country" : (error.country === 2) ? "you format!!!" : ""
        }
        variant="outlined"
        placeholder="Country"
        type="text"
        margin="normal"/>
    </div>
    </div>
    </form>
    </Paper>
  )
};

export default Address


