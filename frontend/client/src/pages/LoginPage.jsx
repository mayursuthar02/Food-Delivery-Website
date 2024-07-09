import React, { useState } from 'react'
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, Text, Link} from '@chakra-ui/react';
import { Link as RouterLink} from 'react-router-dom';

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import useShowToast from '../hooks/useShowToast';

const LoginPage = () => {
  const showToast = useShowToast(); //For toast
  
  const [isOTPSend, setIsOTPSend] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputOTP, setInputOTP] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // Handle Signup Function
  const handleSubmit = async() => {
    // check field is empty or not
    if (!email || !password) {
      showToast("Error", "All fields is required!", 'error');
      return;
    }

    // Call Api to signup user and send OPT for verifying user phone number
    
  }


  return (
    <Flex alignItems={'center'} justifyContent={'center'} minH={'100vh'} width={'full'}>
      {!isOTPSend ? (

        <Box border={'1px solid'} borderColor={'gray.100'} w={'500px'} borderRadius={'md'} p={'25px'}>
          <Stack align={"center"} mb={10}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign in your account.
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
            Sign in for a faster feast! ️🍚 
            </Text> 
          </Stack>

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
                Sign in
              </Button>
          </Stack>

          <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account?{" "}
                <Link as={RouterLink} to={"/signup"} color={"green.400"}>
                  Signup
                </Link>
              </Text>
            </Stack>
        </Box>
        
      ) : (
        <Box border={'1px solid'} borderColor={'gray.100'} w={'500px'} borderRadius={'md'} p={'25px'}>
          <Text fontSize={"2xl"} color={"gray.600"} fontWeight={'500'} mb={10} textAlign={'center'}>
            Verify your number!
          </Text>
        
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>OTP</FormLabel>
            <Input type="text" value={inputOTP} onChange={e => setInputOTP(e.target.value)} placeholder="Your OTP"/>
          </FormControl>

          <Stack spacing={10} pt={2}>
              <Button
                isLoading={isLoading}
                loadingText="Verifying..."
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                onClick={handleSubmit}
              >
                Verify Number
              </Button>
          </Stack>
        </Box>
      )}
    </Flex>
  )
}

export default LoginPage