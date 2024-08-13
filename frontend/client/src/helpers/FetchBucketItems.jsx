import { useRecoilState } from "recoil";
import bucketAtom from "../atoms/bucketAtom";
import useShowToast from '../hooks/useShowToast';

const FetchBucketItems = () => {
   const [bucketItems, setBucketItems] = useRecoilState(bucketAtom); 
    const showToast = useShowToast();
    
   const fetchBucketItemsFunc = async() => {
    try {
      const res = await fetch('/api/buckets/get-bucket-items');
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setBucketItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  return fetchBucketItemsFunc;
};

export default FetchBucketItems;
