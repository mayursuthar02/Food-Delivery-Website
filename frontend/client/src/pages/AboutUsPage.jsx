import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react"
import img1 from '../assets/img/about.webp';
import img2 from '../assets/img/pizzas.jpg';
import img3 from '../assets/img/ice-cream.jpg';


const AboutUsPage = () => {
  return (
    <Grid minH={'80vh'} gridTemplateColumns={'1fr 1fr'}>
        <Flex align={'center'} justify={'center'}>
            <Box position={'relative'} w={'full'} h={'full'}>
                <Box position={'absolute'} top={10} right={'100px'} width={'350px'} height={'350px'} border={'6px solid #fff'} overflow={'hidden'} borderRadius={'full'}>
                    <Image src={img1} width={'full'} height={'full'} objectFit={'cover'}/>
                </Box>
                <Box position={'absolute'} top={'300px'} right={'250px'} width={'250px'} height={'250px'} border={'6px solid #fff'} overflow={'hidden'} borderRadius={'full'}>
                    <Image src={img2} width={'full'} height={'full'} objectFit={'cover'}/>
                </Box>
                <Box position={'absolute'} top={'200px'} left={'150px'} width={'150px'} height={'150px'} border={'6px solid #fff'} overflow={'hidden'} borderRadius={'full'}>
                    <Image src={img3} width={'full'} height={'full'} objectFit={'cover'}/>
                </Box>
            </Box>
        </Flex>
        <Flex align={'center'} justify={'center'}>
            <Box paddingRight={'100px'}>
                <Text color={'gray.800'} fontWeight={'600'} fontSize={'50px'} mb={5}>About Us</Text>

                <Text fontSize={'15px'} color={'gray.500'} mb={3}>Welcome to MealSprint, your go-to destination for discovering and enjoying delicious meals from your favorite local restaurants, all from the comfort of your home!</Text>
                <Text fontSize={'15px'} color={'gray.500'} mb={3}>Who We Are MealSprint is an innovative food ordering platform designed to connect food lovers with the best eateries in town. Whether you're craving a quick bite or a gourmet meal, MealSprint makes it easy to browse, order, and enjoy a wide variety of dishes with just a few clicks.</Text>
                <Text fontSize={'15px'} color={'gray.500'} mb={3}>Our Mission At MealSprint, our mission is simple: to make food ordering fast, easy, and enjoyable. We strive to bring convenience to your dining experience by offering a seamless platform where users can explore diverse cuisines, read reviews, and place orders effortlessly. We believe that great food should be accessible to everyone, and our goal is to help you find and enjoy the meals you love.</Text>

                <Button colorScheme="green" mt={5}>Learn More</Button>
            </Box>
        </Flex>
    </Grid>
  )
}

export default AboutUsPage