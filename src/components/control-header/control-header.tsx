"use client";

import { useModal } from "@todo/hooks/use-modal";
import { Modal } from "../modal/modal";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { selectUser } from "@todo/libs/redux/slices/user/selector/get-user";

export const CreateActions = () => {
  const {
    isVisible: isCategoryModalVisible,
    openModal: openCategoryModal,
    closeModal: closeCategoryModal,
  } = useModal();
  const {
    isVisible: isTicketModalVisible,
    openModal: openTicketModal,
    closeModal: closeTicketModal,
  } = useModal();

  const user = useAppSelector(selectUser);

  if (!user?.id) {
    return null;
  }

  return (
    <div className="container mx-auto pl-5 pt-6">
      <div className="mb-2 flex">
        <button
          className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-xs font-bold capitalize text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
          type="button"
          onClick={openCategoryModal}
        >
          Create Category
        </button>
        <button
          className="mb-1 mr-1 rounded bg-blue-500 px-6 py-3 text-xs font-bold capitalize text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
          type="button"
          onClick={openTicketModal}
        >
          Create Ticket
        </button>
      </div>

      <Modal
        headerText="Create Category"
        isVisible={isCategoryModalVisible}
        onClose={closeCategoryModal}
      >
        {/* Category creation form or content */}
        <p>Category creation content goes here.</p>
        <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
          <button
            className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
            type="button"
            onClick={closeCategoryModal}
          >
            Close
          </button>
          <button
            className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      <Modal
        headerText="Create Ticket"
        isVisible={isTicketModalVisible}
        onClose={closeTicketModal}
      >
        {/* Ticket creation form or content */}
        <p>Ticket creation content goes here.</p>
        <button
          className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
          type="button"
          onClick={closeTicketModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};
