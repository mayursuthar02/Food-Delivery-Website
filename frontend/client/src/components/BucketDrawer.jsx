import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Flex,
    Box,
    Text,
    Image,
    Grid,
    Spinner,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import {loadStripe} from '@stripe/stripe-js';
  
  import { MdOutlineDeleteOutline } from "react-icons/md";
  
import bucketAtom from "../atoms/bucketAtom";
  import userAtom from "../atoms/userAtom";
  import { useRecoilState, useRecoilValue } from "recoil";
  
  import useShowToast from "../hooks/useShowToast";
import FetchBucketItems from "../helpers/FetchBucketItems";
  
  
  const BucketDrawer = ({ isOpenCart, onCloseCart }) => {
    const [bucketItems, setBucketItems] = useRecoilState(bucketAtom); 
    const user = useRecoilValue(userAtom);
    const [loading, setLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const showToast = useShowToast();
  
    const fetchBucketItemsFunc = FetchBucketItems();
  
    // Fetch bucket items
    useEffect(() => {
      setLoading(true);
      try {
        if (user) {
            fetchBucketItemsFunc();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        }
    }, [user]);


    // Update Qty
    const updateQty = async (bucketId, quantity) => {
      try {
        const res = await fetch("/api/buckets/update-quantity", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bucketId, quantity }),
        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    // + Qty
    const increaseQty = async (bucketId, qty) => {
      const newQty = qty + 1;
      const updatedItemsQty = bucketItems.map((prevItem) => {
        if (prevItem._id === bucketId) {
          return {
            ...prevItem,
            quantity: newQty,
          };
        }
        return prevItem;
      });
      setBucketItems(updatedItemsQty);
      updateQty(bucketId, newQty);
    };
    
    
    // - Qty
    const decreaseQty = async (bucketId, qty) => {
      let newQty = qty - 1;
      if (newQty < 1) {
        newQty = 1;
      }
      const updatedItemsQty = bucketItems.map((prevItem) => {
        if (prevItem._id === bucketId) {
          return {
            ...prevItem,
            quantity: newQty,
          };
        }
        return prevItem;
      });
      setBucketItems(updatedItemsQty);
      updateQty(bucketId, newQty);
    };
    
  
    // Remove cart item
    const RemoveBucketItem = async(bucketId) => {
      setRemoveLoading(true);
      try {
        const res = await fetch('/api/buckets/delete-bucket-item', {
          method: "DELETE",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({bucketId})
        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        fetchBucketItemsFunc();
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setRemoveLoading(false);
        }, 200);
      }
    }
  
    // For Total Price, color, qty and size
    const processCartItems = (items) => {
      let totalPrice = 0;
      let totalQuantity = 0;
  
      items.forEach((item) => {
        
        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;
      });
  
      return {
        totalPrice,
        totalQuantity
      };
    };
    const {totalPrice, totalQuantity } = processCartItems(bucketItems);
  
  
    const handleStripePayment = async() => {
      const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      const stripe = await loadStripe(publishableKey);
      setCheckoutLoading(true);
      try {
        const res = await fetch('/api/payments/stripe/checkout', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({items: bucketItems, totalAmount: totalPrice})
        });
        const session = await res.json();
        if (session.error) {
          showToast("Error", session.error, "error");
          console.log(session.error);
          return;
        };
        console.log(session)
        
        const result = stripe.redirectToCheckout({
          sessionId: session.id
        });
        if (result.error) {
          showToast("Error", result.error, "error");
          console.log(result.error);
          alert(result.error);
        }
        console.log(session)
      } catch (error) {
        console.log(error);
      } finally {
        setCheckoutLoading(false);
      }
    }
    
  
    return (
      <>
        <Drawer
          isOpen={isOpenCart}
          placement="right"
          onClose={onCloseCart}
          size={"sm"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color={"white"} mt={1} />
            <DrawerHeader
              color={"white"}
              bgColor={"green.400"}
              fontWeight={"400"}
              letterSpacing={2}
              fontSize={"16px"}
            >
              SHPPING CART
            </DrawerHeader>
  
            {removeLoading && (
              <>
                <Box position={'absolute'} w={'full'} h={'full'} bgColor={'black'} zIndex={1} opacity={.5}></Box>
                <Box position={'absolute'} top={'40%'} left={'50%'} zIndex={2}>
                  <Spinner size={'xl'} color="gray.100"/>
                </Box>
              </>
            )}
  
            <DrawerBody>
              <Box mt={2} position={'relative'} h={'50vh'}>
                {bucketItems.map((item) => (
                  <Flex
                    key={item._id}
                    align={"center"}
                    gap={4}
                    borderBottom={"1px solid"}
                    borderColor={"gray.200"}
                    py={4}
                  >
                    <Box
                      width={"120px"}
                      h={"88px"}
                      borderRadius={"4px"}
                      bgColor={"gray.200"}
                      overflow={"hidden"}
                    >
                      <Image
                        src={item.itemId.image}
                        w={"full"}
                        h={"full"}
                        objectFit={"cover"}
                      />
                    </Box>
                    <Flex flexDir={"column"} gap={2} w={"full"}>
                      <Flex justify={"space-between"}>
                        <Box>
                          <Text color={"gray.500"} fontSize={"15px"}>
                            {item.itemId.itemName}
                          </Text>
                          <Text mt={1} fontSize={"14px"} fontWeight={"600"} >
                            {item.itemId.category}
                          </Text>
                        </Box>
                        <Grid
                          height={"30px"}
                          w={"30px"}
                          placeContent={"center"}
                          borderRadius={"md"}
                          cursor={"pointer"}
                          bgColor={"white"}
                          color={"gray.500"}
                          fontSize={"20px"}
                          _hover={{ bgColor: "gray.100" }}
                          onClick={()=> RemoveBucketItem(item._id)}
                        >
                          <MdOutlineDeleteOutline />
                        </Grid>
                      </Flex>
  
                      <Flex align={"end"} justify={"space-between"} w={"full"}>
                        <Flex align={"center"}>
                          <Flex
                            align={"center"}
                            justify={"center"}
                            bgColor={"gray.100"}
                            w={"31px"}
                            h={"31px"}
                            color={"gray.500"}
                            cursor={"pointer"}
                            _hover={{ bgColor: "gray.200" }}
                            onClick={() => decreaseQty(item._id, item.quantity)}
                          >
                            -
                          </Flex>
                          <Flex
                            align={"center"}
                            justify={"center"}
                            bgColor={"gray.100"}
                            w={"31px"}
                            h={"31px"}
                            fontSize={"14px"}
                            fontWeight={600}
                          >
                            {item.quantity}
                          </Flex>
                          <Flex
                            align={"center"}
                            justify={"center"}
                            bgColor={"gray.100"}
                            w={"31px"}
                            h={"31px"}
                            color={"gray.500"}
                            cursor={"pointer"}
                            _hover={{ bgColor: "gray.200" }}
                            onClick={() => increaseQty(item._id, item.quantity)}
                          >
                            +
                          </Flex>
                        </Flex>
                        <Box>
                          <Text
                            fontSize={"15px"} 
                            fontWeight={"600"}
                            color={"gray.500"}
                          >
                            ₹ {item.price}.00
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
  
                {bucketItems.length === 0 && (
                <Flex align={'center'} justify={'center'}>
                  <Text mt={'200px'} fontSize={'20px'} color={'gray.500'}>No Cart Items</Text>
                </Flex>
                )}
              </Box>
            </DrawerBody>
  
            <DrawerFooter py={5} borderTop={"1px solid"} borderColor={"gray.200"}>
              <Flex flexDirection={"column"} w={"full"}>
                <Box mb={5}>
                  <Flex gap={2} align={"center"} mt={1} justify={"space-between"}>
                  </Flex>
                  <Flex gap={2} align={"center"} justify={"space-between"} mt={2}>
                    <Text fontSize={"15px"} fontWeight={"500"}>
                      Qty
                    </Text>
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      {totalQuantity}
                    </Text>
                  </Flex>
                  <Flex align={"center"} justify={"space-between"} mt={2}>
                    <Text fontSize={"15px"} fontWeight={"500"}>
                      Total
                    </Text>
                    <Text fontSize={"18px"} fontWeight={"500"}>
                      Rs. {totalPrice.toFixed(2)}
                    </Text>
                  </Flex>
                </Box>
  
                <Button
                  borderRadius={"2px"}
                  w={"full"}
                  py={6}
                  fontSize={"15px"}
                  colorScheme="green"
                  fontWeight={"600"}
                  letterSpacing={2}
                  onClick={handleStripePayment}
                  isLoading={checkoutLoading}
                >
                  ORDER NOW
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  
  export default BucketDrawer;
  