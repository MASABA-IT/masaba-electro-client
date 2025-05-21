import React from "react";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../../providers/AppProviders";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import AddressCardList from "../AddressCardList/AddressCardList";

const UserAddressSection = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
  onAddNew,
  handleEdit,
}) => {
  const { deleteAddress } = useProductStore();
  const deletedPermission = (e, addr) => {
    e.stopPropagation();

    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
        title: "swal-title", // Custom class for title
        text: "swal-text", // Custom class for text
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion if confirmed
        deleteAddress(addr.id);

        // Success message after deleting the address
        Swal.fire({
          icon: "success",
          title: "Address Deleted!",
          text: "Your shipping address has been successfully deleted.",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            title: "swal-success-title",
            text: "swal-success-text",
          },
        });
      }
    });
  };

  return (
    <div className="bg-white  rounded-lg  p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Your Address</h2>
        <button
          onClick={onAddNew}
          className="text-blue-600 text-2xl hover:underline"
        >
          + Add New
        </button>
      </div>

      {/* Address List */}
      {addresses?.length === 0 ? (
        <p className="text-gray-500 text-xl">No addresses added yet.</p>
      ) : (
        <AddressCardList
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelect={setSelectedAddress}
          onEdit={handleEdit}
          onDelete={deletedPermission}
        />
      )}
    </div>
  );
};

export default UserAddressSection;
