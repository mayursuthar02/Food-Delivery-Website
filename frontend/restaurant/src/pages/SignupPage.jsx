import React, { useState } from 'react'
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, Text, Link} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import useShowToast from '../hooks/useShowToast';


const SignupPage = () => {
  const showToast = useShowToast(); //For toast
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');



  // Handle Signup Function
  const handleSubmit = async() => {
    
    // check field is empty or not
    if (!email || !restaurantName || !password || !phoneNo) {
      showToast("Error", "All fields is required!", 'error');
      return;
    }

    setIsLoading(true);

    // Call Api to signup user and send OPT for verifying user phone number
    try {
      const ressponse = await fetch('/api/restaurant/signup', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({email, restaurantName, password, phoneNo})
      });
      
      const data = await ressponse.json();
      if (data.error) {
        showToast('Error', data.error, "error");
        return;
      }
      
      showToast('Success', data.message, "success");
      
      setTimeout(() => {
        setIsLoading(false);
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Flex alignItems={'center'} justifyContent={'center'} minH={'100vh'} width={'full'}>

        <Box border={'1px solid'} borderColor={'gray.100'} w={'500px'} borderRadius={'md'} p={'25px'}>
          <Stack align={"center"} mb={10}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              create your restaurant account! ️🍚 
            </Text>
          </Stack>
        
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Restaurant Name</FormLabel>
            <Input type="text" value={restaurantName} onChange={e => setRestaurantName(e.target.value)} placeholder="Your fullname"/>
          </FormControl>

          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@gmail.com"/>
          </FormControl>

          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}/>
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="email" isRequired mb={6}>
            <FormLabel>Phone Number</FormLabel>
            <Input type="email" value={phoneNo} onChange={e => setPhoneNo(e.target.value)} placeholder="Ex. +91 xxxx xxxx"/>
          </FormControl>

          <Stack spacing={10} pt={2}>
              <Button
                isLoading={isLoading}
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
          </Stack>

          <Stack pt={6}>
              <Text align={"center"}>
                Already have an account?{" "}
                <Link as={RouterLink} to={"/login"} color={"green.400"}>
                  Login
                </Link>
              </Text>
          </Stack>
        </Box>
        
    </Flex>
  )
}

export default SignupPage