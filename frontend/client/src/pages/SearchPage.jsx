import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

const SearchPage = () => {
  const query = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(10).fill(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      navigate("/");
    }

    const getSearchitems = async () => {
      try {
        const res = await fetch(`/api/menu-items/v2/search`+query.search);
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          return;
        }
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSearchitems();
  }, [query]);

  return (
    <Box px={10}>
        <Text textAlign={'left'} pt={5} ml={5} fontSize={'25px'}>Search input = {query.search.split("=")[1]}</Text>

      {/* Show Loading Animation */}
      {loading && (
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(5, 1fr)"}
          gap={5}
          my={5}
        >
          {loadingList.map((_, i) => (
            <Box key={i}>
              <Skeleton w={"full"} h={"200px"} borderRadius={"xl"} />
              <Flex align={"center"} justifyContent={"space-between"} px={2}>
                <Skeleton w={"150px"} h={5} borderRadius={"md"} mt={2} />
                <Skeleton w={"50px"} h={5} borderRadius={"md"} mt={2} />
              </Flex>
              <Box px={2}>
                <Skeleton w={"250px"} h={5} borderRadius={"md"} mt={2} />
                <Skeleton w={"150px"} h={5} borderRadius={"md"} mt={2} />
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Show menu items */}
      {!loading && (
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(5, 1fr)"}
          gap={5}
          my={5}
        >
          {searchResults.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </Box>
      )}

      {searchResults.length == 0 && (
        <Text
          textAlign={"center"}
          py={"140px"}
          color={"gray.500"}
          fontSize={"30px"}
        >
          Items Not Found
        </Text>
      )}
    </Box>
  );
};

export default SearchPage;
