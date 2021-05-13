import React from "react";
import './Project.css'
import {useDispatch, useSelector} from "react-redux";
import {settingsPageSelector} from "../selectors/settings-page-selector";
import {Button, Col, Form, InputNumber, Row} from "antd";
import 'antd/dist/antd.css';
import {useHistory} from "react-router-dom";
import {actions, BackDetailsValuesType} from "../redux/calculator-reducer";

export const Project = () => {
    const {
        mirrorHeight,
        mirrorWidth,
        backPlate,
        outerLeftRightSide,
        outerTopBottomSide,
        innerTopBottomSide,
        innerLeftRightSide,
        mirrorStandSize,
        mirrorStand,
        lamps,
        backDetails
    } = useSelector(settingsPageSelector)
    const dispatch = useDispatch()
    const history = useHistory();
    const onFinish = (values: BackDetailsValuesType) => {
        dispatch(actions.setBackDetailsData(values))
        history.push('/save')

    };
    const createLights = (lampsSide: 'left' | 'right' | 'top' | 'bottom') => {
        let obj = Object.entries(lamps)
        return (
            <div className={lampsSide}>
                {obj.map(el => {
                    let y = []
                    if (el[1] > 0 && el[0] === lampsSide) {
                        for (let i = 1; i <= el[1]; i++) {
                            y.push(<div className={`light`}/>)
                        }
                    }
                    return (y.map(el => el))
                })}
            </div>
        )
    }
    const createBackDetails = (detail: { width: number, height: number }, values: any) => {
        return (
            <Row align='bottom'>
                <Col>
                    <Form.Item>
                        <Form.Item name={values} noStyle>
                            <InputNumber min={1} max={10} style={{width: '60px'}}/>
                        </Form.Item>
                    </Form.Item>
                </Col>
                <Col>
                    <div className={'detailsBox'}>
                        <span> {detail.height}</span>
                        <div style={size(detail.height, detail.width)} className='detail'>
                            <span> {detail.width}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
    const size = (width: number, height: number) => ({width: width / 3, height: height / 3, border: '1px solid'})

    const lengthBetweenLightsRight = ((mirrorHeight - 100) / (lamps.right - 1))
    const lengthBetweenLightsTop = ((mirrorWidth - 100) / (lamps.top - 1))

    return (
        <div className='project'>
            {
                mirrorHeight !== 0 &&
                <>
                    <div className='mirror'>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <p>50</p>
                                <p>50</p>
                                <p>50</p>
                                <p>50</p>
                                <span> {mirrorWidth}</span>
                                <div style={size(mirrorWidth, mirrorHeight)} className='detail'>
                                    <div className='borderBox'>
                                        <span> {mirrorHeight}</span>
                                        <span className='lengthBetweenLightsRight'>
                                            {
                                                lengthBetweenLightsRight % 1 === 0
                                                    ? lengthBetweenLightsRight
                                                    : lengthBetweenLightsRight.toFixed(2)
                                            }
                                        </span>
                                        <span className='lengthBetweenLightsTop'>
                                            {
                                                lengthBetweenLightsTop % 1 === 0
                                                    ? lengthBetweenLightsTop
                                                    : lengthBetweenLightsTop.toFixed(2)
                                            }
                                        </span>
                                        <span className='holeWidth'> Q29</span>
                                        <div className='lights'>
                                            {createLights('top')}
                                            {createLights('bottom')}
                                            {createLights('left')}
                                            {createLights('right')}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='details'>
                            <div className={'detailsBox'}>
                                <span> {backPlate.width}</span>
                                <div style={size(backPlate.width, backPlate.height)} className='detail'>
                                    <span> {backPlate.height}</span>
                                    <span className='detailName'>HDF 4mm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Form
                        name="basic"
                        initialValues={{
                            outerLeftRightValue: `${backDetails.outerLeftRightValue}`,
                            outerTopBottomValue: `${backDetails.innerTopBottomValue}`,
                            innerTopBottomValue: `${backDetails.innerTopBottomValue}`,
                            innerLeftRightValue: `${backDetails.innerLeftRightValue}`,
                            mirrorStandValue: `${backDetails.mirrorStandValue}`,
                        }}
                        onFinish={onFinish}>

                        {createBackDetails(outerLeftRightSide, 'outerLeftRightValue')}
                        {createBackDetails(outerTopBottomSide, 'outerTopBottomValue')}
                        {createBackDetails(innerTopBottomSide, 'innerTopBottomValue')}
                        {createBackDetails(innerLeftRightSide, 'innerLeftRightValue')}
                        {mirrorStand && createBackDetails(mirrorStandSize, 'mirrorStandValue')}

                        <Row justify={"center"} style={{margin: '30px'}}>
                            <Col>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </>
            }
        </div>
    )
}

