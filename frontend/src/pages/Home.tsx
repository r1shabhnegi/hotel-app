import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery({
    queryKey: ["fetchQuery"],
    queryFn: () => apiClient.fetchHotels(),
  });

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className='px-2 space-y-3'>
      <h2 className='text-2xl font-bold sm:text-3xl'>Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className='grid gap-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className='grid gap-6 md:grid-cols-3'>
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
