import React from "react";

const Footer = () => {
  return (
    <div className="footer border-top " style={{ backgroundColor: "#FBFBFB" }}>
      <div className=" container  p-5">
        <div className="row">
          <div className="col">
            <img
              src="/media/images/main_logo-removebg-preview.png"
              alt="logo"
              style={{ width: "57%" }}
              className="mb-3"
            />
            <p className="text-muted" style={{ fontSize: "14px" }}>
              © 2010 - 2025, Trade-X Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col">
            <h4 className="mb-3">Account</h4>
            <a href="">Open demat account</a>
            <br />
            <a href="">Minor demat account</a>
            <br />
            <a href="">NRI demat account</a>
            <br />
            <a href=""> Commodity</a>
            <br />
            <a href=""> Dematerialisation</a>
            <br />
            <a href=""> Fund transfer</a>
            <br />
            <a href=""> MTF</a>
            <br />
            <a href=""> Referral program</a>
            <br />
          </div>
          <div className="col">
            <h4 className="mb-3">Support</h4>
            <a href=""> Contact us</a>
            <br />
            <a href=""> Support portal</a>
            <br />
            <a href=""> How to file a complaint?</a>
            <br />
            <a href=""> Status of your complaints</a>
            <br />
            <a href="">Bulletin</a>
            <br />
            <a href=""> Circular</a>
            <br />
            <a href=""> Z-Connect blog</a>
            <br />
            <a href=""> Downloads</a>
            <br />
          </div>
          <div className="col">
            <h4 className="mb-3">Company</h4>

            <a href="">About</a>
            <br />
            <a href="">Philosophy</a>
            <br />
            <a href=""> Press & media</a>
            <br />
            <a href="">Careers</a>
            <br />
            <a href="">Trade-X Cares (CSR)</a>
            <br />
            <a href="">Trade-X.tech</a>
            <br />
            <a href=""> Open source</a>
            <br />
          </div>
          <div className="col">
            <h4 className="mb-3">Quick links</h4>
            <a href="">Upcoming IPOs</a>
            <br />
            <a href="">Brokerage charges</a>
            <br />
            <a href="">Market holidays</a>
            <br />
            <a href=""> Economic calendar</a>
            <br />
            <a href=""> Calculators</a>
            <br />
            <a href=""> Markets</a>
            <br />
            <a href=""> Sectors</a>
            <br />
          </div>
        </div>
        <div className=" mt-5 text-muted p-3" style={{ fontSize: "12px" }}>
          <p>
            Trade-X Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration
            no.: INZ000031633 CDSL/NSDL: Depository services through Trade-X
            Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered
            Address: Trade-X Broking Ltd., #153/154, 4th Cross, Dollars Colony,
            Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru -
            560078, Karnataka, India. For any complaints pertaining to
            securities broking please write to{" "}
            <a href="">complaints@Trade-X.com</a> , for DP related to{" "}
            <a href="">dp@Trade-X.com.</a> Please ensure you carefully read the
            Risk Disclosure Document as prescribed by SEBI | ICF{" "}
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p>
            <a href="">
              Smart Online Dispute Resolution | Grievances Redressal Mechanism
            </a>
          </p>

          <p>
            {" "}
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>

          <p>
            {" "}
            Attention investors: 1) Stock brokers can accept securities as
            margins from clients only by way of pledge in the depository system
            w.e.f September 01, 2020. 2) Update your e-mail and phone number
            with your stock broker / depository participant and receive OTP
            directly from depository on your e-mail and/or mobile number to
            create pledge. 3) Check your securities / MF / bonds in the
            consolidated account statement issued by NSDL/CDSL every month.
          </p>

          <p>
            India's largest broker based on networth as per NSE.{" "}
            <a href=""> NSE broker factsheet</a>
          </p>

          <p>
            {" "}
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Trade-X and offering such services, please{" "}
            <a href="">create a ticket here.</a>
          </p>
        </div>
        <div className="footerend text-center fw-semibold">
          <a href="">NSE</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href=""> BSE</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href=""> MCX</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="">Terms & conditions</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="">Policies & procedures </a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href=""> Privacy policy</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="">Disclosure</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="">For investor's attention</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="">Investor charter</a>&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
};

export default Footer;
