import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class BuyOrder extends Component {
  state = {
    modalIsOpen: false,
    price: this.props.price,
    amount: this.props.amount,
    newAmount: this.props.amount,
  };

  onAmountChange = (e) => {
    const { value: newAmount } = e.target;
    const { amount } = this.state;
    if (newAmount > 0 && newAmount <= amount) {
      this.setState({ newAmount });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { _id, token } = this.props;
    const { newAmount: amount } = this.state;
    axios.post('http://api.etharek.tech/API/orders/takeOrder', {
      order_id: _id,
      token,
      amount
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));
  }
 
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }
 
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { amount, price, newAmount } = this.state;
    const { isCompleted } = this.props;
    return (
      <div>
        <div className="order" onClick={this.openModal}>
          {!isCompleted && 
            <div className="row">
              <div className="col-4">{price}</div>
              <div className="col-4">{amount}</div>
              <div className="col-4">{price * amount}</div>
            </div>
          }
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Place order"
          style={customStyles}
          ariaHideApp={false}
        >
          <form onSubmit={this.onSubmit}>
            <div className="form__group">
              <label>Amount</label>
              <input 
                onChange={this.onAmountChange}
                type="number" 
                className="input" 
                value={newAmount} 
              />
            </div>
            <div className="form__group">
              <label>Price</label>
              <input
                className="input input__disabled"
                type="number"
                value={price} 
                readOnly
              />
            </div>
            <p>It will cost you {newAmount * price}</p>
            <div className="form__group">
              <input
                type="submit"
                className="button button--primary-outline trade__button"
                value="Submit"
              />
            </div>
          </form>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(BuyOrder);