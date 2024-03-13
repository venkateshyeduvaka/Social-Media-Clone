import React from 'react'
import Modal from 'react-modal';
import PostShare from './PostShare'

const ShareModal = ({isModalOpen,closeModal}) => {
  return (
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"

        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '50%',
            height: '40%',
            margin: 'auto',
            top: '10%',
            left: '15%',
            position: 'absolute',
            borderRadius: '15px',
          },
        }}
      >
      <PostShare/>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
  )
}

export default ShareModal 
