import React, { useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Center,
  Avatar,
  AvatarBadge,
  Button,
  IconButton,
  Text,
  Divider,
} from "@chakra-ui/react";

import { SmallCloseIcon } from "@chakra-ui/icons";
import { FiEdit } from "react-icons/fi";

import {useRecoilState} from 'recoil';
import userAtom from '../atoms/userAtom'

import usePriviewImg from '../hooks/usePriviewImg';
import useShowToast from "../hooks/useShowToast";

const UserProfile = () => {
  const [user,setUser] = useRecoilState(userAtom);

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState({
    street: user.address.street, 
    city: user.address.city, 
    state: user.address.state, 
    zipCode: user.address.zipCode, 
    country: user.address.country
  });
  const [phone, setPhone] = useState(user.phone);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();
  const {handleImageChange, imgUrl, setImgUrl} = usePriviewImg();

  const showToast = useShowToast();

  // Handle update
  const handleUpdate = async() => {
    try {
      setLoading(true);
      const res = await fetch('/api/users/update', {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({fullName, email, address, phone, profilePic: imgUrl})
      });
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, "error");
        return;
      }
      showToast('Success', "Profile updated", "success");
      localStorage.setItem('user-details', JSON.stringify(data));
      setUser(data);
      setLoading(false);
    } catch (error) {
      showToast('Error', error.message, "error");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  
  return (
    <Box width={"100%"} px={10}>
    <Box>
      <Text my={5} fontSize={'30px'} fontWeight={'500'} color={'green.500'}>User Details</Text>
      <Divider mb={10}/>
      
      <FormControl id="userName" w={"300px"}>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar size="xl" src={imgUrl || user.profilePic} objectFit={'cover'}> 
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
                onClick={()=> setImgUrl("")}
              />
            </Avatar>
          </Center>
          <Center w="full">
            <Button w="full" onClick={() => fileRef.current.click()}>Change Icon</Button>
            <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
          </Center>
        </Stack>
      </FormControl>

      <Box display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap={10} mt={10} >
        <Box>
          <FormControl id="fullName">
            <FormLabel>Full Name</FormLabel>
            <Input type="text" value={fullName} onChange={e => setFullName(e.target.value)}/>
          </FormControl>
        </Box>
        <Box>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
          </FormControl>
        </Box>
        <Box>
          <FormControl id="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <Input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ex. +91 9328077809"/>
          </FormControl>
        </Box>
      </Box>

      <Text mb={5} mt={20} fontSize={'30px'} fontWeight={'500'} color={'green.500'}>Address</Text>
      <Divider mb={10}/>
      
      <Box display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap={5}>
        <Box gridColumn={'1/3'}>
          <FormControl id="fullName">
            <FormLabel>Street</FormLabel>
            <Input type="text" value={address.street} onChange={e => setAddress(data => ({ ...data, street: e.target.value }))} />
          </FormControl>
        </Box>
        <Box gridColumn={'1/2'}>
          <FormControl id="email">
            <FormLabel>City</FormLabel>
            <Input type="text" value={address.city} onChange={e => setAddress(data => ({ ...data, city: e.target.value }))}/>
          </FormControl>
        </Box>
        <Box gridColumn={'2/3'}>
          <FormControl id="phoneNumber">
            <FormLabel>State</FormLabel>
            <Input type="text" value={address.state} onChange={e => setAddress(data => ({ ...data, state: e.target.value }))}/>
          </FormControl>
        </Box>
        <Box gridColumn={'1/2'}>
          <FormControl id="email">
            <FormLabel>Zip Code</FormLabel>
            <Input type="text" value={address.zipCode} onChange={e => setAddress(data => ({ ...data, zipCode: e.target.value }))}/>
          </FormControl>
        </Box>
        <Box gridColumn={'2/3'}>
          <FormControl id="phoneNumber">
            <FormLabel>Country</FormLabel>
            <Input type="text" value={address.country} onChange={e => setAddress(data => ({ ...data, country: e.target.value }))}/>
          </FormControl>
        </Box>
      </Box>

      <Button colorScheme="green" fontWeight={'500'} display={'flex'} alignItems={'center'} gap={2} mt={20} mb={5} isLoading={loading} loadingText="Updating" onClick={handleUpdate}>
        <FiEdit size={'18px'}/>
        Update Profile
      </Button>
    </Box>
  </Box>
  )
}

export default UserProfile