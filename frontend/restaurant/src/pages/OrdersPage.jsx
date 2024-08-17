import { useEffect, useState } from "react"
import useShowToast from "../hooks/useShowToast";
import { Box, Button, Divider, Flex, Grid, Image, Select, Spinner, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const OrdersPage = () => {
    const showToast = useShowToast();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateStatusLoading, setUpdateStatusLoading] = useState(false);
    const [status, setStatus] = useState('');

    // Fetch Orders
    useEffect(() => {
        const fetchRestaurantData = async() => {
            setLoading(true);
            try {
                const res = await fetch('/api/orders/get-restaurant-orders');
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                }
                setOrders(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchRestaurantData();
    }, [])
    
    
        // Status object
        const statusObj = [
            { title: 'Pending', value: 'pending'},
            { title: 'Received', value: 'received'},
            { title: 'Out of Delivery', value: 'out of delivery'},
            { title: 'Delivered', value: 'delivered'},
        ]

            // Handle Order status
    const handleOrderStatus = async(e, orderId) => {
        const value = e.target.value;
        setUpdateStatusLoading(true);
        
        try {
            const res = await fetch(`/api/orders/update-status/${orderId}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({status: value})
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Status updated", "success");
        } catch (error) {
            console.log(error);    
            showToast("Error", error, "error");
        } finally {
            setUpdateStatusLoading(false);
            setStatus(value);
        }
    }
    
  return (
    <>
    <Box p={10} bgColor={'gray.50'} m={-5} borderRadius={'md'} h={'full'}>
        <Text fontSize={'20px'} fontWeight={'500'} mb={5}>MY ORDERS</Text>

        {loading && (
            <Flex align={'center'} justify={'center'} minH={'70vh'}>
                <Spinner color="gray.500" size={'xl'}/>
            </Flex>
        )}

        {orders.length === 0 && !loading && (
            <Flex align={'center'} justify={'center'} minH={'70vh'}>
                <Text fontSize={'20px'} color={'gray.500'}>Start shopping to fill your order history!</Text>
            </Flex>
        )}
        
        {orders.length > 0 && (
            <Grid templateColumns={'1fr'} gap={10} maxH={'400vh'} overflowY={'scroll'} className="hide-scroll">
                {orders.map((order,i) => (
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

                        <Flex gap={5} fontSize={'14px'} color={'gray.500'} ml={4} mt={5} align={'center'}>
                            <Text fontSize={'15px'} fontWeight={'600'} textTransform={'uppercase'} >Update Status</Text>
                            <Box w={'250px'} position={'relative'}>
                                <Box  position={'absolute'} top={'25%'} left={'45%'} >
                                    {updateStatusLoading && <Spinner size={'sm'} color="gray.500"/>}
                                </Box>
                                <Select value={status} cursor={'pointer'} onChange={e=> handleOrderStatus(e, order._id)} isDisabled={updateStatusLoading}> 
                                    {statusObj.map((el) => (
                                        <option key={el.value} value={el.value}>{el.title}</option>
                                    ))}
                                </Select>
                            </Box>
                        </Flex>

                        <Text fontSize={'14px'} color={'gray.500'} ml={4} my={2}>Item : {order.itemsDetails.length}</Text>

                        <Divider borderColor={'gray.200'}/>

                        {order.itemsDetails.map((item) => (
                            <Flex key={item._id} justify={'space-between'} borderBottom={'1px solid '} borderColor={'gray.200'} py={5} gap={5}>
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

                    </Box>
                ))}
            </Grid>
        )}
    </Box>
    </>
  )
}

export default OrdersPage