import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import SearchIcon from "@mui/icons-material/Search";
import "./Modal_search.css";

function Modal_Search() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleshow = () => setShow(true);

    return (
      <>
        <span onClick={handleshow}>
          <SearchIcon /> Search
        </span>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='modal-H'>
            <Modal.Title>
              <div className="search-outer">
                <input className="search-input" placeholder='Search' />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>No result</Modal.Body>
          <Modal.Footer>
            <button className='button-modal-close' onClick={handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default Modal_Search;