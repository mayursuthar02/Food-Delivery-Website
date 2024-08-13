import { Box, Flex, Grid, Image, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard';

const RestaurantDetailsPage = () => {
    const {id} = useParams();
    const [restaurantData, setRestaurantData] = useState(null);
    const [restaurantItems, setRestaurantItems] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    
    useEffect(()=>{
        const fetchRestaurantData = async() => {
            setLoadingData(true);
            try {
                const res = await fetch(`/api/restaurant/get-data/${id}`);
                const data = await res.json();
                if(data.error) {
                    console.log("Error: ", data.error);
                }
                // console.log(data);
                setRestaurantData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingData(false);
            }
        }

        const fetchRestaurantItems = async() => {
            setLoadingItems(true);
            try {
                const res = await fetch(`/api/menu-items/get-restaurant-item/${id}`);
                const data = await res.json();
                if (data.error) {
                    console.log(data.error);
                }
                setRestaurantItems(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingItems(false);
            }
        }

        const fetchAllCategories = async() => {
            setCategoriesLoading(true);
            try {
                const res = await fetch(`/api/menu-items/get-item-categories/${id}`);
                const data = await res.json();
                if (data.error) {
                    console.log(data.error);
                }
                setCategoriesList(data);
            } catch (error) {
                console.log(error);
            } finally {
                setCategoriesLoading(false);
            }
        }
        
        fetchRestaurantData();
        fetchRestaurantItems();
        fetchAllCategories();
    },[id]);

    

  return (
    <Box>
        {!restaurantData || loadingData ? (
            <Flex align={'center'} justifyContent={'center'} width={'full'} h={'400px'} bgColor={'gray.200'}>
                <Spinner size={'xl'} color='gray.500'/>
            </Flex>
        ) : (
            <Box width={'full'} h={'400px'} bgColor={'gray.200'} position={'relative'} zIndex={1}>
            <Image src={restaurantData.profilePic} w={'full'} h={'full'} objectFit={'cover'} position={'absolute'} top={0} left={0} zIndex={-1}/>
            <Box w={'full'} h={'400px'} position={'absolute'} top={0} left={0} style={{background: 'linear-gradient(to top,rgba(0, 0, 0, 0.85) 40px,transparent)'}}></Box>

            <Box pos={'absolute'} bottom={'30px'} left={'60px'} right={'60px'}>
                <Flex align={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Text color={'white'} fontSize={'80px'}>{restaurantData.restaurantName}</Text>
                        <Text color={'gray.300'} fontSize={'20px'} mt={-3}>{restaurantData.bio}</Text>
                        <Text color={'gray.400'} fontSize={'15px'} >{restaurantData.address.city},{restaurantData.address.state} - {restaurantData.address.zipCode}</Text>
                    </Box>
                    <Box>
                        <Text color={'white'} fontSize={'18px'}>Email: {restaurantData.email}</Text>
                        <Text color={'white'} fontSize={'18px'}>Phone: {restaurantData.phone}</Text>
                    </Box>
                </Flex>
            </Box>
            </Box>
        )}
        
        <Grid templateColumns={'.25fr 1fr'} minH={'50vh'} mt={8} gap={7} px={8} mb={10}>
            <Box borderRight={'1px solid'} borderColor={'gray.200'} padding={5}>
                <Grid templateColumns={'1fr'} gap={1}>
                    {categoriesList.map((category, i)=> (
                        <Text key={i} textAlign={'center'} p={1} fontSize={'18px'} textTransform={'capitalize'} color={'gray.500'} _hover={{bgColor: "green.50"}} cursor={'pointer'}>{category}</Text>
                    ))}
                </Grid>
            </Box>
            <Box >
                <Grid templateColumns={'repeat(4,1fr)'} gap={5}>
                    {restaurantItems.map((item,i) => (
                        <ItemCard item={item} key={i}/>
                    ))}
                </Grid>
            </Box>
        </Grid>
    </Box>
  )
}

export default RestaurantDetailsPage