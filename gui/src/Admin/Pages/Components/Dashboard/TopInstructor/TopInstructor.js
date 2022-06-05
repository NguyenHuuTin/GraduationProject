import React from 'react';
import './TopInstructor.css';

function TopInstructor(props) {
    return (
        <div className='top-instructor-body'>
            <div className='title-instructor'>
                <p>Top 5 instructor</p>
            </div>

            <div className='top-instructor-main'>
                {/* instructor1 */}
                <div className='top-instructor-content'>
                    <div className='top-instructor-content-item'>
                        <div className='top-instructor-content-image'>
                            <img alt='img_user' className='image-instructor' src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg"/>
                        </div>
                        <div className='top-instructor-content-main'>
                            <div className='instructor-title'>
                                <p>Jemmy</p>
                            </div>
                            <div className='instructor-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='instructor-status-money'>
                                    $46,925.14
                                </div>
                            </div>
                            <div className='instructor-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='instructor-status-money'>
                                    $2,038.26
                                </div>
                            </div>
                        </div>
                        <div className='top-instructor-count-sale'>
                            13 Sales
                        </div>
                    </div>
                </div>

                {/* instructor2 */}
                <div className='top-instructor-content'>
                    <div className='top-instructor-content-item'>
                        <div className='top-instructor-content-image'>
                            <img alt='img_user' className='image-instructor' src="https://as1.ftcdn.net/v2/jpg/01/13/41/66/1000_F_113416666_a7CuS6cvc6D5P5ezUbsTMexJHm9iAgga.jpg"/>
                        </div>
                        <div className='top-instructor-content-main'>
                            <div className='instructor-title'>
                                <p>Zoena</p>
                            </div>
                            <div className='instructor-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='instructor-status-money'>
                                    $72.75
                                </div>
                            </div>
                            <div className='instructor-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='instructor-status-money'>
                                    $2.25
                                </div>
                            </div>
                        </div>
                        <div className='top-instructor-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>

                {/* instructor3 */}
                <div className='top-instructor-content'>
                    <div className='top-instructor-content-item'>
                        <div className='top-instructor-content-image'>
                            <img alt='img_user' className='image-instructor' src="https://thumbs.dreamstime.com/b/female-avatar-icon-flat-style-female-user-icon-cartoon-woman-avatar-pink-hair-vector-stock-91462795.jpg"/>
                        </div>
                        <div className='top-instructor-content-main'>
                            <div className='instructor-title'>
                                <p>Jassica William</p>
                            </div>
                            <div className='instructor-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='instructor-status-money'>
                                    $52.38
                                </div>
                            </div>
                            <div className='instructor-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='instructor-status-money'>
                                    $1.62
                                </div>
                            </div>
                        </div>
                        <div className='top-instructor-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>

                {/* instructor4 */}
                <div className='top-instructor-content'>
                    <div className='top-instructor-content-item'>
                        <div className='top-instructor-content-image'>
                            <img alt='img_user' className='image-instructor' src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-vector-stock-91602499.jpg"/>
                        </div>
                        <div className='top-instructor-content-main'>
                            <div className='instructor-title'>
                                <p>Rock Smith</p>
                            </div>
                            <div className='instructor-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='instructor-status-money'>
                                    $58.20
                                </div>
                            </div>
                            <div className='instructor-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='instructor-status-money'>
                                    $1.80
                                </div>
                            </div>
                        </div>
                        <div className='top-instructor-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>

                {/* instructor5 */}
                <div className='top-instructor-content'>
                    <div className='top-instructor-content-item'>
                        <div className='top-instructor-content-image'>
                            <img alt='img_user' className='image-instructor' src="https://thumbs.dreamstime.com/b/man-beard-avatar-character-isolated-icon-man-beard-avatar-character-isolated-icon-vector-illustration-design-197190535.jpg"/>
                        </div>
                        <div className='top-instructor-content-main'>
                            <div className='instructor-title'>
                                <p>Albert Dua</p>
                            </div>
                            <div className='instructor-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='instructor-status-money'>
                                    $58.20
                                </div>
                            </div>
                            <div className='instructor-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='instructor-status-money'>
                                    $1.80
                                </div>
                            </div>
                        </div>
                        <div className='top-instructor-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>
                <div className='overflow'></div>
            </div>
            <div className='instructor-note'>
                <div className='note-earning'>
                    <div className='status-note-earning'>

                    </div>
                    <div className='note'>
                        Instructor Earning
                    </div>
                </div>
                <div className='note-commission'>
                    <div className='status-note-commission'>

                    </div>
                    <div className='note'>
                        Admin Commission
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopInstructor;