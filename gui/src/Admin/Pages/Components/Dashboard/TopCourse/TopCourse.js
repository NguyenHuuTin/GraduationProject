import React from 'react';
import './TopCourse.css';

function TopCourse(props) {
    return (
        <div className='top-course-body'>
            <div className='title-course'>
                <p>Top 5 Course</p>
            </div>

            <div className='top-course-main'>
                {/* course1 */}
                <div className='top-course-content'>
                    <div className='top-course-content-item'>
                        <div className='top-course-content-image'>
                            <img alt='img_course' className='image-course' src="https://mona.media/wp-content/uploads/2021/07/css.png"/>
                        </div>
                        <div className='top-course-content-main'>
                            <div className='course-title'>
                                <p>CSS: The complete Guid 2021 (include SASS and Grid)</p>
                            </div>
                            <div className='course-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='course-status-money'>
                                    $58.20
                                </div>
                            </div>
                            <div className='course-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='course-status-money'>
                                    $1.80
                                </div>
                            </div>
                        </div>
                        <div className='top-course-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>

                {/* course2 */}
                <div className='top-course-content'>
                    <div className='top-course-content-item'>
                        <div className='top-course-content-image'>
                            <img alt='img_course' className='image-course' src="http://swinburne-vn.edu.vn/wp-content/uploads/2021/01/17-720x460.png"/>
                        </div>
                        <div className='top-course-content-main'>
                            <div className='course-title'>
                                <p>The complete Digital Marketing Course: 12 course in 1</p>
                            </div>
                            <div className='course-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='course-status-money'>
                                    $72.75
                                </div>
                            </div>
                            <div className='course-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='course-status-money'>
                                    $2.25
                                </div>
                            </div>
                        </div>
                        <div className='top-course-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>

                {/* course3 */}
                <div className='top-course-content'>
                    <div className='top-course-content-item'>
                        <div className='top-course-content-image'>
                            <img alt='img_course' className='image-course' src="https://www.freecodecamp.org/news/content/images/2021/06/javascriptfull.png"/>
                        </div>
                        <div className='top-course-content-main'>
                            <div className='course-title'>
                                <p>The complete JavaScript Course 2022: Build Real Project 2021 (include SASS and Grid)</p>
                            </div>
                            <div className='course-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='course-status-money'>
                                    $52.38
                                </div>
                            </div>
                            <div className='course-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='course-status-money'>
                                    $1.62
                                </div>
                            </div>
                        </div>
                        <div className='top-course-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>

                {/* course4 */}
                <div className='top-course-content'>
                    <div className='top-course-content-item'>
                        <div className='top-course-content-image'>
                            <img alt='img_course' className='image-course' src="https://www.filepicker.io/api/file/BFMMlbcQvml9HSqXcvNp"/>
                        </div>
                        <div className='top-course-content-main'>
                            <div className='course-title'>
                                <p>Complete Python Bootcamp: go form zero to hero in Python 3</p>
                            </div>
                            <div className='course-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='course-status-money'>
                                    $58.20
                                </div>
                            </div>
                            <div className='course-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='course-status-money'>
                                    $1.80
                                </div>
                            </div>
                        </div>
                        <div className='top-course-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>

                {/* course5 */}
                <div className='top-course-content'>
                    <div className='top-course-content-item'>
                        <div className='top-course-content-image'>
                            <img alt='img_course' className='image-course' src="https://hri.com.vn/wp-content/uploads/bfi_thumb/c-oxylp5x7k4wjjh5ov9euuqs1cea47b0kdogs07ffrq.png"/>
                        </div>
                        <div className='top-course-content-main'>
                            <div className='course-title'>
                                <p>Beginning C++ Programing - From Beginner to Beyond</p>
                            </div>
                            <div className='course-status-instructor-earning'>
                                <div className='status-earning'>
                                </div>
                                <div className='course-status-money'>
                                    $58.20
                                </div>
                            </div>
                            <div className='course-status-admin-commission'>
                                <div className='status-commission'>
                                </div>
                                <div className='course-status-money'>
                                    $1.80
                                </div>
                            </div>
                        </div>
                        <div className='top-course-count-sale'>
                            3 Sales
                        </div>
                    </div>
                </div>
                <div className='overflow'></div>
            </div>
            <div className='course-note'>
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

export default TopCourse;