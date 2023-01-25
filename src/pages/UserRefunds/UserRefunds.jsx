import React, { useEffect, useState } from "react";
import Package from "../../images/package.png";

export default function UserRefunds(props) {
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    setCustomer(props.customer);
    console.log(props.customer);
  }, []);
  function setBgColorTrans(params) {
    document.getElementById("navbar").style.backgroundColor = "transparent";
  }
  return (
    <div id="userRefunds">
      {customer.refunds?.map((refund) => (
        <div className="order-card" key={refund.id}>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <div className="up">
                    <div className="up-left">
                      <img src={Package} alt="" width={30} />
                      <div className="time">{refund.refundDate} 'li İADE</div>
                    </div>
                  </div>
                  <div className="bottom">
                    <b>Sebep:</b> {refund.cause}
                   
                  </div>
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse "
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                    <div className="sub-wrap">
                      <div className="left">
                        <img
                          src={refund.orderDetail.product.images[0].url}
                          width={75}
                          alt=""
                        />
                      </div>
                      <div className="right">
                        <div className="right-up">
                          <b>{refund.orderDetail.product.name}</b>
                        </div>
                        <div className="right-bottom">
                          <div className="category">
                            <b> Kategori :</b>{" "}
                            {refund.orderDetail.product.category.name}
                          </div>
                          <div className="size">
                            <b>Beden : </b>
                            {refund.orderDetail.size.name}
                          </div>
                          <div className="amount">
                            <b> Adet : </b>
                            {refund.orderDetail.amount}
                          </div>

                          <div className="price">
                            <b>Fiyat : </b> {refund.orderDetail.product.price}
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
