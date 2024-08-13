import { useEffect, useState } from "react"
import useShowToast from "../hooks/useShowToast";
import { Box, Button, Divider, Flex, Grid, Image, Link, Spinner, Text } from "@chakra-ui/react";
import { TiLocationArrow } from "react-icons/ti";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import { IoCheckbox } from "react-icons/io5";

const UserOrder = () => {
    const showToast = useShowToast();
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Scroll Top
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when component mounts or updates
    }, []);
    
    // Fetch my order
    useEffect(()=>{
        const fetchOrders = async() => {
            setLoading(true);
            try {
                const res = await fetch('/api/orders/get-orders');
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setOrderData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
                showToast("Error", error, "error");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    },[]);
    
    // Order status
    const orderStatus = [
        {status: 'pending', color: 'yellow.400'},
        {status: 'received', color: 'orange.400'},
        {status: 'at depot', color: 'red.400'},
        {status: 'in transit', color: 'purple.400'},
        {status: 'out of delivery', color: 'blue.400'},
        {status: 'delivered', color: 'green.400'},
    ];

  return (
    <>
    <Box p={10} bgColor={'gray.50'} m={-5} borderRadius={'md'} h={'full'}>
        <Text fontSize={'20px'} fontWeight={'500'} mb={5}>MY ORDERS</Text>

        {loading && (
            <Flex align={'center'} justify={'center'} minH={'70vh'}>
                <Spinner color="gray.500" size={'xl'}/>
            </Flex>
        )}

        {orderData.length === 0 && !loading && (
            <Flex align={'center'} justify={'center'} minH={'70vh'}>
                <Text fontSize={'20px'} color={'gray.500'}>Start shopping to fill your order history!</Text>
            </Flex>
        )}
        
        {orderData.length > 0 && (
            <Grid templateColumns={'1fr'} gap={10} maxH={'400vh'} overflowY={'scroll'} className="hide-scroll">
                {orderData.map((order,i) => (
                    <Box key={i} bg={'white'} height={'fit-content'} boxShadow={'sm'} p={7} borderRadius={'md'}>
                        <Flex align={'center'} justify={'space-between'}>
                            {/* <Flex align={'center'} gap={5}> */}
                                <Flex align={'center'} gap={2} fontSize={'16px'} fontWeight={'500'} bgColor={'gray.100'} py={2} px={4} borderRadius={'full'}>
                                    <Text>Order</Text>
                                    <Text color={'blue.400'}>#{order._id.slice(-4)} - {order._id.slice(-8, -4)}</Text>
                                </Flex>

                                <Flex align={'center'} gap={2} fontSize={'15px'} fontWeight={'400'} color={'gray.500'}>
                                    <Text>Order Placed:</Text>
                                    <Text>{format(order.createdAt, "EEE, do MMM yy")}</Text>
                                </Flex>
                            {/* </Flex> */}
                        </Flex>
                        <Flex gap={2} fontSize={'14px'} color={'gray.500'} ml={4} mt={2} align={'center'}>
                            Status: 
                            {orderStatus.map((orderS) => (
                                order.status === orderS.status && <Text key={orderS.status} color={orderS.color} fontWeight={'600'}>{order.status}</Text>
                            ))}
                        </Flex>

                        <Text fontSize={'14px'} color={'gray.500'} ml={4} my={2}>Item : {order.itemsDetails.length}</Text>

                        <Divider borderColor={'gray.200'}/>

                        {order.itemsDetails.map((item) => (
                            <Flex justify={'space-between'} borderBottom={'1px solid '} borderColor={'gray.200'} py={5} gap={5}>
                                <Box bg={'gray.200'} w={'80px'} height={'80px'} overflow={'hidden'} borderRadius={'md'}>
                                    <Image src={item.itemId.image} w={'full'} h={'full'} objectFit={'cover'}/>
                                </Box>

                                <Flex flexDir={'column'} justify={'center'} gap={1} w={'800px'}>
                                    <Text fontSize={'17px'} fontWeight={'600'}>{item.itemId.category}</Text>
                                    <Text fontSize={'15px'} fontWeight={'400'} color={'gray.500'}>{item.itemId.itemName}</Text>
                                    <Flex align={'center'} gap={3}>
                                        <Flex align={'center'} gap={2} fontSize={'15px'} fontWeight={'400'} color={'gray.500'}><Text color={item.itemId.isVeg == true ? "green.400" : "red.400"}>{item.itemId.isVeg == true ? "Veg" : "NonVeg"}</Text></Flex>
                                    </Flex>
                                </Flex>
                                
                                <Box>
                                    <Text w={'100px'} fontWeight={'500'} fontSize={'13px'} color={'gray.500'} textAlign={'right'}>₹ {item.price}</Text>
                                    <Text w={'100px'} fontWeight={'600'} fontSize={'15px'} textAlign={'right'}>Qty {item.quantity}</Text>
                                </Box>
                            </Flex>
                        ))}

                        <Flex mt={4} gap={5} align={'center'} justify={'space-between'}>
                            <Button cursor={'pointer'} fontSize={'15px'} fontWeight={'500'}>CANCLE ORDER</Button>
                            <Flex align={'center'} justify={'space-between'} w={'440px'}>
                                <Text fontSize={'15px'} fontWeight={'500'}>Total Amount:</Text>
                                <Text fontWeight={'600'} fontSize={'15px'}>Rs. {order.totalAmount.toFixed(2)}</Text>
                            </Flex>
                        </Flex>

                        <Divider borderColor={'gray.200'} my={5}/>

                        {/* <Flex align={'center'} gap={5}>
                            <Link as={RouterLink} to={''} display={'flex'} alignItems={'center'} justifyItems={'center'} gap={1} bgColor={'blue.500'} color={'white'} fontSize={'15px'} py={2} px={4} borderRadius={'md'} _hover={{bgColor: 'blue.600'}}>
                                <TiLocationArrow fontSize={'17px'}/>
                                <Text>Track Order</Text>
                            </Link>
                            {order.status === 'delivered' &&
                            <Button display={'flex'} alignItems={'center'} justifyItems={'center'} gap={1} fontSize={'15px'} py={2} px={4} borderRadius={'md'}>
                                <Text>Return</Text>
                            </Button>}
                        </Flex> */}
                    </Box>
                ))}
            </Grid>
        )}
    </Box>
    </>
  )
}

export default UserOrder