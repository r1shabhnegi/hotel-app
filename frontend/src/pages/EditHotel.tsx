import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';
const EditHotel = () => {
  const { showToast } = useAppContext();
  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ['fetchMyHotelById'],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ''),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateHotelById,
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      onSave={handleSave}
      hotel={hotel}
      isLoading={isPending}
    />
  );
};
export default EditHotel;
