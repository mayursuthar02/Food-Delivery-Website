import React from 'react'
import { Box, Badge, Heading, Text, Flex, Image, Button, Avatar, Stack, Grid, Link } from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import HomeCarousel from '../components/HomeCarousel'
import img1 from '../assets/Category img/1.png'
import img2 from '../assets/Category img/2.png'
import img3 from '../assets/Category img/3.png'
import img4 from '../assets/Category img/4.png'
import img6 from '../assets/Category img/6.png'
import img5 from '../assets/Category img/5.png'
import img7 from '../assets/img/burger.jpg';
import img8 from '../assets/img/ice-cream.jpg';
import HomeScreenItems from '../components/HomeScreenItems'

const HomePage = () => {

  const categories = [
    {category: 'Pizza', img: img3, link: 'pizza'},
    {category: 'Burger', img: img4, link: 'burger'},
    {category: 'Samosa', img: img5, link: 'samosa'},
    {category: 'Biryani', img: img6, link: 'biryani'},
    {category: 'Ice Cream', img: img2, link: 'ice cream'},
    {category: 'Chocolate', img: img1, link: 'chocolate'},
  ]

  return (
    <Box minH={'100vh'}>
      <HomeCarousel/>

      <Flex align={'center'} justifyContent={'space-between'} my={10} px={20}>
        <Text fontSize={'30px'} fontWeight={'500'}>Categories</Text>
        <Link as={RouterLink} to={'/recipes'} fontSize={'15px'} fontWeight={'500'} py={3} px={10} borderRadius={'md'} bgColor={'green.50'} _hover={{bgColor: 'green.100'}}>View All Categories</Link>
      </Flex>

      <Grid templateColumns={'repeat(6,1fr)'} px={20} gap={10}>
        {categories.map((cate,i) => (
          <Link key={i} to={`/recipe/${cate.link}`} as={RouterLink} h={'200px'} display={'flex'} alignItems={'center'} flexDir={'column'} justifyContent={'center'} borderRadius={'md'} border={'1px solid'} borderColor={'green.100'}>
            <Box w={'120px'} h={'110px'}>
              <Image src={cate.img} w={'full'} h={'full'} objectFit={'cover'}/>
            </Box>
            <Text mt={2} fontSize={'20px'} fontWeight={'500'}>{cate.category}</Text>
          </Link>
        ))}
      </Grid>

      <Grid templateColumns={'1fr 1fr'} height={'60vh'} mt={20} gap={20} px={20}>
        <Flex align={'center'} px={10} borderRadius={'3xl'} bgColor={'gray.200'} position={'relative'} zIndex={1} overflow={'hidden'}>
          <Image position={'absolute'} top={0} left={0} zIndex={-1} src={img7} w={'full'} h={'full'} objectFit={'cover'}/>
          <Box w={'full'} h={'60vh'} position={'absolute'} top={0} left={0} style={{background: 'linear-gradient(to top,rgba(0, 0, 0, 0.85) 40px,transparent)'}}></Box>

          <Box zIndex={1}>
            <Flex align={'center'} gap={3}>
              <Text fontSize={'15px'} fontWeight={'500'} color={'white'}>Exclusive Offer</Text>
              <Text color={'white'} bgColor={'green.600'} borderRadius={'md'} px={3} py={1} fontSize={'13px'} fontWeight={'600'}>15% off</Text>
            </Flex>

            <Text textTransform={'capitalize'} fontSize={'70px'} lineHeight={'80px'} mt={3} color={'white'}>Best online deals, Free stuff</Text>

            <Text textTransform={'capitalize'} my={5} fontSize={'18px'} color={'white'}>Only on this week... Don't miss</Text>
            
            <Button colorScheme='green' borderRadius={'full'}>Get Best Deal</Button>
          </Box>
        </Flex>

        <Flex align={'center'} px={10} borderRadius={'3xl'} bgColor={'gray.200'} position={'relative'} zIndex={1} overflow={'hidden'}>
        <Image position={'absolute'} top={0} left={0} zIndex={-1} src={img8} w={'full'} h={'full'} objectFit={'cover'}/>
        <Box w={'full'} h={'60vh'} position={'absolute'} top={0} left={0} style={{background: 'linear-gradient(to top,rgba(0, 0, 0, 0.85) 40px,transparent)'}}></Box>
          
          <Box zIndex={1}>
            <Flex align={'center'} gap={3}>
              <Text fontSize={'15px'} fontWeight={'500'} color={'white'}>Regular Offer</Text>
            </Flex>

            <Text textTransform={'capitalize'} fontSize={'60px'} lineHeight={'80px'} mt={3} color={'white'}>10% cash-back on personal care</Text>

            <Text textTransform={'capitalize'} my={5} fontSize={'18px'} color={'white'}>Max cashback: ₹200. Code: CADHL873</Text>
            
            <Button colorScheme='green' borderRadius={'full'}>Shope Now</Button>
          </Box>
        </Flex>

      </Grid>


      <HomeScreenItems title={'Pizza'} category={'pizza'}/>

      <HomeScreenItems title={'Burger'} category={'burger'}/>

      <HomeScreenItems title={'Ice Cream'} category={'ice cream'}/>
      
      

      
    </Box>
  )
}

export default HomePage