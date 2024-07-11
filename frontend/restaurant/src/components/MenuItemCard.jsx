import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Box, Button, Flex, Image, Link, Text, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react'

import { FaStar } from "react-icons/fa6";

import useShowToast from '../hooks/useShowToast';
import FetchMenuItems from '../hooks/FetchMenuItems';
import UpdateFoodItem from './UpdateFoodItem';


const MenuItemCard = ({item}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const showToast = useShowToast();
    const fetchMenuItemsData = FetchMenuItems();

    // Show Edit Model
    const showEditModel = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onOpen();
    }
    
    // Show Delete Model
    const showDeleteModel = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onOpenAlert();
    }


    // Delete Menu Item
    const handleDelete = async() => {
        setLoading(true);
        try {
          const res = await fetch(`/api/menu-items/delete-item/${item._id}`, {
            method: "DELETE"
          });
          const data = await res.json();
          if (data.error) {
            showToast("Error", data.error, "Error");
            return;
          }
          showToast("Success", "Menu item deleted", "success");
          fetchMenuItemsData();
        } catch (error) {
          console.log(error);
          showToast("Error", error, "Error");
        } finally {
          setLoading(false);
        }
    }

  return (
    <>
        <Link as={RouterLink} border={'1px solid'} borderColor={'white'} _hover={{borderColor: "gray.200"}} transition={'.1s ease'} borderRadius={'2xl'} padding={3}>

            <Box position={'relative'}>
                {/* Edit Button */}
                <Button
                position={"absolute"}
                px={3}
                top={2}
                right={2}
                size={'xs'}
                onClick={showEditModel}
                >
                EDIT
                </Button>

                {/* Delete Button */}
                <Button
                position={"absolute"}
                px={3}
                top={10}
                right={2}
                size={'xs'}
                onClick={(e)=> showDeleteModel(e)}
                >
                DELETE
                </Button>


                <Box w={'full'} h={'200px'} bgColor={'gray.100'} borderRadius={'xl'} overflow={'hidden'}>
                    <Image src={item.image} w={'full'} h={'full'} objectFit={'cover'} loading='lazy'/>
                </Box>

                <Flex align={'start'} justifyContent={'space-between'} px={2} mt={2}>
                    <Text fontSize={'20px'} fontWeight={'600'}>{item.itemName}</Text>
                    <Badge colorScheme='green' mt={1}>
                        <Flex align={'center'} gap={1}>
                            <FaStar/>
                            <Text>4.5</Text>
                        </Flex>
                    </Badge>
                </Flex>

                <Flex align={'center'} justifyContent={'space-between'} px={2}>
                    <Text fontSize={'15px'} fontWeight={'600'} color={'gray.500'}>{item.category}</Text>
                    <Text fontSize={'20px'} fontWeight={'700'} color={'gray.800'}>₹{item.price}</Text>
                </Flex>


                <Flex align={'center'} gap={3} px={2} mt={2}>
                    <Badge colorScheme={item.availability == true ? "green" : "red"}>{item.availability == true ? "Available" : "Not available"}</Badge>
                    <Badge colorScheme={item.isVeg == true ? "green" : "red"}>{item.isVeg == true ? "VEG" : "NON-VEG"}</Badge>
                </Flex>
            </Box>
        </Link>

        {/* Update Item Edit DialogBox */}
        <UpdateFoodItem item={item} isOpen={isOpen} onClose={onClose}/>

        {/* Delete Model DialogBox */}
        <AlertDialog
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
      >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete Item
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You want to delete!
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onCloseAlert}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' ml={3} loadingText="Deleting" isLoading={loading} onClick={handleDelete}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

    </>
  )
}

export default MenuItemCard