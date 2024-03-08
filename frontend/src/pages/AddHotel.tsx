import { useMutation } from '@tanstack/react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error saving hotel', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    console.log('handleSave');
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      onSave={handleSave}
      isLoading={isPending}
    />
  );
};
export default AddHotel;
