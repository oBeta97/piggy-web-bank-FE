import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { SECONDARY_COLOR } from '../../modules/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { Istore } from '../../redux/store';
import { hideModal } from '../../redux/action/modal';
import { ImodalState } from '../../interfaces/ImodalState';
import { ADD_NEW_VAR_TRANSACTION, DELETE_TRANSACTION_BUTTONS, UPDATE_VARIABLE_TRANSACTION_FORM } from '../../modules/ModalContents';
import DeleteTransactionModalButtons from '../HomePage/DeleteTransactionModalButtons';
import VariableTransactionForm from '../ModalComponents/VariableTransactionForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '75%', md: 400 },
  bgcolor: 'background.paper',
  border: '2px solid ' + SECONDARY_COLOR,
  boxShadow: 24,
  p: 4,
};


const MyModal = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const modalState: ImodalState = useSelector((store: Istore) => store.modalState);

  useEffect(() => {
    setOpen(modalState.show);
  }, [modalState]);

  const handleClose = () => dispatch(hideModal());

  const contentSelector = ():JSX.Element =>{
    switch(modalState.content){
      case ADD_NEW_VAR_TRANSACTION:
        return <VariableTransactionForm />;
      case DELETE_TRANSACTION_BUTTONS:
        return <DeleteTransactionModalButtons />;
      case UPDATE_VARIABLE_TRANSACTION_FORM:
          return <VariableTransactionForm isUpdate />;
      default:
        return <></>;
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" textAlign='center' variant="h6" component="h2">
          {modalState.title}
        </Typography>
        {
          contentSelector()
        }
      </Box>
    </Modal>
  );
}

export default MyModal