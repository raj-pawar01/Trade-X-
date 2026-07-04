import React from 'react'

const Education = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <img src="/media/images/education.svg" alt="education" style={{ width: "85%" }} />
                </div>
                <div className="col p-5">
                    <h2 className='fs-3'>Free and open market education</h2>
                    <p className='text-muted mt-4' style={{ fontSize: "1.1rem" }}>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href="" style={{ textDecoration: "none" }}>Varsity <i class="fa-solid fa-arrow-right"></i> </a>
                    <p className='text-muted mt-3' style={{ fontSize: "1.1rem" }}>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href="" style={{ textDecoration: "none" }}>TradingQ&A  <i class="fa-solid fa-arrow-right"></i> </a>

                </div>
            </div>
        </div>
    )
}

export default Education